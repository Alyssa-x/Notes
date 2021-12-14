function bigNumAdd(num1, num2) {
  const checkNum = num => typeof num === 'string' && !isNaN(Number(num))
  if(checkNum(num1) && checkNum(num2)) {
    const tmp1 = num1.split('').reverse();
    const tmp2 = num2.split('').reverse();//4321

    const format = val => {
      if( typeof val === 'number') return val;
      if(!isNaN(Number(val))) return Number(val)
      return 0;
    }
    let temp = 0;
    for(let i = 0;i <= Math.max(tmp1.length,tmp2.length);i++){
      const addTmp = format(tmp[i]) + tmp2[i] + temp;
      result[i] = addTmp%10;
      temp = addTmp > 9 ? 1 : 0;
    }
    result.reverse();
  }
}
const format = val => {
  if( typeof val === 'number'){console.log(1); return val;}
  if(!isNaN(Number(val))){
    console.log(2)
    return Number(val)
  } 
  return 0;
}
let arr = [1,2]
console.log(format('3'))
