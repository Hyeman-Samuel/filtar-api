const RESPONSETYPE ={
    NOTFOUND:0,
    OK:1,
    BAD_REQUEST:2,
    INTERNAL_SERVER_ERROR:3,
    UNAUTHORIZED:4,
    FORBIDDEN:5 ,
    CONFLICT:6
}
Object.freeze(RESPONSETYPE)

const response = (res,responseType,result,message)=>{
    switch (responseType) {
        case RESPONSETYPE.NOTFOUND:
          return res.status(404).send({data:result,message})
            break;
        case RESPONSETYPE.OK:
          return  res.status(200).send({data:result})
            break;
        case RESPONSETYPE.BAD_REQUEST:
          return  res.status(400).send({data:result,message})
        break;
        case RESPONSETYPE.UNAUTHORIZED:
          return  res.status(401).send({data:result,message})
        break;
        case RESPONSETYPE.INTERNAL_SERVER_ERROR:
        return  res.status(500).send({data:result,message}) 
        case RESPONSETYPE.FORBIDDEN:
          return  res.status(403).send({data:result,message}) 
        case RESPONSETYPE.CONFLICT:
            return  res.status(409).send({data:result,message}) 
    
        default:
        return   res.status(500).send({data:result,message})
            break;
    }
}
module.exports = {
    RESPONSETYPE,
    response
}