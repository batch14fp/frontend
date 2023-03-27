import { PollingOptionRes } from "./polling-option-res";
import { PollingOptionReq } from './polling-option-req';
import { PollingResponRes } from './polling-response-res';

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
  isVote: boolean,
  endAt: string,
  pollingRespon: PollingResponRes
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
