import React, { useState, useEffect} from "react";
import './inputbox.css';

export default function InputBox (){

    const [zipcode, setZipcode] = useState();
    const [save, setSave] = useState(false);

    const handleOnChange = (event) => {
        const input = event.currentTarget.value;
        setZipcode(onlyNum(input));

    }



    const handleSubmit = (event) =>{
        setSave(true);
    }



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
      
    return(
        <form className = "zipcodeForm" onSubmit = {handleSubmit}>

            <label>
                Zipcode &#160;
            </label>
            <input
                type = "text"
                maxLength = "5"
                value = {zipcode}
                size = '10'
                onChange = {handleOnChange}
            />
            <button type = "submit">
                Submit
            </button>

        </form>
    )
}