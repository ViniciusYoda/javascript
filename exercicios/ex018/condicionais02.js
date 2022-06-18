var select = document.querySelector('select');
var para = document.querySelector('p');

select.addEventListener('change', setWeather);

function setWeather(){
    var choice = select.value;

    if (choice == 'sunny' && temperature < 86){
        para.textContent = 'It is ' + temperature + ' degrees outside - nice and suny. Let\´s go out to the beach, or the park, and get an ice cream.';
    } else if ( choice === 'sunny' && temperature >= 86) {
        para.textContent = 'It is ' + temperature + ' degrees outside - REALLY HOT! If you want to go outside, make sure to put some suncream on.'
    } else if (choice === 'rainy') {
        para.textContent = 'Rain is falling outside; take a rain coat and a brolly, and don\´t stay out for too long.';
    }else if (choice === 'snowing') {
        para.textContent = 'The snow is coming down - it is freezing! Best to stay in with a cup of hot chocolate, or go build a snowman.';
    }else if (choice === 'overcast'){
        para.textContent = 'It isn\´t raining, but the sky is grey and gloomy; it could turn any minute, so take a rain coat just in case.';
    } else {
        para.textContent = '';
    }
}

if (iceCreamVanOutside || houseStatus === 'on fire') {
    console.log('You should leave the house quickly.');
} else {
    console.log('Probably should just stay is then.')
}

if (!(iceCreamVanOutside || houseStatus === 'on fire')){
    console.log('Probably should just stay in then')
} else {
    console.log('You should leave the house quickly.')
}

if ((x === 5 || y > 3 || z <=10) && (loggedIn || userName === 'Steve')){
    // run the code
}