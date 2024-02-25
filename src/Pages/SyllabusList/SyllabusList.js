import React, { useEffect, useState } from 'react';
import { Button, ConfigProvider, Flex, Popconfirm, Table } from 'antd';
import './SyllabusList.scss';
import { OutputStandard } from './OutputStandard';
import { Status } from './Status';
import axios from 'axios';
import InputSection from './InputSection';
import MenuOption from './MenuOption';

const SyllabusList = () => {
  const [apiData, setApiData] = useState();
  const data = [];
  useEffect(() => {
    axios.get('https://6541299af0b8287df1fdf263.mockapi.io/Syllabus-API').then((response) => {
      setApiData(response.data);
    });
  }, []);

  if (apiData) {
    apiData.map((item) => {
      data.push({
        key: item.id,
        id: item.id,
        syllabus: item.syllabus,
        code: item.code,
        createdOn: new Date(item.createdOn).toLocaleDateString('en-GB'),
        createdBy: item.createdBy,
        duration: item.duration,
        outputStandard: item.outputStandard.map((o) => <OutputStandard key={o} data={o} />),
        status: <Status data={item.status} />,
        options: <MenuOption />,
      });
    });
  }

  const columns = [
    {
      title: 'Syllabus',
      dataIndex: 'syllabus',
      key: 'syllabus',
      width: '30%',
    },
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      width: '20%',
    },
    {
      title: 'Created on',
      dataIndex: 'createdOn',
      key: 'createdOn',
    },
    {
      title: 'Created by',
      dataIndex: 'createdBy',
      key: 'createdBy',
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: 'Output standard',
      dataIndex: 'outputStandard',
      key: 'outputStandard',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      dataIndex: 'options',
      key: 'options',
    },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          controlItemBgHover: 'rgba(0, 0, 0, 0.04)',
          padding: 8,
        },
        components: {
          Table: {
            rowHoverBg: 'rgba(0,0,0,0.05)',
            headerBg: '#2D3748',
            headerColor: '#fff',
          },
          Modal: {
            headerBg: '#2D3748',
            headerColor: '#fff',
            titleColor: '#fff',
            wireframe: true,
          },
        },
      }}
    >
      <Flex gap={'4rem'} style={{ width: '100%', padding: '2rem' }} vertical>
        <Flex gap={'2rem'} vertical>
          <h4 style={{ margin: '0' }}>Syllabus</h4>
          <InputSection />
        </Flex>
        <Table columns={columns} dataSource={data} />
      </Flex>
    </ConfigProvider>
  );
};
export default SyllabusList;
