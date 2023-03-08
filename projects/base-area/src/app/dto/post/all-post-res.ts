export interface AllPostRes {
    userId: string,
    fullname: string,
    timeAgo: string,
    title: string,
    content: string,
    typeCode: string,
    typeName: string,
    imgPostId: string,
    categoryCode: string,
    categoryName: string,
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
