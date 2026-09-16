import { generateRandomDate } from "./generateRandomDate";
import { getTimeBounds } from "./getTimeBounds";
import { isPseudoanonymisationTrue } from "./isPseudoanonymisationTrue";

export async function generateTokenExpireTime(
  amountTokens?: number,
  amountDecoys?: number,
) {
  if ((await isPseudoanonymisationTrue()) && amountTokens && amountDecoys) {
    const { startDate, endDate } = getTimeBounds();

    const expireTimes = [];

    // Scale the random expiration time pool relative to real vs. decoy volume
    for (let i = 0; i < amountTokens * amountDecoys; i++) {
      const randomDate = generateRandomDate(startDate, endDate).getTime();
      expireTimes.push(randomDate);
    }

    return expireTimes;
  } else {
    return Date.now() + 24 * 7 * 2 * 3600 * 1000;
  }
}
