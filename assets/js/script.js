var currrentDay = $('#currentDay');
var cityforecast=$('#forecast');
var cityweather=$('#cityweather');
var cityweathertoday=$('#cityweathertoday');

// var timeblocks = $('#timeblocks');
var now = moment();
var clor;
var city
//  ='Olympia';
var colors=["green","yellow","red","white","brown"];


// Gets today's weather from city
var getweather = function (city) {
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6c739212e839903aab1ecb07a7173d6b`;
  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          populateweather(data, city);
          return(true);
        });
      } else {
        alert('Error: ' + response.statusText);
        return(false);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to OpenWeather');
    });
};
var setuvindexicon = function(data){
  console.log("seticonuvicalled")
if(data.current.uvi <= 2){
  $('#uvibtn').addClass("green");
  return("low");
}
else if(data.current.uvi <=7){
$('#uvibtn').addClass("yellow");
return("moderate");
}
else {
  $('#uvibtn').addClass("red");
  return("high")
}
}

$('#uvibtn').click(function(e){
if(uviseverity==="low"){
  alert("No Protection Required. You can safely stay outside")
}
if(uviseverity==="moderate"){
  alert("Protection Required. Seek shade during midday hours. Wear shirt, sunscreen and use hat.")
}
if(uviseverity==="high"){
  alert("Extra Protection Required.  Avoid being outside during midday hours. Shirt, sunscreen and hat are a must!")
}
});


var uviseverity = "";

// Gets UVI reading of city - needs lat, lon to work which is stored in localStorage after getweather/populateweather
var getUVI = function(){
  var citylat = localStorage.getItem("lat");
  var citylon = localStorage.getItem("lon");
  var apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${citylat}&lon=${citylon}&appid=6c739212e839903aab1ecb07a7173d6b`;
  fetch(apiUrl)
  .then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log("UVIdat", data)
        // 
        $('#UVInow').text((data.current.uvi).toFixed(1));
        uviseverity=setuvindexicon(data);
        return(true);
      });
    } else {
      alert('Error: ' + response.statusText);
      return(false);
    }
  })
  .catch(function (error) {
    alert('Unable to connect to OpenWeather');
  });
};

// Gets 5 day forecast
var getforecastweather = function (city) {
  var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&exclude&appid=6c739212e839903aab1ecb07a7173d6b`;
  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log("firstitem",data.list[0]);
          populateforecast(data, city);
          return(true);
        });
      } else {
        alert('Error: ' + response.statusText);
        return(false);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to OpenWeather');
    });
};

// document.addEventListener('DOMContentLoaded', function() {
//   var elems = document.querySelectorAll('.autocomplete');
//   var instances = M.Autocomplete.init(elems, options);
// });

$("#currentDay").text(now.format("dddd, MMMM D, YYYY"));

var chooseicon = function(data){
  if(data.weather[0].description==="clear sky"){
    return("sunny.png")
  }
  else if(data.weather[0].description==="rain"){
    return("rain.png")
  }
  else if(data.weather[0].description==="shower rain"){
    return("rainchance.png")
  }
  else if(data.weather[0].description==="snow"){
    return("snow.png")
  }
  else if(data.weather[0].description==="mist"){
    return("FogHazy.png")
  }
  else if(data.weather[0].description==="thunderstorm"){
    return("ThunderStrom.png")
  }
  else if(data.weather[0].description==="scattered clouds" || data.weather[0].description==="broken clouds"||data.weather[0].description==="overcast clouds"){
    return("cloudy.png")
  }
  else if(data.weather[0].description==="few clouds"){
    return("cloudysunny.png")
  }
  else{return("unknown.png")}
}

var  populateweather = function(data,city){
  var iconpath = "./assets/Images/"+ chooseicon(data);
  console.log("iconpath",iconpath)
  console.log("today", data)
  document.getElementById("cityw").src=iconpath;
  $('#tempnow').text((data.main.temp - 273.15).toFixed(1));
  $('#windnow').text((data.wind.speed).toFixed(1));
  $('#humiditynow').text((data.main.humidity).toFixed(1));
  $('#selectedcity').text(city);
  $('#today').text(now.format("MM/D/YY"))
  localStorage.setItem("lon",data.coord.lon)
  localStorage.setItem("lat",data.coord.lat)
  return;
}



var chooseiconfore = function(data,index){
  if(data.list[index*8].weather[0].description==="clear sky"){
    return("sunny.png")
  }
  else if(data.list[index*8].weather[0].description==="rain"){
    return("rain.png")
  }
  else if(data.list[index*8].weather[0].description==="shower rain"){
    return("rainchance.png")
  }
  else if(data.list[index*8].weather[0].description==="snow"){
    return("snow.png")
  }
  else if(data.list[index*8].weather[0].description==="mist"){
    return("FogHazy.png")
  }
  else if(data.list[index*8].weather[0].description==="thunderstorm"){
    return("ThunderStrom.png")
  }
  else if(data.list[index*8].weather[0].description==="scattered clouds" ||data.list[index*8].weather[0].description==="overcast clouds" || data.list[index*8].weather[0].description==="broken clouds"){
    return("cloudy.png")
  }
  else if(data.list[index*8].weather[0].description==="few clouds"){
    return("cloudysunny.png")
  }
  else{return("unknown.png")}
}

var populateforecast = function(data,city){
  console.log("forecast",data.list[1].main.humidity)
    for (let index = 1; index < 6; index++) {
      var avgwind=0;
      var avgtemp=0;
      var avghumidity=0;
      var weatherdescript =data.list[(index-1)*8].weather[0].description
      var weathericon = "./assets/Images/"+ chooseiconfore(data,index-1);
      for (var y=0; y<8; y++){
        avgwind+=data.list[(index-1)*8+y].wind.speed/8;
        avgtemp+=data.list[(index-1)*8+y].main.temp/8;
        avghumidity+=data.list[(index-1)*8+y].main.humidity/8;
      }
      console.log("avghumidity",avghumidity)
      avgwind=avgwind.toFixed(1);
      avghumidity=avghumidity.toFixed(1);
      avgtemp-=273.15;
      avgtemp=avgtemp.toFixed(1);
      var date=moment().add(index,"days")
      console.log(weathericon)
    cityforecast.append(`
    <div class="card col ${colors[index-1]} lighten-3">
    <div class="row">
    <h5 id="cadtit" style="font-size:15px;font-weight: 900" class="card-title activator small black-text">${date.format(" ddd : MM/D/YY")}</h5>
     <ul >
       <div class="container">
        <img src=${weathericon} style="height:30px;width:30px" class="center">
        </div>
        <li style="font-size:12px;font-weight: 900">${weatherdescript}</li>
        <li style="padding:5px;margin:2px;font-size:12px;font-weight: 900">Temp: <span> ${avgtemp}<\span> C</li>
        <li style="padding:5px;margin:2px;font-size:12px;font-weight: 900">Wind: <span> ${avgwind}<\span> mph </li>
        <li style="padding:5px;margin:2px;font-size:12px;font-weight: 900">Humidity: <span>${avghumidity}<\span> %</li>
      </ul>
    </div>
  </div> 
      `)

    }     
}


document.getElementById("lastcity").addEventListener('click',goforit);
document.getElementById("cityselectbt").addEventListener('click',goforitreg);
function goforit(){

  var city=$('#lastcity').text();
  // var city="hello"
  console.log("city1" , city)
  getweather(city);   
  getUVI()
  getforecastweather(city);
}

function goforitreg(){
  var city=$('#cityselected').val();
  // var city="hello"
  console.log("city1" , city)
  getweather(city);   
  getUVI()
  getforecastweather(city);
}


