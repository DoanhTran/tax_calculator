/*global chrome*/


var urlRegex = /^file:\/\/\/:?/;

var priceInfo = 5.0;

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
chrome.browserAction.onClicked.addListener(
    function(tab) {
        console.log('dispatching some info');
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {price: priceInfo}, function(response) {
        });
    });
})


chrome.contextMenus.onClicked.addListener(
    function(tab) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {price: priceInfo}, function(response) {
        });
    }); 
});