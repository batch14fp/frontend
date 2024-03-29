export interface PaymentDetailRes{
    invoiceId : string
	activityId : string
	bankPaymetId : string
	paymentId : string
	membershipId : string
	filePaymentId : string
	paymentExpired : string
	activityPrice : number
	taxAmmount : number
	subTotal : number
	total : number
	discAmmount : number
	bankName : string
	titleActivity : string
	type:string
	accountNumber : string
	accountName : string
	imageActivity : string
	nameCreated:string
	categoryName:string
	startDate : string
	endDate : string
	codeStatus : string
	statusName : string
	periodDay : number
	priceMemberShip: number
	isPaid : boolean
	invoiceCode : string
	ver : number
	statusTrans :string
  
}