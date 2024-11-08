import { useState,useEffect } from "react";
export default function ListQuotes(){
    function Quotes(e){
		return <p>"{e.quote.message}"</p>
	}
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
    return(
        <div className="messages">
        <form className= "input" onSubmit = {handleRefreshQ} action="/query/" method="get">
            <label htmlFor="input-name">Year </label>
            <input type="month" name="month" id="input-month" />
            <button type="submit" className="submit">Submit </button>
        </form>
        {quotes.map((e)=><Quotes quote={e}/>)}
        </div>
    );
};