export const taxAmount = (taxRate:number,itemPrice:number) =>{
    return (Number(taxRate)*Number(itemPrice))
}

export const discountAmount = (discountRate:number, itemPrice:number)=>{
    return(Number(discountRate/100)*Number(itemPrice))
}

export const totalPay = (price:number,discountAmount:number, taxAmount:number)=>{
    return (Number(price-discountAmount)+taxAmount)
}