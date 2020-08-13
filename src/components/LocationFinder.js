import React from "react";

class LocationFinder extends React.Component {
    state = {lat: null, long: null, errorMessage: '', city: '', sunrise: null, sunset: null}

    //  Includes the api request for both the geolocation request and the weather call with the aforementioned location

    async componentDidMount() {
        await window.navigator.geolocation.getCurrentPosition(
            (async position => {
                this.setState({lat: position.coords.latitude, long: position.coords.longitude});
                const response = await this.props.weatherRequest(position.coords.latitude, position.coords.longitude);
                this.setState({
                    city: response.data.name,
                    sunrise: response.data.sys.sunrise,
                    sunset: response.data.sys.sunset
                })
                this.props.getData(response.data);
            }),
            (err) => {
                this.setState({errorMessage: err.message})
            });
    }

    // Checking the validity of the geolocation call and rendering a table which includes the location, city and  the time of sunrise and sunset of that city

    renderContent() {
        console.log(this.state.lat);
        console.log(this.state.long);
        if ((!this.state.lat || !this.state.long) && this.state.errorMessage) {
            return <div>Error: {this.state.errorMessage}</div>
        }


        // The time is received in UNIX time, so we convert it to Date objects and then local time

        if ((this.state.lat && this.state.long) && !this.state.errorMessage) {
            let sunrise = new Date(this.state.sunrise * 1000);
            let sunset = new Date(this.state.sunset * 1000);
            return (
                <div>
                    <h3 className="ui horizontal blue divider header">
                        <i className="globe icon"/>
                        Location
                    </h3>
                    <table className="ui definition table">
                        <tbody>
                        <tr>
                            <td className="two wide column">Latitude</td>
                            <td>{(this.state.lat).toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>Longitude</td>
                            <td>{(this.state.long).toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>City</td>
                            <td>{this.state.city}</td>
                        </tr>
                        <tr>
                            <td>Sunrise</td>
                            <td>{sunrise.getHours() + ":" + (sunrise.getMinutes()) + " " + sunrise.toLocaleDateString()}</td>
                        </tr>
                        <tr>
                            <td>Sunset</td>
                            <td>{sunset.getHours() + ":" + (sunset.getMinutes()) + " " + sunset.toLocaleDateString()}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            );
        }
        return <div className="ui blue label">Please accept the location request</div>
    }

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

export default LocationFinder;