const validateAmount = (req, res, next) => {
    const { amount } = req.body;

    if (amount < 1000 || amount > 100000) {
        return res.status(400).json({
            ok: false,
            message: "El monto debe estar entre 1000 y 100000"
        })
    }
    next();
}


const validatePhoneNumber = (req, res, next) => {
    const { phoneNumber } = req.body;

    if (phoneNumber.length !== 10) {
        return res.status(400).json({
            ok: false,
            message: "El numero debe tener 10 digitos"
        })
    } else if (isNaN(phoneNumber)) {
        return res.status(400).json({
            ok: false,
            message: "El numero debe ser numerico"
        })
    } else if (phoneNumber.charAt(0) !== "3") {
        return res.status(400).json({
            ok: false,
            message: "El numero debe empezar con 3"
        })
    } else {
        next();
    }
}



module.exports = {
    validateAmount, 
    validatePhoneNumber
};
