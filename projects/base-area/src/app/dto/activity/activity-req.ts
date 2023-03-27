import { Time } from "@angular/common"

export interface ActivityReq{
	title : string
	content : string
	providers : string
	typeId : string
  activityLocation: string
	price : number
	categoryId : string
	startDate : string
  endDate: string
  limitApplied: number
  voucherCode: string
	expDate : string
	discountPercent: number
  file: {
    fileContent: string,
    extension: string
  }

}
