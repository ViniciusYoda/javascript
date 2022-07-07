var ss = document.styleSheets;

for(var i = 0; i< ss.length; i++) {
    for(var j = 0; j < ss[i].cssRules.length; j++) {
        dump( ss[i].cssRules[j].selectorText + "\n");
    }
}

