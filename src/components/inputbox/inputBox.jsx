import React, { useState, useEffect} from "react";
import './inputbox.css';

export default function InputBox (){

    const [zipcode, setZipcode] = useState();
    const [save, setSave] = useState(false);
    const [animation, setAnimation] = useState();

    const handleOnChange = (event) => {
     
        console.log("animation", animation);
        
        const input = event.currentTarget.value;
        const returnInput = maxFive(input);
        setZipcode(onlyNum(returnInput));

    }



    const handleSubmit = (event) =>{
        setSave(true);
    }



    /* Extract only numbers out of input
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

    function maxFive(text){

        if (text.length > 5){
            setAnimation('shake');
            setTimeout(function() {
                setAnimation();
            }, 200);
            return text.slice(0,5);
        }
        return text;
    }
      
    return(
        <form className = "zipcodeForm" onSubmit = {handleSubmit}>

            <label>
                Zipcode &#160;
            </label>
            <input
                className ={animation}
                type = "text"
                maxLength = "6"
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
