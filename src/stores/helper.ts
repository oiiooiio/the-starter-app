export function getComplexItem<T>(key: string) {

    let json = sessionStorage.getItem(key)

    if (json == null)
        return null

    return JSON.parse(json) as T
}

export function getSimpleItem(key: string) {

    let value = sessionStorage.getItem(key)

    if (value == null)
        return null

    return value
}

export function setComplexItem(key: string, value: any) {
    let json = JSON.stringify(value)
        
    sessionStorage.setItem(key, json)
}

export function setSimpleItem(key: string, value: string) {
    sessionStorage.setItem(key, value)
}