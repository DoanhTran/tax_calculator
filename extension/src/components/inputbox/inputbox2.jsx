import React, { useState, useEffect, createRef } from "react";
import "../../App.css";
import DisplayTax from "../displaytax.js";
import ManageZip from "../manageZip";
/*global chrome*/


const fakeSavedList = {0:{name:"home", zip:12345}, 1:{name:"scl", zip:14850}}


export default function NewInputBox({updateTax}) {

  const inputBoxRef = React.createRef()
  const searchContainerRef = React.createRef()
  const searchOptionRef = React.createRef()
  const [zipcode, setZipcode] = useState("");
  const [save, setSave] = useState(false);
  const [savedZip, setSavedZip] =useState({})
//  const [searchOption, setSearchOption]= useState([])
  const [editWindow, displayEditWindow]= useState(false)
  useEffect(() => {
    setSavedZip(fakeSavedList)
    inputBoxRef.current.focus()
    
    
    

      return ()=>{
        chrome.storage.sync.set({savedZip:savedZip}, function(){})

      }

   },[]);

  
  
  useEffect(()=>{
    
    if (save|| save===null){
      searchContainerRef.current.classList.replace('green-outline', 'no-outline')
      document.removeEventListener('click', function(){})
      //searchOptionRef.current.classList.add('container-hidden')
      inputBoxRef.current.removeEventListener("keyup", function(){})
    }
    if (save===false){
      searchContainerRef.current.classList.replace('no-outline', 'green-outline')
      //searchOptionRef.current.classList.remove('container-hidden')
      // inputBoxRef.current.
      //   }
      // })
      
    }
    

  },[save])


  const [animation, setAnimation] = useState();

  const handleOnChange = (event) => {
    //console.log("animation", animation);
    const input = event.currentTarget.value;
    const returnInput = maxFive(input);
    setZipcode(onlyNum(returnInput));
  };

  const handleSubmit = (event) => {
    setSave(true);
  };

  const closeEditZip = (changedZip) =>{
    if(changedZip){setSavedZip(changedZip)}
    displayEditWindow(false)
  }


  const optionClick = (zip) =>{
    //change the textbox to match the saved data
    //console.log("option click")
  
    
    setZipcode(zip)
    //setZipcode(event.target.attrbutes['data-zip'])
    setSave(true)
    
  }

  const editZipClick = (event) => {
    displayEditWindow(true)
  }

  const focusInput = (event) => {
    inputBoxRef.current.focus()

  }
  const handleFocus = (event) => {
    const searchDivCurrent = searchContainerRef.current
    searchContainerRef.current.classList.replace('no-outline', 'green-outline')
    setSave(false);
    event.currentTarget.addEventListener("keyup", function(event) {
         if (event.currentTarget.value!=='' && event.keyCode === 13){
           //console.log(zipcode)
           setSave(true)
           inputBoxRef.current.blur()
         }})

    document.addEventListener('click', function(event) {
      
          const isClickInsideElement = searchDivCurrent.contains(event.target);
          if (!isClickInsideElement) {
            setSave(null)
            
          }
      });
 
  };


  

    //revert zip code back
    
  

  /* Extract only numbers out of input box and returns a string of text 
    containing at most 6 numbers
    Parameter: text is a string
    Returns a string of only numbers or empty string*/
  function onlyNum(text) {
    let lastChar = text.slice(-1);
    let ascii = lastChar.charCodeAt(0);

    if (48 <= ascii && ascii <= 57) {
      return text;
    } else {
      return text.slice(0, -1);
    }
  }

  function maxFive(text) {
    if (text.length > 5) {
      setAnimation("shake");
      // console.log("text is longer than 5 characters")
      // console.log("animation 1:", animation);
      setTimeout(function () {
        setAnimation();
        //fconsole.log("animation 2:", animation);
      }, 200);
      return text.slice(0, 5);
    }
    return text;
  }

  return (
    
    
    <>

      <label className ="ziplabel">Zipcode: &#160;</label>
      <div className = "multisearch-container green-outline" ref={searchContainerRef}>
      
      <div className="searchBar-container normal">
              <input
                  ref={inputBoxRef}
                  className = "zip-input"
                  type="text"
                  maxLength="6"
                  height = "3"
                  value={zipcode}
                  size="10"
                  onChange={handleOnChange}
                  onFocus={handleFocus}
                  
                  
                />

                
                {save|| save===null ? <button className="glass-icon glass-grey" onClick={focusInput}></button> : <button className="glass-icon glass-green"onClick={handleSubmit}></button>}
                </div>
                {save|| save===null ? '':<div  className="search-option-container">{<OptionList savedZip={savedZip} optionClick={optionClick} editZipClick={editZipClick}></OptionList>}</div>}

                </div>
    
  
      <DisplayTax save={save} zipcode={zipcode}></DisplayTax>
      <ManageZip editZipClick={editWindow} closeEdit={closeEditZip} savedZip={savedZip}></ManageZip>
    </>
  )
}


function OptionList(props){
  return(
    <>
    <div className="searchUnder"></div>
    {Object.keys(props.savedZip).map(key => {
      return <button className="savedOptions" key={key} data-zip={props.savedZip[key].zip} onClick={()=>{props.optionClick(props.savedZip[key].zip)}} ><span>{props.savedZip[key].name}</span><span>{props.savedZip[key].zip}</span></button>

    })}
    <button key={"editsavedbutt"} onClick={()=>props.editZipClick()}>Add/edit saved zip</button>

    </>
  )
}
