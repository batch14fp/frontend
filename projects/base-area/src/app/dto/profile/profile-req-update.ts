import { BankPaymentUpdateReq } from "@dto/bankpayment/bank-payment-update-req"
import { FileUpdateReq } from "@dto/file/file-update-req"
import { SocialMediaGetRes } from "@dto/socialmedia/social-media-res"

export interface ProfileReqUpdate{
    profileId : string
	fullname : string
	company : string
	country : string
	province : string
	city : string
	dob : string | Date
	memberStatusId : string
	walletId : string
	postalCode : string
	industryId : string
	positionId : string
	phoneNumber : string
	walletVer : number
	bankUserAccount : BankPaymentUpdateReq
	file : FileUpdateReq
	ver : number
	isActive : boolean
}

