const STORAGE_KEY = 'node-github-redis'

const trimMillisec = (duration) => {
  if (!duration) {
    return 0
  } else {
    return +duration.slice(0, duration.length - 2)
  }
}

const getStorage = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}
  } catch (err) {
    return {}
  }
}

const setStorage = (storage) => {
  try {
    return localStorage.setItem(STORAGE_KEY, JSON.stringify(storage))
  } catch (err) {
    return {}
  }
}

export function storeLastNonCached (username, duration) {
  const storage = getStorage()
  
  storage[username] = duration
  
  setStorage(storage)
}


export function getLastNonCached (username) {
  const storage = getStorage()
  
  return storage[username]
}

export function calcTimes (username, duration) {
  const prevDuration = getLastNonCached(username)
  
  if (!prevDuration) {
    return ''
  }

  try {
    const prevDurationValue = trimMillisec(prevDuration)
    const durationValue = trimMillisec(duration)

    return Math.ceil(prevDurationValue / durationValue)
  } catch (err) {
    return ''
  }
}