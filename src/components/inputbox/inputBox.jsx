import React, { useState, useEffect } from "react";
import "./inputbox.css";
import DisplayTax from "../displaytax.js";
/*global chrome*/

export default function InputBox({updateTax}) {


  const [zipcode, setZipcode] = useState("");
  const [save, setSave] = useState(false);
  useEffect(() => {
    chrome.storage.sync.get('currentTax', function(result) {
      console.log("get data is called");
        console.log('Value currently is ' + result.currentTax);
        console.log(result)
        console.log(result.currentTax)
        if (result.currentTax!==undefined){
          setZipcode(result.currentTax.zip);
          setSave(null);
          //updateTax(result.currentTax.rate);
        }
    });
   


  },[]);
  

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

  const handleFocus = (event) => {
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
    
    <div className = "zipcodeForm">
      <label>Zipcode &#160;</label>
      <input
        className = {animation}
        type="text"
        maxLength="6"
        height = "3"
        value={zipcode}
        size="10"
        onChange={handleOnChange}
        onFocus={handleFocus}
      />

      {/* <button type="submit">Submit</button> */}

      {save|| save===null ? "" : <button onClick={handleSubmit}>Submit</button>}
      {/* </form> */}
      <DisplayTax save={save} zipcode={zipcode} updateTax = {updateTax}></DisplayTax>
    </div>
  )
}
