import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Container, Row, Col } from 'react-bootstrap';
import './Dashboard.css';

const StatusChart = ({data}) => {
    const categorizeOrdersByState = () => {
        const states = {};
    
        data.forEach((order) => {
          const orderState = order.order_state;
    
          if (!states[orderState]) {
            states[orderState] = 1;
          } else {
            states[orderState]++;
          }
        });
    
        return states;
      };
    
      const prepareChartData = () => {
        const states = categorizeOrdersByState();
        const chartData = Object.keys(states).map((state) => ({
          name: state,
          count: states[state],
        }));
    
        return chartData;
      };
    
      const chartData = prepareChartData();
  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={40}
        >
          <XAxis dataKey="name" scale="point" padding={{ left: 50, right: 10 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#19BAE5" background={{ fill: '#eee' }} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default StatusChart