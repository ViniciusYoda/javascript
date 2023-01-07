let array = [1, 2, 3];

array = new Proxy(array, {
   get(target, prop, receiver) {
      if (prop < 0) {
         prop = +prop + target.length;
      }
      return Reflect.get(target, prop, receiver);
   }
});

console.log(array[-1]);
console.log(array[-2]);