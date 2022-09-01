const cityForm = document.querySelector("form")
const card = document.querySelector(".card")
const details = document.querySelector(".details")

const time = document.querySelector(".time")
const icon = document.querySelector(".icon")
const forecast = new Forecast()

const updatUI = (data) => {
    // const cityDets = data.cityDets
    // const weather = data.weather
    console.log(data)
    //destructuring properties
    const { cityDets, weather } = data

    //update details template

    details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `
    // remove display none
    if(card.classList.contains("d-none")){
        card.classList.remove("d-none")
    }

    //update night and day & icons
    let iconSrc = `./images/icons/${weather.WeatherIcon}.svg`
    icon.setAttribute("src", iconSrc)

    let timeSrc = weather.IsDayTime ?  "./images/day.svg" : "./images/night.svg"
    // if(weather.IsDayTime){
    //     timeSrc = "./images/day.svg"
    // } else {
    //     timeSrc = "./images/night.svg"
    // }
    time.setAttribute("src", timeSrc)

}



cityForm.addEventListener("submit", (e)=>{
    e.preventDefault()

//get city value
    const city = cityForm.city.value.trim()
    cityForm.reset()
    // card.classList.remove("d-none")
    //update the UI with new city
    forecast.updateCity(city)
    .then(data => updatUI(data))
    .catch(err => console.log(err))

    // set local storage
    localStorage.setItem("city", city)
})

if(localStorage.getItem("city")){
    forecast.updateCity(localStorage.getItem("city"))
    .then(data => updatUI(data))
    .catch(err => console.log(err))
}