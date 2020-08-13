/*global chrome*/

var url = 'URL';
var currUrl = null;
var urlList = {};

chrome.tabs.onActivated.addListener(function(activeInfo){
    chrome.tabs.get(activeInfo.tabId, function(tab){
        var url = new URL(tab.url)
        currUrl = url.hostname;
<<<<<<< HEAD
        if (urlList[url.hostname] === true){
=======
        console.log("current url on activated:", url.hostname);
        console.log(urlList)
        if (urlList[url.hostname] === true){
            console.log("tab url is in url list on activated")
>>>>>>> 831a5ec1726fc378c8cf375ea81104bd302be129
            chrome.tabs.insertCSS({file: './static/css/app.css'}, function(tab){
                chrome.tabs.executeScript({file: './static/js/0.chunk.js'}, function(tab){
                    chrome.tabs.executeScript({file:'./static/js/content.js'});   
                })
            }
        )}
    }) 
})



chrome.tabs.onUpdated.addListener((tabId, change, tab) => {    
    if (tab.active && change.url) {   
        var url = new URL(change.url)
        currUrl = url.hostname; 
<<<<<<< HEAD
        if (urlList[url.hostname] === true){
=======
        console.log("current url on updated:", url.hostname);
        console.log(urlList)
        if (urlList[url.hostname] === true){
            console.log("tab url is in url list on updated")
>>>>>>> 831a5ec1726fc378c8cf375ea81104bd302be129
            chrome.tabs.insertCSS({file: './static/css/app.css'}, function(tab){
                chrome.tabs.executeScript({file: './static/js/0.chunk.js'}, function(tab){
                    chrome.tabs.executeScript({file:'./static/js/content.js'});   
                })
        })        
    }

}});




chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.type === 'URL' ) {
<<<<<<< HEAD
 
            urlList[Object.keys(request.urlList)[0]] = request.urlList[Object.keys(request.urlList)[0]]
            chrome.storage.sync.set({urlList: urlList}, function(){});
            chrome.storage.sync.get('urlList', function(result){
            })

=======
            // console.log('this is request', request.urlList)

            urlList[Object.keys(request.urlList)[0]] = request.urlList[Object.keys(request.urlList)[0]]
            chrome.storage.sync.set({urlList: urlList}, function(){});
            chrome.storage.sync.get('urlList', function(result){
                console.log("result", result['urlList']);
            })
            console.log(urlList)
>>>>>>> 831a5ec1726fc378c8cf375ea81104bd302be129
            if (urlList[currUrl] === true){
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
// var fullpath = chrome.extension.getURL("./static/js/content.js")