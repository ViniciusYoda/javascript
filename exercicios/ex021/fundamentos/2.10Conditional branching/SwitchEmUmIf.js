let browser = 'Opera'

if (browser == 'Edge'){
    console.log('You´ve got the Edge!')
} else if (browser == 'Chrome' || browser == 'Firefox' || browser == 'Safari' || browser == 'Opera'){
    console.log('Okay we support these browsers too');
} else {
    console.log('We hope that this page looks ok!');
}

/*

Observe: a construção browser == 'Chrome' || browser == 'Firefox' …é dividida em várias linhas para melhor legibilidade.

Mas a switchconstrução ainda é mais limpa e descritiva.

*/