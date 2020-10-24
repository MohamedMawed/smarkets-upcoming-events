import React, { useEffect, useState } from 'react';
import {
  Table,
} from 'antd';
import Axios from 'axios';
import PropTypes from 'prop-types';

const STable = ({ url, columns }) => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);

    const response = await Axios.get(url);
    setTableData(response.data.events);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [url]);

  return <Table rowKey={(r) => r.id} loading={loading} dataSource={tableData} columns={columns} />;
};

STable.propTypes = {
  url: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    dataIndex: PropTypes.string,
    key: PropTypes.string,
    render: PropTypes.func,
  })).isRequired,
};

export default STable;
