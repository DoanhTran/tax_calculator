 /*global chrome*/
import React, {useEffect, useState} from 'react'; 
import ReactDOM from 'react-dom';
import "./content.css";


function Tax() {

    const [price, setPrice] = useState(0)

    useEffect(() => {
        chrome.extension.onMessage.addListener(
            function(request, sender, sendResponse) {
            console.log('received some info');
              setPrice(request.price)
            });
    })

    return (
        <div className='my-extension'>
            <h1>This is the tax rate: {price}</h1>
        </div>
    )

}

const app = document.createElement('div');
app.id = "my-extension-root";
document.body.appendChild(app);
ReactDOM.render(<Tax />, app);