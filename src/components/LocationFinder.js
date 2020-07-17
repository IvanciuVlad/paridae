import React from "react";
import Spinner from "./Spinner";


class LocationFinder extends React.Component {
    state = {lat: null, long: null, errorMessage: ''}

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
                    <h1>{this.state.lat}</h1>
                    <h1>{this.state.long}</h1>
                </div>
            );
        }
        return <Spinner message="Accept the location request" />
    }

    render() {
        return (
            <div className="border red">
                {this.renderContent()}
            </div>
        );
    }
}

export default LocationFinder;