// Sintaxe strict mode para todo o script
"use strict";
var v = "Oi! Eu sou um script mode!"

function strict() {
    // Sintaxa strict mode a nível de função
    'use strict'
    function nested() { return "E eu também!"; }
    return "Oi! Eu sou uma função strict mode! " + nested();
}

function notStrict() { return "Eu nçai sou strict."; }

"use strict";

// Atribuir a uma propriedaed não-atribuível
var obj1 = {};
Object.defineProperty(obj1, "x", { value: 42, writable: false});
obj1.x = 9; // lança TypeError

// Atribuir a uma propriedade getter-onlu
var obj2 = { get x() { return 17; } };
obj2.x = 5; // lança TypeError

// Atribuir a uma nova propriedade de um objeto não-extensível
var fixed = {};
Object.preventExtensions(fixed);
fixed.newProp = "ohai"; // lança TypeError