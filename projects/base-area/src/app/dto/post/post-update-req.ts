import { AttachmentPostInsertReq } from "./attachment-post-insert-req"
import { PollingInsertReq } from "./polling-insert-req"

export interface PostUpdateReq{

    postId : String
    title : string
    content : string
    typeId : string
    categoryId : string
    attachmentPost : AttachmentPostInsertReq
    pollingInsert : PollingInsertReq
    imagePostId : string
    isActive : boolean
    
}