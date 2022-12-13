let i = 0;

setTimeout(() => console.log(i), 100);

for (let j = 0; j < 100000000; j++) {
   i++;
}