import React from "react";
import Spinner from "./Spinner";

class LocationFinder extends React.Component {
    //state = {lat: null, long: null, errorMessage: ''}

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }


    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            (position => {this.setState({lat: position.coords.latitude, long: position.coords.longitude})}),
            (err) => {this.setState({errorMessage: err.message})});
        
    }

    renderContent() {
        console.log(this.state.lat);
        console.log(this.state.long);
        console.log(" ");
        if ((!this.state.lat || !this.state.long) && this.state.errorMessage) {
            return <div>Error: {this.state.errorMessage}</div>
        }

        if ((this.state.lat && this.state.long) && !this.state.errorMessage) {
            return (
                <div>
                    <h3>{this.state.lat}</h3>
                    <h3>{this.state.long}</h3>
                </div>
            );
        }
        return <Spinner message="Accept the location request" />
    }

    render() {
        return (
            <div>
                {this.renderContent()}
                <h1>Weather data</h1>
                {() => this.props.weatherRequest(this.state.lat, this.state.long)}
            </div>
        );
    }
}

export default LocationFinder;