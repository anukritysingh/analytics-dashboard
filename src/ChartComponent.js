/*
Author: Anukrity
Date: 25/04/2021
Description: Stateless component used for displaying data in the table.
*/

import React, { Component } from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

class ChartComponent extends Component {
  constructor(props) {
    super(props);
    
  }

  render() { 
   console.log('chart  ',this.props.options);
    return (
       <div className='chart-body'>
            <HighchartsReact
                highcharts={Highcharts}
                options={this.props.options}
            />
       </div>
           
    );
  }

}
export default ChartComponent;
