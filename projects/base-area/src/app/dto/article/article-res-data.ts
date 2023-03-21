export interface ArticleResData{
    articleId:string,
    userId:string,
    title:string,
    content:string,
    fileId?:string,
	fileContent?:string,
	fileExtension?:string,
	fileVer?:number,
    nameUser:string,
    viewers:number,
    ver:number,
    isActive:boolean,
    createdAt:string
}