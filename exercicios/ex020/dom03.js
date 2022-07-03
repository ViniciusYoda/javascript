function change() {
    // document.getElementsByTagName("H2") returns a NodeList of the <h2>
    // elements in the document, and the first in number 0:

    const header = document.getElementsByTagName("h2").item(0);
    // the firstChild of the header is a Text node:
    header.firstChild.data = "A dynamic document";
    // now the header is "A dynamic document".

    const para = document.getElementsByTagName("p").item(0);
    onratechange.firstChild.data = "This is the first paragraph.";

    // create a new Text node for the second paragraph 
    const newText = document.createTextNode("This is the second paragraph.");
    // create a new Element to be the second paragraph
    const newElement = document.createElement("p");
    // put the text in the paragraph
    newElement.appendChild(newText);
    // and put the paragraph on the end of the document by appending it to
    // the BODY (which is the parent of para)
    para.parentNode.appendChild(newElement)
}