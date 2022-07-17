function min(a,b){
    if (a<b){
        console.log('a é menor');
    } else {
        console.log('b é menor');
    }
}
min(2,3)

function min(a,b){
    return a < b ? a : b;
}
min(5,2)