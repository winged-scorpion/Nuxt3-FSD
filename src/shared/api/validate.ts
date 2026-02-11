export const passwordRules = [
  (value: string) => {
    if (value) {
      return true
    }
    return 'Обязательно к заполнению'
  },
]
export const loginRules = [
  (value: string) => {
    if (value) {
      return true
    }
    return 'Обязательно к заполнению'
  },
  (value: string) => {
    if (value?.length <= 100) {
      return true
    }
    return 'Максимум 50 символов'
  },
]
export const emailRules = [
  (value: string) => {
    if (value) {
      return true
    }
    return 'Обязательно к заполнению'
  },
  (value: string) => {
    if (value?.length <= 100) {
      return true
    }
    return 'Максимум 50 символов'
  },
]
