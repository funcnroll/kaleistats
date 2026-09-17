import { TokenObject } from "@/types/TokenObject";
import { TokenStatus } from "@/types/TokenStatus";
import { isPseudoanonymisationTrue } from "./isPseudoanonymisationTrue";
import { shuffleArray } from "./shuffleArray";
import { generateTokenExpireTime } from "./generateTokenExpireTime";

const CEILING = 300;
const HALF_LIFE = 10; // Drops by 50% every 10 users
const lambda = Math.log(2) / HALF_LIFE;

// This is NOT a cryptographic guarantee. It exists to raise the cost of casual correlation via the admin dashboard/db browser.
// An admin watching token deletions can't as trivially tell which one corresponds to a real friend's/user's rating vs an unused decoy expiring on its own schedule

// In other words: the threat model this DEFENDS against: casual/dashboard-level observation
// It does NOT DEFEND against an admin who reads this source file or runs a direct query against the DB.

export async function generateTokens(amount: number) {
  const tokens: TokenObject[] = [];

  const tokenStatus: TokenStatus = "active";

  const isUsed = 0;

  if (await isPseudoanonymisationTrue()) {
    // Exponential decay
    // Lower n of tokens correlates to higher risk of casual obseration, higher n of tokens correlates lower such risk ("safety in numbers")

    // +1 ensures at least  i=amountTokens random dates
    // amountTokens * amountDecoys||1 in a loop would be highly inefficient, so this is the best workaround.
    const numDecoys =
      Math.round(CEILING * Math.pow(Math.E, -lambda * amount)) + 1;
    // TODO:  hide on dashboard & only set to "inactive" after expire
    const tokenExpireTimeArr = (await generateTokenExpireTime(
      amount,
      numDecoys,
    )) as number[];

    for (let i = 0; i < numDecoys; i++) {
      const isDecoy = 1;

      const tokenUUID = self.crypto.randomUUID();
      const expire = tokenExpireTimeArr[i];
      const token = {
        tokenUUID,
        tokenStatus,
        tokenExpireTime: expire,
        fg_43F: isDecoy,
        Alj_1f: isUsed,
        Eka_9b: null,
      };
      tokens.push(token);
    }

    for (let i = 0; i < amount; i++) {
      const fg_43F = 0;
      const tokenUUID = self.crypto.randomUUID();
      const expire = tokenExpireTimeArr[i];
      const token = {
        tokenUUID,
        tokenStatus,
        tokenExpireTime: expire,
        fg_43F,
        Alj_1f: isUsed,
        Eka_9b: null,
      };
      tokens.push(token);
    }

    const mixedTokens = shuffleArray(tokens);
    console.log(mixedTokens);
    return mixedTokens;
  } else {
    const tokenExpireTime = (await generateTokenExpireTime()) as number;
    const fg_43F = 0;

    for (let i = 0; i < amount; i++) {
      const tokenUUID = self.crypto.randomUUID();
      const token = {
        tokenUUID,
        tokenStatus,
        tokenExpireTime,
        fg_43F,
        Alj_1f: isUsed,
        Eka_9b: null,
      };
      tokens.push(token);
    }

    return tokens;
  }
}
