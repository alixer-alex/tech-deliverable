import "./App.css";
import { useState,useEffect } from "react";


function App() {
	const [quotes, setQuotes] = useState([])
	useEffect(()=>{
		console.log()
	  }
	  ,[quotes])

	const handleRefreshQ = (e)=>{
		console.log(e.month);
		fetch('/api/query/?monthYear='+ e.target.month.value)
		.then(res=>res.json()
		.then(data=>{
			setQuotes(JSON.parse(data.quotes))
			console.log("hello")
			console.log(quotes)
		}));
	}
	
	const handleRefresh = (e)=>{
		e.preventDefault();
	}
	
	function Message(d) {

		return (<>

			<p>{d.quote}</p>
		</>)
	}
	function Messages() {
		
		return (<>
			{quotes.map((e)=><Message quote={e}/>)}
		</>)
	}
	return (
		<div className="App">
			{/* TODO: include an icon for the quote book */}
			<h1>Hack at UCI Tech Deliverable</h1>
			<img src="./quotebook.png"/>
			<h2>Submit a quote</h2>
			{/* TODO: implement custom form submission logic to not refresh the page */}
			<form onSubmit = {handleRefresh} action="/api/quote" method="post">
				<label htmlFor="input-name">Name</label>
				<input type="text" name="name" id="input-name" required />
				<label htmlFor="input-message">Quote</label>
				<input type="text" name="message" id="input-message" required />
				<button type="submit">Submit</button>
			</form>

			<h2>Previous Quotes</h2>
			{/* TODO: Display the actual quotes from the database */}
			<div className="messages">
				<form onSubmit = {handleRefreshQ} action="/query/" method="get">
					<label htmlFor="input-name">Year</label>
					<input type="month" name="month" id="input-month" />
					<button type="submit">Submit</button>
				</form>
				<Messages />
			</div>
		</div>
	);
}

export default App;
