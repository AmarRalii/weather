// Today 
let todayName = document.getElementById('todayName')
let todayNumbre = document.getElementById('todayNumbre')
let todaMonth = document.getElementById('todaMonth')
let todayLocation = document.getElementById('todayLocation')
let todayTemp = document.getElementById('todayTemp')
let todaycondetionImg = document.getElementById('todaycondetionImg')
let todaycondetionText = document.getElementById('todaycondetionText')
let humidity = document.getElementById('humidity')
let wind = document.getElementById('wind')
let windDirection = document.getElementById('windDirection')
// next day
let nextDay =document.getElementsByClassName('next-day-name')
let nextMaxTemp =document.getElementsByClassName('next-max-temp ')
let nextMinTemp =document.getElementsByClassName('next-min-temp')
let nextConditionImg = document.getElementsByClassName('next-Condition-Img')
let nextConditiontext = document.getElementsByClassName('next-Condition-text')




async function gitweatherData(cityName){
    let weatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=1620e9373be848c3a48145726240501&q=${cityName}&days=3`)
    let weatherData = await weatherResponse.json()
    return weatherData
}


// Todays weather
  
function displayTodayData(data){
    let todayDate = new Date()
    todayName.innerHTML = todayDate.toLocaleDateString("en-US",{weekday:"long",})
    todayNumbre.innerHTML = todayDate.getDate()
    todaMonth.innerHTML = todayDate.toLocaleDateString("en-US",{month:"long"})
    todayLocation.innerHTML = data.location.name;
    todayTemp.innerHTML = data.current.temp_c
    todaycondetionImg.setAttribute("src",data.current.condition.icon ) 
    todaycondetionText.innerHTML = data.current.condition.text
    humidity.innerHTML = data.current.humidity
    wind.innerHTML =data.current.wind_kph
    windDirection =data.current.wind_dir
}


//Next Days weather

function displaynextData(data){
    let forcastdata = data.forecast.forecastday
    for(let i = 0;i < 2; i++){
        let nextDate = new Date(forcastdata[i+1].date)
        nextDay[i].innerHTML = nextDate.toLocaleDateString("en-US",{weekday:"long"})
        nextMaxTemp[i].innerHTML =forcastdata[i+1].day.maxtemp_c 
        nextMinTemp[i].innerHTML =forcastdata[i+1].day.mintemp_c
        nextConditionImg[i].setAttribute("src",forcastdata[i+1].day.condition.icon)
        nextConditiontext[i].innerHTML =forcastdata[i+1].day.condition.text
    }
}






//Start App
async function startapp(city = "london"){
    let weatherData = await gitweatherData(city)
    if(!weatherData.error){
    displayTodayData(weatherData)
    displaynextData(weatherData)}
}
startapp()  





// search
let searchInput = document.getElementById("search")

searchInput.addEventListener("input",function(){
    startapp(searchInput.value)
})



























