function shallowCopy(object) {
  if(!object || typeof object !== "object") return object;

  let newObject = Array.isArray(object) ? [] : {};
  for(let key in object) {
    if(object.hasOwnProperty(key)) {
      newObject[key] = newObject[key]
    }
  }
  return newObject;
}
function deepCopy() {
  if(!object || typeof object !== "object") return object;
  let newObject = Array.isArray(object) ? [] : {};
  for(let key in object) {
    if(object.hasOwnProperty(key)) {
      newObject[key] = deepCopy(newObject[key])
    }
  }
  return newObject;
}

// Object.assign(target, source1, source2);
// JSON.parse(JSON.stringify(obj))
let obj3 = {
  name: "Gucci",
  age: 13,
  gender: "female",
  hobby: {
      a: 'Chinese',
      b: 'Math',
      c: 'English'
  }
};
let obj4 = {...obj3}
obj4.hobby.a = "Math";
obj3.name = 1000;
console.log(obj3);
console.log(obj4.name);