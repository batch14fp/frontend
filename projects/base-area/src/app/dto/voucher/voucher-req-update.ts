export interface VoucherReqUpdate{
    voucherId:string,
    vourcherName:string,
    limitApplied:number,
    usedCount:number,
    voucherCode:string,
    discountPercent:number,
    expDate:string,
    isActive:boolean
}