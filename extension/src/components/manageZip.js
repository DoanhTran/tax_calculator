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
		setLocalSavedZip(savedZip)
	}

	const deletezip = (key) =>{
		delete savedZip[key]
		addEditZip(savedZip)
	}

	if (props.editZipClick){
		
		
	return (

		<>
		<div className="edit-window">
			<>{Object.keys(props.savedZip).map(key => {
			return <EditCard key={key} keyProp ={key} zipcode={props.savedZip[key].zip} name= {props.savedZip[key].name} editing={false} onSave={addEditZip} deletezip={deletezip}></EditCard>
			
		})}
			{adding?<EditCard key ={timeStamp} keyProp={timeStamp} zipcode={''} name={''} editing={true} onSave={onNewSave} deletezip={deletezip} onCancel={()=>{setAddingState(false)}}></EditCard>: <button onClick={addClick}>add</button> }
		
		</>
			{adding?'':<button onClick={()=>{props.closeEdit(savedZip)}}>done</button>}
			<button onClick={()=>{props.closeEdit()}}>close</button>
		</div>
		</>
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
		<label htmlFor="name">name:</label>
		<input name="name" className="card-input card-input-readonly" type="text" placeholder='name this zipcode' value={name} readOnly/>
		<label htmlFor="zip">zip code:</label>
		<input name="zip" type="text" className="card-input card-input-readonly" placeholder='zipcode xxxxx' readOnly value={zipcode}/>
		<button onClick={handleEditClicked}>edit</button>
		<button onClick={removeClicked}>remove</button>
		</div>
		)}

	else {
	return(
		<div className="edit-zip-card">
		<label htmlFor="name">name:</label>
		<input name="name" className="card-input" type="text" value={name}  placeholder='name this zipcode' onChange ={handleNameChange}/>
		<label htmlFor="zip">zip code:</label>
		<input name="zip" type="text" className="card-input" onChange={handleOnChange} placeholder='zipcode xxxxx' value={zipcode}/>
		<button onClick={onSave}>save</button>
		<button onClick={cancelClicked}>cancel</button>
		</div>
	)}

	


}

function SaveZipList(props){
	const [adding, setAddingState]= useState(false)
	const [timeStamp, setTimeStamp] = useState(0)
	const addClick = () =>{
		const time = new Date().getTime()
		setTimeStamp(time)
		setAddingState(true)

	}
	const onNewSave = (key, editedObj)=>{
		props.editLocalZip(key, editedObj)
		setAddingState(false)
		
	}
	return (
		<>
		
		<>{Object.keys(props.savedZip).map(key => {
			return <EditCard key={key} keyProp ={key} zipcode={props.savedZip[key].zip} name= {props.savedZip[key].name} editing={false} onSave={props.editLocalZip} deletezip={props.deletezip}></EditCard>
			
		})}</>
		{adding?<EditCard key ={timeStamp} keyProp={timeStamp} zipcode={''} name={''} editing={true} onSave={onNewSave} deletezip={props.deletezip} onCancel={()=>{setAddingState(false)}}></EditCard>: <button onClick={addClick}>add</button> }
		
		</>
	
	)

}
