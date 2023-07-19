import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';
import "./lineChart.css";
import {
    BrowserRouter,
    Switch,
    Route,
    useParams,
} from "react-router-dom";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);
export const options = {

    responsive: true,
    maintainAspectRatio: true,
    plugins: {
        legend: {
            position: 'top',
            labels: {
                usePointStyle: true,
                pointStyle: 'circle',
            }
        },
        title: {
            display: true,
            text: 'Chart.js Pie Chart'
        }
    }
};

function PlayerInfo() {
    let { player_id } = useParams();
    const fetchdata = async (api) => {
        const res = await fetch(api)
        const json = await res.json();
        return json
    }
    const [info, setInfo] = useState([]);
    const [carrer, setCarrer] = useState([]);
    const [bowlcarrer, setBowlcarrer] = useState([]);
    const [stats, setStats] = useState([]);
    const [bowlstats, setBowlstats] = useState([]);



    useEffect(() => {
        const api1 = `http://localhost:5000/player/${player_id}/info`;
        fetchdata(api1).then(data => {
            setInfo(data)
        })
        const api2 = `http://localhost:5000/player/${player_id}/battingcarrer`;
        fetchdata(api2).then(data => {
            setCarrer(data)
        })
        const api3 = `http://localhost:5000/player/${player_id}/battingstats`;
        fetchdata(api3).then(data => {
            setStats(data)
        })
        const api4 = `http://localhost:5000/player/${player_id}/bowlingcarrer`;
        fetchdata(api4).then(data => {
            setBowlcarrer(data)
        })
        const api5 = `http://localhost:5000/player/${player_id}/bowlingstats`;
        fetchdata(api5).then(data => {
            setBowlstats(data)
        })
    }, [])



    const options = {
        maintainAspectRatio: true,

        elements: {
            height: '100px',
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'RUNS'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'MATCH_ID'
                }
            }
        },
        legend: {
            display: false,
        }

    };
    const labels = [];
    const runs = [];
    for (var i = 0; i < stats.length; i++) {
        labels.push(stats[i].match_id);
        runs.push(stats[i].runs);
    }
    // console.log(labels);
    // console.log(runs);

    function bgcolour(context) {
        // console.log(context);
        let index = context.dataIndex;
        let value = parseInt(context.dataset.data[index]);
        if (value < 30) return "magenta";
        if (value < 50) return "#008ae6";
        return "red";
    };



    const data = {
        // Name of the variables on x-axies for each bar
        labels: labels,
        datasets: [
            {
                // Label for bars
                label: "Runs",
                // Data or value of your each variable
                data: runs,
                // Color of each bar
                backgroundColor: bgcolour,
                borderWidth: 0.5,
            },
        ],
    };

    const labels1 = [];
    const lines = [];
    const bars = [];
    for (var i = 0; i < bowlstats.length; i++) {
        labels1.push(bowlstats[i].match_id);
        lines.push(bowlstats[i].wickets);
        bars.push(bowlstats[i].runs_given);
    }

    const options1 = {
        maintainAspectRatio: true,
        elements: {
            height: '100px',
            pointStyle: 'rectRounded'
        },
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    pointStyle: ['circle'],
                }
            },
            datalabels: {
                anchor: 'end',
                align: 'top',
                font: {
                    weight: 'bold'
                }
            }
        },
        scales: {
            "y1": {

                // id: 'RUNS',
                title: {
                    display: true,
                    text: 'RUNS'
                },
                position: 'left',
            },
            "y2": {
                // id: 'WICKETS',
                title: {
                    display: true,
                    text: 'WICKETS'
                },
                position: 'right',
            },
            xAxes: {
                title: {
                    display: true,
                    text: 'MATCH_ID'
                }
            }
        },

        legend: {
            display: false,
        },
    }

    const stackdata = {
        // Name of the variables on x-axies for each bar
        labels: labels1,
        datasets: [
            {
                order: 2,
                yAxisID: 'y1',
                label: 'runs',
                data: bars,
                pointStyle: 'rect',
                backgroundColor: "#33CCCC",
                type: 'bar'
            },
            {
                yAxisID: 'y2',
                order: 1,
                data: lines,
                label: 'wickets',
                backgroundColor: "red",
                type: 'line',
                // stack: 'combined'
            }
        ],
    };





    return (

        <div>
            <main>

                <div>

                    <h3>PLAYER'S BASIC INFO</h3>

                    {
                        <table class="table table-striped">
                            <tr class="bg-info">
                                <th>Player name</th>
                                <th>Country name</th>
                                <th>Batting Hand</th>
                                <th>Bowling Hand</th>
                            </tr>

                            <tbody id="myTable">
                                {
                                    info.map((item) => (
                                        <tr>
                                            <td>{item.player_name}</td>
                                            <td>{item.country_name}</td>
                                            <td>{item.batting_hand}</td>
                                            <td>{item.bowling_skill} </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    }

                </div>

                <div id="vspace"></div>

                <h3>PLAYER'S BATTING STATISTICS</h3>
                <div style={{ float: "center" }} >
                    <Bar data={data} options={options} />
                </div>

                <div id="vspace"></div>

                <div>

                    <h3>PLAYER'S BATTING CAREER</h3>

                    {
                        <table class="table table-striped">
                            <tr class="bg-info">
                                <th>Matches</th>
                                <th>Runs</th>
                                <th>Four</th>
                                <th>Six</th>
                                <th>Fifty</th>
                                <th>HS</th>
                                <th>Strike Rate</th>
                                <th>Average</th>

                            </tr>

                            <tbody id="myTable">
                                {
                                    carrer.map((item) => (
                                        <tr>
                                            <td>{item.matches}</td>
                                            <td>{item.runs}</td>
                                            <td>{item.four}</td>
                                            <td>{item.six} </td>
                                            <td>{item.fifty} </td>
                                            <td>{item.hs} </td>
                                            <td>{item.strike_rate} </td>
                                            <td>{item.average} </td>

                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    }
                </div>

                <div id="vspace"></div>

                <div>
                    <h3>PLAYER'S BOWLING CAREER</h3>
                    {
                        <table class="table table-striped">
                            <tr class="bg-info">
                                <th>Matches</th>
                                <th>Runs</th>
                                <th>wickets</th>
                                <th>overs</th>
                                <th>balls</th>
                                <th>Economy</th>
                                <th>Five Wickets</th>

                            </tr>

                            <tbody id="myTable">
                                {
                                    bowlcarrer.map((item) => (
                                        <tr>
                                            <td>{item.matches}</td>
                                            <td>{item.runs}</td>
                                            <td>{item.wickets}</td>
                                            <td>{item.overs} </td>
                                            <td>{item.balls} </td>
                                            <td>{item.economy} </td>
                                            <td>{item.five_wickets} </td>

                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    }
                </div>

                <div id="vspace"></div>

                <h3>PLAYER'S BOWLING STATISTICS</h3>
                <div style={{ float: "center" }} >
                    <Bar data={stackdata} options={options1} />
                </div>
            </main>

            <style jsx>{`
                h3{
                    text-align: center;
                }
                h3{
                    text-align: center;
                }
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
            <script src="chartjs-plugin-datalabels.js"></script>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"></link>

        </div>

    )
}
export default PlayerInfo;