var string = 'This is my string';
var browserType = 'mozilla';
console.log(browserType.length);
console.log(browserType[0]);
console.log([browserType.length-1]);
console.log(browserType.indexOf('zilla'));
console.log(browserType.indexOf('vanilla'));
if(browserType.indexOf('mozilla') !== -1) {
    console.log('oi')
}
console.log(browserType.slice(0,3));
console.log(browserType.slice(2));
var radData = 'My NaMe Is MuD';
console.log(radData.toLowerCase());
console.log(radData.toUpperCase());
console.log(browserType.replace('moz','van'));