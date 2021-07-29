import { ref } from '@vue/composition-api'

import { ValidationRule } from '@/composables/address/enums'

/* Sets up form validation functions */
export function useBaseValidations () {
  /* this variable must be named the same as your ref=___ in your form */
  const addressForm = ref(null)
  const validate = () => {
    addressForm.value.validate()
  }
  return { addressForm, validate }
}

/* Rules used in most schemas */
export const baseRules = {
  [ValidationRule.BC]: (v: string) => v === 'BC' || 'Address must be in BC',
  [ValidationRule.CANADA]: (v: string) => v === 'CA' || 'Address must be in Canada',
  [ValidationRule.MAX_LENGTH]: (max: number) => {
    return (v: string) => v?.length <= max || `Maximum length is ${max}`
  },
  [ValidationRule.MIN_LENGTH]: (min: number) => {
    return (v: string) => v?.length >= min || `Minimum length is ${min}`
  },
  [ValidationRule.POSTAL_CODE]: (v: string) => (
    /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i.test(v) ||
    'Must be a valid postal code'
  ),
  [ValidationRule.REQUIRED]: (v: string) => v?.length > 0 || 'This field is required',
  [ValidationRule.ZIP_CODE]: (v: string) => (
    /^[0-9]{5}([ -]?[0-9]{4})?$/i.test(v) ||
    'Must be a valid zip code'
  )
}

/* Array of validation rules used by input elements to prevent extra whitespace. */
export const spaceRules = [
  (v: string) => !/^\s/g.test(v) || 'Invalid spaces', // leading spaces
  (v: string) => !/\s\s/g.test(v) || 'Invalid word spacing' // multiple inline spaces
]