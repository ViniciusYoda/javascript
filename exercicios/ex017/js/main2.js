const numbers = [1, 2, 3, 4, 5];

const numersMultiplieByTwo = numbers.map(function(number) {
    return number * 2
})

console.log(numersMultiplieByTwo)

const ages = [8, 13, 27, 30, 22, 40];

const evenAges = ages.filter(function(ages) {
    return ages % 2 === 0
});

console.log(evenAges);

const age = [8, 13, 27, 30, 22, 40];

const sumOfAges = age.reduce(function(age, accumulator){
    return accumulator + age;
}, 0);

console.log(sumOfAges)