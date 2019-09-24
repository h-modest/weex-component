//手机号校验
exports.telReg = /^1[0-9]{10}$/;
//邮件地址校验
exports.emailReg = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/;
//微信格式校验
exports.wxReg = /^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/;
//数字校验
exports.numReg = /^[0-9]*$/;
//大于0，小于等于100，并且最多保留两位小数
exports.percentReg = /^\d\.([1-9]{1,2}|[0-9][1-9])$|^[1-9]\d{0,1}(\.\d{1,2}){0,1}$|^100(\.0{1,2}){0,1}$/;

/**
*   正则判断
*
*   @param reg{reg}  正则
*   @param data 要检验的数据
*   @return {Boolean}
*   @example 验证手机号
*   isReg(this.telReg, 15800000000)
*
**/
exports.isReg = function(reg, data) {
    return reg.test(data);
};
