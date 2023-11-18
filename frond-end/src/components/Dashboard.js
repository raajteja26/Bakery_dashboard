import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { DatePicker } from 'antd';
import moment from 'moment';
// import 'antd/dist/antd.css';
import ItemsChart from './ItemsChart';
import StatusChart from './StatusChart';
import TopBranchesChart from './TopBranchesChart';
import Num_ValueChart from './Num_ValueChart';

const Dashboard = () => {
  const [data, setData] = useState([
    {
        "id": 1,
        "item_type": "Muffins",
        "order_state": "Created",
        "last_update_time": "2023-11-05T17:39:18.865787Z",
        "branch": 7,
        "customer": 1
    },
    {
        "id": 2,
        "item_type": "Cake",
        "order_state": "Created",
        "last_update_time": "2023-11-05T18:10:22.513478Z",
        "branch": 10,
        "customer": 2
    },
    {
        "id": 5,
        "item_type": "Cake",
        "order_state": "Created",
        "last_update_time": "2023-11-07T10:11:22.320122Z",
        "branch": 12,
        "customer": 25
    },
    {
        "id": 7,
        "item_type": "Cookies",
        "order_state": "Shipped",
        "last_update_time": "2023-11-04T10:14:01.525093Z",
        "branch": 13,
        "customer": 13
    },
    {
        "id": 8,
        "item_type": "Muffins",
        "order_state": "Created",
        "last_update_time": "2023-11-01T10:16:26.314977Z",
        "branch": 15,
        "customer": 20
    },
    {
      "id": 9,
      "item_type": "Cake",
      "order_state": "Shipped",
      "last_update_time": "2023-11-02T10:14:01.525093Z",
      "branch": 13,
      "customer": 13
  },
  {
      "id": 10,
      "item_type": "Cake",
      "order_state": "Delivered",
      "last_update_time": "2023-11-03T10:16:26.314977Z",
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
])

const [dates, setDates] = useState([]);

const handleDateChange = (values) => {
  const formattedDates = values.map((date) => {
    const { $D, $M, $y } = date;
    const extractedDate = new Date($y, $M, $D);
    return moment(extractedDate).format('YYYY-MM-DD');
  });

  setDates(formattedDates);
  const startDate = formattedDates[0];
const endDate = moment(formattedDates[1]).add(1, 'days');
const filteredData = data.filter((item) => {
  const itemDate = moment(item.last_update_time);
  return itemDate.isBetween(startDate, endDate, null, '[)');
});
  setData(filteredData);
};

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Container style={{paddingRight:"50px",paddingBottom:"50px",paddingLeft:"50px",backgroundColor: "#f6f7f9"}} fluid className="dashboard-container">
      <DatePicker.RangePicker onChange={handleDateChange} format="YYYY-MM-DD" />
      <Row className="chart-row">
        <Col md={6} className="chart-col">
          <ItemsChart data={data} />
        </Col>
        <Col md={6} className="chart-col">
          <StatusChart data={data} />
        </Col>
      </Row>
      <Row className="chart-row">
        <Col md={6} className="chart-col">
          <TopBranchesChart data={data} />
        </Col>
        <Col md={6} className="chart-col">
          <Num_ValueChart data={data} />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
