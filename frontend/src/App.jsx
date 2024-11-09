import "./App.css";
import "./quotes.jsx"
import ListQuotes from "./quotes.jsx";
import axios from 'axios'
import { useState,useEffect } from "react";
function App() {
	const [name,setName] = useState("")
	const [message,setMessage] = useState("")
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
		}}
		,[name,message])
		
	const handleRefresh = (e)=>{
		
		console.log(e.target.message.value)
		setName(e.target.name.value)
		setMessage(e.target.message.value)
		
	}

	return (
		<div className="App">
			{/* TODO: include an icon for the quote book */}
			<img src="./quotebook.png" className="image"/>
			<h1>Hack at UCI Tech Deliverable</h1>
			<h2>Submit a quote</h2>
			{/* TODO: implement custom form submission logic to not refresh the page */}
			<form className= "input" onSubmit = {handleRefresh}>
				<label htmlFor="input-name">Name </label>
				<input type="text" name="name" id="input-name" required />
				<label htmlFor="input-message">  Quote  </label>
				<input type="text" name="message" id="input-message" required />
				<button type="submit" className="submit">Submit</button>
			</form>

			<h2>Previous Quotes</h2>
			{/* TODO: Display the actual quotes from the database */}
			<ListQuotes />
		</div>
	);
}

export default App;
