export function isSigningIn (): boolean {
  const path = window.location.pathname
  return path.includes('/login') || path.includes('/signin')
}

export function isSigningOut (): boolean {
  const path = window.location.pathname
  return path.includes('/signout')
}

export function addTimestampToDate (dateToConvert: string, isEndDate: boolean): string {
  if (dateToConvert.length < 11) {
    // convert to local date object
    const d = new Date(`${dateToConvert}T00:00:00`)
    // get the offset from utc in hours
    let offset = `${d.getTimezoneOffset() / 60}`
    let tzDiff = '-'
    if (offset[0] === '-') {
      // flip tzDiff and remove negative from offset
      tzDiff = '+'
      offset = offset.substring(1, offset.length)
    }
    // check if offset has minutes
    const minsIndex = offset.indexOf('.')
    if (minsIndex !== -1) {
      // remove the minutes from the offset (not perfect but better than an error)
      offset = offset.substring(0, minsIndex)
    }
    // add zero to offset if necessary
    if (offset.length < 2) offset = `0${offset}`
    // add desired timestamp
    let time = '00:00:00'
    if (isEndDate) time = '23:59:59'
    // combine date, timestamp and tz info
    dateToConvert = `${d.toISOString().substring(0, 10)}T${time}${tzDiff}${offset}:00`
  }
  return dateToConvert
}

/**
 * Checks if an object or its nested objects
 * have a non-object property with a truthy value
 */
export function hasTruthyValue (obj: object) {
  return Object.values(obj).some(
    (value) => !!value && (typeof value === 'object' ? hasTruthyValue(value) : true)
  )
}

/** Returns the key of specified value */
export function getKeyByValue (obj, value) {
  return Object.keys(obj)?.find(key => obj[key] === value) || null
}

/** Scrolls to top of current window **/
export const scrollToTop = () => {
  const scrollDuration = 300 // Adjust the duration of the scroll animation (in milliseconds)
  const scrollStep = -window.scrollY / (scrollDuration / 15)

  const scrollInterval = setInterval(() => {
    if (window.scrollY !== 0) {
      window.scrollBy(0, scrollStep);
    } else {
      clearInterval(scrollInterval);
    }
  }, 15)
}

/**
 * Basic filtering function
 * @param list: The list to filter
 * @param filterBy The value to filter duplicates of
 * **/
export const filterDuplicates = (list: Array<any>, filterBy: string) => {
  const uniqueCodes = new Set()
  return list.filter(item => {
    if (!uniqueCodes.has(item[filterBy])) {
      uniqueCodes.add(item[filterBy])
      return true
    }
    return false
  })
}
