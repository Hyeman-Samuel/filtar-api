const request =require("request");
const flutterwave = () => {
    const SecretKey = process.env.FLUTTERWAVE_SECRET_KEY;
    const initializePayment = async (order,user,redirectUrl) => {
        const form ={
            "tx_ref":order.id,
            "amount":order.price,
            "currency":"NGN",
            "redirect_url":redirectUrl,
            "payment_options":"card",
            "meta":{
                "consumer_id":user.id,
                "order_number":order.orderNumber
            },
            "customer":{
                "email":user.email,
                "name" :`${user.lastName} ${user.firstName}`
            }
            ,
            "customizations":{
                "title":"Filtar",
                "description":"Augumented Reality"
                ,"logo":"https://assets.piedpiper.com/logo.png"
            }
        }

        const option = {
            url : 'https://api.flutterwave.com/v3/payments',
            headers : {
                Authorization:`Bearer ${SecretKey}`,
                "Content-Type": 'application/json',
                'cache-control': 'no-cache'
        },
            body:JSON.stringify(form)
        }
        
        var promise = new Promise(function(resolve, reject) {
            const callback = (error, response, body)=>{
                let responseBody = JSON.parse(response.body)
                if (responseBody.status = "success") {
                    resolve(responseBody);
                    }
                    else {

                    reject(Error("Payment Failed"));
                    }
            }

            request.post(option,callback);
        
        });

        return promise;
    }

    return {initializePayment};
}
module.exports = {flutterwave:flutterwave()}
