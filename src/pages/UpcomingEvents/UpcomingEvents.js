import './UpcomingEvents.css';
import {
  PageHeader, Typography, Row, Checkbox,
} from 'antd';
import React, { useState } from 'react';
import EventTypeFilter from '../../components/EventTypeFilter/EventTypeFilter';
import STable from '../../components/STable/STable';
import strings from '../../constants/strings';
import { baseUrl } from '../../constants/appConstants';

const { main, upcomingEvents } = strings;
const columns = [
  {
    title: upcomingEvents.tableColumns.name,
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: upcomingEvents.tableColumns.betsAllowed,
    dataIndex: 'bet_allowed',
    key: 'bet_allowed',
    render: (value) => <Checkbox checked={value} />,
  },
  {
    title: upcomingEvents.tableColumns.startDate,
    dataIndex: 'start_date',
    key: 'start_date',
  },
];

function UpcomingEvents() {
  const [type, setType] = useState('');

  return (
    <>
      <PageHeader title={main.title} />
      <main className="main">
        <div className="content-paper">
          <Row className="row-container" align="middle" justify="space-between">
            <Typography>{upcomingEvents.title}</Typography>
            <EventTypeFilter onChange={(e) => setType(e)} />
          </Row>
          <STable
            columns={columns}
            url={`${baseUrl}v3/events/?state=upcoming${type ? `&type=${type}` : ''}`}
          />
        </div>
      </main>
      <footer>
        <Typography>{main.copyRights}</Typography>
      </footer>
    </>
  );
}

export default UpcomingEvents;
