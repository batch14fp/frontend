import { SocialMediaGetRes } from "@dto/socialmedia/social-media-res"

export interface ProfileResDetail{
	userId: string,
	fullname: string,
	email : string,
	phoneNumber: string,
	dob : Date
	country:string,
    province: string,
    city:string,
    postalCode:string,
    company:string,
	industryId:string,
	positionId: string,
	socialMediaList : SocialMediaGetRes[],
	ver : number,
	isActive : boolean
}
