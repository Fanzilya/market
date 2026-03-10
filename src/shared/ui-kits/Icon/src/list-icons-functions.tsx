import { IconName } from "./type"

export const getIcon = (name: IconName, width: number, height: number, color: string): React.ReactNode => {
    const icons: Record<IconName, React.ReactNode> = {
        "main": (
            <svg width={width} height={height} viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="list">
                    <path id="Icon" d="M31.501 59.4998H70.001M31.501 41.9998H70.001M31.501 24.4998H70.001M14.001 57.7498H17.501V61.2498H14.001V57.7498ZM14.001 40.2498H17.501V43.7498H14.001V40.2498ZM14.001 22.7498V26.2498H17.501V22.7498H14.001Z" stroke={color} stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
                </g>
            </svg>
        ),

        "dashboard": (
            <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 12L12 16L3.00001 12M21 16L12 20L3 16M21 8L12 12L3.00001 8L12 4L21 8Z" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

        ),

        "requests": (
            <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 3H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V9M13 3L19 9M13 3V8C13 8.55228 13.4477 9 14 9H19M9 13H15M9 17H15" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        ),

        "offers": (
            <svg width={width} height={height} viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="folder">
                    <path id="Icon" fill-rule="evenodd" clip-rule="evenodd" d="M9 21C9 17.6863 11.6863 15 15 15L26.0147 15C27.606 15 29.1321 15.6321 30.2574 16.7574L32.7426 19.2426C33.8679 20.3679 35.394 21 36.9853 21H57C60.3137 21 63 23.6863 63 27V51C63 54.3137 60.3137 57 57 57H15C11.6863 57 9 54.3137 9 51V21Z" stroke={color} stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
                </g>
            </svg>

        ),

        "materials": (
            <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 13H14M20 8V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V8M21 8V5C21 3.89543 20.1046 3 19 3H5C3.89543 3 3 3.89543 3 5V8H21Z" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

        ),

        "balance": (
            <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 6V17C3 18.6569 4.34315 20 6 20H20C20.5523 20 21 19.5523 21 19V16M3 6C3 4.89543 3.89543 4 5 4H18C18.5523 4 19 4.44772 19 5V8M3 6C3 7.10457 3.89543 8 5 8H19M19 8H20C20.5523 8 21 8.44772 21 9V12M21 12H18C16.8954 12 16 12.8954 16 14C16 15.1046 16.8954 16 18 16H21M21 12V16" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

        ),

        "users": (
            <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.5051 19H20C21.1046 19 22.0669 18.076 21.716 17.0286C21.1812 15.4325 19.8656 14.4672 17.5527 14.1329M14.5001 10.8645C14.7911 10.9565 15.1244 11 15.5 11C17.1667 11 18 10.1429 18 8C18 5.85714 17.1667 5 15.5 5C15.1244 5 14.7911 5.04354 14.5001 5.13552M9.5 14C13.1135 14 15.0395 15.0095 15.716 17.0286C16.0669 18.076 15.1046 19 14 19H5C3.89543 19 2.93311 18.076 3.28401 17.0286C3.96047 15.0095 5.88655 14 9.5 14ZM9.5 11C11.1667 11 12 10.1429 12 8C12 5.85714 11.1667 5 9.5 5C7.83333 5 7 5.85714 7 8C7 10.1429 7.83333 11 9.5 11Z" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        ),

        "user": (
            <svg width={width} height={height} viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="user">
                    <g id="Icon">
                        <path d="M51 60C54.3137 60 57.1363 57.2698 56.3852 54.0424C54.5169 46.0141 48.269 42 36 42C23.731 42 17.4831 46.0141 15.6148 54.0424C14.8637 57.2698 17.6863 60 21 60H51Z" stroke={color} stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M36 33C42 33 45 30 45 22.5C45 15 42 12 36 12C30 12 27 15 27 22.5C27 30 30 33 36 33Z" stroke={color} stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                </g>
            </svg>
        ),

        "companies": (
            <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 19H21M12 12V19M18 12V19M6 12V19M12.4472 3.22361L20.59 7.29502C21.4395 7.71974 21.1372 9 20.1875 9H3.81246C2.86276 9 2.56053 7.71974 3.40997 7.29502L11.5528 3.22361C11.8343 3.08284 12.1657 3.08284 12.4472 3.22361Z" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

        ),

        "notifications": (
            <svg width={width} height={height} viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="notifications">
                    <path id="Icon" d="M36 16.5C44.2843 16.5 51 23.2157 51 31.5V38.2188C51 39.6883 51.5393 41.1067 52.5155 42.205L56.3425 46.5104C58.9221 49.4124 56.862 54 52.9792 54H19.0208C15.1379 54 13.0778 49.4124 15.6574 46.5104L19.4844 42.205C20.4607 41.1067 20.9999 39.6883 20.9999 38.2188L21 31.5C21 23.2157 27.7157 16.5 36 16.5ZM36 16.5V9M32.9998 63H38.9998" stroke={color} stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
                </g>
            </svg>

        ),

        "profile": (
            <svg width={width} height={height} viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="user-circle">
                    <path id="Icon" d="M54 56.125C52.4497 49.125 46.607 45 36.0004 45C25.3938 45 19.5503 49.125 18 56.125M36 63C50.9117 63 63 50.9117 63 36C63 21.0883 50.9117 9 36 9C21.0883 9 9 21.0883 9 36C9 50.9117 21.0883 63 36 63ZM36 36C40 36 42 33.8571 42 28.5C42 23.1429 40 21 36 21C32 21 30 23.1429 30 28.5C30 33.8571 32 36 36 36Z" stroke={color} stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                </g>
            </svg>

        ),

        "settings": (
            <svg width={width} height={height} viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="settings">
                    <g id="Icon">
                        <path d="M28.9568 13.6984C29.5668 10.9532 32.0017 9 34.8139 9H37.1879C40.0001 9 42.4349 10.9532 43.045 13.6984L43.6538 16.4381C45.6372 17.2146 47.4736 18.284 49.11 19.5932L51.7925 18.7488C54.475 17.9045 57.384 19.0366 58.7901 21.472L59.977 23.5279C61.3831 25.9634 60.909 29.0486 58.8366 30.9496L56.766 32.8488C56.9207 33.8767 57.0009 34.929 57.0009 36C57.0009 37.071 56.9207 38.1233 56.766 39.1511L58.8367 41.0504C60.9091 42.9514 61.3832 46.0366 59.9771 48.4721L58.7901 50.5279C57.384 52.9634 54.475 54.0954 51.7926 53.2512L49.11 52.4068C47.4736 53.716 45.6372 54.7854 43.6538 55.5619L43.045 58.3016C42.4349 61.0468 40.0001 63 37.1879 63H34.8139C32.0017 63 29.5668 61.0468 28.9568 58.3016L28.348 55.5619C26.3646 54.7854 24.5281 53.716 22.8918 52.4068L20.2092 53.2511C17.5267 54.0954 14.6177 52.9634 13.2116 50.5279L12.0247 48.472C10.6186 46.0366 11.0927 42.9513 13.1651 41.0504L15.2357 39.1511C15.0811 38.1232 15.0009 37.071 15.0009 36C15.0009 34.929 15.0811 33.8767 15.2357 32.8489L13.1651 30.9496C11.0927 29.0486 10.6186 25.9634 12.0247 23.5279L13.2117 21.4721C14.6178 19.0366 17.5267 17.9046 20.2092 18.7488L22.8918 19.5932C24.5281 18.284 26.3646 17.2146 28.348 16.4381L28.9568 13.6984Z" stroke={color} stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M39.0008 36C39.0008 37.6569 37.6577 39 36.0008 39C34.344 39 33.0008 37.6569 33.0008 36C33.0008 34.3431 34.344 33 36.0008 33C37.6577 33 39.0008 34.3431 39.0008 36Z" stroke={color} stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                </g>
            </svg>

        ),

        "scheme": (
            <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4C10.8954 4 10 4.89543 10 6C10 7.10457 10.8954 8 12 8C13.1046 8 14 7.10457 14 6C14 4.89543 13.1046 4 12 4ZM12 4L12 2M10.5 7.32244L3.5 21M13.5 7.32244L20.5 21M20 14.0143C18.4413 16.3912 15.445 18 12.0047 18C8.55751 18 5.55616 16.3848 4.00003 14" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

        ),

        "shield": (
            <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 5L4.69699 5.07744C7.14576 5.34953 9.60878 4.70802 11.6137 3.27594L12 3L12.3863 3.27594C14.3912 4.70802 16.8542 5.34953 19.303 5.07744L20 5V12.0557C20 15.0859 18.288 17.856 15.5777 19.2111L12 21L8.42229 19.2111C5.71202 17.856 4 15.0859 4 12.0557V5Z" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        ),

        // Действия
        "edit": (
            <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M18.5 2.5C18.8978 2.10217 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10217 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10217 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke={color} strokeWidth="2" />
            </svg>
        ),

        "delete": (
            <svg width={width} height={height} viewBox="-3 -3 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

        ),

        "recover": (
            <svg width={width} height={height} viewBox="-3 -3 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 3H7C5.89543 3 5 3.89543 5 5V10M13 3L19 9M13 3V8C13 8.55228 13.4477 9 14 9H19M19 9V19C19 20.1046 18.1046 21 17 21H10C7.79086 21 6 19.2091 6 17C6 14.7909 7.79086 13 10 13H13M13 13L10 10M13 13L10 16" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

        ),

        "archive": (
            <svg width={width} height={height} viewBox="-8 -8 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="add-folder">
                    <path id="Icon" d="M36 33V45M42 39H30M15 57H57C60.3137 57 63 54.3137 63 51V27C63 23.6863 60.3137 21 57 21H36.9853C35.394 21 33.8679 20.3679 32.7426 19.2426L30.2574 16.7574C29.1321 15.6321 27.606 15 26.0147 15L15 15C11.6863 15 9 17.6863 9 21V51C9 54.3137 11.6863 57 15 57Z" stroke={color} stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                </g>
            </svg>

        ),

        "view": (
            <svg width={width} height={height} viewBox="-6 -6 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M22 12.0002C20.2531 15.5764 15.8775 19 11.9998 19C8.12201 19 3.74646 15.5764 2 11.9998" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M22 12.0002C20.2531 8.42398 15.8782 5 12.0005 5C8.1227 5 3.74646 8.42314 2 11.9998" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>


        ),

        "download": (
            <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke={color} strokeWidth="2" />
                <path d="M7 10L12 15L17 10" stroke={color} strokeWidth="2" />
                <path d="M12 15V3" stroke={color} strokeWidth="2" />
            </svg>
        ),

        "upload": (
            <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke={color} strokeWidth="2" />
                <path d="M17 8L12 3L7 8" stroke={color} strokeWidth="2" />
                <path d="M12 3V15" stroke={color} strokeWidth="2" />
            </svg>
        ),

        "add": (
            <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4V20" stroke={color} strokeWidth="2" />
                <path d="M4 12H20" stroke={color} strokeWidth="2" />
            </svg>
        ),

        "close": (
            <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18" stroke={color} strokeWidth="2" />
                <path d="M6 6L18 18" stroke={color} strokeWidth="2" />
            </svg>
        ),

        "check": (
            <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17L4 12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),

        "check-double": (
            <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 7L11.5 17.5L7.5 13.5M6 17.5L2 13.5M16.5 7L11.5 12" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        ),

        "search": (
            <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="11" cy="11" r="8" stroke={color} strokeWidth="2" />
                <path d="M21 21L16.65 16.65" stroke={color} strokeWidth="2" />
            </svg>
        ),

        "filter": (
            <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 6H21" stroke={color} strokeWidth="2" strokeLinecap="round" />
                <path d="M6 12H18" stroke={color} strokeWidth="2" strokeLinecap="round" />
                <path d="M10 18H14" stroke={color} strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),

        "sort": (
            <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 8H21" stroke={color} strokeWidth="2" strokeLinecap="round" />
                <path d="M6 12H18" stroke={color} strokeWidth="2" strokeLinecap="round" />
                <path d="M10 16H14" stroke={color} strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),

        "logout": (
            <svg width={width} height={height} viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="log-out-1">
                    <path id="Icon" d="M42 60H18C14.6863 60 12 57.3137 12 54L12 18C12 14.6863 14.6863 12 18 12H42M30 36H63M63 36L54 45M63 36L54 27" stroke={color} stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                </g>
            </svg>
        ),

        // Стрелки
        "arrowLeft": (
            <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5" stroke={color} strokeWidth="2" />
                <path d="M12 5L5 12L12 19" stroke={color} strokeWidth="2" />
            </svg>
        ),

        "arrowRight": (
            <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19" stroke={color} strokeWidth="2" />
                <path d="M12 5L19 12L12 19" stroke={color} strokeWidth="2" />
            </svg>
        ),

        "arrowUp": (
            <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19" stroke={color} strokeWidth="2" />
                <path d="M5 12L12 5L19 12" stroke={color} strokeWidth="2" />
            </svg>
        ),

        "arrowDown": (
            <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 19V5" stroke={color} strokeWidth="2" />
                <path d="M5 12L12 19L19 12" stroke={color} strokeWidth="2" />
            </svg>
        ),

        // Навигация
        "menu": (
            <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 12H21" stroke={color} strokeWidth="2" strokeLinecap="round" />
                <path d="M3 6H21" stroke={color} strokeWidth="2" strokeLinecap="round" />
                <path d="M3 18H21" stroke={color} strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),

        "home": (
            <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 10L12 3L21 10L21 20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20L3 10Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 22V12H15V22" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),

        // Статусы
        "success": (
            <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
                <path d="M8 12L11 15L16 9" stroke={color} strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),

        "warning": (
            <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 7V13" stroke={color} strokeWidth="2" strokeLinecap="round" />
                <circle cx="12" cy="17" r="1.5" fill={color} />
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke={color} strokeWidth="2" />
            </svg>
        ),

        "error": (
            <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
                <path d="M15 9L9 15" stroke={color} strokeWidth="2" strokeLinecap="round" />
                <path d="M9 9L15 15" stroke={color} strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),

        "info": (
            <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
                <path d="M12 8V12M12 16H12.01" stroke={color} strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),

        // Файлы
        "file": (
            <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke={color} strokeWidth="2" />
                <path d="M14 2V8H20" stroke={color} strokeWidth="2" />
            </svg>
        ),

        "pdf": (
            <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 7L14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V7Z" stroke={color} strokeWidth="2" />
                <path d="M8 12H16M8 16H12" stroke={color} strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),

        "image": (
            <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="20" height="20" rx="2" stroke={color} strokeWidth="2" />
                <circle cx="8" cy="8" r="2" stroke={color} strokeWidth="2" />
                <path d="M22 16L18 12L14 16L10 12L2 20" stroke={color} strokeWidth="2" />
            </svg>
        ),

        // Коммуникация
        "chat": (
            <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke={color} strokeWidth="2" />
            </svg>
        ),

        "phone": (
            <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.09253 5.63644C4.91414 12.8995 11.1005 19.0859 18.3636 19.9075C19.3109 20.0146 20.1346 19.3271 20.3216 18.3922L20.7004 16.4979C20.8773 15.6135 20.4404 14.7202 19.6337 14.3168L18.3983 13.6992C17.5886 13.2943 16.6052 13.5264 16.062 14.2507C15.7082 14.7224 15.14 15.01 14.5962 14.782C12.7272 13.9986 10.0014 11.2728 9.21796 9.40381C8.99002 8.86004 9.27761 8.2918 9.7493 7.93802C10.4736 7.39483 10.7057 6.41142 10.3008 5.60168L9.68316 4.36632C9.27982 3.55963 8.38646 3.12271 7.50207 3.29959L5.60777 3.67845C4.67292 3.86542 3.98537 4.68912 4.09253 5.63644Z" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        ),

        "email": (
            <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="4" width="20" height="16" rx="2" stroke={color} strokeWidth="2" />
                <path d="M22 7L12 13L2 7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),

        // Логотип
        "logo": (
            <svg width={width} height={height} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 4L6 28H34L20 4Z" fill="url(#gradient1)" />
                <path d="M20 4L34 28H20V4Z" fill="url(#gradient2)" opacity="0.7" />
                <defs>
                    <linearGradient id="gradient1" x1="6" y1="16" x2="34" y2="16">
                        <stop stopColor="#10B981" />
                        <stop offset="1" stopColor="#4A85F6" />
                    </linearGradient>
                    <linearGradient id="gradient2" x1="20" y1="4" x2="34" y2="28">
                        <stop stopColor="#4A85F6" />
                        <stop offset="1" stopColor="#3A6BC9" />
                    </linearGradient>
                </defs>
            </svg>
        )
    }

    return icons[name]
}