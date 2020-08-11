import React, { useState, useEffect, createRef } from "react";
import "../../App.css";
import DisplayTax from "../displaytax.js";
import ManageZip from "../manageZip";
/*global chrome*/

//I'm not sure if to use useRef or createRef
// set save true trigger fetch data
const fakeSavedList = {14850:{name:"home"}, 12345:{name:"scl"}}


export default function NewInputBox({updateTax}) {

  const inputBoxRef = React.createRef()
  const searchContainerRef = React.createRef()
  const searchOptionRef = React.createRef()
  const [zipcode, setZipcode] = useState("");
  const [save, setSave] = useState(false);
  const [savedZip, setSavedZip] =useState({})
  const [searchOption, setSearchOption]= useState([])
  const [editWindow, displayEditWindow]= useState(false)
  useEffect(() => {
    setSavedZip(fakeSavedList)
    inputBoxRef.current.focus()
    
    
//     chrome.storage.sync.get('currentTax', function(result) {
//       console.log("get dat is called");
//         console.log('Value currently is ' + result.currentTax);
//         console.log(result)
//         console.log(result.currentTax)
//         if (result.currentTax!==undefined){
//           setZipcode(result.currentTax.zip);
//           setSave(null);
//         }
//       });
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

  const optionClick = (event) =>{
    //change the textbox to match the saved data
    console.log("option click")
    
    setZipcode(event.currentTarget.attributes.getNamedItem('data-zip').value)
    //setZipcode(event.target.attrbutes['data-zip'])
    setSave(true)
    
  }

  const editZipClick = (event) => {
    displayEditWindow(true)
  }

  useEffect(()=>{
    console.log("setSavedEDit")
    
    setSearchOption(searchOption=>{return make_htmlList()})
    
  },[savedZip])

  function make_htmlList(){
    console.log(
      "make html is called"
    )
    //console.log(savedZip)
    let html= [<div className="searchUnder"></div>];
    console.log("savedZip")
    console.log(savedZip)

    Object.keys(savedZip).forEach(index=> {
      
      const savedButt = <button className="savedOptions" key={index} data-zip={index} onClick={optionClick} ><span>{savedZip[index].name}</span><span>{index}</span></button>
      html.push(savedButt);
      
      
    });
    html.push(<button key={"editsavedbutt"} onClick={editZipClick}>Add/edit saved zip</button>)
    console.log(html)
 
    return html
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
           console.log(zipcode)
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
      console.log("text is longer than 5 characters")
      console.log("animation 1:", animation);
      setTimeout(function () {
        setAnimation();
        console.log("animation 2:", animation);
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
                {save|| save===null ? '':<div  className="search-option-container">{searchOption}</div>}

                </div>
    
      

      {/* <button type="submit">Submit</button> */}

      {/* {save|| save===null ? "" : <button onClick={handleSubmit}>Submit</button>} */}
      {/* </form> */}
      <DisplayTax save={save} zipcode={zipcode} updateTax = {updateTax}></DisplayTax>
      <ManageZip editZipClick={editWindow} savedZip={savedZip}></ManageZip>
    </>
  )
}
