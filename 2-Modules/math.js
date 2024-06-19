// module.exports

function add(a,b){
    return a+b;
}

function subtract(a,b){
    return a-b;
}

// module.exports="Anushka";
// module.exports=add;
// module.exports=subtract; // overwrites add

module.exports={
    addFn:add,
    subFn:subtract
}

// export.function

// exports.add=(a,b)=>a+b;
// exports.subtract=(a,b)=>a-b;