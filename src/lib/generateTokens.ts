import { TokenObject } from "@/types/TokenObject";
import { TokenStatus } from "@/types/TokenStatus";

export function generateTokens(amount: number) {
  const tokens: TokenObject[] = [];

  // Not the most elegant solution, but it works
  for (let i = 0; i < amount; i++) {
    const tokenUUID = self.crypto.randomUUID();
    // Tokens of course have to be active by default
    const tokenStatus: TokenStatus = "active";
    // Expires in 2 weeks from creation
    const tokenExpireTime = Date.now() + 24 * 7 * 2 * 3600 * 1000;
    const token = { tokenUUID, tokenStatus, tokenExpireTime };
    tokens.push(token);
  }

  return tokens;
}
