import { ACCESS_TOKEN, REFRESH_TOKEN, USER_STORAGE_KEY } from "@/entities/user/config";
import { DemoUser, PasswordChangeResult, RegisterResult, User } from "@/entities/user/type";
import { DEMO_USERS } from "../data";
import { makeAutoObservable } from "mobx";

export class UserModel {
    private _user: User | null = null

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
        this.initFromStorage();
    }

    get user() {
        return this._user;
    }

    private initFromStorage() {
        const storedUser = localStorage.getItem(USER_STORAGE_KEY);

        if (storedUser) {
            try {
                this._user = JSON.parse(storedUser);
            } catch {
                this.clearStorage();
            }
        }
    }
    private clearStorage() {
        localStorage.removeItem(USER_STORAGE_KEY);
    }


    setUser(data: User | null) {
        this._user = data
    }

    signIn(data: RegisterResult): void {
        const sessionUser: User = {
            id: data.user.id,
            email: data.user.email,
            fullName: data.user.fullName,
            phoneNumber: data.user.phoneNumber ?? '',
            role: data.user.role,
            company: data.user.company ?? undefined,
        };

        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(sessionUser));
        localStorage.setItem(REFRESH_TOKEN, JSON.stringify(sessionUser));
        localStorage.setItem(ACCESS_TOKEN, JSON.stringify(sessionUser));
        this.setUser(sessionUser);
    }


    signOut(): void {
        localStorage.removeItem(USER_STORAGE_KEY);
        this.setUser(null);
        window.location.href = '/';
    }

    changePassword(
        email: string,
        currentPassword: string,
        newPassword: string
    ): PasswordChangeResult {
        const normalizedEmail = email.trim().toLowerCase();
        const current = String(currentPassword || '');
        const next = String(newPassword || '');

        const baseUser = DEMO_USERS.find(
            (u: DemoUser) => u.email.toLowerCase() === normalizedEmail
        );

        if (!baseUser) {
            return { ok: false, message: 'Пользователь не найден' };
        }

        const overrides = this.loadPasswordOverrides();
        const expectedPassword = overrides[normalizedEmail] || baseUser.password;

        if (current !== expectedPassword) {
            return { ok: false, message: 'Текущий пароль указан неверно' };
        }

        if (next.length < 6) {
            return { ok: false, message: 'Новый пароль должен быть не короче 6 символов' };
        }

        overrides[normalizedEmail] = next;
        this.savePasswordOverrides(overrides);

        return { ok: true };
    }

    getAllUsers(): Omit<DemoUser, 'password'>[] {
        return DEMO_USERS.map(({ password, ...user }: DemoUser) => user);
    }
}

export const userModel = new UserModel();