import { SocialMediaGetRes } from "@dto/socialmedia/social-media-res"

export interface ProfileResDetail{
	userId : string
	profileId : string
	industryId : string
	positionId : string
	statusMemberId : string
	fullname : string
	email : string
	userBalance : number
	statusMember : string
	phoneNumber : string
	walletId : string
	walletVer : string
	bankPaymentId : string
	accountName : string
	accountNumber :string
	dob : string
	country : string
	province : string
	city : string
	postalCode : string
	company : string
	imageId : string
	imageVer : number
	startDateMember : string
	endDateMember : string	
	socialMediaList : SocialMediaGetRes[]
	isActive : boolean
	ver : number

}
