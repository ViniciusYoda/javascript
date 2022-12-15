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
  
// recursiva

function printList(list) {

    console.log(list.value); // output the current item

    if (list.next) {
        printList(list.next); // do the same for the rest of the list
    }
}

console.log(printList(list))

// loop

function printList2(list) {
    while(list) {
        console.log(list.value);
        list = list.next;
    }
}

printList2(list)