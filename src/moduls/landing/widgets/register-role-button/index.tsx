import { Role } from "@/entities/user/role";
import { useState } from "react";

interface Props {
    styles: any,
    onClick: any,
    name: string,
    isActive: boolean,
    description: string,
    tooltipPosition?: 'top' | 'bottom' | 'left' | 'right'
}

export const RegistrRoleButton = ({ 
    isActive, 
    styles, 
    onClick, 
    name, 
    description,
    tooltipPosition = 'bottom' 
}: Props) => {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <div className={styles.roleButtonWrapper}>
            <button
                type="button"
                className={`${styles.roleButton} ${isActive ? styles.roleButtonActive : ''}`}
                onClick={onClick}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
            >
                {name}
            </button>
            
            {showTooltip && (
                <div className={`${styles.roleTooltip} ${styles[`tooltip${tooltipPosition}`]}`}>
                    <div className={`${styles.roleTooltipArrow} ${styles[`arrow${tooltipPosition}`]}`} />
                    <div className={styles.roleTooltipContent}>
                        {description}
                    </div>
                </div>
            )}
        </div>
    );
}