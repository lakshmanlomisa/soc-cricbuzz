
import React, { useState, useEffect } from 'react';  
import { Button } from 'reactstrap';


class Venue_add extends React.Component {
    constructor(props){
      super(props);
  
      this.state = {
        fields: {},
        errors: {}
      }
    }

    
  
    handleValidation(){
      let fields = this.state.fields;
      let errors = {};
      let formIsValid = true;
  
      if(!fields["venue_name"]){
        formIsValid = false;
        errors["venue_name"] = "Cannot be empty";
      }
  
      if(typeof fields["venue_name"] !== "undefined"){
        if(!fields["venue_name"].match(/^[a-zA-Z ]+$/)){
          formIsValid = false;
          errors["venue_name"] = "Only letters";
        }      	
      }

      if(!fields["country_name"]){
        formIsValid = false;
        errors["country_name"] = "Cannot be empty";
      }
  
      if(typeof fields["country_name"] !== "undefined"){
        if(!fields["country_name"].match(/^[a-zA-Z ]+$/)){
          formIsValid = false;
          errors["country_name"] = "Only letters";
        }      	
      }

      if(!fields["city_name"]){
        formIsValid = false;
        errors["city_name"] = "Cannot be empty";
      }
  
      if(typeof fields["city_name"] !== "undefined"){
        if(!fields["city_name"].match(/^[a-zA-Z ]+$/)){
          formIsValid = false;
          errors["city_name"] = "Only letters";
        }      	
      }

      if(!fields["capacity"]){
        formIsValid = false;
        errors["capacity"] = "Cannot be empty";
      }
  
      if(typeof fields["capacity"] !== "undefined"){
        if(!fields["capacity"].match(/^[0-9]+$/)){
          formIsValid = false;
          errors["capacity"] = "Only numbers";
        }      	
      }
      
      this.setState({errors: errors});
      return formIsValid;
    }
  
    contactSubmit(e){
      e.preventDefault();
      // console.log(this.state.fields);

      if(this.handleValidation()){
        fetch('http://localhost:5000/venues/add', {  // Enter your IP address here
        headers: {'Content-Type':'application/json'},
        method: 'POST', 
        body: JSON.stringify(this.state.fields)
      })
        alert("VENUE ADDED");
      }else{
        alert("Form has errors.")
      }
  
    }
  
    handleChange(field, e){    		
      let fields = this.state.fields;
      fields[field] = e.target.value;        
      this.setState({fields});
    }
  
    render(){
      return (
        <div>        	
          <div id = 'vspace'></div>
          <div id = 'vspace'></div>

          <form name="contactform" className="contactform" onSubmit= {this.contactSubmit.bind(this)}>
            
            <div id="main">

              <h1>Add a new venue</h1>
              

              <fieldset>
                <div id = 'vspace'></div>
                <div id = 'vspace'></div>
                  <label>
                    VENUE NAME: <input type="text" size="30"  onChange={this.handleChange.bind(this, "venue_name")} value={this.state.fields["venue_name"]}/>
                    <span className="error">{this.state.errors["venue_name"]}</span>
                    <br/>
                  </label>
                  <div id = "vspace"></div>
                

                  <label>
                    COUNTRY NAME: <input type="text" size="30"  onChange={this.handleChange.bind(this, "country_name")} value={this.state.fields["country_name"]}/>
                    <span className="error">{this.state.errors["country_name"]}</span>
                    <br/>
                  </label>
                  <div id = "vspace"></div>

                  <label>
                    CITY NAME: <input  type="text" size="30" onChange={this.handleChange.bind(this, "city_name")} value={this.state.fields["city_name"]}/>
                    <span className="error">{this.state.errors["city_name"]}</span>
                    <br/>
                  </label>
                  <div id = "vspace"></div>


                  <label>
                    CAPACITY: <input  type="number" size="30" onChange={this.handleChange.bind(this, "capacity")} value={this.state.fields["capacity"]}/>
                    <span className="error">{this.state.errors["capacity"]}</span>
                    <br/>
                </label>    
                <div id = 'vspace'></div>
            
                <button className="btn info" id="submit" value="Submit">Add Venue</button>
                <br/>
                <br/>
              </fieldset>
              <div id = "vspace"></div>

                

                
            </div>
            
          </form>

          <div id = 'main'>

          <button className="btn info" >
            <a href = '/venues/' className='home'>
              Home
            </a>
          </button>
          </div>


          <style jsx>{`
              h3{
                  text-align: center;
              }
              .home{
                text-decoration: none;
              }
              #main{
                padding: 20px;
                margin: 0 auto;
                width: 50%;
                text-align: center;
                z-index: 1;
              }
              .error{
                margin-left: 5px;
                font-size: 13px;
                color: red;
              }
              #vspace {
                height: 30px;
              }
              .btn{
                padding: 10px;
                border: 1px solid #d8d8d8;
                background-color: #f9f9f9;
                border-radius: 3px;
              }
              .info {
                border-color: #2196F3;
                color: dodgerblue
              }
              
              .info:hover {
                background: #2196F3;
                color: white;
              }
              
            `}</style>
          
        </div>
      )
    }
  }
  
export default Venue_add;  