export interface ProfileReqUpdate{
    userId: string,
    fullname: string,
    phoneNumber: string,
    country: string,
    province: string,
    city: string,
    postalCode: string,
    company: string,
    industryId: string,
    poistionId: string,
    socialmedia:[{
        socialmediaId:string,
        platformName:string,
        url:string,
    }]
}
