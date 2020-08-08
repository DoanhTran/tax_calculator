/*global chrome*/


var urlRegex = /^file:\/\/\/:?/;

var priceInfo = 5.0;
var PRICE = 'price';
var COORDS = 'coords';
var url = 'URL';
var currUrl = null;
var urlList = {};

function doStuffWithDOM(element) {
    alert("I received the following DOM content:\n" + element);
}

chrome.contextMenus.create({ 
    id: 'Tax Calculator',
    title: 'Send Price',
    contexts: ['all']
  });

   
   /* When the browser-action button is clicked... */
//    chrome.browserAction.onClicked.addListener(function(tab) {
//        /*...check the URL of the active tab against our pattern and... */
//        if (urlRegex.test(tab.url)) {
//            /* ...if it matches, send a message specifying a callback too */
//            chrome.tabs.sendMessage(tab.id, { text: "report_back" },
//                                    doStuffWithDOM);
//        }
//    });

//    function sendPriceToReact(tab) {

//    }
// chrome.browserAction.onClicked.addListener(
//     function(tab) {
//         console.log('dispatching some info');
//         chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//             chrome.tabs.sendMessage(tabs[0].id, {type: PRICE, price: priceInfo}, function(response) {
//                 console.log("save response", response.save);
//             }); 
//         });   
//     }
// )

// chrome.contextMenus.onClicked.addListener(
//     function(tab) {
//         chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//             chrome.tabs.sendMessage(tabs[0].id, {type: PRICE, price: priceInfo}, function(response) {
//             });
//         }); 
//     }
// );

// chrome.runtime.onMessage.addListener(
//     function(request, sender, sendResponse) {
//         console.log('received some urls');
//         console.log('type: ', request.type);
//         if (request.type === url ) {
//             console.log("modifying URLLISt")
//             // setPrice(request.price);
//             // getDOM(price);
//             // sendResponse({save: true});
//         }
//         return true;
//     }
// )
// document.addEventListener('click', printMousePos);


chrome.tabs.onActivated.addListener(function(activeInfo) {
    console.log('hello background script')
    chrome.tabs.get(activeInfo.tabId, function(tab){
       currUrl = tab.url
       chrome.tabs.executeScript(null, {file: "./static/js/content.js"})
       console.log('no error exeuction fukc')
    });
}); 

console.log('this is background script')
console.log(currUrl)
