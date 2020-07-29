import React, { useState, useEffect } from "react";
import "./inputbox.css";
import DisplayTax from "../displaytax.js";

export default function InputBox() {
  const [zipcode, setZipcode] = useState("");
  const [save, setSave] = useState(false);

  const [animation, setAnimation] = useState();

  const handleOnChange = (event) => {
    console.log("animation", animation);

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
      setTimeout(function () {
        setAnimation();
      }, 200);
      return text.slice(0, 5);
    }
    return text;
  }

  return (
    <div>
      <label>Zipcode &#160;</label>
      <input
        type="text"
        maxLength="5"
        value={zipcode}
        size="10"
        onChange={handleOnChange}
        onFocus={handleFocus}
      />
      <div>{zipcode}</div>
      {/* <button type="submit">Submit</button> */}

      {save ? "" : <button onClick={handleSubmit}>Submit</button>}
      {/* </form> */}
      <DisplayTax save={save} zipcode={zipcode}></DisplayTax>
    </div>
  );
}
