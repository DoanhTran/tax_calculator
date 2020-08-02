 /*global chrome*/
 import React, {useEffect, useState} from "react";
 import "./App.css";
 import InputBox from "./components/inputbox/inputBox";
 import ReportForm from "./components/reportForm";
 
function App() {
 
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
 