
 /*global chrome*/
import React, {useEffect, useState, useRef} from 'react'; 
import ReactDOM, { findDOMNode } from 'react-dom';
import "./content.css";
import Frame, { FrameContextConsumer }from 'react-frame-component';

var PRICE = 'price';
var COORDS = 'coords';





function Tax() {

    const [tax, setTax] = useState();
    const [price, setPrice] = useState();
    //const [whitelist, setWhiteList] = useState(true);
    // const [x, setX] = useState(0)
    // const [y, setY] = useState(0)
    //const pricetag = useRef(null);
    const windowSize = useRef(window.innerHeight);
    var timer;
    var url = 'URL';
    const [urlList, setUrlList] = useState({})
    const [currUrl, setCurrUrl] = useState(null);


    console.log("running content.js")
    
    chrome.storage.sync.get('currentTax', function(result) {
        if (result.currentTax!==undefined){
            setTax(parseFloat(result.currentTax.rate)+1);
            console.log("current tax", parseFloat(result.currentTax.rate)+1);
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
                    console.log("tax rate", request.tax);
                    getDOM(request.tax)
                }
            }

            console.log('received some urls');
            console.log('type: ', request.type);

        }
    );

    
    // document.addEventListener('scroll', handleScroll);
    // function handleScroll(event){
    //     if (timer){
    //         clearTimeout(timer);
    //     }
    //     timer = setTimeout( function(){
    //         getDOM(tax);
    //     }, 300);
    // }


    
 

    function getDOM(tax){

        /* Find the text node that has a dollar sign and triggers the price with tax sign when 
        user hovers over the price tag.
        Parameter: a node from the website.
        Precondition: node is an html node.  */
        function findDollarSign(node){
            if (node.nodeType === 3){
                const dollarIndex = node.nodeValue.indexOf('$')
                if(dollarIndex !== -1 ) {
                    //list.append(node);
                   
                    let parentEl;
                    let price = findPrice(node.nodeValue.slice(dollarIndex+1), tax)
                    
                    if (price === null){
                        parentEl = node.parentElement.parentElement;
                        console.log("starting findWhole");
                        const result = findWhole(node.parentElement.nextSibling);
                        if(result !== null){
                            if (result[1].indexOf(".") === -1){
                                console.log("finding decimal")
                                const parent = result[0].parentElement
                                console.log("parent element", parent)
                                console.log("sibling", parent.nextSibling);
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
                       
                        //const classname = parentEl.className;
                    
                    

                    parentEl.addEventListener('mouseenter', event => {
                        if (price !== null){
                            setPrice('$' + price);
                            //pricetag.current.style.display = "block";
                            app.style.display = "block";
                        }
                    })


                    parentEl.addEventListener('mouseleave', event =>{
                        //pricetag.current.style.display = "none";
                        app.style.display = "none";
                        setPrice();
                    })
                    //list.push(classname);
                    // console.log(list);
                    // console.log('$ node');
                    // console.log ("classname: ", classname);
                }
            }
        
            //console.log('no $');
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
                console.log("node has no children");
                if (node.nodeType === 3 && !isNaN(parseInt(node.nodeValue))){
                    console.log("node value is a number", node.nodeValue);
                    return node.nodeValue;
                }else{
                    console.log("node value is not a number")
                    return null;
                }
            }
            else{
                let children = node.childNodes;  
                for (let i = 0; i < children.length; i++){
                    console.log("checking children of node");
                    const temp = findWhole(children[i]);
                    if (temp !== null){
                        console.log("temp is not null");
                        result = [children[i], temp];
                        break;
                    }
                }    
            }
            console.log("result: ", result);
            return result;
            
        }



        //this assbucket didnt work
        // function findWhole(node){
        //     if(node === null){
        //         return null;
        //     }

        //     let answer = null;
        //     if (node.hasChildNodes()){
        //         let children = node.childNodes;  
                
        //         for (let i = 0; i < children.length; i++){
        //             console.log("entering the loop")
        //             if (children[i].nodeType === 3 && !isNaN(parseInt(children[i].nodeValue))) {
        //                 console.log("node value", children[i].nodeValue);
        //                 return (children[i], children[i].nodeValue);
        //             }
        //             console.log("not a number text node")
        //             //answer = findWhole(children[i]);
        //             if (answer !== null){
        //                 return answer
        //             }
        //         }
        //     }

        //     console.log("answer", answer)
        //     if(answer === null){
        //     // if (node.nextSibling !== null){
        //         console.log("find whole in next sibling");
        //         return findWhole(node.nextSibling);
        //     }

        //     //}
        //     // else {
        //     //     console.log("find whole in parent element");
        //     //     findWhole(node.parentElement);
        //     // }
        // }



        // /*Find decimal number when price is separated into two nodes.
        // Parameter: node is the parent of the whole number text node.
        // Precondition: node is a document node.*/
        // function findDecimal(node){
        //     if (node.nodeType === 3 && node.firstChild.nodeValue.isInteger()) return (node, node.nodeValue);

        //     if (node.nextSibling !== null){
        //         findWhole(node.nextsibling);
        //     }
        //     else {
        //         findWhole(node.parentElement);
        //     }
        // }


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


        var list =[];

        findDollarSign(document);
        return list;
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

const app = document.createElement('div');
app.id = "my-extension-root";
document.body.appendChild(app);
ReactDOM.render(<Tax/>, app);
app.style.display = "none";

document.addEventListener('mousemove', saveMousePos);

function saveMousePos(event) {
    // console.log(event.pageX)
    // console.log(event.pageY)
    var app = document.getElementById("my-extension-root");
    app.style.position = "absolute";
    app.style.left = event.pageX+'px';
    app.style.top = event.pageY+'px';
}


   // document.addEventListener('mousemove', updateDOM);

    // function updateDOM(event){
    //     console.log("current position", event.pageY);
    //     console.log("window size: ", windowSize.current);
    //     if(event.pageY > windowSize.current){
            
    //         getDOM(tax);
    //         windowSize.current = windowSize.current + window.innerHeight;
    //     }
    // }

    // useEffect(()=>{
    //     var e = document.event;
    //     if(e.pageY > windowSize.current){
    //         getDOM(tax);
    //         windowSize.current = windowSize.current + document.clientHeight;
    //     }
    // })

    // document.addEventListener('click', saveMousePos);

    // function saveMousePos(event) {
    //     setX(event.clientX)
    //     setY(event.clientY)
    //     console.log(event.clientX)
    //     console.log(event.clientY)
    // }


// {/* <Frame head={[<link type="text/css" rel="stylesheet" href={chrome.runtime.getURL("/static/css/content.css")} ></link>]}> 
//             <FrameContextConsumer>
//                 {
//                     ({document, window}) => {
//                         return(
//                             <div className='my-extension'>
//                                 <h1>{price}</h1>
//                             </div>
//                         )
//                     }
//                 }
            
                
//             </FrameContextConsumer>
//        </Frame> */}