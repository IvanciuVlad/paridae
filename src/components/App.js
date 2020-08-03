import React from "react";
import LocationFinder from "./LocationFinder";
import openweather from "../api/openweather";

const API_KEY = "2f0072f0de51ff5993adec2a060c0918";

class App extends React.Component {
    state = {lat: null, long: null, errorMessage: ''};

    weatherRequest = async (latitude, longitude) => {
        const response = await openweather.get(`weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`);
        console.log(response);
    };


    render() {
        return (
            <div className="ui container">
                <h1>Location data</h1>
                <LocationFinder weatherRequest={this.weatherRequest} />
            </div>
        );
    }
}

export default App;