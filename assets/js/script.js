var currrentDay = $('#currentDay');
var cityforecast=$('#forecast');
var cityweather=$('#cityweather');
var cityweathertoday=$('#cityweathertoday');

// var timeblocks = $('#timeblocks');
var now = moment();
var clor;
var city='Olympia';

// $( function() {
//   var availableTags = [
//     "ActionScript",
//     "AppleScript",
//     "Asp",
//     "BASIC",
//     "C",
//     "C++",
//     "Clojure",
//     "COBOL",
//     "ColdFusion",
//     "Erlang",
//     "Fortran",
//     "Groovy",
//     "Haskell",
//     "Java",
//     "JavaScript",
//     "Lisp",
//     "Perl",
//     "PHP",
//     "Python",
//     "Ruby",
//     "Scala",
//     "Scheme"
//   ];
//   $( "#tags" ).autocomplete({
//     source: availableTags
//   });
// } );

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


$("#currentDay").text(now.format("dddd, MMMM D, YYYY"));

var  populateweather = function(data,city){
  console.log("today", data)
  $('#tempnow').text((data.main.temp - 273.15).toFixed(1));
  $('#windnow').text((data.wind.speed).toFixed(1));
  $('#humiditynow').text((data.main.humidity).toFixed(1));
  $('#selectedcity').text(city);
  $('#today').text(now.format("MM/D/YY"))
  return;
}

var populateforecast = function(data,city){
  console.log("forecast",data.list[1].main.humidity)
    for (let index = 1; index < 6; index++) {
      var avgwind=0;
      var avgtemp=0;
      var avghumidity=0;
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
        cityforecast.append(`
    <div class="card col">
    <div class="card-content">
    <span id="cadtit" class="card-title activator small blue-text">${date.format(" ddd - MM/D/YY")}<i class="material-icons right">more_vert</i></span>
      <img src="./assets/Images/sunny.png" class="cardfore" alt="..." width="10%" height="auto">
     <ul class="right">
        <li class="list-group-item">Temp: <span> ${avgtemp}<\span> C</li>
        <li class="list-group-item">Wind: <span> ${avgwind}<\span> mph </li>
        <li class="list-group-item">Humidity: <span>${avghumidity}<\span> %</li>
      </ul>
    </div>
    <div class="card-reveal">
      <span class="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span>
      <p>Here is some more information about this product that is only revealed once clicked on.</p>
    </div>
  </div> 
      `)

    }     
    }
          
    // <div class="card">
    //    <h6 class="card-title">${date.format(" ddd - MM/D/YY")}</h6>
    //   <img src="./assets/Images/sunny.png" class="cardfore" alt="..." width="10%" height="auto">
    //   <ul class="right">
    //     <li class="list-group-item">Temp: <span id="temp${index.toString}"> 2<\span> </li>
    //     <li class="list-group-item">Wind: <span id="wind${index.toString}"> 2<\span> </li>
    //     <li class="list-group-item">Humidity: <span id="humid${index.toString}"> 2<\span> </li>
    //   </ul>
    // </div>

// $(`#temp${index.toString}`).text("3");
// $(`#wind${index.toString}`).text("3");
// $(`#humid${index.toString}`).text("3");
    
getweather(city);
getforecastweather(city);

