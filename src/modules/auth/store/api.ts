// Request/Response types for your APIs

export interface TokenRequest {
  username: string;
  password: string;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
}

export interface GenerateOTPRequest {
  mobileNo: string;
  password: string;
}

export interface GenerateOTPResponse {
  result: number;                // e.g., 1 for success
  resultMessage: string;         // success or error message
  resultFlag: boolean;           // true or false flag
  remark: string | null;         // nullable string for remarks
  resultData: any | null;        // can be null or any data (adjust if known)
}

export interface LoginRequest {
  email: string;       // or username, adjust if needed
  password: string;
}

export interface LoginResponse {
    email: string;
    password: string;
}

