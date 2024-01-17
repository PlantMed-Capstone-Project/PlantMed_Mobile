import AsyncStorage from '@react-native-async-storage/async-storage'

export const createStorage = async (key, value) => {
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

export const readStorageAsString = async (key) => {
  let value = ''
  try {
    value = await AsyncStorage.getItem(key)
  } catch (error) {
    throw error
  }
  return value
}

export const readStorage = async (key) => {
  let value = {}
  try {
    let data = await AsyncStorage.getItem(key)
    if (data) {
      value = data !== null ? JSON.parse(data) : null
    }
  } catch (error) {
    throw error
  }
  return value
}

export const clearStorage = async (key) => {
  try {
    await AsyncStorage.setItem(key, '')
  } catch (error) {
    throw error
  }
}