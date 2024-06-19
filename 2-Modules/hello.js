// require('./path or filename')

const math = require('./math');

console.log(math.addFn(5,2)); //requires math
console.log(math.subFn(5,2));

//De-structuring

const {addFn,subFn} = require('./math');

console.log(addFn(5,2)); //requires destructured function
console.log(subFn(5,2)); 
