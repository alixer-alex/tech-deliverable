import "./App.css";
import { useState,useEffect } from "react";


function App() {
	const [query, setQuery] = useState("");
	const [quotes, setQuotes] = useState([]);
	useEffect(()=>{
		fetch('/api/query/?monthYear='+ query )
		.then(res=>res.json()
		.then(data=>{
			setQuotes(data.quotes)
		}));
	  }
	  ,[query])

	const handleRefreshQ = (e)=>{
		e.preventDefault();
		setQuery(e.target.month.value)

	}
	
	const handleRefresh = (e)=>{
		e.preventDefault();
	}
	function Quotes(e){
		return <p>"{e.quote.message}"</p>
	}
	return (
		<div className="App">
			{/* TODO: include an icon for the quote book */}
			<img src="./quotebook.png" className="image"/>
			<h1>Hack at UCI Tech Deliverable</h1>
			<h2>Submit a quote</h2>
			{/* TODO: implement custom form submission logic to not refresh the page */}
			<form className= "input" onSubmit = {handleRefresh} action="/api/quote" method="post">
				<label htmlFor="input-name">Name </label>
				<input type="text" name="name" id="input-name" required />
				<label htmlFor="input-message">  Quote  </label>
				<input type="text" name="message" id="input-message" required />
				<button type="submit" className="submit">Submit</button>
			</form>

			<h2>Previous Quotes</h2>
			{/* TODO: Display the actual quotes from the database */}
			<div className="messages">
				<form className= "input" onSubmit = {handleRefreshQ} action="/query/" method="get">
					<label htmlFor="input-name">Year </label>
					<input type="month" name="month" id="input-month" />
					<button type="submit" className="submit">Submit </button>
				</form>
				{quotes.map((e)=><Quotes quote={e}/>)}
			</div>
		</div>
	);
}

export default App;
