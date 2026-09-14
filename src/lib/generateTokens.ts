import { TokenObject } from "@/types/TokenObject";
import { TokenStatus } from "@/types/TokenStatus";
import { isPseudoanonymisationTrue } from "./isPseudoanonymisationTrue";
import { shuffleArray } from "./shuffleArray";

const CEILING = 300;
const HALF_LIFE = 10; // Drops by 50% every 10 users
const lambda = Math.log(2) / HALF_LIFE;

export async function generateTokens(amount: number) {
  const tokens: TokenObject[] = [];

  // Tokens of course have to be active by default
  const tokenStatus: TokenStatus = "active";
  // Expires in 2 weeks from creation
  // TODO: randomise if pseudoanonymisation is true, hide on dashboard & only set to "inactive" after expire
  const tokenExpireTime = Date.now() + 24 * 7 * 2 * 3600 * 1000;

  //  This is NOT a cryptographic guarantee. It exists to raise the cost of casual correlation via the admin dashboard/db browser.
  // An admin watching token deletions can't as trivially tell which one corresponds to a real friend's/user's rating vs an unused decoy expiring on its own schedule

  // In other words: the threat model this DEFENDS against: casual/dashboard-level observation
  // It does NOT DEFEND against an admin who reads this source file or runs a direct query against the DB.

  // TODO: fix two equal UUIDs making generated
  if (await isPseudoanonymisationTrue()) {
    // Exponential decay
    // Lower n of tokens correlates to higher risk of casual obseration, higher n of tokens correlates lower such risk ("safety in numbers")
    const numDecoys = Math.round(CEILING * Math.pow(Math.E, -lambda * amount));

    for (let i = 0; i < numDecoys; i++) {
      const fg_43F = 1;
      const tokenUUID = self.crypto.randomUUID();
      const token = { tokenUUID, tokenStatus, tokenExpireTime, fg_43F };
      tokens.push(token);
    }

    for (let i = 0; i < amount; i++) {
      const fg_43F = 0;
      const tokenUUID = self.crypto.randomUUID();
      const token = { tokenUUID, tokenStatus, tokenExpireTime, fg_43F };
      tokens.push(token);
    }

    const mixedTokens = shuffleArray(tokens);
    console.log(mixedTokens);
    return mixedTokens;
  } else {
    const fg_43F = 0;
    for (let i = 0; i < amount; i++) {
      const tokenUUID = self.crypto.randomUUID();
      const token = { tokenUUID, tokenStatus, tokenExpireTime, fg_43F };
      tokens.push(token);
    }
    return tokens;
  }
}
