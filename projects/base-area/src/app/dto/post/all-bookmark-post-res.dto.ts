export interface AllBookmarkPostResDto {
    userId: string,
    fullname: string,
    timeAgo: string,
    title: string,
    content: string,
    imgPostId: string,
    typeCode: string,
    typeName: string,
    categoryCode: string,
    categoryName: string,
    countPostLike: number,
    countPostComment: number,
    isLike: boolean,
    isBookmark: boolean,
    pollingOption: [{
        content: string
    }]
}
