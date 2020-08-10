/*global chrome*/


var urlRegex = /^file:\/\/\/:?/;

var taxRate = null;
var PRICE = 'price';
var COORDS = 'coords';
var whitelist = true;

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



chrome.tabs.onActivated.addListener(function(activeInfo){
    chrome.tabs.get(activeInfo.tabId, function(tab){
        var url = new URL(tab.url)
        currUrl = url.hostname ;
        console.log("current url on activated:", url.hostname);
        if (tab.url.hostname in urlList){
            console.log("tab url is in url list on activated")
            try {
                chrome.tabs.executeScript({file: "/static/js/content.js"})
                
                }catch(e){
                    console.log("error", e);
                }
        }
    }) 
})



chrome.tabs.onUpdated.addListener((tabId, change, tab) => {    
    if (tab.active && change.url) {   
        var url = new URL(change.url)
        currUrl = url.hostname ; 
        console.log("current url on updated:", url.hostname);
        if (change.url.hostname in urlList){
            console.log("tab url is in url list on updated")
            try {
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    chrome.tabs.executeScript(tabs[0].id, {file: "/static/js/content.js"})
                })
                }catch(e){
                    console.log("error", e);
                }
        }        
    }
});



chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log('type: ', request.type);
        if (request.type === 'URL' ) {
            urlList = request.urlList;
            console.log("current url on message", currUrl);
            console.log("url list", request.urlList);
            if (currUrl in urlList){
                console.log("currUrl in urlList on message");
                var fullpath = chrome.extension.getURL("/static/js/content.js")
                console.log("full path", fullpath);
                chrome.tabs.executeScript({file: '/static/js/content.js'})     
            }
            return true;
        } 
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
