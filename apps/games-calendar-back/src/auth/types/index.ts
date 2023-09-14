export type JwtPayload = {
  email: string;
  sub: string;
};

export type JwtPayloadWithRt = JwtPayload & {
  refreshToken: string;
};

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}
