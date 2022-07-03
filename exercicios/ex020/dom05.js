function set_background(){
    // now, get all the p elements in the document
    const paragraphs = document.getElementsByTagName("p");

    // get the second paragraph from the list
    const secondParagraph = paragraphs[1];

    // set the inline style
    secondParagraph.style.background = "red";
}