/*global chrome*/


var urlRegex = /^file:\/\/\/:?/;

var taxRate = null;
var PRICE = 'price';
var COORDS = 'coords';
var whitelist = true;

var url = 'URL';
var currUrl = null;
var urlList = {};

console.log('this is background script')


function doStuffWithDOM(element) {
    alert("I received the following DOM content:\n" + element);
}

chrome.contextMenus.create({ 
    id: 'Tax Calculator',
    title: 'Send Price',
    contexts: ['all']
  });



chrome.tabs.onActivated.addListener(function(activeInfo){
    console.log("resending message");
    chrome.tabs.get(activeInfo.tabId, function(tab){
        currUrl = tab.url;
        console.log("current url 1:", tab.url);
    })
    
        try {
        chrome.tabs.executeScript({file: "./static/js/content.js"})
        
        }catch(e){
            console.log("error", e);
        }
    // });   
})


chrome.tabs.onUpdated.addListener((tabId, change, tab) => {    
    if (tab.active && change.url) {    
        console.log("you are here: "+change.url);  
        currUrl = change.url;         
    }
    
    console.log("resending message");
    // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        try {
            chrome.tabs.executeScript({file: "./static/js/content.js"})
            
            }catch(e){
                console.log("error", e);
            }
    // });  
});

chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log('received some urls');
        console.log('type: ', request.type);
        if (request.type === url ) {
            urlList = request.urlList;
            }
            return true;
            } 
)


    

// chrome.tabs.getSelected(null, function(tab) {
    //     currUrl = tab.url;
    //     console.log("current url 2: ", tab.url);
    // })
    
    // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

// chrome.contextMenus.onClicked.addListener(
//     function(tab) {
//         chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//             chrome.tabs.sendMessage(tabs[0].id, {type: PRICE, tax: taxRate, whitelist: whitelist}, function(response) {
//             });
//         }); 
//     }
// );


// chrome.tabs.onActivated.addListener(function(activeInfo) {
//     console.log('hello background script')
//     chrome.tabs.get(activeInfo.tabId, function(tab){
//        currUrl = tab.url
//        chrome.tabs.executeScript(null, {file: "./static/js/content.js"})
//        console.log('no error exeuction fukc')
//     });
// }); 





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
//             chrome.tabs.sendMessage(tabs[0].id, {type: PRICE, tax: taxRate, whitelist: whitelist}, function(response) {
//             }); 
//         });   
//     }
// )

// chrome.extension.onMessage.addListener(
//     function(request, sender, sendResponse) {
//         priceInfo = request.tax;
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
