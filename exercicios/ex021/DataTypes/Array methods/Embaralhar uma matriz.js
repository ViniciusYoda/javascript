function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

let arr = [1,2,3];
shuffle(arr)
console.log(arr);