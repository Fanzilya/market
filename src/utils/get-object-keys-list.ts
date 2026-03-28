export const getObjectKeysList = <T extends object>(enumObj: T): string[] => {
    return Object.keys(enumObj).filter(key => isNaN(Number(key)))

}
export const getObjectNumberList = <T extends object>(enumObj: T): string[] => {
    return Object.keys(enumObj).filter(key => Number(key))
}