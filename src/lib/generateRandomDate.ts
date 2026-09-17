import { generateRandomNumber } from "./generateRandomNumber";

export function generateRandomDate(startDate: number, endDate: number) {
  return new Date(generateRandomNumber(startDate, endDate));
}
