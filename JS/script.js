let searchHistory = [];
let savedSearchesDiv = document.getElementById("saved-searches");
let searchButton = document.getElementById("btn");
let searchBar = document.getElementById("searchbar");

// check for local storage
if(localStorage.getItem('city')===null){
    searchHistory = [];
}else{
    searchHistory = JSON.parse(localStorage.getItem('city'));
}

//weatherbit.io API key a6f0dd8794a44655b5fe26a993709bf4

// Animates navbar burger
$(document).ready(function() {

    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
  
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");
  
    });
  });
  
  //modal JS
  const modal =  
          document.querySelector('.modal'); 
    const btn =  
          document.querySelector('#btn') 
    const close =  
          document.querySelector('.delete') 
  
    btn.addEventListener('click', function () { 
      modal.style.display = 'block' 
    }) 
  
    close.addEventListener('click', function () { 
      modal.style.display = 'none' 
    }) 
    window.addEventListener('click', function (event) { 
      if (event.target.className ===  'delete') { 
        modal.style.display = 'none' 
      } 
    }) 

   

// stores searched city in local storage and displays below search bar
let storeCity = function(city){
    // pushes new city into array
    searchHistory.push(city);

    // limits display to last 8 searches
    searchHistory = searchHistory.slice(Math.max(searchHistory.length - 8,0))

     //clears previous search displays
     savedSearchesDiv.innerHTML = "";
    
    
     // displays searched cities 
     for(let i = 0; i < searchHistory.length; i++){
             
        let listedCity = document.createElement("li");
        listedCity.setAttribute("class", "button is-small mt-0 mx-1");
        savedSearchesDiv.appendChild(listedCity);
        let cityLink = document.createElement("a");
        cityLink.setAttribute("href","#");
        cityLink.setAttribute("class", "searched-city has-text-white")
        cityLink.innerHTML = searchHistory[i];
        listedCity.appendChild(cityLink);

      };

        // stores city into local storage
        localStorage.setItem("city", JSON.stringify(searchHistory));
}

// Pulls value from search bar
let citySearch = function(){
    let city = searchBar.value.trim().toLowerCase();
    console.log(city);
    if(city){
      storeCity(city);
      displayCityForecast(city);
      searchBar.value = "";
    }else{
      return
    }

}

searchButton.addEventListener("click", citySearch);

//api call for currently searched city
function displayCityForecast(city){
  var apiKey = "d6563c1f7289474849eef3ceaf635e1d";
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

  $.ajax({
      url: queryURL,
      method: "GET"
  }).then(function(response){
      var weatherIcon = response.weather[0].icon;
      var date = $("<h2>").text(moment().format('l'));
      var icon = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png");
      var tempFarenheit = (response.main.temp - 273.15) * 1.80 + 32;
          
      $("#city-name").text(response.name);
      $("#city-name").append(date);
      $("#city-name").append(icon);
      $("#city-temp").text(tempFarenheit.toFixed(2) + " \u00B0F");
      $("#city-humidity").text(response.main.humidity + "%");
     

      var lat = response.coord.lat
      var lon = response.coord.lon
      queryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon; 
      $.ajax({
          url: queryURL,
          method: "GET"
      }).then(function(response){
//apply class for UV index 
      var uvIndex = response.value;
      $("#city-uvindex").removeClass("favorable");
      $("#city-uvindex").removeClass("moderate");
      $("#city-uvindex").removeClass("severe");
          if (uvIndex <= 2.9){
              $("#city-uvindex").addClass("favorable");
          } else if (uvIndex >= 3 && uvIndex <= 7.9){
              $("#city-uvindex").addClass("moderate");
          } else {
              $("#city-uvindex").addClass("severe");};
              $("#city-uvindex").text(response.value);});   
              $("#displayCity").show();}); 
          };