/*global chrome*/


var urlRegex = /^file:\/\/\/:?/;

var priceInfo = 5.0;
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
                var fullpath = chrome.extension.getURL("./static/js/content.js")
                console.log("full path", fullpath);
                chrome.tabs.insertCSS({file: './static/css/app.css'}, function(tab){
                    chrome.tabs.executeScript({file: './static/js/0.chunk.js'}, function(tab){
                        chrome.tabs.executeScript({file:'./static/js/content.js'});
                        
                    })
              
    
                })
               
            }
            return true;
        } 
    }

)


// "content_scripts" : [{
//     "matches": [ "<all_urls>" ],
//     "css": ["/static/css/app.css"],
//     "js": ["/static/js/0.chunk.js","/static/js/content.js"]}
//   ], 
