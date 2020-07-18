import React, { useState, useEffect, useRef} from "react";
//import Stack from 'Stack';
/*global chrome*/

export default function Test2 (){

    // const title = useRef(null)
    // const tab_title = useRef('')
    // var list = []



    
    // }
    /*result is body element node i think ```o_o```*/
    // function findprice(node){
    //     //node.setAttribute('visited', true);
    //     //console.log("node's visited", node.getAttribute('visited'));
    //     if (node.nodeType === 3 && node.nodeValue.includes('$')) {
    //         list.append(node);
    //         title.current.innerHTML = title + node.nodeValue;
    //         console.log(list.length);
    //     }
    //     console.log('1');
    //     if (node.hasChildNodes()){
            
    //         let children = node.childNodes;  
    //         for (let i = 0; i < children.length; i++){
                
    //             findprice(children[i]);

    //         }      
    //     }
        
        
        // if (node.childNodes.length === 0){
        //     node.childNodes.forEach(element => {
        //         findprice(element);    
        //     });  
        // }
    //}
    

   function getDOM (){
        function findprice(node){
            console.log('1');
            if (node.nodeType === 3 && node.nodeValue.includes('$')) {
                //list.append(node);
                node.nodeValue = 'hello'
                console.log('2');
            }
            if (node.hasChildNodes()){
                let children = node.childNodes;  
                for (let i = 0; i < children.length; i++){
                    findprice(children[i]);
                }      
            }
        }
        var list = []

        findprice(document);
        return 'hello'
    }
 
    function printresult(array){
        console.log(array[0]);
    }

    chrome.tabs.query({active: true}, function(tabs) {
        var tab = tabs[0];
        //tab_title.current = tab.title;

        //hmm getting the body node
        chrome.tabs.executeScript(tab.id, {
            code: '('+getDOM+')()'
        }, printresult);
    });
    

    
    // var tab_title = '';
    // function display_h1 (results){
    //     let h1=results;
    //     document.querySelector("#id1").innerHTML = "<p>tab title: " + tab_title + "</p><p>dom h1: " + h1 + "</p>";
    // }
    // chrome.tabs.query({active: true}, function(tabs) {
    // var tab = tabs[0];
    // tab_title = tab.title;
    // chrome.tabs.executeScript(tab.id, {
    //     code: 'document.querySelector("h1").textContent'
    // }, display_h1);
    // });

    return(
    <h1>hello</h1>
    )
}