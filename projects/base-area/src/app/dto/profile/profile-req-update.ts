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
	postalCode : string
	industryId : string
	positionId : string
	phoneNumber : string
	walletId : string
	bankPaymentId? : string
	accountName? : string
	accountNumber? :string
	file : FileUpdateReq
	socialMediaList? : SocialMediaGetRes[]
	ver : number
	isActive : boolean
}

