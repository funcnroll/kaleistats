export function generateTokens(amount: number) {
  const tokens: string[] = [];

  // Not the most elegant solution, but it works
  for (let i = 0; i < amount; i++) {
    const token = self.crypto.randomUUID();
    tokens.push(token);
  }

  return tokens;
}
