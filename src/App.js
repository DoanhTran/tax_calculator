import React, {useState, useEffect} from "react";
// import logo from "./logo.svg";
import "./App.css";
import InputBox from "./components/inputbox/inputBox";
import ReportForm from "./components/reportForm";

/*global chrome*/
function App() {
  var PRICE = "price";
  const [taxRate, setTaxRate] = useState();
  
  const [trackSite, setTrackSite] = useState(false);
  const [urlList, setUrlList] = useState([]);
  const url = 'URL'

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
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {type: PRICE, tax: taxRate}, function(response) {
      }); 
    });   
  },[taxRate]);


  useEffect(() => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {type: url, urlList: urlList}, function(response) {
        console.log('sending message')
        console.log('this is url: ', urlList) 
      })      
    })    //  chrome.runtime.sendMessage({type: url, urlList: urlList}, () => {     //   console.log('sending message')     //  })   //   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {   //     chrome.tabs.sendMessage(tabs[0].id, {type: url, urlList: urlList}, function(response) {   //     });   // });     
  }, [urlList])


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
