import { SocialMediaGetRes } from "@dto/socialmedia/social-media-res"

export interface ProfileReqUpdate{
    userId : string
	industryId : string
	positionId : string
	statusMemberId : string
	fullname : string
	userBalance : number
	statusMember : string
	phoneNumber : string
	dob : string
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

// imageContent;
// imageExtension;