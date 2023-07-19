import React from "react";

import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import MatchDetails from "./MatchDetails";
import Match from "./matches";
import PlayerDetails from "./Player_info";
import Pointstable from "./points_table";
import VenueDetails from "./VenueDetails";
import Venues from "./venues";
import Venue_add from "./Venue_add";
import Home from "./index";

export default function App() {
  return (

	
    <BrowserRouter>
		<div>
		{/* <div>
			<button>Hi</button>
		</div> */}
		  <Routes>
			  <Route exact path = "/matches/" element = {<Match/>}/>
			  <Route exact path = "/matches/:match_id" element = {<MatchDetails/>}/>
			  <Route exact path = "/players/:player_id" element = {<PlayerDetails/>}/>
			  <Route exact path = "/pointstable/:season_year" element = {<Pointstable/>}/>
			  <Route exact path = "/venues/" element = {<Venues/>}/>
			  <Route exact path = "/venues/:venue_id" element = {<VenueDetails/>}/>
			  <Route exact path = "/venues/add" element = {<Venue_add/>}/>
			  <Route exact path = "/" element = {<Home/>}/>

				


		  </Routes>
		</div>
    </BrowserRouter>
  );
}

