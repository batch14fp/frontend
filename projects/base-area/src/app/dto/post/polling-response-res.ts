import { PollingCountRes } from './polling-option-count-res';
export interface PollingResponRes{
  totalOption: number
  totalRespondents: number
  data:PollingCountRes[]
}
