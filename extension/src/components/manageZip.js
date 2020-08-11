import React, { useState, useEffect, createRef } from "react";
import "../App.css"


function EditCard(props){
	const [editing, changeEditState]= useState(false);
	const [zipcode, setZipcode] = useState(props.zipcode?props.zipcode:'')
	const [name, setName]= useState(props.name?props.name:'')

	const handleOnChange = (event) => {
		//console.log("animation", animation);
		const input = event.currentTarget.value;
		const returnInput = maxFive(input);
		setZipcode(onlyNum(returnInput));
	  };

	const handleNameChange = (event) =>{
		setName(event.currentTarget.value)
	}

	const onSave = (event) => {
		changeEditState(false)
	}

	const handleEditClicked = (event) =>{
		changeEditState(true)

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

  function maxFive(text) {
    if (text.length > 5) {
    //   setAnimation("shake");
    //   console.log("text is longer than 5 characters")
    //   console.log("animation 1:", animation);
    //   setTimeout(function () {
    //     setAnimation();
    //     console.log("animation 2:", animation);
    //   }, 200);
      return text.slice(0, 5);
    }
    return text;
  }

	if (props.zipcode ===null){
		changeEditState(true)
	}
	if (!editing){
		return (
		<div className="edit-zip-card">
		<label htmlFor="name">name:</label>
		<input name="name" className="card-input card-input-readonly" type="text" value={name} readOnly/>
		<label htmlFor="zip">zip code:</label>
		<input name="zip" type="text" className="card-input card-input-readonly" readOnly value={zipcode}/>
		<button onClick={handleEditClicked}>edit</button>
		<button>remove</button>
		</div>
		)}

	else {
	return(
		<div className="edit-zip-card">
		<label htmlFor="name">name:</label>
		<input name="name" className="card-input" type="text" value={props.name?props.name:''} onChange ={handleNameChange}/>
		<label htmlFor="zip">zip code:</label>
		<input name="zip" type="text" className="card-input" onChange={handleOnChange} value={zipcode}/>
		<button onClick={onSave}>save</button>
		<button>remove</button>
		</div>
	)}

	


}

export default function ManageZip(props) {
	let editZipList =[]
	useEffect(() => {
		
	},[props.editZipClick])

	const addEmpty = (event) =>{
		editZipList.push(<EditCard></EditCard>)
	}
	
	
	function make_editable_card(){
		let editZipList = []
		Object.keys(props.savedZip).forEach(index=>{
			const card = <EditCard key={index} zipcode={index} name={props.savedZip[index].name} ></EditCard>
			editZipList.push(card)
		})
		return editZipList
		
	}

	
	
	
	
	
	if (props.editZipClick){
		console.log(editZipList)
		
	return (
		<>
		<div className="edit-window">
			{make_editable_card()}
			<button>done</button>
			<button>cancel</button>
			<button onClick={addEmpty}>Add</button>
		</div>
		</>
	)}
	
	else{ return <div></div>}

}


