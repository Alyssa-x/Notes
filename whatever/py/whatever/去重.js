// [...new Set(arr)]
// Array.from(new Set(arr))
function removeCopy(arr) {
 return arr.filter((item, index) => {
   return arr.indexOf(item) === index
 })
}
 console.log(removeCopy([1,2,3,3,4]))