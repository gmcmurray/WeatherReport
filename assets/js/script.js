var currrentDay = $('#currentDay');
var cityforecast=$('#cityforecast');
// var timeblocks = $('#timeblocks');
var now = moment();
var clor;
console.log('date', now.format("dddd, MMMM D, YYYY"));
$("#currentDay").text(now.format("dddd, MMMM D, YYYY"));

for (let index = 0; index < 5; index++) {
    cityforecast.append(`

<div class="card" style="width: 18rem;">
<div class="card-body">
    <h5 class="card-title">${now}</h5>
 </div>
  <img src="./assets/Images/sunny.png" class="card-img-top" alt="...">
  <ul class="list-group list-group-flush">
    <li class="list-group-item">An item</li>
    <li class="list-group-item">A second item</li>
    <li class="list-group-item">A third item</li>
  </ul>
</div>`)}
// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
// btn-outline-secondary
// Load timeblocks in military time from 9:00  to 18:00
// Colorcode background colors to show past, present and future

// for(var t =9;t<19;t++){
//     if(moment().hour() < t){
//         console.log(t,moment())
//         clor= '#77dd77';
//     }
//     else if(moment().hour() > t){
//         clor= '#d3d3d3';
//     }
//     else {
//         clor='#ff6961';
//     }
//     console.log(moment().hour(),t,moment().hour() === t)
//     timeblocks.append(`
//     <div class="row" style="margin: 5px">
//         <span id="time${t.toString()}" class="col-1 time-block hour" style="border: 1px solid black" >
//         ${moment(t.toString(),"hh").format("ha")}</span>
//         <div  class="input-group mb-3 col-10">
//             <textarea id="text${t.toString()}" style="background-color : ${clor}; border:1px black" type="text" class="form-control" placeholder="ToDo" aria-label="ToDo" aria-describedby="button-addon2" rows="3"></textarea>
//             <button class="saveBtn " type="button" id="button-addon2${t.toString()}">Update</button>
//         </div>
//     </div>
//     `);
//  }

 
// Set date with moment formatting


// Sets alert on all timeblock buttons through class
// var alertButtonEl=$('.input-group')
// alertButtonEl.on('click', function () {
//     for (let index = 9; index < 19; index++) {
//         localStorage.setItem(index.toString(),$(`#text${index.toString()}`).val())
//     }
//   });

//   Loads ToDo's from localStorage in each timeblock
//   for (let index = 0; index < 19; index++) {
//     $(`#text${index.toString()}`).val(localStorage.getItem(index.toString()));
//   }

//   Look at adding a function which automatically reloads page 1 minute after the hour.
// function getApi() {
    // fetch request gets a list of all the repos for the node.js organization
    // var requestUrl = 'https://api.github.com/orgs/nodejs/repos';
  
    
fetch('https://api.openweathermap.org/data/2.5/onecall?lat=33.4&lon=-94.04&exclude=hourly,daily&appid=6c739212e839903aab1ecb07a7173d6b', {
  method: 'GET', //GET is the default.
  credentials: 'same-origin', // include, *same-origin, omit
  redirect: 'follow', // manual, *follow, error
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });
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