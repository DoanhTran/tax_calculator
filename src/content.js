 /*global chrome*/
import React, {useEffect, useState} from 'react'; 
import ReactDOM from 'react-dom';
import "./content.css";
import InputBox from "./components/inputbox/inputBox";
import ReportForm from "./components/reportForm";



function Tax() {

    const [price, setPrice] = useState(0)

    useEffect(() => {
        chrome.extension.onMessage.addListener(
            function(request, sender, sendResponse) {
                console.log('received some info');
                setPrice(request.price)
                getDOM(price);
                sendResponse({save: true});
                
            });
    })


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

    // useEffect(()=>{
    //     if (price === 5){
    //         chrome.tabs.query({active: true}, function(tabs) {
    //             var tab = tabs[0];
    //             //tab_title.current = tab.title;

    //             //hmm getting the body node
    //             chrome.tabs.executeScript(tab.id, {
    //                 code: '('+getDOM+')()'
    //             }, printresult);
    //         });
    //     }
    // }, [price])
    



    return (
        <div className='my-extension'>
            <h1>This is the tax rate: {price}</h1>
            
            <InputBox/>
            <ReportForm/>
        
        </div>
    )

}

const app = document.createElement('div');
app.id = "my-extension-root";
document.body.appendChild(app);
ReactDOM.render(<Tax />, app);