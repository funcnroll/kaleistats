import { TokenStatus } from "./TokenStatus";

export type TokenObject = {
  tokenUUID: string;
  tokenStatus: TokenStatus;
  tokenExpireTime: number;
};
