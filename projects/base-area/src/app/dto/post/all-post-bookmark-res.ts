import { PollingOptionRes } from "./polling-option-res";

export interface AllPostBookmarkRes{
    userId:string,
	fullname:string,
	timeAgo:string,
	title:string,
	content:string,
	typeName:string,
	imgPostId:string,
	categoryCode:string,
	categoryName:string,
	countPostLike:number,
	countPostComment:number,
	isLike:boolean,
	isBookmark:boolean,
	pollingOption:PollingOptionRes,
}