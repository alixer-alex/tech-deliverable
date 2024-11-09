import axios from 'axios'
import { useState,useEffect } from "react";
export default function Submit({name,  message, setName,setMessage, update, setUpdate}){

	useEffect(()=>{
		if(name != "" && message != ""){
			axios.post('/api/quote',{
				name: name,
				message:message
			})
			.then(function (response) {
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});
		}
        setUpdate(!update);
    }
        
		,[name,message])
		
	const handleRefresh = (e)=>{
		e.preventDefault();
		setName(e.target.name.value)
		setMessage(e.target.message.value)
		setQuery(query)
	}
    return(
        <form className= "input" onSubmit = {handleRefresh}>
				<label htmlFor="input-name">Name </label>
				<input type="text" name="name" id="input-name" required />
				<label htmlFor="input-message">  Quote  </label>
				<input type="text" name="message" id="input-message" required />
				<button type="submit" className="submit">Submit</button>
			</form>

    )
}