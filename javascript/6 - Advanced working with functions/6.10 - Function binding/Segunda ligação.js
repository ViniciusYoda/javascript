function f() {
   console.log(this.name);
}

f = f.bind( {name: "John"} ).bind( {name: "Pete"} );

f();