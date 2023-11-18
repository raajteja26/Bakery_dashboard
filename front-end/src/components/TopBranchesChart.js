import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Container, Row, Col } from 'react-bootstrap';
import './Dashboard.css';

const TopBranchesChart = ({data}) => {
    const calculateTopBranches = () => {
        const branches = {};
    
        data.forEach((order) => {
          const branch = order.branch;
    
          if (!branches[branch]) {
            branches[branch] = 1;
          } else {
            branches[branch]++;
          }
        });
    
        const sortedBranches = Object.keys(branches).sort((a, b) => branches[b] - branches[a]);
    
        return sortedBranches.slice(0, 5).map((branch) => ({
          name: `Branch ${branch}`,
          count: branches[branch],
        }));
      };
    
      const chartData = calculateTopBranches();
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

export default TopBranchesChart