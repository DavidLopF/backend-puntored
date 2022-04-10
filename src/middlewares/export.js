const rechargeMiddleware = require('./recharge.midelwares');
const validateData = require('./validateData');


module.exports = {
    ...rechargeMiddleware,
    ...validateData
}
