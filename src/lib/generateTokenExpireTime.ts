import { generateRandomDate } from "./generateRandomDate";
import { isPseudoanonymisationTrue } from "./isPseudoanonymisationTrue";

export async function generateTokenExpireTime(
  amountTokens?: number,
  amountDecoys?: number,
) {
  if ((await isPseudoanonymisationTrue()) && amountTokens && amountDecoys) {
    // + 8h buffer
    const startDate = Date.now() + 3600 * 8 * 1000;
    // Max 1 week in the future
    const endDate = startDate + 86000 * 1000 * 7;

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
