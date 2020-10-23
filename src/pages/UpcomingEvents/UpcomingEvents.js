import './UpcomingEvents.css';
import {
  Table, PageHeader, Typography, Row, Checkbox,
} from 'antd';
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import EventTypeFilter from '../../components/EventTypeFilter/EventTypeFilter';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Bets allowed',
    dataIndex: 'bet_allowed',
    key: 'bet_allowed',
    render: (value) => <Checkbox checked={value} />,
  },
  {
    title: 'Start date',
    dataIndex: 'start_date',
    key: 'start_date',
  },
];

function UpcomingEvents() {
  const [type, setType] = useState('');
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadData = async () => {
    setLoading(true);
    const url = `https://cors-anywhere.herokuapp.com/https://api.smarkets.com/v3/events/?state=upcoming${type ? `&type=${type}` : ''}`;

    const response = await Axios.get(url);
    setTableData(response.data.events);
    setLoading(false);
  };
  useEffect(() => {
    loadData();
  }, [type]);
  return (
    <>
      <PageHeader title="Smarkets Events" />
      <main className="main">
        <div className="content-paper">
          <Row className="row-container" align="middle" justify="space-between">
            <Typography>Upcoming Events</Typography>
            <EventTypeFilter onChange={(e) => setType(e)} />
          </Row>
          <Table rowKey={(r) => r.id} loading={loading} dataSource={tableData} columns={columns} />
        </div>
      </main>
      <footer>
        <Typography>© Copyright 2020 Smarkets Events</Typography>
      </footer>
    </>
  );
}

export default UpcomingEvents;
