import React from "react";
import LocationFinder from "./LocationFinder";
import openweather from "../api/openweather";
import WeatherDisplay from "./WeatherDisplay";
import './style.css';

const API_KEY = "2f0072f0de51ff5993adec2a060c0918";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {data: null};
    }

    weatherRequest = async (latitude, longitude) => {
        const response = await openweather.get(`weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`);
        console.log(response);
        return response;
    };

    getData = (data) => {
        this.setState({data});
        console.log(data);
    }

    render() {
        /*let weather = null;
        if (this.state.data !== null) {
            weather = this.state.data;
        }*/
        return (
            <div>
                <div className="ui sizer vertical segment">
                    <div className="ui huge center blue aligned header">
                        Weather App
                    </div>
                </div>
                <div className="ui center aligned container">
                    <div className="ui blue segment">
                        <LocationFinder weatherRequest={this.weatherRequest} getData={this.getData} />
                    </div>
                    <div className="ui blue segment">
                        <WeatherDisplay weather={this.state.data} />
                    </div>

                </div>
                <div className="ui blue footer segment" id="footer">
                    <div className="ui container">
                        Powered by Open Weather. Made by Vlad Ivanciu.
                    </div>
                </div>
            </div>
        );
    }
}

export default App;