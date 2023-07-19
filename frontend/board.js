import React, { useState, useEffect } from 'react';  

import {
    BrowserRouter,
    Switch,
    Route,
    useParams,
  } from "react-router-dom";
import PieChart from './PieChart';


function Board(){
    let {match_id} = useParams();
    const [team1, setTeam1] = useState([]);
    const [team2, setTeam2] = useState([]);
    const [season_year, setSeason_year] = useState([]);
    const [batters1, setBatters1] = useState([]);
    const [batters2, setBatters2] = useState([]);
    const [bowlers1, setBowlers1] = useState([]);
    const [bowlers2, setBowlers2] = useState([]);
    const [runs1, setRuns1] = useState([]);
    const [runs2, setRuns2] = useState([]);
    const [wickets1, setWickets1] = useState([]);
    const [wickets2, setWickets2] = useState([]);
    const [details, setDetails] = useState([]);
    const DataisLoaded = false;



    const fetchdata = async (api) => {
        const res = await fetch(api)
        const json = await res.json();
        return json
    }


    useEffect(async () => {
        const api1 = `http://localhost:5000/match/${match_id}/team/1`;
        await fetchdata(api1).then(data => {
            setTeam1(data)
        })
        const api2 = `http://localhost:5000/match/${match_id}/team/2`;
        await fetchdata(api2).then(data => {
            setTeam2(data)
        })
        const api3 = `http://localhost:5000/match/${match_id}/seasonyear`;
        await fetchdata(api3).then(data => {
            setSeason_year(data)
        })
        const api4 = `http://localhost:5000/match/${match_id}/bat/1`;
        await fetchdata(api4).then(data => {
            setBatters1(data)
        })
        const api5 = `http://localhost:5000/match/${match_id}/bat/2`;
        await fetchdata(api5).then(data => {
            setBatters2(data)
        })
        const api6 = `http://localhost:5000/match/${match_id}/bowling/1`;
        await fetchdata(api6).then(data => {
            setBowlers1(data)
        })
        const api7 = `http://localhost:5000/match/${match_id}/bowling/2`;
        await fetchdata(api7).then(data => {
            setBowlers2(data)
        })
        const api8 = `http://localhost:5000/match/${match_id}/runs/1`;
        await fetchdata(api8).then(data => {
            setRuns1(data)
        })
        const api9 = `http://localhost:5000/match/${match_id}/wickets/1`;
        await fetchdata(api9).then(data => {
            setWickets1(data)
        })
        const api10 = `http://localhost:5000/match/${match_id}/runs/2`;
        await fetchdata(api10).then(data => {
            setRuns2(data)
        })
        const api11 = `http://localhost:5000/match/${match_id}/wickets/2`;
        await fetchdata(api11).then(data => {
            setWickets2(data)
        })
        const api12 = `http://localhost:5000/match/${match_id}/details`;
        await fetchdata(api12).then(data => {
            setDetails(data)
        })
        DataisLoaded = true;
    }, [])

    var divs = document.getElementById('container1');
    var divArray1 = [];
    for (var i = 0; i < 3; i += 1) {
        divArray1.push(
            <div>
                <div id="left">
                    <a href = {`player/${batters1[i].player_id}/info`}>
                            {batters1[i].player_name}
                    </a> 
                    <mi>
                        <b>{batters1[i].runs}</b>&nbsp;&nbsp;{batters1[i].balls}
                    </mi>
                </div>
                <div id="right">
                    <a href = {`player/${bowlers1[i].player_id}/info`}>
                            {bowlers1[i].bowler}
                    </a> 
                    <mi>
                        <b>{bowlers1[i].wickets}-{bowlers1[i].runs_given}</b> {bowlers1[i].overs_bowled}.{bowlers1[i].balls_bowled}
                    </mi>
                </div>
            </div>
        );
    }

    // var divs = document.getElementById('container2');
    // var divArray2 = [];
    // for (var i = 0; i < 3; i += 1) {
    //     divArray2.push(
    //         <div>
    //             <div id="left">
    //                 <a href = {`http://localhost:5000/player/${batters2[{i}].player_id}/info`}>
    //                         {batters2[i].player_name}
    //                 </a> 
    //                 <mi>
    //                     <b>{batters2[i].runs}</b>&nbsp;&nbsp;{batters2[i].balls}
    //                 </mi>
    //             </div>
    //             <div id="right">
    //                 <a href = {`http://localhost:5000/player/${bowlers2[i].player_id}/info`}>
    //                         {bowlers2[i].bowler}
    //                 </a> 
    //                 <mi>
    //                     <b>{bowlers2[i].wickets}-{bowlers2[i].runs_given}</b> {bowlers2[i].overs_bowled}.{bowlers2[i].balls_bowled}
    //                 </mi>
    //             </div>
    //         </div>
    //     );
    // }
    if (!DataisLoaded) {
        console.log("jj");
        return( 
            <div>
            <h1> Loading.... </h1> 
            </div>
        )
    }

    return (
		
        <div>
            
            {/* <div >
                {divArray1}
            </div> */}
        
                        
            <table className="table table-striped">
                
                <tbody id="myTable">
                    <tr className="bg-info">
                        <th><h5><b>MATCH SUMMARY</b></h5></th>
                    </tr>
                    <tr className="bg-info">
                        <th>{match_id}, IPL {season_year[0].season_year}</th>
                    </tr>
                    <tr className="bg-info">
                        <th>{team1[0].team_name} <r> {runs1[0].sum}-{wickets1[0].sum} </r></th>
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
                        <th>{team2[0].team_name} <r> {runs2[0].sum}-{wickets2[0].sum} </r></th>
                    </tr>


                    {/* {   
                        <tr>
                            <td>
                                <div id="container2">
                                    {divArray2}
                                </div>
                            </td>
                        </tr>
                        
                    } */}
                    <tr className="bg-info">
                        <th>{details[0].match_winner} won by {details[0].win_margin} {details[0].win_type}</th>
                    </tr>
                </tbody>
                
            </table>
            

            <style jsx>{`
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
                .space{
                    width: 10%;
                }
            `}</style>

        </div>

                

            
    )
}

export default Board;