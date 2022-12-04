// recursão

let list = {
    value: 1,
    next: {
      value: 2,
      next: {
        value: 3,
        next: {
          value: 4,
          next: null
        }
      }
    }
};

function printReverseListRecursão(list) {

    if (list.next) {
        printReverseListRecursão(list.next);
    }

    console.log(list.value);
}

// usando loop

function printReverseListLoop(list) {
    let arr = []
    let tmp = list;

    while (tmp) {
        arr.push(tmp.value);
        tmp = tmp.next;
    }

    for (let i = arr.length - 1; i >= 0; i--) {
        console.log(arr[i]);
    }
}

console.log(`Usando recursão : ${printReverseListRecursão(list)}`)
console.log(`Usando loop : ${printReverseListLoop(list)}`)