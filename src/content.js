 /*global chrome*/
import React, {useEffect, useState} from 'react'; 
import ReactDOM from 'react-dom';
import "./content.css";
import Frame, { FrameContextConsumer }from 'react-frame-component';
import InputBox from './components/inputbox/inputBox';
import ReportForm from './components/reportForm';

var PRICE = 'price';
var COORDS = 'coords';

function Tax() {

    const [price, setPrice] = useState(0)
    // const [x, setX] = useState(0)
    // const [y, setY] = useState(0)

    //&& typeof(request.priceInfo) === "number"

    useEffect(() => {
        chrome.extension.onMessage.addListener(
            function(request, sender, sendResponse) {
                console.log('received some info');
                console.log('type: ', request.type);
                if (request.type === PRICE ) {
                    console.log("modifying DOM")
                    setPrice(request.price);
                    getDOM(request.price);
                    sendResponse({save: true});
                }
            });
    })

    // document.addEventListener('click', saveMousePos);

    // function saveMousePos(event) {
    //     setX(event.clientX)
    //     setY(event.clientY)
    //     console.log(event.clientX)
    //     console.log(event.clientY)
    // }

    

    return (
        <Frame head={[<link type="text/css" rel="stylesheet" href={chrome.runtime.getURL("/static/css/content.css")} ></link>]}> 
              <FrameContextConsumer>
               {
               // Callback is invoked with iframe's window and document instances
                   ({document, window}) => {
                      // Render Children
                      return (
                        <div className='my-extension'>
                            <h1>This is the price after taxes: {price}</h1>
                            {/*<InputBox />
                            <ReportForm />*/}
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
ReactDOM.render(<Tax />, app);

document.addEventListener('click', saveMousePos);

function saveMousePos(event) {
    console.log(event.clientX)
    console.log(event.clientY)
    var app = document.getElementById("my-extension-root");
    app.style.position = "absolute";
    app.style.left = event.clientX+'px';
    app.style.top = event.clientY+'px';
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

                const price = findPrice(node.nodeValue.slice(dollarIndex+1), 1.08)

                const original = node.nodeValue;
                parentEl.addEventListener('mouseenter', event => {
                    price === null ? node.nodeValue = original : node.nodeValue = '$' + price;
                })
                parentEl.addEventListener('mouseleave', event =>{
                    node.nodeValue = original;
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
        console.log("price:", value);

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