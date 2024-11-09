import "./App.css";
import "./quotes.jsx"
import ListQuotes from "./quotes.jsx";
import { useState,useEffect } from "react";
import Submit from "./submit.jsx";
function App() {
	const [name,setName] = useState("")
	const [message,setMessage] = useState("")
    const [query, setQuery] = useState("");
	const [quotes, setQuotes] = useState([]);
	const [update, setUpdate] = useState(false);
	return (
		<div className="App">
			{/* TODO: include an icon for the quote book */}
			<img src="./quotebook.png" className="image"/>
			<h1>Hack at UCI Tech Deliverable</h1>
			<h2>Submit a quote</h2>
			{/* TODO: implement custom form submission logic to not refresh the page */}
			<Submit  name={name} message={message} setName = {setName} setMessage={setMessage} update={update} setUpdate={setUpdate} />
			<h2>Previous Quotes</h2>
			{/* TODO: Display the actual quotes from the database */}
			<ListQuotes query = {query} setQuery={setQuery} quotes={quotes} setQuotes={setQuotes} update={update} setUpdate={setUpdate}/>
		</div>
	);
}

export default App;
