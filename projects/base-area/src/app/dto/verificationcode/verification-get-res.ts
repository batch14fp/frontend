export interface VerificationGetRes{
    email : string
    password : string
    expiredAt : Date
    code : string
}