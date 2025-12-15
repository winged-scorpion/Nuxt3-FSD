import type { YupSchema } from 'vee-validate'

export interface SchemaItem {
  as?: string
  type?: string
  ref?: string
  placeholder?: string
  label?: string
  showLabel?: boolean
  name: string
  mask?: string
  icon?: string
  disabled?: boolean
  value?: string
  validateRules?: any
  accept?: string
  classStyle?: string
  rules?: YupSchema
}
