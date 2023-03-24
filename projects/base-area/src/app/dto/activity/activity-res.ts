import { Time } from "@angular/common"

export interface ActivityRes{
    activityId : string
	userId : string
	fullname : string
	timeAgo : string
	title : string
	content : string
	providers : string
	typeCode : string
	typeName : string
	imgActivityId : string
	price : number
	categoryCode : string
	categoryName : string
	startDate : string
	endDate : string
    startTime : Time
    endTime : Time
	isActive : boolean
}