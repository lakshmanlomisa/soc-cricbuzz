import React, { useState, useEffect } from 'react';  
import { Bar } from 'react-chartjs-2';
import "./lineChart.css";
import {
    BrowserRouter,
    Switch,
    Route,
    useParams,
  } from "react-router-dom";

export const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Pie Chart'
      }
    }
  };

function Pointstable(){
    let {season_year} = useParams();
    const fetchdata = async (api) => {
        const res = await fetch(api)
        const json = await res.json();
        return json
    }
    const [table, setTable] = useState([]);
    
    useEffect(() => {
        const api1 = `http://localhost:5000/pointstable/${season_year}`;
        fetchdata(api1).then(data => {
            setTable(data)
        })
    }, [])

    return(

        <div>
            <div>
            <main>

            <h1>POINTS TABLE</h1>

                {
                    <table class="table table-striped">
                        <tr  class="bg-info">
                            <th>Team name</th>
                            <th>Matches</th>
                            <th>Won</th>
                            <th>Lost</th>
                            <th>Tied</th>
                            <th>NR</th>
                            <th>Points</th>

                        </tr>

                        <tbody id="myTable">
                            {   
                                table.map((item) => (
                                    <tr>
                                    <td>{item.team_name}</td>
                                    <td>{item.matches}</td> 
                                    <td>{item.win}</td> 
                                    <td>{item.lost} </td> 
                                    <td>0 </td> 
                                    <td>{item.nrr} </td> 
                                    <td>{item.points} </td> 
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                }

            </main>
            
            </div>
            <style jsx>{`
                
                main{
					margin: 0 auto;
                    width: 70%;
					text-align: center;
					z-index: 1;
				}
                #vspace {
					height: 50px;
				}
            `}</style>

            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"></link>
        </div>
    )
}

export default Pointstable;