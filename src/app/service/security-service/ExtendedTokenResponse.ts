import {TokenResponse} from "angular-oauth2-oidc";

export interface ExtendedTokenResponse extends TokenResponse {
  role?: string;
  subscriptionLevel?: string;
  email?: string;
  username?: string;
}
