import React, { Component } from "react";
import "./lineChart.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import PropTypes from "prop-types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            labels: {
                fontSize: 6,
                // usePointStyle:true,
          }
        },
        title: {
            display: true,
        },
    },
    elements: {
        point:{
            radius: customRadius,
            display: true,
            pointBackgroundColor: 'rgb(255, 255, 255)'
        },
            
    },
    scales:{
        y:{
            title: {
                display: true,
                text: 'RUNS'
              }
        },
        x:{
            title: {
                display: true,
                text: 'OVERS'
              }
        }
    }
};
function customRadius( context )
{
    let index = context.dataIndex;
    let value = parseInt(context.dataset.wickets[index]);
    return value > 0 ?  4 : 0;
}


class LineChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            team1: [],
            team2: [],
            info: [],
            details: []
        };
        this.match_id = this.props.m_id;
        // console.log(this.match_id);
    }
    componentDidMount() {
        // const { id } = this.props.match.params;
        fetch(`http://localhost:5000/match/${this.match_id}/scorecomparison/team1`)
          .then((res) => res.json())
          .then((json) => {
            this.setState({
                team1: json
              });
            })
        fetch(`http://localhost:5000/match/${this.match_id}/details`)
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    info: json
                });
            })
        fetch(`http://localhost:5000/match/${this.match_id}/scorecomparison/team2`)
        .then((res) => res.json())
        .then((json) => {
            this.setState({
                team2: json
            });
            })
        fetch(`http://localhost:5000/match/${this.match_id}/details`)
        .then((res) => res.json())
        .then((json) => {
            this.setState({
                details: json
            });
            })
	  }
    
  render() {
    // const { match, location, history } = this.props;

    const { team1, team2, info, details } = this.state;
    const values1 =  [];
    const wickets1 =  [];
    const wickets2 =  [];
    const values2 =  [];
    var cum1 = 0;
    var cum2 = 0;
    var name1 = "";
    var name2 = "";


    for (var i=0; i < team1.length; i++) {
        cum1 = parseInt(cum1) + parseInt(team1[i].runs);
        values1.push(cum1);
        wickets1.push(team1[i].wickets);
    }
    for (var i=0; i < team2.length; i++) {
        cum2 = parseInt(cum2) + parseInt(team2[i].runs);
        values2.push(cum2);
        wickets2.push(team2[i].wickets);
    }
    for (var i=0; i < info.length; i++) {
        name1 = info[0].team1;
        name2 = info[0].team2;
    }
//    console.log(name1);
//    console.log(values2);

   
    const labels = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

    const data = {
      labels,
      datasets: [
        {
            wickets: wickets1,
            type: 'line',
            label: name1,
            data: values1,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },

        {
            wickets: wickets2,
            type: 'line',
            label: name2,
            data: values2,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    };
    return (
      <React.Fragment>
        {this.props.show && (
          <div className="chart">
            <div style= {{display: 'flex', justifyContent: 'right'}}>
                  <button onClick={this.props.onHide}>Close</button>
            </div>
      
            <Line options={options} data={data}/>
            <div style= {{display: 'flex', justifyContent: 'center'}}>
                <h2 > {details[0].match_winner} won by {details[0].win_margin} {details[0].win_type}</h2>
            </div>
            
          </div>
        )}
      </React.Fragment>

      
    );
  }
}

export default LineChart;
