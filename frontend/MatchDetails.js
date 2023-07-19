import React, { useState, useEffect } from 'react';  
import { Button} from 'reactstrap';
import LineChart from './lineChart'; 
import Summary from './summary';
import PieChart from './PieChart';

import {
  BrowserRouter,
  Switch,
  Route,
  useParams,
} from "react-router-dom";

function MatchDetails(){
    let {match_id} = useParams();
    const fetchdata = async (api) => {
        const res = await fetch(api)
        const json = await res.json();
        return json
    }

    
    const [team1, setTeam1] = useState([{}]);
    const [team2, setTeam2] = useState([{}]);
    const [info, setInfo] = useState([{}]);
    const [umpires, setUmpires] = useState([]);
    const [venue, setVenue] = useState([]);
    const [team1xi, setTeam1xi] = useState([]);
    const [team2xi, setTeam2xi] = useState([]);


    const id_match = match_id;
    const [batting1, setBatting1] = useState([]);
    const [bowling1, setBowling1] = useState([]);
    const [batting2, setBatting2] = useState([]);
    const [bowling2, setBowling2] = useState([]);
    const [season_year, setSeason_year] = useState([{}]);
    const [batters1, setBatters1] = useState([{},{},{}]);
    const [batters2, setBatters2] = useState([{},{},{}]);
    const [bowlers1, setBowlers1] = useState([{},{},{}]);
    const [bowlers2, setBowlers2] = useState([{},{},{}]);
    const [runs1, setRuns1] = useState([]);
    const [runs2, setRuns2] = useState([]);
    const [wickets1, setWickets1] = useState([]);
    const [wickets2, setWickets2] = useState([]);
    const [details, setDetails] = useState([{}]);


    const [state, setState] = useState({showChart: 0});



    const getChart = (value) => {
        setState({ showChart: value });
    }

    const hideChart = (value) => {
        setState({ showChart: 0 });
    }


    

    useEffect(() => {
        const api1 = `http://localhost:5000/match/${match_id}/team/1`;
        fetchdata(api1).then(data => {
            setTeam1(data)
        })
        const api2 = `http://localhost:5000/match/${match_id}/batting/1`;
        fetchdata(api2).then(data => {
            setBatting1(data)
        })
        const api3 = `http://localhost:5000/match/${match_id}/team/2`;
        fetchdata(api3).then(data => {
            setTeam2(data)
        })
        const api4 = `http://localhost:5000/match/${match_id}/bowling/1`;
        fetchdata(api4).then(data => {
            setBowling1(data)
        })
        const api5 = `http://localhost:5000/match/${match_id}/batting/2`;
        fetchdata(api5).then(data => {
            setBatting2(data)
        })
        const api6 = `http://localhost:5000/match/${match_id}/bowling/2`;
        fetchdata(api6).then(data => {
            setBowling2(data)
        })
        const api7 = `http://localhost:5000/match/${match_id}/details`;
        fetchdata(api7).then(data => {
            setInfo(data)
        })
        const api8 = `http://localhost:5000/match/${match_id}/umpires`;
        fetchdata(api8).then(data => {
            setUmpires(data)
        })
        const api9 = `http://localhost:5000/match/${match_id}/team1`;
        fetchdata(api9).then(data => {
            setTeam1xi(data)
        })
        const api10 = `http://localhost:5000/match/${match_id}/team2`;
        fetchdata(api10).then(data => {
            setTeam2xi(data)
        })

        const api11 = `http://localhost:5000/match/${match_id}/venue`;
        fetchdata(api11).then(data => {
            setVenue(data)
        })
        const api14= `http://localhost:5000/match/${match_id}/seasonyear`;
        fetchdata(api14).then(data => {
            setSeason_year(data)
        })
        const api15 = `http://localhost:5000/match/${match_id}/bat/1`;
        fetchdata(api15).then(data => {
            setBatters1(data)
        })
        const api16 = `http://localhost:5000/match/${match_id}/bat/2`;
        fetchdata(api16).then(data => {
            setBatters2(data)
        })
        const api17 = `http://localhost:5000/match/${match_id}/bowling/1`;
        fetchdata(api17).then(data => {
            setBowlers1(data)
        })
        const api18 = `http://localhost:5000/match/${match_id}/bowling/2`;
        fetchdata(api18).then(data => {
            setBowlers2(data)
        })
        const api19 = `http://localhost:5000/match/${match_id}/runs/1`;
        fetchdata(api19).then(data => {
            setRuns1(data)
        })
        const api20 = `http://localhost:5000/match/${match_id}/wickets/1`;
        fetchdata(api20).then(data => {
            setWickets1(data)
        })
        const api21 = `http://localhost:5000/match/${match_id}/runs/2`;
        fetchdata(api21).then(data => {
            setRuns2(data)
        })
        const api22 = `http://localhost:5000/match/${match_id}/wickets/2`;
        fetchdata(api22).then(data => {
            setWickets2(data)
        })
        const api23 = `http://localhost:5000/match/${match_id}/details`;
        fetchdata(api23).then(data => {
            setDetails(data)
        })
    }, [])


    var divArray1 = [];
    for (var i = 0; i < 3; i += 1) {
        divArray1.push(
            <div>
                <div id="left">
                    <a href = {`/players/${batters1[i].player_id}`}>
                            {batters1[i].player_name}
                    </a> 
                    <mi>
                        <b>{batters1[i].runs}</b>&nbsp;&nbsp;{batters1[i].balls}
                    </mi>
                </div>
                <div id="right">
                    <a href = {`/players/${bowlers1[i].player_id}`}>
                            {bowlers1[i].bowler}
                    </a> 
                    <mi>
                        <b>{bowlers1[i].wickets}-{bowlers1[i].runs_given}</b> {bowlers1[i].overs_bowled}.{parseInt(bowlers1[i].balls_bowled)%6}
                    </mi>
                </div>
            </div>
        );
    }

    var divs = document.getElementById('container2');
    var divArray2 = [];
    for (var i = 0; i < 3; i += 1) {
        divArray2.push(
            <div>
                <div id="left">
                    <a href = {`/players/${batters2[i].player_id}`}>
                            {batters2[i].player_name}
                    </a> 
                    <mi>
                        <b>{batters2[i].runs}</b>&nbsp;&nbsp;{batters2[i].balls}
                    </mi>
                </div>
                <div id="right">
                    <a href = {`/players/${bowlers2[i].player_id}`}>
                            {bowlers2[i].bowler}
                    </a> 
                    <mi>
                        <b>{bowlers2[i].wickets}-{bowlers2[i].runs_given}</b> {bowlers2[i].overs_bowled}.{parseInt(bowlers2[i].balls_bowled)%6}
                    </mi>
                </div>
            </div>
        );
    }

    


    return(
        <div>
            

            <div>
                <h1> Scorecard </h1>
                <right>
                    <Button onClick={() => getChart("d")}>
                    Score Comparison
                    </Button>
                    
                    &nbsp;&nbsp;
                    <Button onClick={() => getChart("p")}>
                    Pie Chart
                    </Button>
                </right>
                <LineChart m_id = {id_match}
                    show = {state.showChart === "d"}
                    onHide={() => hideChart("d")}
                />
                <Summary
                    show = {state.showChart === "s"}
                    onHide={() => hideChart("s")}
                />
                <PieChart m_id = {id_match}
                    show = {state.showChart === "p"}
                    onHide={() => hideChart("p")}
                />

                <main>
                    <main>
                        <h2>First Innings</h2>
                    </main>
                    {
                        team1.map((item) => (
                            <h4>
                                Batting({item.team_name})
                            </h4>
                        ))
                    }   
                    
                    <table class="table table-striped">
                        <tr  class="bg-info">
                            <th>Batter</th>
                            <th>Runs</th>
                            <th>Fours</th>
                            <th>Sixes</th>
                            <th>Balls faced</th>
                        </tr>

                        <tbody id="myTable">
                            {   
                                batting1.map((item) => (
                                    <tr>
                                    <td><a href = {`/players/${item.player_id}/`}>{item.batter}</a></td>
                                    <td>{item.runs}</td> 
                                    <td>{item.fours}</td> 
                                    <td>{item.sixes} </td> 
                                    <td>{item.balls_faced}</td> 
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    {
                        team2.map((item) => (
                            <h4>
                                Bowling({item.team_name})
                            </h4>
                        ))
                    }


                    <table class="table table-striped">
                        <tr  class="bg-info">
                            <th>Bowler</th>
                            <th>Balls Bowled</th>
                            <th>Runs given</th>
                            <th>Wickets</th>
                        </tr>

                        <tbody id="myTable">
                            {   
                                bowling1.map((item) => (
                                    <tr>
                                    <td><a href = {`/players/${item.player_id}/`}>{item.bowler}</a></td>
                                    <td>{item.balls_bowled}</td> 
                                    <td>{item.runs_given}</td> 
                                    <td>{item.wickets} </td> 
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <main>
                        <h2>Second Innings</h2>
                    </main>
                    {
                            <h4>
                                Batting({team2[0].team_name})
                            </h4>
                    }   
                    
                    <table class="table table-striped">
                        <tr  class="bg-info">
                            <th>Batter</th>
                            <th>Runs</th>
                            <th>Fours</th>
                            <th>Sixes</th>
                            <th>Balls faced</th>
                        </tr>

                        <tbody id="myTable">
                            {   
                                batting2.map((item) => (
                                    <tr>
                                    <td><a href = {`/players/${item.player_id}/`}>{item.batter}</a></td>
                                    <td>{item.runs}</td> 
                                    <td>{item.fours}</td> 
                                    <td>{item.sixes} </td> 
                                    <td>{item.balls_faced}</td> 
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    {
                        team1.map((item) => (
                            <h4>
                                Bowling({item.team_name})
                            </h4>
                        ))
                    }
                    <table class="table table-striped">
                        <tr  class="bg-info">
                            <th>Bowler</th>
                            <th>Balls Bowled</th>
                            <th>Runs given</th>
                            <th>Wickets</th>
                        </tr>

                        <tbody id="myTable">
                            {   
                                bowling2.map((item) => (
                                    <tr>
                                    <td><a href = {`/players/${item.player_id}/`}>{item.bowler}</a></td>
                                    <td>{item.balls_bowled}</td> 
                                    <td>{item.runs_given}</td> 
                                    <td>{item.wickets} </td> 
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>

                    <div id = 'vspace'></div>

                
                    <table class="table table-striped">
                        
                        <tr className="bg-info">
                            {/* <Text style={styles.italic}></Text> */}
                            <th><l><h5><b>MATCH SUMMARY</b></h5></l></th>
                            {/* <th>{match_id}, IPL {season_year.map((item) => item.season_year)}</th> */}
                        </tr>
                        <tr className="bg-info">
                            <th><l>{match_id}, IPL {season_year.map((item) => item.season_year)}</l></th>
                        </tr>
                        <tr className="bg-info">
                            <th><l>{team1.map((team) => team.team_name)}</l> <r>{runs1.map((item) => item.sum)}-{wickets1.map((item) => item.sum)} </r></th>
                        </tr>

                        {   
                            <tr>
                                <td>
                                    <div id="container1">
                                        {divArray1}
                                    </div>
                                </td>
                            </tr>
                            
                        }

                    
                        <tr className="bg-info">
                            <th><l>{team2.map((team) => team.team_name)}</l> <r>{runs2.map((item) => item.sum)}-{wickets2.map((item) => item.sum)} </r></th>
                        </tr>


                        {   
                            <tr>
                                <td>
                                    <div id="container2">
                                        {divArray2}
                                    </div>
                                </td>
                            </tr>
                            
                        }

                        <tr className="bg-info">
                            <th>{details[0].match_winner} won by {details[0].win_margin} {details[0].win_type}</th>
                        </tr>
                    </table>



                    <h1> Match-Info </h1>
                    {
                        info.map((item) => (
                            <div>
                                <b>Match:</b>
                                <br></br>
                                {item.match_id}, {item.team1} vs {item.team2}, {item.season_year}
                                <br></br>
                                <b>Toss: </b>
                                <br></br>
                                {item.toss_winner}
                                <br></br>
                                <b>Venue:</b> 
                                {
                                    venue.map((item) => (
                                        <h5>
                                            {item.venue_name}, {item.city_name}
                                        </h5>
                                    ))
                                }
                                <b>Umpires:</b>
                                {
                                    umpires.map((item) => (
                                        <h5>
                                            {item.umpire_name}
                                        </h5>
                                    ))
                                }
                                <b>Playing XI of {item.team1}</b>
                                {
                                    team1xi.map((item) => (
                                        <h5>
                                            {item.player_name}
                                        </h5>
                                    ))
                                }
                                <b>Playing XI of {item.team2}</b>
                                {
                                    team2xi.map((item) => (
                                        <h5>
                                            {item.player_name}
                                        </h5>
                                    ))
                                }
                                <br></br>

                            </div>
                        ))
                    } 
                </main>
                
            </div>
            <style jsx>{`
                h1{
                    text-align: center;
                }
                h2{
                    text-align: center;
                }
                main{
					margin: 0 auto;
                    width: 70%;
					text-align: center;
					z-index: 1;
				}
                right {
					color: rgb(256,0,0);
                    position: absolute;
					right: 100px;
					top: 9px;
				}
                #container{width:100%;}
                #left{float:left;width:50%;}
                #right{float:right;width:50%;}
                mi{
                    float: right;
                    margin-right: 50px;
                }
                r {
                    float: right;
                    margin-right: 50px;
                }
                l {
                    float: left;
                    margin-left: 50px;
                }
                #vspace{
                    height: 20px;
                }
            `}</style>
            
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"></link>
        </div>
            
    )
} 


export default MatchDetails;
