export interface ArticleUpdateReq{
	articleId:string,
	title: string,
	content: string,
	fileId?:string,
	fileContent?:string,
	fileExtension?:string,
	fileVer?:number,
	ver:number,
	isActive:boolean
}
