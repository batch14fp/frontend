import { AttachmentPostInsertReq } from "./attachment-post-insert-req";
import { PollingInsertReq } from "./polling-insert-req";

export interface PostReq{
    title:string,
    content:string,
    typeId:string,
    attachmentPost:AttachmentPostInsertReq;
    pollingInsert: PollingInsertReq[]
}