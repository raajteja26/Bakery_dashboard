import React, { PureComponent, useState } from 'react';
import { PieChart, Pie, Sector,Cell, ResponsiveContainer } from 'recharts';

const Total_data = [
    {
        "id": 1,
        "item_type": "Muffins",
        "order_state": "Created",
        "last_update_time": "2023-11-15T17:39:18.865787Z",
        "branch": 7,
        "customer": 1
    },
    {
        "id": 2,
        "item_type": "Cake",
        "order_state": "Canceled",
        "last_update_time": "2023-11-15T18:10:22.513478Z",
        "branch": 10,
        "customer": 2
    },
    {
        "id": 5,
        "item_type": "Cake",
        "order_state": "Delivered",
        "last_update_time": "2023-11-17T10:11:22.320122Z",
        "branch": 12,
        "customer": 25
    },
    {
        "id": 7,
        "item_type": "Cookies",
        "order_state": "Shipped",
        "last_update_time": "2023-11-17T10:14:01.525093Z",
        "branch": 13,
        "customer": 13
    },
    {
        "id": 8,
        "item_type": "Muffins",
        "order_state": "Created",
        "last_update_time": "2023-11-17T10:16:26.314977Z",
        "branch": 15,
        "customer": 20
    },
    {
      "id": 9,
      "item_type": "Cake",
      "order_state": "Shipped",
      "last_update_time": "2023-11-17T10:14:01.525093Z",
      "branch": 13,
      "customer": 13
  },
  {
      "id": 10,
      "item_type": "Cake",
      "order_state": "Created",
      "last_update_time": "2023-11-17T10:16:26.314977Z",
      "branch": 15,
      "customer": 20
  },
  {
    "id": 11,
    "item_type": "Cookies",
    "order_state": "Shipped",
    "last_update_time": "2023-11-17T10:14:01.525093Z",
    "branch": 13,
    "customer": 13
},
{
    "id": 12,
    "item_type": "Cake",
    "order_state": "Created",
    "last_update_time": "2023-11-17T10:16:26.314977Z",
    "branch": 15,
    "customer": 20
},
{
  "id": 13,
  "item_type": "Cake",
  "order_state": "Cancelled",
  "last_update_time": "2023-11-17T10:16:26.314977Z",
  "branch": 15,
  "customer": 20
}
]
const itemPrices = {
    Cake: 500,
    Cookies: 50,
    Muffins: 100,
  };
  
  // Calculate total prices for each item type
  const itemTotalPrices = Total_data.reduce((totalPrices, order) => {
    const itemType = order.item_type;
    totalPrices[itemType] = (totalPrices[itemType] || 0) + itemPrices[itemType];
    return totalPrices;
  }, {});
  
  // Create a new list with key-value pairs (name and price)
  const data = Object.entries(itemTotalPrices).map(([name, price]) => ({
    name,
    price,
  }));
const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${value} Rupees`}</text>
    </g>
  );
};

export default class ItemsChart extends PureComponent {

  state = {
    activeIndex: 0,
  };

  onPieEnter = (_, index) => {
    this.setState({
      activeIndex: index,
    });
  };

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            activeIndex={this.state.activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="black"
            dataKey="price"
            onMouseEnter={this.onPieEnter}
          >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    );
  }
}


