let styles = ["Jazz", "Blues"]

console.log(styles);

styles.push("Rock-in-Roll")

console.log(styles);

styles[Math.floor((styles.length - 1) / 2)] = "Classicos"

console.log(styles);

styles.shift()

console.log(styles);

styles.unshift("Rap", "Reggae");

console.log(styles);
