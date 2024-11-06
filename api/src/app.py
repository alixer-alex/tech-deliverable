from contextlib import asynccontextmanager
from datetime import datetime
from typing import AsyncIterator

from fastapi import FastAPI, Form, status
from fastapi.responses import RedirectResponse
from typing_extensions import TypedDict

from services.database import JSONDatabase


class Quote(TypedDict):
    name: str
    message: str
    time: str

database: JSONDatabase[list[Quote]] = JSONDatabase("C:\\Users\\azhua\OneDrive\Desktop\WebDevStuff\\tech-deliverable\\api\data\\database.json")


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    """Handle database management when running app."""
    if "quotes" not in database:
        print("Adding quotes entry to database")
        database["quotes"] = []

    yield

    database.close()


app = FastAPI(lifespan=lifespan)


@app.post("/quote")
def post_message(name: str = Form(), message: str = Form()) -> RedirectResponse:
    """
    Process a user submitting a new quote.
    You should not modify this function except for the return value.
    """
    now = datetime.now()
    quote = Quote(name=name, message=message, time=now.isoformat(timespec="seconds"))
    database["quotes"].append(quote)

    # You may modify the return value as needed to support other functionality
    return RedirectResponse("/", status.HTTP_303_SEE_OTHER)


# TODO: add another API route with a query parameter to retrieve quotes based on max age
@app.get("/query/")
async def find_message(year: str = "",month: str = "",day: str = "") -> JSON:
    
    res = {quotes:[]}
    quotes = database["quotes"]
    if year == "" and month == "" and day == "":
        #return all values
        for quote in quotes:
            res[quotes].append(quote)
    else:
        #return queried values
        for quote in quotes:
            quotetime = datetime.fromisoformat(quote["time"])
            querytime = datetime(int(year),int(month),int(day))
            if quotetime>querytime:
                res[quotes].append(quote)
    return res