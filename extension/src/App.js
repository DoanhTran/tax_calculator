/*global chrome*/
import React, {useState, useEffect} from "react";
import "./App.css";
import"./components/Toggle.css";
import NewInputBox from "./components/inputbox/inputbox2";
import ReportForm from "./components/reportForm";
import Toggle from "./components/Toggle"

function App() {

  var PRICE = "price";
  const [taxRate, setTaxRate] = useState();
  
  const [trackSite, setTrackSite] = useState(false);
  const [urlList, setUrlList] = useState([]);
  const url = 'URL'

  const handleToggle = () => {
    
    setTrackSite(!trackSite)
    console.log("tracksite", trackSite);
  }


  useEffect(() => {
  console.log("running use effect");
  chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    const url = new URL(tabs[0].url);
    const domain = url.hostname;
    if (trackSite) {
      setUrlList(urlList.concat(domain));  
    }
   
    let urlCopy = Object.assign({}, urlList)
  
    if (trackSite) {
      if (!(domain in urlList)) {
        urlCopy[domain] = 'tracking'
        setUrlList(urlCopy)
      }
    }

    else {
      if (domain in urlList) {
        delete urlCopy[domain]
        setUrlList(urlCopy)
      }
    }
  })
  }, [trackSite])


  useEffect(()=>{
    console.log("tax rate has changed", taxRate);
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {type: PRICE, tax: taxRate}, function(response) {
      }); 
    });   
  },[taxRate]);



  useEffect(() => {
    chrome.runtime.sendMessage({type: url, urlList: urlList}, function(response){
      console.log("sending url list");
    });
  }, [urlList])

  return (
    <div className="grid-container">
      <div className="web-enable-container">
        <label>Use tax calculator on this site?</label>
        <div className="fill-space"></div>
        <Toggle size="small" handleToggle={handleToggle} isChecked ={trackSite}></Toggle>
      </div>
      <div className="divider"></div>
      <NewInputBox updateTax = {(tax)=>setTaxRate(parseFloat(tax)+1)}/>
      <ReportForm />
    </div>
  );
}

export default App;
