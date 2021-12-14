function maxL( s ) {
  // write code here
  let map = [];
  let r = [];
  for(let i = 0;i < s.length;i ++) {
      if(map[s[i]]!==undefined) {
          r.push(i - map[s[i]]);
      } else {
         map[s[i]] = i;
         console.log(s[i])
      }
  }
  return map;
}
console.log(maxL("fwejfldskif"))