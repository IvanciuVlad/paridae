import React from "react";

const renderGust = (wind) => {
    if (wind.gust) {
        return (
            <tr>
                <td>Gust</td>
                <td>{wind.gust} m/s</td>
            </tr>
        );
    }

}

const rain = (weather) => {
    if (weather.rain) {
        return (
            <div>
                <tr>
                    <td>Rain volume last hour</td>
                    <td>{weather.rain["1h"]} mm³</td>
                </tr>
                <tr>
                    <td>Rain volume last 3 hours</td>
                    <td>{weather.rain["3h"]} mm³</td>
                </tr>
            </div>
        );
    }
}

const snow = (weather) => {
    if (weather.snow) {
        return (
            <div>
                <tr>
                    <td>Snow volume last hour</td>
                    <td>{weather.snow["1h"]} mm³</td>
                </tr>
                <tr>
                    <td>Snow volume last 3 hours</td>
                    <td>{weather.snow["3h"]} mm³</td>
                </tr>
            </div>
        );
    }
}




const WeatherDisplay = (props) => {
    if (props.weather !== null) {
        return (
            <div>
                <h3 className="ui horizontal blue divider header">
                    <i className="cloud icon"/>
                    Weather - {props.weather.weather[0].description}
                </h3>

                <h6 className="ui horizontal blue divider header">
                    Static characteristics
                </h6>

                <table className="ui definition table">
                    <tbody>
                    <tr>
                        <td className="two wide column">Temperature</td>
                        <td>{(props.weather.main.temp - 273.15).toFixed(2)} °C</td>
                    </tr>
                    <tr>
                        <td>Humidity</td>
                        <td>{props.weather.main.humidity} %</td>
                    </tr>
                    <tr>
                        <td>Pressure</td>
                        <td>{props.weather.main.pressure} hPa</td>
                    </tr>
                    <tr>
                        <td>Heat index</td>
                        <td>{(props.weather.main.feels_like - 273.15).toFixed(2)} °C</td>
                    </tr>
                    </tbody>
                </table>

                <h6 className="ui horizontal blue divider header">
                    Dynamic characteristics
                </h6>
                <table className="ui definition table">
                    <tbody>
                    <tr>
                        <td className="two wide column">Speed</td>
                        <td>{props.weather.wind.speed} m/s</td>
                    </tr>
                    <tr>
                        <td>Bearing</td>
                        <td>{props.weather.wind.deg} °</td>
                    </tr>
                    {renderGust(props.weather.wind)}
                    <tr>
                        <td>Visibility</td>
                        <td>{props.weather.visibility} m</td>
                    </tr>
                    <tr>
                        <td>Cloudiness</td>
                        <td>{props.weather.clouds.all} %</td>
                    </tr>
                    {rain(props.weather)}
                    {snow(props.weather)}
                    </tbody>
                </table>

            </div>
        );
    } else {
        return (
            <h4 className="ui horizontal blue divider header">
                <div className="ui loading segment">
                    <p></p>
                    <p></p>
                </div>
            </h4>
        );
    }
};

export default WeatherDisplay;