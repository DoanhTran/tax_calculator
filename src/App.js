 /*global chrome*/
 import React, {useEffect, useState} from "react";
 import "./App.css";
 import InputBox from "./components/inputbox/inputBox";
 import ReportForm from "./components/reportForm";
 
function App() {
   const url = 'URL'
   const [trackSite, setTrackSite] = useState(false);
   const [urlList, setUrlList] = useState({});

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

      console.log(domain)
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

  //  useEffect(() => {
  //     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  //         chrome.tabs.sendMessage(tabs[0].id, {type: url, urlList: urlList}, function(response) {
  //           console.log('sending message')
  //         })
  //     })
  //   //  chrome.runtime.sendMessage({type: url, urlList: urlList}, () => {
  //   //   console.log('sending message')
  //   //  })
  // //   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  // //     chrome.tabs.sendMessage(tabs[0].id, {type: url, urlList: urlList}, function(response) {
  // //     });
  // // }); 

  // }, [urlList])
   
   
   return (
     <div>
       <InputBox />
       <ReportForm />
       <div>
         <label>Would you like to run tax extension on this site?</label>
         <input type="checkbox" onChange={handleToggle}/>
       </div>
     </div>
   );
 }
 
 export default App;
 