import { RegisterRequestDTO } from "@/entities/user/type";
import { Button } from "@/shared/ui-kits/button";
import { Input } from "@/shared/ui-kits/Input";
import { useState } from "react";

interface Props {
    isLoading: boolean,
    styles: any,
    formData: RegisterRequestDTO,
    setFormData: <K extends keyof RegisterRequestDTO> (name: K, value: RegisterRequestDTO) => void

}


export const SuplierForm = ({ styles, formData, setFormData, isLoading }: Props) => {
    const [focusedInput, setFocusedInput] = useState<string>('')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    return (
        <>
            <div className={styles.inputGroup}>
                <label className={styles.label}>ФИО *</label>
                <Input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData("fullName", e)}
                    placeholder="Иванов Иван Иванович"
                    classNames={{ input: styles.input }}
                    disabled={isLoading}
                />
            </div>

            <div className={styles.inputGroup}>
                <label className={styles.label}>Email *</label>
                <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData("email", e)}
                    placeholder="company@example.com"
                    classNames={{ input: styles.input }}
                    disabled={isLoading}
                />
            </div>

            <div className={styles.inputGroup}>
                <label className={styles.label}>Номер телефона *</label>
                <Input
                    type="phone"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData("phoneNumber", e)}
                    placeholder="+79963363058"
                    classNames={{ input: styles.input }}
                    disabled={isLoading}
                />
            </div>

            <div className={styles.inputGroup}>
                <label className={styles.label}>Пароль *</label>
                <div className={styles.passwordWrapper}>
                    <Input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => setFormData('password', e)}
                        placeholder="Минимум 6 символов"
                        classNames={{ input: styles.input }}
                        disabled={isLoading}
                    />
                    <button
                        type="button"
                        className={styles.passwordToggle}
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M2 12C2 12 5 6 12 6C19 6 22 12 22 12C22 12 19 18 12 18C5 18 2 12 2 12Z" stroke="currentColor" strokeWidth="2" />
                                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                            </svg>
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M1 1L23 23" stroke="currentColor" strokeWidth="2" />
                                <path d="M16.51 16.51C15.29 17.53 13.73 18.17 12 18.17C5 18.17 2 12.17 2 12.17C2 12.17 2.53 11.09 3.58 10.04" stroke="currentColor" strokeWidth="2" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            <div className={styles.inputGroup}>
                <label className={styles.label}>Подтверждение пароля *</label>
                <div className={styles.passwordWrapper}>
                    <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData('confirmPassword', e.target.value)}
                        onFocus={() => setFocusedInput('confirmPassword')}
                        onBlur={() => setFocusedInput('')}
                        placeholder="Повторите пароль"
                        className={`${styles.input} ${styles.inputPassword} ${focusedInput === 'confirmPassword' ? styles.inputFocused : ''}`}
                        disabled={isLoading}
                    />
                    <button
                        type="button"
                        className={styles.passwordToggle}
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        {showConfirmPassword ? (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M2 12C2 12 5 6 12 6C19 6 22 12 22 12C22 12 19 18 12 18C5 18 2 12 2 12Z" stroke="currentColor" strokeWidth="2" />
                                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                            </svg>
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M1 1L23 23" stroke="currentColor" strokeWidth="2" />
                                <path d="M16.51 16.51C15.29 17.53 13.73 18.17 12 18.17C5 18.17 2 12.17 2 12.17C2 12.17 2.53 11.09 3.58 10.04" stroke="currentColor" strokeWidth="2" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>
        </>
    );
}