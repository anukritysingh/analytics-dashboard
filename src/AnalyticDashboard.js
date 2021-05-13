/*
Author: Anukrity
Date: 12/05/2021
Description: DashBoard.
*/

import React, { Component } from 'react';
import ChartComponent from './ChartComponent.js';


const COMMENT_TABLE_DATA = {
    data:[
        { 
            customer_id:1,
            comment:"My box wasn't the right shape.",
            date: "28 May 2021"
        },
        { 
            customer_id:2,
            comment:"I'm still waiting to recieve my box?",
            date: "27 May 2021"
        },
        { 
            customer_id:3,
            comment:"Do you do custom sizes?",
            date: "26 May 2021"
        },
        { 
            customer_id:4,
            comment:"*****Thanks a lot.",
            date: "26 May 2021"
        },
        { 
            customer_id:5,
            comment:"Do you offer discount.",
            date: "28 April 2021"
        },
        { 
            customer_id:6,
            comment:"How long does it take for an order to proces?.",
            date: "28 May 2021"
        },
      ]

};

const NEW_ORDERS_DATA = {
    data: [
        {
            date: "10 May 2021",
            orders: 7
        },
        {
            date: "9 May 2021",
            orders: 2
        },
        {
            date: "7 May 2021",
            orders: 11
        },
        {
            date: "6 May 2021",
            orders: 30 
        },
        {
            date: "4 May 2021",
            orders: 23 
        },
        {
            date: "2 May 2021",
            orders: 17 
        },
    ]
};

const RETURN_VOLUME_DATA = {
    data: [
        {
            date: "10 May 2021",
            orders: 12
        },
        {
            date: "9 May 2021",
            orders: 24
        },
        {
            date: "7 May 2021",
            orders: 10
        },
        {
            date: "6 May 2021",
            orders: 1
        },
        {
            date: "4 May 2021",
            orders: 2 
        },
        {
            date: "2 May 2021",
            orders: 5 
        },
    ]
};

const MONTHLY_SALES_DATA = {
    currMonthSales: 5129.40,
    lastMonthSales: 4000.56,
    currMonthTargetSales: 20000,
    data: [
        {
            date: "10 May 2021",
            orders: 7
        },
        {
            date: "9 May 2021",
            orders: 2
        },
        {
            date: "7 May 2021",
            orders: 11
        },
        {
            date: "6 May 2021",
            orders: 30 
        },
        {
            date: "4 May 2021",
            orders: 23 
        },
        {
            date: "2 May 2021",
            orders: 17 
        },
    ]
};

class AnalyticDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
        commentTableData: {},
        newOrdersData: {},
        returnVolumeData: {},
        currentMonthSalesData: {},
        pieChartData: {},
        currentMonthsSalesTotal: null,
        diffInSales: null,
        isProfit: false,
        isLoading: false,
        isError: false,
        errorMessage: ''
    };
    this.getNewOrdersData = this.getNewOrdersData.bind(this);
    this.getReturnVolumeData = this.getReturnVolumeData.bind(this);
    this.getCurrentMonthSalesData = this.getCurrentMonthSalesData.bind(this);
    this.sortAndGetChartData = this.sortAndGetChartData.bind(this);
    
}

sortAndGetChartData(payload) {
    // It is possible that the data from API comes out of order
    // We will simply sort this and also generate x and y axis data

    let chartData = [];
    let xAxisData = [];
    let yAxisData = [];
    chartData = [xAxisData, yAxisData];
   payload.sort(function(a,b){
    return new Date(b.date) - new Date(a.date);
    }).map((obj,index) => {
        chartData[0].push(obj['orders']);
        chartData[1].push(obj['date']); 
        return chartData;
    });

    return chartData;  
}

getNewOrdersData(param='1')
{   
    // Declare the variables
    let chartData = []; 
    let totalOrders = 0;

    // options wrapper to use with dummy data as well as from AJAX call
    // In an ideal case you would write options directly before setting
    // the state in AJAX call 
    let generateOptions = function (data){
        let options = {
            chart: {
                height: 200,
                type: 'spline'
            },
            credits: {
                enabled: false
           },
            title: {
              text: 'NEW ORDERS',
              align: 'left',
              style: {
                font:'normal 10px Arial, Helvetica, sans-serif',
                color:'#808080'
              }
            },
            subtitle: {
                text: totalOrders,
                align: 'left',
                style: {
                  font:'bold 25px Arial, Helvetica, sans-serif',
                  color:'#808080'
                }
            },
            xAxis: {
                categories: data[1],
                visible: false
            },
            yAxis: {
             visible: false   
            },
            plotOptions: {
                spline: {
                    marker: {
                        enabled: false
                    }
                }
            },
            series: [{
                name: 'Orders',
                data: data[0],
                showInLegend: false
            }]
          }
        
          return options;
    }

    // fetch call newOrdersData for today
        /*let url = param !== '1' ? `www.mydomain.com/orders/new?days=${param}` : 'www.mydomain.com/orders/new?days=1';
        this.setState({ isLoading: true });  
            fetch(url)
            .then(response => response.json())
            .then(payload => {
                // sort the payload by timestamp and also get the chart data
                chartData = this.sortAndGetChartData(payload.data);

                // get the total number of orders in the response
                payload.data.map((obj,index) => {
                    totalOrders += obj['orders'];
                    return totalOrders
                });
                
                // generate the options for the chart
                let options = generateOptions(chartData);
                this.setState({
                    newOrdersData: {options:options},
                    errorMessage: '',
                    isError: false,
                    isLoading: false
                });
            }) 
            .catch(error => {
                this.setState({ 
                    errorMessage: 'We are sorry, an unexpected error occured.',
                    isError: true,
                    isLoading: false
                });
                console.error('There was an error!', error);
            });*/
    
    /** -------- Rendering with Hard Coded data -----------
     * Please comment the below to use with actual URL data
     *  */ 
    chartData = this.sortAndGetChartData(NEW_ORDERS_DATA.data);
    
    NEW_ORDERS_DATA.data.map((obj,index) => {
            totalOrders += obj['orders'];
            return totalOrders
    });

    let options = generateOptions(chartData);
    this.setState({
        newOrdersData: {options:options}
    });

    // ----------------------------------------------------
    
}

getReturnVolumeData(param='1') {
    // Declare the variables
    let chartData = []; 
    let totalReturns = 0;

    // options wrapper to use with dummy data as well as from AJAX call
    // In an ideal case you would write options directly before setting
    // the state in AJAX call
    let generateOptions = function (chartData){
        let options = {
            chart: {
                height: 200,
                type: 'column'
            },
            credits: {
                enabled: false
           },
            title: {
                text: 'RETURNS  VOLUME',
                align: 'left',
                style: {
                  font:'normal 10px Arial, Helvetica, sans-serif',
                  color:'#808080'
                }
              },
              subtitle: {
                  text: totalReturns,
                  align: 'left',
                  style: {
                    font:'bold 25px Arial, Helvetica, sans-serif',
                    color:'#808080'
                  }
              },
            xAxis: {
                categories: chartData[1],
                visible: false
            },
            yAxis: {
             visible: false   
            },
            series: [{
                name: 'Returns',
                data: chartData[0],
                showInLegend: false
            }]
          }
        
          return options;
    }

    /*let url = param !== '1' ? `www.mydomain.com/returns?days=${param}` : 'www.mydomain.com/returns?days=1';
        this.setState({ isLoading: true });  
            fetch(url)
            .then(response => response.json())
            .then(payload => {
                // sort the payload by timestamp and also get the chart data
                chartData = this.sortAndGetChartData(payload.data);

                // get the total number of orders in the response
                payload.data.map((obj,index) => {
                    totalReturns += obj['orders'];
                    return totalReturns
                });
                
                // generate the options for the chart
                let options = generateOptions(chartData);
                this.setState({
                    returnVolumeData: {options:options},
                    errorMessage: '',
                    isError: false,
                    isLoading: false
                });
            }) 
            .catch(error => {
                this.setState({ 
                    errorMessage: 'We are sorry, an unexpected error occured.',
                    isError: true,
                    isLoading: false
                });
                console.error('There was an error!', error);
            });*/
    
    /** -------- Rendering with Hard Coded data -----------
     * Please comment the below to use with actual URL data
     *  */ 

    chartData = this.sortAndGetChartData(RETURN_VOLUME_DATA.data);
    
    RETURN_VOLUME_DATA.data.map((obj,index) => {
        totalReturns += obj['orders'];
        return totalReturns
    });

    let options = generateOptions(chartData);
    this.setState({
        returnVolumeData: {options:options}
    });
}

getCurrentMonthSalesData() {
     // Declare the variables
     let chartData = [];

     // options wrapper to use with dummy data as well as from AJAX call
    // In an ideal case you would write options directly before setting
    // the state in AJAX call
    let generatePieOptions = function (data){
        let pieChartOption = {
            chart: {
                height: 100,
                width:100,
                renderTo: 'container',
                type: 'pie'
            },
            credits: {
                enabled: false
           },
            tooltip:false,
            title:{
                text:''
            },
            series: [{
                name: 'Browsers',
                data: [["Current Month Sales",data['currMonthSales']],["Target Sales",data['currMonthTargetSales']-data['currMonthSales']]],
                size: '20%',
                innerSize: '80%',
                
                dataLabels: {
                    enabled: false
                }
            }]
          }
        
          return pieChartOption;
    }

    let generateOptions = function (chartData){
        let options = {
            chart: {
                height:200,
                type: 'areaspline'
            },
            credits: {
                enabled: false
           },
            title:{
                text:''
            },
            xAxis: {
                categories: chartData[1],
                visible: false
            },
            yAxis: {
             visible: false   
            },
            plotOptions: {
                areaspline: {
                    marker: {
                        enabled: false
                    }
                }
            },
            series: [{
              name: 'Orders',
              data: chartData[0],
              showInLegend: false
            }]
          }
        
          return options;
    }

    /*let url = 'www.mydomain.com/returns?days=1';
    this.setState({ isLoading: true });  
        fetch(url)
        .then(response => response.json())
        .then(payload => {
            // sort the payload by timestamp and also get the chart data
            chartData = this.sortAndGetChartData(payload.data);
            
            // generate the options for the chart
            let options = generateOptions(chartData);
            let pieChartOption= generatePieOptions(payload)
            this.setState({
                currentMonthSalesData: {options:options},
                pieChartData: pieChartOption,
                currMonthSales: payload['currMonthSales'],
                diffInSales: Math.round(100 * Math.abs( ( payload['currMonthSales'] -  payload['lastMonthSales'] ) /  payload['lastMonthSales'] ) ),
                isProfit: payload['currMonthSales'] > payload['lastMonthSales'] ? true : false,
                errorMessage: '',
                isError: false,
                isLoading: false
            });
        }) 
        .catch(error => {
            this.setState({ 
                errorMessage: 'We are sorry, an unexpected error occured.',
                isError: true,
                isLoading: false
            });
            console.error('There was an error!', error);
        }); */

/** -------- Rendering with Hard Coded data -----------
 * Please comment the below to use with actual URL data
 *  */ 
    chartData = this.sortAndGetChartData(MONTHLY_SALES_DATA.data);

    let options = generateOptions(chartData);
    let pieChartOption = generatePieOptions(MONTHLY_SALES_DATA)

    this.setState({
        currentMonthSalesData: {options:options},
        pieChartData: pieChartOption,
        currMonthSales: MONTHLY_SALES_DATA['currMonthSales'],
        diffInSales: Math.round(100 * Math.abs( ( MONTHLY_SALES_DATA['currMonthSales'] -  MONTHLY_SALES_DATA['lastMonthSales'] ) /  MONTHLY_SALES_DATA['lastMonthSales'] ) ),
        isProfit: MONTHLY_SALES_DATA['currMonthSales'] > MONTHLY_SALES_DATA['lastMonthSales'] ? true : false

    });
    
}

componentDidMount() {
    //fetch call for getting commentTableData,
    this.setState({
        commentTableData: COMMENT_TABLE_DATA
    });
    this.getNewOrdersData();
    this.getReturnVolumeData();
    this.getCurrentMonthSalesData();

    let lineChartSelect = document.querySelector('select[name="line-chart-selector"]');
    if(lineChartSelect) {
        lineChartSelect.addEventListener("change", (e) => {
            this.getNewOrdersData(e.target.value);
          });
    }
    
    let barChartSelect = document.querySelector('select[name="bar-chart-selector"]');
    if(barChartSelect) {
        barChartSelect.addEventListener("change", (e) => {
            this.getReturnVolumeData(e.target.value);
          });
    }
    
}

render() { 
    const CURRENT_MONTH = new Date().toLocaleString('default', { month: 'long' });
    const CURRENT_YEAR = new Date().getFullYear();

    return (
        <div className="grid-container">

            <div className="header-grid">
                <span className='left-header-part'>
                    <p style={{margin:'0px',padding:'2px',font:'normal 15px Arial, Helvetica, sans-serif',color:'grey',position:'relative',right:'20px'}}>Overview</p>
                    <p style={{margin:'0px',padding:'2px',font:'bold 20px Arial, Helvetica, sans-serif',color:'grey'}}>Dashboard</p>
                </span>
                <span className='right-header-part'>
                    <button className="button-1">New View</button>
                    <button className="button-2">+ Create New Report</button>
                </span>
            </div>


            <div className="line-chart">
                    <select id="line-chart-selector" name="line-chart-selector">
                        <option value="1">Today</option>
                        <option value="7">Last 7 Days</option>
                        <option value="30">Last 30 Days</option>   
                    </select>
                    {Object.keys(this.state.newOrdersData).length !== 0 && this.state.newOrdersData['options'] && Object.keys(this.state.newOrdersData['options']).length !== 0 ?
                    <ChartComponent options= {this.state.newOrdersData.options} name='line'/>: null}
            </div>

            <div className="bar-chart">
                <select id="bar-chart-selector" name="bar-chart-selector">
                    <option value="1">Today</option>
                    <option value="7">Last 7 Days</option>
                    <option value="30">Last 30 Days</option>   
                </select>
                {Object.keys(this.state.returnVolumeData).length !== 0 && this.state.returnVolumeData['options'] && Object.keys(this.state.returnVolumeData['options']).length !== 0 ?
                <ChartComponent options= {this.state.returnVolumeData.options} name='bar'/> : null} 
            </div> 
            
            <div className="area-chart">
                <div style={{float: 'left', height: '0px'}}>
                    <p style={{margin:'0px',padding:'10px 60px 10px 2px',font:'bold 20px Arial, Helvetica, sans-serif',color:'grey'}}>Orders over Time</p>
                    <span style={{float: 'left', position: 'relative', bottom: '14px'}}>
                        <ChartComponent options= {this.state.pieChartData} name='pie'/> 
                    </span>
                    <span style={{margin:'0px',padding:'2px',font:'normal 15px Arial, Helvetica, sans-serif',color:'grey',position: 'relative', top: '14px'}}>
                        This month's sales: ${this.state.currMonthSales}
                        {this.state.isProfit ? <p style={{margin:'0px',fontSize:'12px'}}>{this.state.diffInSales}% more than last month</p>
                        : <p style={{margin:'0px',fontSize:'12px'}}>{this.state.diffInSales}% less than last month</p>} 
                    </span>
                </div>
                {Object.keys(this.state.currentMonthSalesData).length !== 0 && this.state.currentMonthSalesData['options'] && Object.keys(this.state.currentMonthSalesData['options']).length !== 0 ?
                <ChartComponent options= {this.state.currentMonthSalesData.options} name='area'/> : null}
            </div>


            <div className="table-container">
                <table id='display-table'>
                    <thead>
                        <tr>
                            <th key='buyer' style={{maxwidth: "5%"}}>Buyer</th>
                            <th key='comment'style={{maxwidth: "60%"}}>Comment</th>
                            <th key='date' style={{maxwidth: "35%"}}>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.keys(this.state.commentTableData).length === 0 ? null 
                            : this.state.commentTableData.data && this.state.commentTableData.data.length === 0 ? null 
                            : this.state.commentTableData.data.map((obj, index )=> {
                                if(obj['date'].includes(CURRENT_MONTH) && obj['date'].includes(CURRENT_YEAR)) {
                                    return (
                                        <tr key={index}>
                                            <td style={{width: "5%"}}>{obj['customer_id']}</td>
                                            <td style={{width: "60%"}}>{obj['comment']}</td>
                                            <td style={{width: "35%"}}>{obj['date']}</td>
                                        </tr>
                                    )
                                } else {
                                    return null;
                                }
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
  }

}
export default AnalyticDashboard;
