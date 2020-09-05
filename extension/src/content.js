 /*global chrome*/
 import React, {useState, useRef} from 'react'; 
 import ReactDOM from 'react-dom';
 import "./content.css";
 import Frame, { FrameContextConsumer }from 'react-frame-component';
 
 var PRICE = 'price';
 //var COORDS = 'coords';
 

 const app = document.createElement('div');
 app.id = "my-extension-root";
 document.body.appendChild(app);
 ReactDOM.render(<Tax/>, app);
 app.style.display = "none";
 
 document.addEventListener('mousemove', saveMousePos);
 

 function saveMousePos(event) {
     var app = document.getElementById("my-extension-root");
     app.style.position = "absolute";
     app.style.left = event.pageX+'px';
     app.style.top = event.pageY+'px';
 }
 

 function Tax() {
     const [tax, setTax] = useState();
     const [price, setPrice] = useState();
     const windowSize = useRef(window.innerHeight);
    //  var timer;
    //  var url = 'URL';
    //  const [urlList, setUrlList] = useState({})
    //  const [currUrl, setCurrUrl] = useState(null);
 
 
     chrome.storage.sync.get('currentTax', function(result) {
         if (result.currentTax!==undefined){
             setTax(parseFloat(result.currentTax.rate)+1);
             getDOM(parseFloat(result.currentTax.rate)+1);
         }
     })
 
 
     chrome.extension.onMessage.addListener(
         function(request, sender, sendResponse) {
             console.log('received some info');
             console.log("tax type",typeof(request.tax))
             if (request.type === PRICE && typeof(request.tax) === "number") {
                 setTax(request.tax);
                 if (request.whitelist){
                     getDOM(request.tax)
                 }
             }
 
         }
     );
 
     
 
     function getDOM(tax){
        findDollarSign(document);
 
         /* Find the text node that has a dollar sign and triggers the price with tax sign when 
         user hovers over the price tag.
         Parameter: a node from the website.
         Precondition: node is an html node.  */
         function findDollarSign(node){
             if (node !== null && node.nodeType === 3){
                 const dollarIndex = node.nodeValue.indexOf('$')
                 if(dollarIndex !== -1 ) {
                    
                     let parentEl;
                     let price = findPrice(node.nodeValue.slice(dollarIndex+1), tax)
                     
                     if (price === null){
                         parentEl = node.parentElement.parentElement;
                         const result = findWhole(node.parentElement.nextSibling);
                         if(result !== null){
                             if (result[1].indexOf(".") === -1){
                                 const parent = result[0].parentElement
                                 const decimal = findWhole(result[0].parentElement.nextSibling);
                                 price = ((parseInt(result[1]) + (decimal[1]/100)) * tax).toFixed(2);
                             }
                             else{
                                 price = (result[1]*tax).toFixed(2);
                             }
                         }
 
                     }else{
                         parentEl = node.parentElement
                     }
 
                     parentEl.addEventListener('mouseenter', event => {
                         if (price !== null){
                             setPrice('$' + price);
                             app.style.display = "block";
                         }
                     })
 
                     parentEl.addEventListener('mouseleave', event =>{
                         app.style.display = "none";
                         setPrice();
                     })
                 }
             }
         
             
             if (node.hasChildNodes()){
                 let children = node.childNodes;  
                 for (let i = 0; i < children.length; i++){
                     findDollarSign(children[i]);
                 }    
             }
         }
        
         
         /*Find number when price is separated into two nodes.
         Parameter: node is the sibling of the parent of dollar text node.
         Precondition: node is a document node.*/
         function findWhole(node){
             let result = null;
             if (node === null || !node.hasChildNodes()){
                 if (node !== null && node.nodeType === 3 && !isNaN(parseInt(node.nodeValue))){
                     return node.nodeValue;
                 }else{
                     return null;
                 }
             }
             else{
                 let children = node.childNodes;  
                 for (let i = 0; i < children.length; i++){
                     const temp = findWhole(children[i]);
                     if (temp !== null){
                         result = [children[i], temp];
                         break;
                     }
                 }    
             }
             return result;       
         }
 

         /* Find value after the dollar sign and multiply by tax. Returns null if there is no price 
         after the dollar sign.
         Parameters: 
         text is text after the dollar sign
         tax is the tax rate (e.g 1.08)
         Precondition: text is a string */
         function findPrice(text, tax){
             let price = '';
             for(let i = 0; i<text.length; i++){
                 let ascii = text.charCodeAt(i);
                 if (ascii === 32 || ascii === 44 || ascii === 46 || (48 <= ascii && ascii <= 57)){
                     if (ascii !== 44) price = price + text.substr(i,1);
                 }
                 else{
                     break;
                 }
             }
 
             let value = (parseFloat(price) * tax);
             //console.log("price:", value);
 
             if(isNaN(value)) return null;
 
 
             const whole = Math.floor(value).toString();
             //console.log("whole:", whole);
             const dec = (value - whole).toFixed(2).toString().slice(1);
             //console.log("dec:", dec);
             price = commatize(whole) + dec;
 
             return price;
         }
 
 
         /*Place comma in the price every 3 digits.
         Parameter: price is a string of numbers.
         Condition: price is a string. */
         function commatize(price){
             if(price.length<4){
                 return price;
             }
             let lastThree = price.slice(-3);
             let begin = commatize(price.slice(0,-3));
             return begin + ',' + lastThree;
         }
     }
 
     
 
     return (
         <Frame head={[<link type="text/css" rel="stylesheet" href={chrome.runtime.getURL("/static/css/content.css")} ></link>]}> 
             <FrameContextConsumer>
                 {
                     ({document, window}) => {
                         return(
                             <div className='my-extension'>
                                 <h1>{price}</h1>
                             </div>
                         )
                     }
                 }
             </FrameContextConsumer>
        </Frame> 
     ) 
 }
 


