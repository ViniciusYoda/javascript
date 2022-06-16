for (let index = 0; index < 2; index++){
    console.log(index);
};

const cars = ['Ferrari', 'Tesla', 'Marcedes'];

for(let i = 0; i < cars.length; i++){
    console.log(cars[i]);
}

for (let car of cars){
    console.log(car);
}

cars.forEach(function(car, index){
    console.log(index+1)
    console.log(car)
})
