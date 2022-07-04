layers: L.mapquest.tileLayer('map')
map.addControl(L.mapquest.control({position:'bottomright'}));
l.marker([53.480759, -2.242631], {
    icon: L.mapquest.icons.marker({
        primaryColor: '#22407F',
        secondaryColor: '#3B5998',
        shadow: true,
        size: 'md',
        Symbol: 'A'
    })
})
.bindPopup('This is Manchester!')
.addTo(map);