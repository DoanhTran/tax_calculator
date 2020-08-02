import React, {useState, useEffect} from "react";
// import logo from "./logo.svg";
import "./App.css";
import InputBox from "./components/inputbox/inputBox";
import ReportForm from "./components/reportForm";

/*global chrome*/
function App() {
  var PRICE = "price";
  const [taxRate, setTaxRate] = useState();
  const [whitelist, setWhiteList] = useState(true);

  
//   chrome.storage.sync.get('currentTax', function(result) {
//     if (result.currentTax!==undefined){
//       setTaxRate(parseFloat(result.currentTax.rate)+1);
//     }
//  })

  useEffect(()=>{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {type: PRICE, tax: taxRate, whitelist: whitelist}, function(response) {
      }); 
    });   
  },[taxRate]);


  return (
    <div>
      <InputBox updateTax = {(tax)=>setTaxRate(parseFloat(tax)+1)}/>
      <ReportForm />
    </div>
  );
}

export default App;
