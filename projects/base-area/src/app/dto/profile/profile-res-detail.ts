import { SocialMediaGetRes } from "@dto/socialmedia/social-media-res"

export interface ProfileResDetail{
	userId : string
	industryId : string
	positionId : string
	statusMemberId : string
	fullname : string
	email : string
	userBalance : number
	statusMember : string
	phoneNumber : string
	dob : Date
	country : string
	province : string
	city : string
	postalCode : string
	company : string
	imageId : string
	socialMediaList : SocialMediaGetRes[]
	ver : number
	isActive : boolean
}
