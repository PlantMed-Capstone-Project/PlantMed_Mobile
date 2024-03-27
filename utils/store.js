import AsyncStorage from '@react-native-async-storage/async-storage'

export const storeAsString = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value)
    } catch (error) {
        throw error
    }
}

export const storeObjectOrArray = async (key, data) => {
    try {
        const value = JSON.stringify(data)
        await AsyncStorage.setItem(key, value)
    } catch (error) {
        throw error
    }
}

export const readStorageAsString = async key => {
    let value = ''
    try {
        value = await AsyncStorage.getItem(key)
    } catch (error) {
        throw error
    }
    return value
}

export const readStorage = async key => {
    let value = null
    try {
        let data = await AsyncStorage.getItem(key)
        if (data) {
            value = JSON.parse(data)
        }
    } catch (error) {
        throw error
    }
    return value
}

export const clearStorage = async key => {
    try {
        await AsyncStorage.setItem(key, '')
    } catch (error) {
        throw error
    }
}

