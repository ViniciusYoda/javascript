let schedule = {};

function isEmpty(obj) {
    for(let key in obj) {
        // if the loop has starteed, there is a property
        return false;
    }
    return true;
}

console.log( isEmpty(schedule) );
schedule["8:30"] = "get up";
console.log( isEmpty(schedule));