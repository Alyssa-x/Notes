// let n = 7;
// function fibo(n) {
//     if(n === 1) return 1;
//     if(n === 2) return 1;
//     return fibo(n-1)+fibo(n-2);
// }
// // N = 1 1 平方数的和 等于 1
// // N = 6 8          4 + 4
// let sum = fibo(n);
// let arr =[];
// let x = 1;
// while(x*x <= sum){
// 	arr.push(x*x);
//     x ++;
// }  
// function fn(arr,sum,len,result){
// 	if(sum <= 0) return result;
//   if(arr.length!==0) {
// 	  for(let i = arr.length-1;i >= 0;i --) {
//  	     if(sum%arr[i]===0) {
//  	        result.push((sum/arr[i])+ len - arr.length);
          
//       	}
//         return fn(arr.slice(1),sum - arr[i-arr.length+1],len,result)
// 	  }
//   }
// }


//let result = [];
// sum 1 1 2 3 5 8 13 21
// arr 1 4 9 16 25
let arr = [1,4,9,16,25,36];
console.log(arr[-1])
let sum = [1,1,2,3,5,8,13,21,34]
// n=7 sum[6] dp[13]
function test(arr,sum,len) {
  let dp = new Array(sum[len+1]).fill(Infinity);
  dp[0] = 0;
  for(let i = 0; i <= len; i++) {
    for(let item of arr) {
      if(sum[i] - item >= 0) {
        dp[sum[i]] = Math.min(dp[sum[i]],dp[sum[i]-item]+1)
      }
    }
  }
  return (dp[sum[len]] === Infinity ? -1 : dp[sum[len]])
}


var coinChange = function(coins, amount, len) {
  let dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for(let i = 1; i <= len; i++) {
    for(let coin of coins) {
      if(sum[i] - coin >= 0) {
        dp[sum[i]] = Math.min(dp[sum[i]], dp[sum[i] - coin]+1);
      }
    }
  }
  return dp[amount] === Infinity ? -1 :dp[amount]
}

// console.log(coinChange(arr,sum[7],7))
// function sun(arr,sum,len,result) {
//   if(sum <= 0) return result;
//     if(arr.length!==0) {
//     for(let i = arr.length-1;i >= 0;i --) {
//         if(sum%arr[i]===0) {
//            result.push((sum/arr[i])+ len - arr.length);

//         }
//         return fn(arr.slice(0,arr.length-1),sum - arr[i],len,result)
//     }
//   }
// }


// let r = sun(arr,sum,arr.length,[]);

// let a = fn(arr,sum,0,[]);
// console.log(a);




// let n = read_line();
// function fibo(n) {
//     if(n === 1) return 1;
//     if(n === 2) return 1;
//     return fibo(n-1)+fibo(n-2);
// }
// // N = 1 1 平方数的和 等于 1
// // N = 6 8          4 + 4
// let sum = fibo(n);
// let arr =[];
// let x = 1;
// while(x*x <= sum){
// 	arr.push(x*x);
//     x ++;
// }  
// //let result = [];
// function fn(arr,sum,n,result){
// 	if(sum === 0) return result;
// 	for(let i = arr.length-1;i >= 0;i --) {
//  	   if(sum%arr[i]===0) {
//  	      result.push((sum/arr[i]) + n);
//     	}
//         return fn(arr,sum - arr[i-arr.length+1],i-arr.length+2,result)
// 	}
    
// }

// let result = fn(arr,sum,0,[])
// console.log(Math.min(...result))
// //console.log(result)

// 只考虑前i个数
// dp[sum][i] = dp[sum-num[i]][i-1] + dp[sum][i-1]


function deepSe(node) {
  let queue = [];
  if(node !== null) {
    let arr = [];
    arr.push(node);
    while(arr.length !== 0) {
      let item = arr.pop();
      if(item.right) {
        arr.push(item.right)
      }
      if(item.left) {
        arr.push(item.left)
      }
    }
  }
}

