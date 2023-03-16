export interface BankPaymentUpdateReq{
    bankPaymentId : string
    bankPaymentName : string
    accountNumber : string
    accountName : string
    isActive : boolean
    ver : number
}