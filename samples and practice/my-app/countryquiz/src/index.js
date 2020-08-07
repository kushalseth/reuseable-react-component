import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CountryQuiz from './CountryQuiz';
import * as serviceWorker from './serviceWorker';
import { shuffle, sample } from "underscore";

const countries = [
    {
        name: "India",
        imageUrl: "images/flags/india.png",
        imageSource: "https://commons.wikimedia.org",
        capital: ["New Delhi", "Bangalore", "Mumbai", "Chennai"]
    },
    {
        name: "United States America",
        imageUrl: "images/flags/usa.png",
        imageSource: "https://commons.wikimedia.org",
        capital: ["New York", "Los Angeles", "Washington, D.C.", "Chicago"]
    },
    {
        name: "Singapore",
        imageUrl: "images/flags/singapore.png",
        imageSource: "https://commons.wikimedia.org",
        capital: ["Jurong East", "Kampong Glam", "Seletar", "Pulau Ujong"]
    },
    {
        name: "Japan",
        imageUrl: "images/flags/japan.png",
        imageSource: "https://commons.wikimedia.org",
        capital: ["Kyoto", "Tokyo", "Sapporo", "Osaka"]
    }
];

function getTurnData(countries) {
    const allcapitals = countries.reduce(function(p,c,i) {
        return p.concat(c.capital);
    }, []);

    const fourRandomCapitals = shuffle(allcapitals).slice(0,4);
    const answer = sample(fourRandomCapitals);

    return {
        country: countries.find((country) => country.capital.some((title) => title === answer)),
        capital: answer        
    };
}


const state = {
    turnData: getTurnData(countries)
}

ReactDOM.render(<CountryQuiz {...state} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
