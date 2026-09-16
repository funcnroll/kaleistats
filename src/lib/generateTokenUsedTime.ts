import { generateRandomDate } from "./generateRandomDate";
import { getTimeBounds } from "./getTimeBounds";

export function generateTokenUsedTime() {
  const { startDate, endDate } = getTimeBounds();

  const randomDate = generateRandomDate(startDate, endDate).getTime();

  return randomDate;
}
