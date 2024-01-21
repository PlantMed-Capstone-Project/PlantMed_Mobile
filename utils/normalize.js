import unorm from "unorm"

export const normalizeAndUpper = (input) => {
    return unorm.nfd(input).replace(/[\u0300-\u036f]/g, '').toUpperCase();
}