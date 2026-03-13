import { Role } from "@/entities/user/role";

interface Props {
    styles: any,
    onClick: any,
    name: string,
    isActive: boolean,
    description: string
}


export const RegistrRoleButton = ({ isActive, styles, onClick, name, description }: Props) => {
    return (
        <button
            type="button"
            className={`${styles.roleButton} ${isActive ? styles.roleButtonActive : ''}`}
            onClick={onClick}
        >
            {name}
        </button>
    );
}