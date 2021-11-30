function bar_graph(res){
let labels = [];
let dynamic_data=[]
var temp= Object.keys(res)
for(var i in temp) {
    console.log(temp[i]);
    var az = temp[i] ;
    labels.push(temp[i]);
    dynamic_data.push(Object.keys(res[az]).length);
}
console.log(dynamic_data);
console.log(labels);
const data = {
  labels: labels,
  datasets: [{
    label: 'No of policies',
    backgroundColor: 'rgba(255, 206, 86, 0.2)',
    data: dynamic_data,
    minBarLength: 2,
  }]
};

const config = {
  type: 'bar',
  data: data,
  options: {
    indexAxis: 'y',
   scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
    },
  },
  }
};
  const myChart1 = new Chart(
    document.getElementById('myChart1'),
    config
  );
}
function month_chart(res){
let labels = [];
let dynamic_data=[]
var temp= Object.keys(res)
for(var i in temp) {
    console.log(temp[i]);
    var az = temp[i] ;

    labels.push(getKeyByValue(temp[i]));
    dynamic_data.push(Object.keys(res[az]).length);
}
console.log(dynamic_data);
console.log(labels);
const data = {
  labels: labels,
  datasets: [{
    label: 'No of policies',
    backgroundColor: 'rgba(220,220,220,0.8)',
    data: dynamic_data,
    minBarLength: 2,
  }]
};

const config = {
  type: 'bar',
  data: data,
  options: {
   scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
    },
  },
  }
};
 const myChart3 = new Chart(
    document.getElementById('myChart2'),
    config
  );
}

function pie_chart(res){
let labels = [];
let dynamic_data=[]
var temp= Object.keys(res)
for(var i in temp) {
    console.log(temp[i]);
    var az = temp[i] ;
    labels.push(temp[i]);
    dynamic_data.push(Object.keys(res[az]).length);
}
console.log(dynamic_data);
console.log(labels);
const data = {
  labels: labels,
  datasets: [{
    label: 'No of policies',
    backgroundColor: ['rgb(255, 99, 132)','rgb(255, 205, 86)'],
    data: dynamic_data,
    minBarLength: 2,
  }]
};

const config = {
  type: 'doughnut',
  data: data,
  options: {
    aspectRatio: 1,
  }
};
const myChart2 = new Chart(
    document.getElementById('myChart3'),
    config
  );
}


function marital_chart(res){
let labels = [];
let dynamic_data=[]
var temp= Object.keys(res)
for(var i in temp) {
    console.log(temp[i]);
    var az = temp[i] ;
    labels.push(temp[i]);
    dynamic_data.push(res[az]);
}
console.log(dynamic_data);
console.log(labels);
const data = {
  labels: labels,
  datasets: [{
    label: 'No of policies',
    backgroundColor: ['rgb(44, 62, 80)','rgb(51, 204, 204)'],
    data: dynamic_data,
    minBarLength: 2,
  }]
};

const config = {
  type: 'pie',
  data: data,
  options: {
    aspectRatio: 1,
  }
};
const myChart4 = new Chart(
    document.getElementById('myChart4'),
    config
  );
}

function initResp(){
    $.ajax({
            type: "GET",
            url : "https://insurance-record-backend.herokuapp.com/project/get_metrics_data/",
            dataType: 'json',
            success: function (response){
            res = response;
            console.log(res)
            bar_graph(res["Region"]);
            pie_chart(res["Gender"]);
            marital_chart(res["Marital"]);
            month_chart(res["Monthly"]);
            }
            });
}
function getKeyByValue(value) {
  return Object.keys(months).find(key => months[key] === value);
}

var months = {
    'Jan' : '1',
    'Feb' : '2',
    'Mar' : '3',
    'Apr' : '4',
    'May' : '5',
    'Jun' : '6',
    'Jul' : '7',
    'Aug' : '8',
    'Sep' : '9',
    'Oct' : '10',
    'Nov' : '11',
    'Dec' : '12'
}

window.onload = initResp();