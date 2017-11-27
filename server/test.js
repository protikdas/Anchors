let start = [45, 45];

let number = Math.random()*0.1;
let number2 = Math.random()*0.1;
let posOrNeg = Math.random() < 0.5 ? -1 : 1;
let posOrNeg2 = Math.random() < 0.5 ? 1 : -1;
number = +(posOrNeg*number).toFixed(3);
number2 = +(posOrNeg2*number2).toFixed(3);

console.log(number, number2);

