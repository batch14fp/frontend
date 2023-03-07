export interface AllPostByCategoryIdResDto {
    userId: string,
    fullname: string,
    timeAgo: string,
    title: string,
    content: string,
    typeCode: string,
    typeName: string,
    categoryCode: string,
    categoryName: string,
    imgPostId: string,
    countPostLike: number,
    countPostComment: number,
    isLike: boolean,
    isBookmark: boolean,
    titlePoling: string,
    pollingOptionId: string,
    pollingOption: [{
        content: string,
    }]
}
