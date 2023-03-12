export interface VerificationCodeRes{
  email: string,
  password: string,
  expiredAt: Date,
  code: string
}
