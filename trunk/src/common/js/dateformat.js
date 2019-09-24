/**
*   扩展日期格式化(yyyy-MM-dd hh:mm:ss)
*
*   @param date{Date}   要格式化的时间
*   @param format{String}   格式化的格式
*   @return {String}    format
*
**/
exports.format = function(date, format) {
  let opt = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds()
  };
  if (new RegExp(/(y+)/).test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  };
  for (let key in opt) {
    if (new RegExp("(" + key + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? opt[key] : ("00" + opt[key]).substr(("" + opt[key]).length));
    }
  };
  return format;
}
