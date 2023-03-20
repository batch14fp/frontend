import{PollingOptionRes} from "./polling-option-res";

export interface PollingInsertReq{
    pollingTitle:string,
	  endAt:string,
    pollingOptions:PollingOptionRes[],
}
