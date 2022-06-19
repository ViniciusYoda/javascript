var myText = 'I am a string';
var newString = myText.replace('string', 'sausage');
console.log(newString);
// the replace() string function takes a string, replaces one substring with another, and returns a new string with the replacement made.
var myArray = ['I', 'love', 'chocolate', 'frogs'];
var madeAString = myArray.join(' ');
console.log(madeAString);
// the join() function takes an array, joins all the array items together into a single string, and returns this new string
var myNumber = Math.random();
// the random() function generates a random number between 0 and 1, and returns that number