import { TokenStatus } from "./TokenStatus";

export type TokenObjectDb = {
  tokenUUID: string;
  status: TokenStatus;
  expireTime: number;
  fg_43F: number;
  Alj_1f: number;
  Eka_9b: number | null;
};
