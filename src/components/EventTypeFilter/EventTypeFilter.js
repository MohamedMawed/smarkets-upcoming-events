import React from 'react';
import { Select } from 'antd';
import PropTypes from 'prop-types';
import eventTypes from '../../constants';

const { Option } = Select;

const EventTypeFilter = ({ onChange }) => (
  <Select
    showSearch
    style={{ minWidth: 200 }}
    placeholder="Select event type"
    optionFilterProp="children"
    onChange={onChange}
    filterOption={(input, option) => option
      .children
      .toLowerCase().indexOf(input.toLowerCase()) >= 0}
  >
    {eventTypes.map((e) => {
      let option = e.split('_').join(' ');
      option = option.charAt(0).toUpperCase() + option.slice(1);
      return <Option key={e} value={e}>{option}</Option>;
    })}
  </Select>
);

EventTypeFilter.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default EventTypeFilter;
