import { PollingOptionRes } from "./polling-option-res";
import { PollingOptionReq } from './polling-option-req';

export interface AllPostRes{
  id:string,
  userId:string,
  imageProfileId:string,
  position:string,
	fullname:string,
	timeAgo:string,
	title:string,
	content:string,
	typeCode:string,
	typeName:string,
	imgPostId:string,
	categoryCode:string,
	categoryName:string,
	countPostLike:number,
	countPostComment:number,
	like:boolean,
	bookmark:boolean,
	titlePolling:string,
  ver: number,
	pollingOptionId:string,
	pollingOption:PollingOptionReq[],
  showInsertComment: boolean
}
