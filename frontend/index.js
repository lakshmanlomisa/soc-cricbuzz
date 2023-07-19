import React from 'react'
import App from './App'
import ReactDOM from 'react-dom';

export default function Home() {
  return (
    <div >
        

      <div id = 'main'>
        <h1>IPL CRIC INFO</h1>
        <mi>
        <a className="boxhead" href = {`/venues/add`}>
        <button style={{height: '60px',width: '220px'}}>
        <div >
            <h2> {"Add venue >"}</h2>
        </div>
        </button>
        </a>
        <div id = 'vspace'></div>


        <br></br>
        <a className="boxhead" href = {`/venues/`}>
        <button style={{height: '60px',width: '220px'}}>
        <div  >
            <h2> {"Venues >"} </h2>
        </div>
        </button>
        </a>

        
        <br></br>
        


        <div id = 'vspace'></div>


        <a className="boxhead" href = {`/matches/`}>
        <button style={{height: '60px',width: '220px'}}>
        <div >
            <h2> {"Matches >"} </h2>
        </div>
        </button>
        </a>
        <div id = 'vspace'></div>

        <br></br>

        <a className="boxhead" href = {`/pointstable/2011`}>
        <button style={{height: '60px',width: '220px'}}>
        <div  >
            <h2> {"Points table 2011 >"} </h2>
        </div>
        </button>
        </a>


        <br></br>


        <div id = 'vspace'></div>
        <a className="boxhead" href = {`/pointstable/2013`}>
        <button style={{height: '60px',width: '220px'}}>
        <div >
            <h2> {"Points table 2013 >"}</h2>
        </div>
        </button>
        </a>

        
        <div id = 'vspace'></div>

        <a className="boxhead" href = {`/pointstable/2015`}>
        <button style={{height: '60px',width: '220px'}}>
        <div  >
            <h2> {"Points table 2015 >"}</h2>
        </div>
        </button>
        </a>

        <br></br>

        <div id = 'vspace'></div>

        <a className="boxhead" href = {`/pointstable/2017`}>
        <button style={{height: '60px',width: '220px'}}>
        <div  >
            <h2> {"Points table 2017 >"}</h2>
        </div>
        </button>
        </a>

        <br></br>

        <div id = 'vspace'></div>

        {/* <a className="boxhead" href = {`/pointstable/2017`}>
        <button style={{height: '60px',width: '220px'}}>
        <div >
            <h2> {"Points table 2017 >"} </h2>
        </div>
        </button>
        </a> */}
        <br></br>

      </mi>

      </div>




      <style jsx>{`

                
                h1{
                    text-align: center;
                }
                h2{
                    text-align: center;
                }
                #main{
                  margin: 0 auto;
                  width: 40%;
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
                    margin-right: 50px;
                    margin-bottom: 20px;
                    margin-top: 20px;
                }
                
                #vspace{
                    height: 20px;
                }
            `}</style>


    </div>


        
  )
}
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
