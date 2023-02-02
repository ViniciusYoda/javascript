/*

TextDecoder e TextEncoder
E se os dados binários forem realmente uma string? Por exemplo, recebemos um arquivo com dados textuais.

O objeto interno TextDecoder permite ler o valor em uma string JavaScript real, dado o buffer e a codificação.

Primeiro precisamos criá-lo:

let decoder = new TextDecoder([label], [options]);
label– a codificação, utf-8por padrão, mas big5, windows-1251e muitas outras também são suportadas.
options– objeto opcional:
fatal– boolean, se trueentão lançar uma exceção para caracteres inválidos (não decodificáveis), caso contrário (padrão) substitua-os por character \uFFFD.
ignoreBOM– boolean, se trueignora BOM (uma marca Unicode de ordem de byte opcional), raramente necessário.
…E então decodifique:

let str = decoder.decode([input], [options]);
input– BufferSourcepara decodificar.
options– objeto opcional:
stream– verdadeiro para fluxos de decodificação, quando decoderé chamado repetidamente com blocos de dados recebidos. Nesse caso, um caractere de vários bytes pode ocasionalmente se dividir entre blocos. Esta opção diz TextDecoderpara memorizar caracteres “inacabados” e decodificá-los quando o próximo trecho vier.
Por exemplo:

let uint8Array = new Uint8Array([72, 101, 108, 108, 111]);

alert( new TextDecoder().decode(uint8Array) ); // Hello
let uint8Array = new Uint8Array([228, 189, 160, 229, 165, 189]);

alert( new TextDecoder().decode(uint8Array) ); // 你好
Podemos decodificar uma parte do buffer criando uma exibição de subarray para ele:

let uint8Array = new Uint8Array([0, 72, 101, 108, 108, 111, 0]);

// the string is in the middle
// create a new view over it, without copying anything
let binaryString = uint8Array.subarray(1, -1);

alert( new TextDecoder().decode(binaryString) ); // Hello
TextEncoder
TextEncoder faz o contrário – converte uma string em bytes.

A sintaxe é:

let encoder = new TextEncoder();
A única codificação que suporta é “utf-8”.

Possui dois métodos:

encode(str)– retorna Uint8Arrayde uma string.
encodeInto(str, destination)– codifica strem destinationque deve ser Uint8Array.
let encoder = new TextEncoder();

let uint8Array = encoder.encode("Hello");
alert(uint8Array); // 72,101,108,108,111

*/