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

  const [trackSite, setTrackSite] = useState(false);
   const [urlList, setUrlList] = useState([]);
   console.log(urlList)
   console.log('track site')
   console.log(trackSite)
 
   const handleToggle = () => {
     setTrackSite(!trackSite)
   }
   useEffect(() => {
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
      const url = new URL(tabs[0].url);
      const domain = url.hostname;
      if (trackSite) {
        setUrlList(urlList.concat(domain));  
      }
      
      // else {
      //   let index = urlList.indexOf(url);
      //   setUrlList(urlList.splice(index, 1));
      // }
    })
   }, [trackSite])
   

    chrome.storage.sync.get('currentTax', function(result) {
      if (result.currentTax!==undefined){
        setTaxRate(parseFloat(result.currentTax.rate)+1);
      }
    })
  

  useEffect(()=>{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {type: PRICE, tax: taxRate, whitelist: urlList}, function(response) {
      }); 
    });   
  },[taxRate, urlList]);


  return (
    <div>
      <InputBox updateTax = {(tax)=>setTaxRate(parseFloat(tax)+1)}/>
      <ReportForm />
      <div>
         <label>Would you like to run tax extension on this site?</label>
         <input type="checkbox" onChange={handleToggle}/>
       </div>

    </div>
  );
}

export default App;
