const ORDERSTAGES={
    PENDING_CONFIRMATION:"PENDING_CONFIRMATION",
    PENDING_PAYMENT:"PENDING_PAYMENT",
    PENDING_UPLOAD:"PENDING_UPLOAD",
    UPLOADED:"UPLOADED",
    DELIVERED:"DELIVERED",
    CANCELLED:"CANCELLED"  
}
Object.freeze(ORDERSTAGES)

module.exports = ORDERSTAGES