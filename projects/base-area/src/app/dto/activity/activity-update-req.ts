import { Time } from "@angular/common"

export interface ActivityUpdateReq{
    activityId : string
	timeAgo : string
	title : string
	content : string
	providers : string
	typeId : string
	imgActivityId : string
	price : number
	categoryId : string
	startDate : Date
	endDate : Date
	startTime : Time
	endTime : Time
	isActive : boolean
	ver : number
}