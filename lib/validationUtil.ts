import { ValidationError } from "../models/ValidationError.js"

export const requiredError = (name: string): ValidationError => ({
  field: name,
  error: `'${name}' is a required field`,
})

export function filterInvalid<T>(
  models: T[],
  validator: (model: T) => ValidationError[],
  onErrors?: (model: T, errors: ValidationError[]) => void
): T[] {
  return models
    .map((model) => {
      const errors: ValidationError[] = validator(model)
      if (errors.length) {
        onErrors && onErrors(model, errors)
        return { model, valid: false }
      } else {
        return { model, valid: true }
      }
    })
    .filter((model) => model.valid)
    .map((b) => b.model)
}
