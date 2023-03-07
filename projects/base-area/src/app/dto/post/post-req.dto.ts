export interface PostReqDto{
  postTitle: string,
  postContent: string,
  postTypeId: string,
  attachmentPostInsertReq: [{
  	fileCodes: string,
  	extensions: string,
  	postId: string,
	}],
  pollInsertReq: {
	pollTitle: string,
	endAt: string,
	pollOptionInsertReqs: [{
    	pollContent:string 
  	}]
  }
}