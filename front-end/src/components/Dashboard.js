import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { DatePicker } from 'antd';
import moment from 'moment';
import axios from "axios"
import ItemsChart from './ItemsChart';
import StatusChart from './StatusChart';
import TopBranchesChart from './TopBranchesChart';
import Num_ValueChart from './Num_ValueChart';
import Navbar from "./Navbar"

const Dashboard = (props) => {
  const [data, setData] = useState([])

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
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/orders/");
        setData(response.data)
        console.log('Data from API:', response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []); 

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
    <div style={{marginBottom:"40px"}}>
    <Navbar/>
    </div>
    <Container style={{paddingRight:"80px",paddingBottom:"50px",paddingLeft:"80px",backgroundColor: "#f6f7f9",position:"absolute"}} fluid className="dashboard-container">
      <DatePicker.RangePicker onChange={handleDateChange} format="YYYY-MM-DD" style={{marginTop:"40px",position:"relative"}}/>
      <Row> 
      <Col md={6} style={{fontSize:"25px",backgroundColor:"white",color:"#19BAE5"}}>Number Of Orders</Col>
      <Col md={6} style={{fontSize:"25px",backgroundColor:"white",color:"#19BAE5"}}>Status Of Orders</Col>
      </Row>
      <Row className="chart-row">
        <Col md={6} className="chart-col">
          <ItemsChart data={data} />
        </Col>
        <Col md={6} className="chart-col">
          <StatusChart data={data} />
        </Col>
      </Row>
      <Row>
      <Col md={6} style={{fontSize:"25px",backgroundColor:"white",color:"#19BAE5"}}>Top 5 Branches</Col>
      <Col md={6} style={{fontSize:"25px",backgroundColor:"white",color:"#19BAE5"}}>Values Of Orders</Col>
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
    </>
  );
};

export default Dashboard;
