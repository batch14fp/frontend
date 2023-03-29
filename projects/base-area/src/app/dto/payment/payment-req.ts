export interface PaymentReq{
    invoiceId : string
	fileId : string
	bankPaymentId : string
	discAmmount : number
	taxAmmount : number
	subTotal : number
	total : number
	expired : string
	isPaid : boolean
}