let calculator = {
    sum() {
        return this.a + this.b;
    },
    mul() {
        return this.a * this.b;
    },
    read() {
        this.a = +prompt('número 1? ', 0);
        this.b = +prompt('número 2? ', 0);
    }
};

calculator.read();
alert(calculator.sum());
alert(calculator.mul());