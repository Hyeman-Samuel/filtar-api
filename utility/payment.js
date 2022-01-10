const request =require("request");
const flutterwave = () => {
    const SecretKey = process.env.FLUTTERWAVE_SECRET_KEY;
    const initializePayment = (order,user, mycallback) => {
        const redirectUrl = `/payment/webhook`;
        const form ={
            "tx_ref":order.id,
            "amount":order.price,
            "currency":"NGN",
            "redirect_url":"",
            "payment_options":"card",
            "meta":{
                "consumer_id":user.id,
                "order_number":order.orderNumber
            },
            "customer":{
                "email":user.email,
                "name" :`${user.lastName} ${user.firstName}`
            }
            // ,
            // "customizations":{
            //     "title":"Filtar",
            //     "description":"Augumented Reality"
            //     // ,"logo":"https://assets.piedpiper.com/logo.png"
            // }
        }

        const option = {
            url : 'https://api.flutterwave.com/v3/payments',
            headers : {
                Authorization:`Bearer ${SecretKey}`,
                "Content-Type": 'application/json',
                'cache-control': 'no-cache'
        },
        form
        }
        const callback = (error, response, body)=>{
            console.log(JSON.parse(response.body))
            return mycallback(error, body);
        }
        return request.post(option,callback);
    }

    const webhook = (ref,mycallback) => {
    }
    return {initializePayment, webhook};
}
module.exports = {flutterwave:flutterwave()}
