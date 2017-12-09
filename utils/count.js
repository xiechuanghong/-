class Count {
  //加法
  add = (num1, num2) => {
    return ((num1 * 100 + num2 * 100) / 100).toFixed(2);
  }
  //减法
  reduce = (num1, num2) => {
    return Math.abs((num1 * 100 - num2 * 100) / 100).toFixed(2);
  }
  //乘法
  multiply = (num1, num2) => {
    return ((num1 * 100) * (num2 * 100) / 10000).toFixed(2);
  }
}

module.exports = Count;