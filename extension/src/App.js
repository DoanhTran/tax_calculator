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
 
  const [urlList, setUrlList] = useState([]);
  const url = 'URL'
  const [trackSite, setTrackSite] = useState(result);
  var result

  useEffect(()=>{
    getInitialToggle();
  }, [])

 
  function getInitialToggle(){
    chrome.storage.sync.get('urlList', function(result){
      console.log("result", result);
      chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        const url = new URL(tabs[0].url);
        const domain = url.hostname;
        console.log("domain", domain);
        
        if(result['urlList'][domain] === true){
          console.log("url not in url list");
          setTrackSite(true);
          //return true;
        }
        else{
          setTrackSite(false);
          //return false;
        }
      })
    })
  }



  const handleToggle = () => {
    setTrackSite(!trackSite)
  }


  useEffect(() => {
  chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    const url = new URL(tabs[0].url);
    const domain = url.hostname;
    let urlCopy = Object.assign({}, urlList)
  
    if (trackSite) {
        // console.log('the tracksite option is true')
        urlCopy[domain] = true;

    }

    else {
        // console.log('the tracksite option is false')
        urlCopy[domain] = false;
      }

    setUrlList(urlCopy)
  })
  }, [trackSite])


  useEffect(()=>{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {type: PRICE, tax: taxRate}, function(response) {
      }); 
    });   
  },[taxRate]);



  useEffect(() => {

    if (Object.keys(urlList)[0] !== undefined) {
      chrome.runtime.sendMessage({type: url, urlList: urlList}, function(response){
      });
    }
  }, [urlList])


  return (
    <div className="grid-container">
      <div className="web-enable-container">
        <label className="enable-text">Use tax calculator on this site?</label>
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