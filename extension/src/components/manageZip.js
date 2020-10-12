import React, { useState, useEffect, createRef } from "react";
import "../App.css"

export default function ManageZip(props) {
	const [adding, setAddingState]= useState(false)
	const [timeStamp, setTimeStamp] = useState(0)
	const [savedZip, setLocalSavedZip] = useState({})
	

	const addClick = () =>{
		const time = new Date().getTime()
		setTimeStamp(time)
		setAddingState(true)

	}
	const onNewSave = (key, editedObj)=>{
		addEditZip(key, editedObj)
		setAddingState(false)
		
	}
	
	useEffect(() => {
		if (props.editZipClick){

			setLocalSavedZip(props.savedZip)
		}
	},[props.editZipClick])

	const addEditZip = (zip, editedObj)=> {
		
		savedZip[zip] = editedObj
		const edit =  {}
		Object.assign(edit, savedZip)
		setLocalSavedZip(edit)
	}

	const deletezip = (key) =>{
	
		
		const edit =  {}
		delete savedZip[key]
		Object.assign(edit, savedZip)
		setLocalSavedZip(edit)
	}

	if (props.editZipClick){
		
		
	return (

		<div className="edit-window">
			<div className="edit-header"><button className="back-button" onClick={()=>{props.closeEdit(savedZip)}}>Back</button><div className="fill-space"></div><div className="enable-text">Manage Your Zip Code</div></div>
			<div className="divider"></div>
			
			<>{Object.keys(savedZip).map(key => {
			return <EditCard key={key} keyProp ={key} zipcode={savedZip[key].zip} name= {savedZip[key].name} editing={false} onSave={addEditZip} deletezip={deletezip} ></EditCard>
			
		})}
			{adding?<EditCard key ={timeStamp} keyProp={timeStamp} zipcode={''} name={''} editing={true} onSave={onNewSave} deletezip={deletezip} onCancel={()=>{setAddingState(false)}} ></EditCard>: ""}
			{!adding? <button className="primary-button" onClick={addClick}>Add Zip Code</button>:""}

		
		</>
		</div>
		
	)}
	
	else{ return null}

}



function EditCard(props){
	const [editing, changeEditState]= useState(props.editing);
	const [zipcode, setZipcode] = useState(props.zipcode?props.zipcode:'')
	const [name, setName]= useState(props.name?props.name:'')


	const handleOnChange = (event) => {
		const input = event.currentTarget.value;
		const returnInput = maxFive(input);
		setZipcode(onlyNum(returnInput));
	  };

	const handleNameChange = (event) =>{
		const input = event.currentTarget.value;
		setName(input)
	}

	const onSave = (event) => {
		if(zipcode !==''){
		
		props.onSave(props.keyProp, {name:name, zip:zipcode})
		changeEditState(false)
		}
		else{window.alert("zipcode can not be empty")// need a better way to show this}
	}
}

	const removeClicked = (event) =>{
		console.log(props.keyProp)
		props.deletezip(props.keyProp)
	}

	const cancelClicked = (event) =>{
		setZipcode(props.zipcode)
		setName(props.name)
		if(props.onCancel)props.onCancel();
		
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
		<div className="button-icon"><button className="edit-button icon-btn" onClick={handleEditClicked}></button>
		<button onClick={removeClicked} className="remove-button icon-btn"></button></div>
		<label htmlFor="name" className="name-label enable-text">name:</label>
		<input name="name" className="card-input name-input card-input-readonly" type="text" placeholder='name this place' value={name} readOnly/>
		<label htmlFor="zip" className="zip-label enable-text">zip code:</label>
		<input name="zip" type="text" className="card-input zip-card-input card-input-readonly" placeholder='zipcode' readOnly value={zipcode}/>
		
		</div>
		)}

	else {
	return(
		<div className="edit-zip-card">
			<div className="button-icon"><button className="cancel-button danger-button" onClick={cancelClicked}>Cancel</button></div>
		<label htmlFor="name" className="name-label enable-text">name:</label>
		<input name="name" className="card-input name-input" type="text" value={name}  placeholder='name this' onChange ={handleNameChange}/>
		<label htmlFor="zip" className="zip-label enable-text">zip code:</label>
		<input name="zip" type="text" className="card-input zip-card-input" onChange={handleOnChange} placeholder='zipcode' value={zipcode}/>
		<button onClick={onSave} className="edit-save primary-button">Save</button>
		
		</div>
	)}
}
