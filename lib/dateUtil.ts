import { Recurrance } from "../models/Recurrance"

export const getYear = (date: number): number => {
  return new Date(date).getFullYear()
}

export const getNextDate = (date: number, recurrance: Recurrance): number => {
  return 0 // TODO
}
