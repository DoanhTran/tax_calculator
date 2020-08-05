import React, { useState, useEffect, createRef } from "react";
import "./inputbox.css";
import DisplayTax from "../displaytax.js";
/*global chrome*/

//I'm not sure if to use useRef or createRef

const fakeSavedList = [{rate:0.08, name:"home", region:"Ithaca",zipCode:"14850"}, {rate:0.09, name:"scl", region:"Ithaca2",zipCode:"12345"}]


export default function NewInputBox() {

  const inputBoxRef = React.createRef()
  const searchContainerRef = React.createRef()
  const [zipcode, setZipcode] = useState("");
  const [save, setSave] = useState(false);
//   useEffect(() => {
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
//   },[]);

  
  
  useEffect(()=>{
    if (save|| save===null){
      searchContainerRef.current.classList.replace('green-outline', 'no-outline')
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

  function make_htmlList(){
    console.log(
      "make html is called"
    )
    let html= [];
    fakeSavedList.forEach(element => {
      const savedButt = <button className="savedOptions" data-zip={element.zipCode} data-region={element.region} data-rate={element.rate} onClick={optionClick}><span>{element.name}</span><span>{element.zipCode}</span></button>
      html.push(savedButt);
    });
    html.push(<button>Add/edit saved zip</button>)
 
    return html
  }

  const handleFocus = (event) => {
    searchContainerRef.current.classList.replace('no-outline', 'green-outline')
    inputBoxRef.current.focus()
    
    setSave(false);
  };

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
    
    
    <div>
      <label>Zipcode &#160;</label>
      <div className = "multisearch-container no-outline" ref={searchContainerRef}>
      <div className="searchBar-container normal">
              <input
                  ref={inputBoxRef}
                  className = {animation}
                  type="text"
                  maxLength="6"
                  height = "3"
                  value={zipcode}
                  size="10"
                  onChange={handleOnChange}
                  onFocus={handleFocus}
                />
                
                {save|| save===null ? <button className="glass-icon glass-grey" onClick={handleFocus}>focus</button> : <button className="glass-icon glass-green"onClick={handleSubmit}>Submit</button>}
                </div>
                {save|| save===null ? '': <div option>{make_htmlList()}</div>}

                </div>
    
      

      {/* <button type="submit">Submit</button> */}

      {/* {save|| save===null ? "" : <button onClick={handleSubmit}>Submit</button>} */}
      {/* </form> */}
      {/* <DisplayTax save={save} zipcode={zipcode}></DisplayTax> */}
    </div>
  )
}
