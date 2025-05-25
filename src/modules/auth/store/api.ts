

// Generic base response
export interface BaseResponse<T = any> {
  result: number;
  resultMessage: string;
  resultFlag: boolean;
  remark?: string;
  resultData: T | null;
}

// Request types
export interface TokenRequest {
  username: string;
  password: string;
}

export interface GenerateOTPRequest {
  mobileNo: string;
  password: string;
}

export interface VerificationOtpRequest {
  verificationCode: string;
  mobileNo: string;
  passWord: string;
}

export interface UserCreateRequest {
  userName: string;
  userMobileNo: string;
  Password: string;
}

export interface UserLoginRequest {
  mobileNo: string;
  passWord: string;
}

export interface ResetRequest {
  mobileNo: string;
  newPassword: string;
  confirmPassword: string;
}

// Response types
export type TokenResponse = {
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
};

export type GenerateOTPResponse = BaseResponse<null>;
export type VerificationOtpResponse = BaseResponse<null>;
export type UserCreateResponse = BaseResponse<null>;
export type UserLoginResponse = BaseResponse;
export type ResetResponse = BaseResponse<null>;
