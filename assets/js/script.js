var currrentDay = $('#currentDay');
var cityforecast=$('#cityforecast');
var cityweathertoday=$('#cityweathertoday');
// var timeblocks = $('#timeblocks');
var now = moment();
var clor;

   
fetch('https://api.openweathermap.org/data/2.5/onecall?lat=33.4&lon=-94.04&exclude=hourly,daily&appid=6c739212e839903aab1ecb07a7173d6b', {
  method: 'GET', //GET is the default.
  credentials: 'same-origin', // include, *same-origin, omit
  redirect: 'follow', // manual, *follow, error
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    var weatherobject=JSON.stringify(data);
    console.log(weatherobject)
    console.log(data)
  });

  console.log(now.format("MM/D/YY"))

$("#currentDay").text(now.format("dddd, MMMM D, YYYY"));

cityweathertoday.append(
  `<div class="card" style="width: 60vw; height:30vh"> 
    <div class="card-body flexrow">
      <h5 class="card-title"><span id="selectedcity"> Olympia <\span> ${now.format("MM/D/YY")}</h5>
      <img src="./assets/Images/sunny.png" id="cardtoday" alt="..." width="10%" height="auto">
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Temp:</li>
      <li class="list-group-item">Wind:</li>
      <li class="list-group-item">Humidity:</li>
      <li class="list-group-item">UV Index:</li>
    </ul>
  </div>
`)

for (let index = 1; index < 6; index++) {
  var date=moment().add(index,"days")
    cityforecast.append(`
<div class="card" style="width: 18rem;">
  <div class="card-body">
      <h5 class="card-title">${date.format("MM/D/YY")}</h5>
  </div>
  <img src="./assets/Images/sunny.png" class="cardfore" alt="..." width="10%" height="auto">
  <ul class="list-group list-group-flush">
    <li class="list-group-item">Temp: </li>
    <li class="list-group-item">Wind:</li>
    <li class="list-group-item">Humidity: item</li>
  </ul>
</div>`)}
   
fetch('https://api.openweathermap.org/data/2.5/onecall?lat=33.4&lon=-94.04&exclude=hourly,daily&appid=6c739212e839903aab1ecb07a7173d6b', {
  method: 'GET', //GET is the default.
  credentials: 'same-origin', // include, *same-origin, omit
  redirect: 'follow', // manual, *follow, error
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    var weatherobject=JSON.stringify(data);
    console.log(weatherobject)
    console.log(data)
  });

//   


    // fetch(requestUrl)
    //   .then(function (response) {
    //     return response.json();
    //   })
    //   .then(function (data) {
    //     console.log(data)
    //     //Loop over the data to generate a table, each table row will have a link to the repo url
    //     for (var i = 0; i < data.length; i++) {
    //       // Creating elements, tablerow, tabledata, and anchor
    //       var createTableRow = document.createElement('tr');
    //       var tableData = document.createElement('td');
    //       var link = document.createElement('a');
  
    //       // Setting the text of link and the href of the link
    //       link.textContent = data[i].html_url;
    //       link.href = data[i].html_url;
  
    //       // Appending the link to the tabledata and then appending the tabledata to the tablerow
    //       // The tablerow then gets appended to the tablebody
    //       tableData.appendChild(link);
    //       createTableRow.appendChild(tableData);
    //       tableBody.appendChild(createTableRow);
    //     }
    //   });
//   }
  
//   fetchButton.addEventListener('click', getApi);