
 /*global chrome*/
import React, {useEffect, useState, useRef} from 'react'; 
import ReactDOM, { findDOMNode } from 'react-dom';
//import "./content.css";
//import Frame, { FrameContextConsumer }from 'react-frame-component';

var PRICE = 'price';
var COORDS = 'coords';


console.log("running content.js")


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
                    console.log("tax rate", request.tax);
                    getDOM(request.tax)
                }
            }

            console.log('received some urls');
            console.log('type: ', request.type);

        }
    );

    
    document.addEventListener('scroll', handleScroll);
    function handleScroll(event){
        if (timer){
            clearTimeout(timer);
        }
        timer = setTimeout( function(){
            getDOM(tax);
        }, 200);
    }


    
 

    function getDOM(tax){
        //var list = []

        function findDollarSign(node){
            if (node.nodeType === 3){
                const dollarIndex = node.nodeValue.indexOf('$')
                if(dollarIndex !== -1 ) {
                
                    //list.append(node);
                    const parentEl = node.parentElement
                    const classname = parentEl.className;

                    const price = findPrice(node.nodeValue.slice(dollarIndex+1), tax)

                    const original = node.nodeValue;
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
                    list.push(classname);
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

            if(isNaN(price)) return null;

            

            const whole = Math.floor(value).toString();
            //console.log("whole:", whole);
            const dec = (value - whole).toFixed(2).toString().slice(1);
            //console.log("dec:", dec);
            price = commatize(whole) + dec;

            return price;
        }


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
        <div>
            <h1>{price}</h1>
        </div>

        
        
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