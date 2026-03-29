import { ACCOUNT_SUPPLY } from "@/entities/user/config";
import { IAccountSupply } from "@/entities/user/type";
import { makeAutoObservable } from "mobx";

export class AccountSupplyModel {
    private _accountData: IAccountSupply = {
        coins: 0,
        userId: "",
        user: 0,
        accountRequests: 0,
        id: "",
    }

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
        this.initFromStorage();
    }


    get accountData() {
        return this._accountData;
    }

    private initFromStorage() {
        const storedData = localStorage.getItem(ACCOUNT_SUPPLY);

        if (storedData) {
            try {
                this._accountData = JSON.parse(storedData);
            } catch {
                this.clearStorage();
            }
        }
    }

    private clearStorage() {
        localStorage.removeItem(ACCOUNT_SUPPLY);
    }

    setAccount(data: IAccountSupply | null) {
        this._accountData = data
    }


    signInAccount(data: IAccountSupply): void {
        const sessionData: IAccountSupply = {
            coins: data.coins,
            userId: data.userId,
            user: data.user,
            accountRequests: data.accountRequests,
            id: data.id,
        };

        localStorage.setItem(ACCOUNT_SUPPLY, JSON.stringify(sessionData));
        this.setAccount(sessionData);
    }


    signOutAccount(): void {
        localStorage.removeItem(ACCOUNT_SUPPLY);
        this.setAccount(null);
    }
}

export const accountSupplyModel = new AccountSupplyModel();
