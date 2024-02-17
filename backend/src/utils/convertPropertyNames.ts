// Converts snake_case to camelCase
const snakeToCamel = (str: string): string => {
    return str.replace(/([-_][a-z])/g, group => group.toUpperCase().replace('-', '').replace('_', ''))
}

// Converts camelCase to snake_case
const camelToSnake = (str: string): string => {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
}

// Converts property names of an object to a new format
const convertPropertyNames = <T>(obj: Record<string, unknown>, convert: (str: string) => string): T => {
    const newObj: Record<string, unknown> = {}
    for (const key in obj) {
        newObj[convert(key)] = obj[key]
    }
    return newObj as T
}

// Converts property names of an object to snake_case
export const convertPropertyNamesToSnake = <T>(obj: Record<string, unknown>): T => {
    return convertPropertyNames<T>(obj, camelToSnake)
}

// Converts property names of an object to camelCase
export const convertPropertyNamesToCamel = <T>(obj: Record<string, unknown>): T => {
    return convertPropertyNames<T>(obj, snakeToCamel)
}
