const DINGUS_PRICE = 14.25;
const WIDGET_PRICE = 9.99;
const ZERO_FORMAT = '0.00';
const DEBUG = true;
var dingus;
var widge;
var total_num;

// Prepare demo data
// Data is joined to map using value of 'hc-key' property by default.
// See API docs for 'joinBy' for more info on linking data and map.
var test1 = []
var data4= [
 ['Europe', 337],
 ['Australia', 335],
 ['Africa', 441],
 ['ASIA', 258],
 ['North America', 372],
 ['North America', 351]
];

var data= [
    ['eu', 337],
    ['oc', 335],
    ['af', 441],
    ['as', 258],
    ['na', 372],
    ['sa', 351]
   ];

var request = new XMLHttpRequest();
request.open("GET", "data/continents.json", false);
request.send(null)
var allcon = JSON.parse(request.responseText);



$.getJSON('data/sales.json', function(json) {
   for (var i=0;i<Object.keys(json).length;i++){
       test1.push([Object.keys(json)[i],json[Object.keys(json)[i]]])
   }
   // console.log(test1[1][1][1]['Dingus'])
   // get the total number of dingus and widget in data
   dingus = [];
   widge = [];
   for (var i = 0; i< Object.keys(test1).length; i++){
       for (var j = 0; j< Object.keys(test1[i][1]).length;j++){
           dingus.push({
               key:   test1[i][0],
               value: test1[i][1][j]['Dingus']
           });
           widge.push({
               key:   test1[i][0],
               value: test1[i][1][j]['Widget']
           });
       }
   }
   totw=[]
   totkey=['ASIA','AFRICA','ANTARCTICA','EUROPE','OCEANIA','NORTH AMERICA','SOUTH AMERICA']
   countv=0;
   countk=0;
   while (countk<7){
       let eachc=totkey[countk]
       let weachv=widge[countv].value+widge[countv+1].value+widge[countv+2].value;
       countv=countv+3
       countk=countk+1
       totw.push({
           key: eachc,
           value: weachv
       });
   }
   totd=[]
   countdv=0;
   countdk=0
   while (countdk<7){
       let eachdc=totkey[countdk]
       let weachdv=dingus[countdv].value+dingus[countdv+1].value+dingus[countdv+2].value;
       countdv=countdv+3
       countdk=countdk+1
       totd.push({
           key: eachdc,
           value: weachdv
       });
   }
   totw1={}
   totkey=['ASIA','AFRICA','ANTARCTICA','EUROPE','OCEANIA','NORTH AMERICA','SOUTH AMERICA']
   countv=0;
   countk=0;
   while (countk<7){
       let eachc=totkey[countk]
       let weachv=widge[countv].value+widge[countv+1].value+widge[countv+2].value;
       countv=countv+3
       countk=countk+1
       totw1[eachc] = weachv
   }
 
   totd1={}
   countdv=0;
   countdk=0
   while (countdk<7){
       let eachdc=totkey[countdk]
       let weachdv=dingus[countdv].value+dingus[countdv+1].value+dingus[countdv+2].value;
       countdv=countdv+3
       countdk=countdk+1
 
       totd1[eachdc] = weachdv
   }
    totd1['AUSTRALIA'] = totd1['OCEANIA']
  delete totd1['OCEANIA']
  totw1['AUSTRALIA'] = totw1['OCEANIA']
  delete totw1['OCEANIA']
 
   json['SOUTH AMERICA']=json['SOUTHAMERICA']
   delete json['SOUTHAMERICA']

   json['NORTH AMERICA']=json['NORTHAMERICA']
   delete json['NORTHAMERICA']
  
   //start draw chart
   Highcharts.mapChart('zxc', {

    chart: {
        zoomType: 'none',
    },
    exporting: { enabled: false },

    title: {
        text: ''
    },

    colorAxis: {
        minColor: 'lightgrey',
        maxColor: 'lightgrey'
        },
     mapNavigation: {
        enabled: false,
        buttonOptions: {
            verticalAlign: 'bottom'
        }
    },

    legend : {
        enabled: false,
         },
    tooltip:{
        enabled:true
    },
    plotOptions:{
        series:{
            point:{
                events:{
                    click: function(){
                   
                        document.getElementById("dingusSold").innerHTML = totd1[this.properties.CONTINENT.toUpperCase()]
                        document.getElementById("widgetSold").innerHTML = totw1[this.properties.CONTINENT.toUpperCase()]
                        document.getElementById("totalSales").innerHTML = ((totw1[this.properties.CONTINENT.toUpperCase()]*WIDGET_PRICE)+(totd1[this.properties.CONTINENT.toUpperCase()]*DINGUS_PRICE)).toFixed(2)
                       
                    if(this.properties.CONTINENT=='Antarctica'){
                        document.getElementById('totalSalesChart').innerHTML=null
                    }
                    else{
                    Highcharts.chart('totalSalesChart', {
                        exporting: { enabled: false },
                        chart: {
                            plotBackgroundColor: null,
                            plotBorderWidth: null,
                            plotShadow: false,
                            type:'pie'
                        },
                        legend: {
                            layout: 'vertical',
                            align: 'right',
                            verticalAlign: 'top',
                            x: -20,
                            y: -5,
                            floating: true,
                            borderWidth: 1,
                            symbolRadius: 0
                        },
                        title: {
                            text: 'Total Sales',
                            style: {
                                fontSize: '22px',
                                fontWeight: 'bold',
                                font: 'Arial'
                            }
                        },
                        tooltip: {
                            headerFormat: '',
                            formatter: function () {
                                return this.y;
                            }
                        },
                        plotOptions: {
                            pie: {
                                startAngle:90,
                                allowPointSelect:true,
                                slicedOffset: 0,
                                cursor: 'pointer',
                                dataLabels: {
                                    enabled: true,

                                    format: '<br>{point.percentage:.1f} %<br>',
                                    distance: -80,
                                    color:'white',
                                    style: {
                                        fontSize: 18
                                    }
                                },
                                showInLegend: true
                            }
                        },
                        series: [{
                            data: [{
                                name: 'Dinguses',
                                y: (totd1[this.properties.CONTINENT.toUpperCase()]),
                                sliced: true,
                                selected: true,
                                color: '#4682B4'
                            }, {
                                name: 'Widgets',
                                y: (totw1[this.properties.CONTINENT.toUpperCase()]),
                                color: '#cf1717'
                            }]
                        }]
                    })
                }
                     Highcharts.chart('salesPerMonthChart', {
                        exporting: { enabled: false },
                         chart: {
                             type: 'column'
                         },
                         legend: {
                            layout: 'vertical',
                            align: 'right',
                            verticalAlign: 'top',
                            x: -5,
                            y: -7,
                            floating: true,
                            borderWidth: 1,
                            symbolRadius: 0
                        },
                         title: {
                             text: 'Monthly Sales',
                             style: {
                                fontSize: '22px',
                                fontWeight: 'bold',
                                font: 'Arial'
                            }
                         },
                        
                         xAxis: {
                             lineWidth:1,
                             tickWidth:1,
                             tickLength:5,
                             title: {
                                text: 'Month',
                                style: {
                                    fontSize: '12px',
                                    fontWeight: 'bold',
                                    font: 'Arial',
                                    color: 'black'
                                }
                             },
                             categories: [
                                 'January',
                                 'February',
                                 'March'
                             ],
                             crosshair: true
                         },
                         yAxis: {
                            lineWidth:1,
                             softMax:1,
                             title: {
                                 text: 'Number of units sold',
                                 style: {
                                    fontSize: '12px',
                                    fontWeight: 'bold',
                                    font: 'Arial',
                                    color: 'black'
                                }
                             }
                         },
                         tooltip: {
                             headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                             pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                 '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
                             footerFormat: '</table>',
                             shared: true,
                             useHTML: true
                         },
                        plotOptions: {
                             column: {
                                 pointPadding: 0.1,
                                 groupPadding: 0.1,
                                 borderWidth: 0
                             }
                         },
                         series: [{
                             name: 'Dinguses',
                             data: getdata(json,this.properties.CONTINENT.toUpperCase(),'Dingus'),
                             color: '#4682B4'
                         }, {
                             name: 'Widgets',
                             data: getdata(json,this.properties.CONTINENT.toUpperCase(),'Widget'),
                             color: '#cf1717'
                   
                         }]
                     });
                    }
                }
            }
        }
    },
    series: [{
        // Use the gb-all map with no data as a basemap
       // mapData: Highcharts.maps['countries/gb/gb-all'],
        type: 'map',
        mapData: allcon,
        allowPointSelect: true,
        cursor: 'pointer',
        name: 'total number',
        tooltip: {
            headerFormat: '',
            pointFormat: '{point.properties.CONTINENT}'
        },
        data: [
            {name:'Europe', value:337},
            {name:'Australia', value:335},
            {name:'Africa', value:441},
            {name:'Asia', value: 258},
            {name:'North America', value:372},
            {name:'South America', value:351},
            {name:'Antarctica',value:0}
           ],
        color: 'rgba(200, 200, 200, 0.3)',
        states: {
            hover: {
                color: '#B0B0B0'
            },
            select: {
                color:'#7CA82B'
            }
        },
        dataLabels: {
            enabled: true,
            style: {
                color: 'black',
                font: 'Montserrat',
                fontWeight: 'bold',
            },
            format: '{point.properties.CONTINENT}'
        },
        showInLegend: false,
        joinBy:['CONTINENT', 'name']
    }]
})
   

 });
 function getdata(data,con,dorw){
  var result=[]
  console.log(con)
  let each=data[con];
  for (var i=0;i<3;i++){
      result.push(each[i][dorw])
  }
  return result
}
 
function updateScoreCards(continent) {
  let sales = data[continent];
  let dinguses = 0, widgets = 0;
  for (const datum of sales) {
      dinguses += datum['Dingus'];
      widgets += datum['Widget'];
  }
  let revenue = DINGUS_PRICE * dinguses + WIDGET_PRICE * widgets;
  select('dingusSold').innerHTML = dinguses;
  select('widgetSold').innerHTML = widgets;
  select('totalSales').innerHTML = revenue.toFixed(2);
}
 
$.getJSON('data/stocks.json', function(stock) {
   stockarr=[];
   for (var i=0;i<stock.length;i++){
       stockarr.push([stock[i]['Date'],stock[i]['Adj Close']])
       stockarr[i][1]=parseFloat(stockarr[i][1].toFixed(2));
   }
   for (var i=0;i<stockarr.length;i++){
    stockarr[i][0]=stockarr[i][0]-2800000
  }
         
   Highcharts.stockChart('stockChart', {
    exporting: { enabled: false },
    chart:{
        zoomType:'x',
   },
rangeSelector: {
    enabled: false
},
       
navigator: {
    enabled: false
},
scrollbar: {
    enabled: false
},
           title: {
               text: 'Dynamic Growth',
               style: {
                fontSize: '21px',
                fontWeight: 'bold',
                font: 'Arial'
            }

           },
           subtitle: {
                text: 'Stock Prices of D&W Corp. from 2015-Present',
                style: {
                    fontSize: '11px',
                    fontWeight: 'bold',
                    font: 'Arial',
                    color: 'black'
                }
           },
           xAxis: {
            lineColor: '#000204',
            lineWidth: 1,
            labels: {
                enabled:true,
                format: '{value:%o/%e/%y}',
            },
               title:{
                    text:'Date',
                    style: {
                        fontSize: '11px',
                        fontWeight: 'bold',
                        font: 'Arial',
                        color: 'black'
                    }
               },
              crosshair:{
                    width: 1,            
                    color: 'black',
                    label: {
                        backgroundColor:'gray',
                        enabled: true,
                        format: '{value:%o/%e/%y}'
                    }
               }
           },

           yAxis: {
            tickAmount:9,
            max:160,
            lineColor: '#000204',
            lineWidth: 1,
            showLastLabel:true,
           
           
            opposite: false,
               title: {
                style: {
                    fontSize: '11px',
                    fontWeight: 'bold',
                    font: 'Arial',
                    color: 'black'
                },
                   text: 'Adj Close Stock Price'
               },
               crosshair: {
                color: 'black',
                enabled: true,
                label: {
                  enabled: true
                }
              }
              
              
           },
           tooltip:{
               formatter: function () {
                var s = '<b>' + '</b>';
                $.each(this.points, function () {
                    s += '<b>$' + this.y ;
                });
                return s;
            }

           },
           legend: {
               enabled: false
           },
           plotOptions: {
               area: {
                   fillColor: {
                       linearGradient: {
                           x1: 0,
                           y1: 0,
                           x2: 0,
                           y2: 1
                       },
                       stops: [
                           [0, Highcharts.getOptions().colors[0]],
                           [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                       ]
                   },
                   marker: {
                       enabled:undefined,
                       radius: 2
                   },
                   lineWidth: 1,
                   states: {
                       hover: {
                           lineWidth: 1
                       }
                   },
                   threshold: null
               }
           },
           series: [{
            color: '#0E65BC',
               type: 'area',
               name: 'total',
               data: stockarr
           }]
           });
})
