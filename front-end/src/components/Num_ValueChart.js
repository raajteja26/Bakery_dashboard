import React, { useState, PureComponent } from 'react';
import { PieChart, Pie, Sector,Cell, ResponsiveContainer } from 'recharts';

const ValuesChart = ({data}) => {
  const itemPrices = {
    Cake: 500,
    Cookies: 50,
    Muffins: 100,
  };
  const itemTotalPrices = data.reduce((totalPrices, order) => {
    const itemType = order.item_type;
    totalPrices[itemType] = (totalPrices[itemType] || 0) + itemPrices[itemType];
    return totalPrices;
  }, {});
  
  const data1 = Object.entries(itemTotalPrices).map(([name, price]) => ({
    name,
    price,
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

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

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        <Pie
          activeIndex={activeIndex}
          activeShape={(props) => renderActiveShape({ ...props, value: data1[activeIndex].price })}
          data={data1}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="black"
          dataKey="price"
          onMouseEnter={onPieEnter}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ValuesChart;



