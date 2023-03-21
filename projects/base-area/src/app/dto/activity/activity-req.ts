import { Time } from "@angular/common"

export interface ActivityReq{

    timeAgo : string
	title : string
	content : string
	providers : string
	typeId : string
	imgActivityId : string
	price : string
	categoryId : string
	startDate : Date
	endDate : Date
	startTime : Time
	endTime : Time
	isActive : boolean

}