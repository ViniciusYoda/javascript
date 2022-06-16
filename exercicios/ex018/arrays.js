var shopping = ['bread', 'milk', 'cheese', 'hummus', 'noodles'];
console.log(shopping)
var sequence = [1, 1, 2, 3, 5, 8, 13];
var random = ['tree', 795, [0, 1, 2]];
console.log(shopping[0]);
shopping[0] = 'tahini';
console.log(shopping);
console.log(random[2][2]);
console.log(sequence.length);
var sequence = [1, 1, 2, 3, 5, 8, 13];
for (var i = 0; i < sequence.length; i++){
    console.log(sequence[i]);
}

var myData = 'Manchester,London,Liverpool,Birmingham,Leeds,Carlisle';

var myArray = myData.split(',');
console.log(myArray)
console.log(myArray.length);
console.log(myArray[0]); // the first item in the array
console.log(myArray[1]); // the second item in the array
console.log(myArray[myArray.length-1]); // the last item in the array

var myNewString = myArray.join(',');
console.log(myNewString);

var dogNames = ['Rocket','Flash','Bella','Sluhher'];
console.log(dogNames.toString());

var myArray = ['Mannchester', 'London', 'Liverpool', 'Birmmingham', 'Leeds', 'Carslisle']
myArray.push('Cardiff');
console.log(myArray);
myArray.push('Bradford', 'Brighton');
console.log(myArray);

var newLength = myArray.push('Bristol');
console.log(myArray);
console.log(newLength);
myArray.pop();
var removedItem = myArray.pop();
console.log(myArray);
console.log(removedItem);
myArray.unshift('Edinburgh');
console.log(myArray);
var removedItem = myArray.shift();
console.log(myArray);
console.log(removedItem);
