/*
Author: Anukrity
Date: 13/05/2021
Description: Unit tests cases.
*/

import React from 'react';
import { shallow, mount} from 'enzyme';
import AnalyticDashboard from './AnalyticDashboard.js';
import ChartComponent from './ChartComponent.js';

describe('AnalyticDashboard', () => {

    it('Component should be rendered without crashing', ()=> {
        const wrapper = shallow(<AnalyticDashboard />);
        
        // Test if component being rendered
        expect(wrapper.find({ className: 'grid-container'})).toHaveLength(1);
        //component.unmount();
    });
    
    it('renders Child components', () => {
        const wrapper = shallow(<AnalyticDashboard />);
        expect(wrapper.containsMatchingElement(<ChartComponent />)).toEqual(true);
        console.log(wrapper.find(<ChartComponent />).debug())
        expect(wrapper.find({ className: 'line-chart'})).toHaveLength(1);
        expect(wrapper.find({ className: 'bar-chart'})).toHaveLength(1);
        expect(wrapper.find({ className: 'area-chart'})).toHaveLength(1);
        expect(wrapper.find({id:'display-table'})).toHaveLength(1);
      });

    const wrapper = shallow(<AnalyticDashboard/>);
    const table = wrapper.find({id:'display-table'});
    const row = table.find('tr')
    const column = table.find('th')
    const data = [
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
            { 
                customer_id:7,
                comment:"How long does it take for an order to proces?.",
                date: "28 May 2020"
            },
          ]
    
    
    it('table layout', () => {
        expect(table).toHaveLength(1);
        expect(row).toHaveLength(6);
        expect(column).toHaveLength(3);
        
    });

});

