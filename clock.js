
let cityList = document.getElementById("city-list");
cityList.addEventListener("change", changeCity);

let displayTemperature = document.querySelector(".display-temperature");
let displayIcon = document.querySelector(".display-icon");
let displayCity = document.getElementById("display-city");
let displayFact = document.getElementById("display-fact");

function changeCity(event){
let cityTimeZone = event.target.value;
if (cityTimeZone === "current"){
    let currentTimezone = moment.tz.guess();
    let currentDate = moment().tz(currentTimezone);
    let formattedDate = currentDate.format("dddd, Do MMMM, h:mm A");
    displayCity.innerHTML = `The current date and time in your location is:<p></p> <span class="time-element">${formattedDate}</span>`;
    displayIcon.innerHTML = ``;
    displayTemperature.innerHTML = ``;
    displayFact.innerHTML = ``;
  }
  else {
// split into array @ / selects the second part (counts from 0)
  let cityName = cityTimeZone.replace("_", " ").split("/")[1];
  let cityTime = moment().tz(cityTimeZone);
  let formattedCityTime = cityTime.format("dddd, Do MMMM, h:mm A");
  displayCity.innerHTML = `The date and time in ${cityName} is:<p></p> <span class="time-element">${formattedCityTime}</span>`;
callWeatherApi(cityName);
callFactApi(cityName);
}
}

const apiKey = "ff3f6c762d03ea64t3ab6978450d240o";

//function callApi(endpoint, callback) { // more efficient method
//  axios.get(endpoint).then(callback); // as it condenses api calls. DRY.
//}
//function callWeatherApi(city) {
 // let api = https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey};
  //callApi(api, showWeather);
//}
//function callFactApi(query) {
  ///let api = https://api.shecodes.io/ai/v1/generate?prompt=give_me_an_obscure_fact_about_${encodeURIComponent(query)}&context=output in basic HTML only use br tag&key=${apiKey};
  //callApi(api, showFact);
//}

function callWeatherApi(city) {
  let api = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(api).then(showWeather)};

function showWeather(event) {
  displayIcon.innerHTML = `<img src="${event.data.condition.icon_url}">`;
  displayTemperature.innerHTML = `<p></p><span class="temperature">The current temperature is ${Math.round(event.data.temperature.current)} °C</span>`;
}

function callFactApi(response){
  let api = `https://api.shecodes.io/ai/v1/generate?prompt=give_me_an_obscure_fact_about_${encodeURIComponent(response)}&context=output in basic HTML only use br tag&key=${apiKey}`;
 axios.get(api).then(showFact);
}

function showFact(response){
  let answer = response.data.answer;
  fact = answer.replace(/_/g, ' '); // g is global flag for all instances
  displayFact.innerHTML = `${fact}`; 
  console.log(response.data.answer);
}