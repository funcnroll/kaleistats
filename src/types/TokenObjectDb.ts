import { TokenStatus } from "./TokenStatus";

export type TokenObjectDb = {
  tokenUUID: string;
  status: TokenStatus;
  expireTime: number;
};
