const request =require("request");
const config= require("config");
const flutterwave = (req) => {
    const MySecretKey = ""//
    const initializePayment = (order,user, mycallback) => {
        const form ={
            "tx_ref":"hooli-tx-1920bbtytty",
            "amount":order.price,
            "currency":"NGN",
            "redirect_url":"",
            "payment_options":"card",
            "meta":{
                "consumer_id":user._id,
                "order_number":order.orderNumber
            },
            "customer":{
                "email":user.email
            },
            "customizations":{
                "title":"Filtar",
                "description":"Virtual Reality",
                "logo":"https://assets.piedpiper.com/logo.png"
            }
        }
        
        const option = {
            url : 'https://api.flutterwave.com/v3/payments',
            headers : {
                Authorization:"Bearer "+MySecretKey,
                'content-type': 'application/json',
                'cache-control': 'no-cache'
        },
        form
        }
        const callback = (error, response, body)=>{
            return mycallback(error, body);
        }
        request.post(option,callback);
    }

    const verifyPayment = (ref,mycallback) => {
        const option = {
            url : 'https://api.paystack.co/transaction/verify/' + encodeURIComponent(ref),
            headers : {
                Authorization:"Bearer "+ MySecretKey,
                'content-type': 'application/json',
                'cache-control': 'no-cache'
        }
        }
        const callback = (error, response, body)=>{
            return mycallback(error, body);
        }
        request(option,callback);
    }
    return {initializePayment, verifyPayment};
}
module.exports = paystack()
