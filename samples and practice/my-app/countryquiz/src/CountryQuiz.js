import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import "./bootstrap.min.css";


function Hero() {
  return (
    <div className="row">
      <div className="jumbotron col-10 offset-1">
        <h1> Country Quiz </h1>
        <p> Select the capital/flag of the country</p>
      </div>
    </div>
  );
}

function Book({title}) {
  return(
    <div className="answer">
      <h2>{ title }</h2>
    </div>
  )
}

function Turn({ country, capital }) {
  return (
    <div className="row" style={{ backgroundColor: "white" }}>
      <div className="col-4 offset-1" style={{ backgroundColor: "#eae5e5" }}>
        <img src={country.imageUrl} className="authorimage" class="flag" 
             alt="Country" style={{ width: 300, height: 200, margin: 94  }} />
      </div>

      <div className="col-6">
        {capital.map((title) => <Book title={title} key={title} />)}
      </div>
    </div>);
}

function Continue() {
  return (<div>

  </div>);
}

function Footer() {
  return (<div id="footer" className="row">
    <div className="col-10 offset-1" style={{ backgroundColor: "mintcream", marginTop: 20 }}>
      <p className="text-muted credit">
        Build on React with Love.
      </p>
    </div>
  </div>);
}


function CountryQuiz({ turnData }) {
  return (

    <div className="container-fluid">
      <Hero />
      <Turn {...turnData} />
      <Continue />
      <Footer />
    </div>
  );

}

export default CountryQuiz;
