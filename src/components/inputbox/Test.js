import React, { useState, useEffect, useRef} from "react";
/*global chrome*/

export default function Test (){

    const title = useRef(null)
    const tab_title = useRef('')

    function display_h1(results){

        title.current.innerHTML = results;
    }


    chrome.tabs.query({active: true}, function(tabs) {
        var tab = tabs[0];
        //tab_title.current = tab.title;

        //hmm getting the body node
        chrome.tabs.executeScript(tab.id, {
        code: 'document.body.innerHTML'
        }, display_h1);
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
    <h1 ref = {title} >hello</h1>
    )
}