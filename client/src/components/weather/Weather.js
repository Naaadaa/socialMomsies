import React, { Component } from "react";
import "./Weather.css";



class ErrorMessage extends Component {
  render() {
    return <p class={this.props.type}>{this.props.message}</p>;
  }
}
class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      location: " ",
      error: false,
      message: "enter a city"
    };
    this.apiKey = "759d7c371a74f2f1fdd190a6d93c0aea"; // Your Openweathermap API key here , get your key from here http://home.openweathermap.org/users/sign_up
    this.searchLocation = this.searchLocation.bind(this);
    this.getWeatherInfo = this.getWeatherInfo.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this.getWeatherInfo();
    // fetch("https://ipinfo.io").then((response)=>{
    //     return response.json();
    // }).then((response)=>{
    //     console.log(response);
    // })
  }

  componentWillUnmount() {}

  getWeatherInfo() {
    this.setState({ error: false });
    let _this = this;
    let url =
      "//api.openweathermap.org/data/2.5/weather?q=" +
      this.state.location + "&units=imperial" +
      "&appid=" +
      this.apiKey

    fetch(url)
      .then(function(response) {
        if (response.ok) {
          return response.json();
        }
        _this.setState({
          error:false,
          message: "City Not Found"
        });
      })
      .then(function(response) {
        _this.setState({
          data: response
        });
      });
  }
  searchLocation(e) {
    e.preventDefault();
    this.getWeatherInfo();
  }
  handleChange(event) {
    this.setState({ location: event.target.value });
  }
  render() {
    let weatherInfo = this.state.data;
    let partialTemplate = "";
    if (this.state.error === true) {
      partialTemplate = (
        <ErrorMessage type="error" message={this.state.message} />
      );
    } else if (
      weatherInfo &&
      Object.keys(weatherInfo).length > 0 &&
      weatherInfo.name
    ) {
      partialTemplate = (
        <div className="weather">
          <h1> Hello! The temperature in{" "}
             {weatherInfo.name}{" "}is{" "}

            <span>{(weatherInfo.main.temp)} &deg;F</span>
          </h1> 
            {/* {weatherInfo.weather.map(weatherData => (
         // <p>
            //   {weatherData.main}
            //
            //   <span> : {weatherData.description}</span>
            // </p>*/}
          ))}
        </div>
      );
    }
    return (
      <div>
        <form onSubmit={this.searchLocation}>
          <input
            type="text"
            value={this.state.location}
            placeholder="Enter Location"
            onChange={this.handleChange}
            required
          />
          <button type="Submit">Get the weather today!</button>
          <p />
        </form>
        {partialTemplate}
      </div>
    );
  }
}

export default Weather;
