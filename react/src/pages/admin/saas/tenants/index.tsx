
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useRef, useState } from 'react';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { PlusOutlined, SettingOutlined, DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, message } from 'antd';
import { useRequest } from '@umijs/hooks';
import { SaasTenantDto, TenantUpdateDto } from './data';
import { queryTenants, deleteTenant } from './service';
import CreateForm from './components/createForm';
import EditForm from './components/editForm';



const Tenants: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false);
  const [editModalVisible, handleEditModalVisible] = useState<boolean>(false);
  const [editTenant, setEditTenant] = useState<TenantUpdateDto|null>(null);

  const reloadTable = () => {
    actionRef.current!.reload();
  }
  const { run: doDeleteTenant } = useRequest(deleteTenant, {
    manual: true,
    onSuccess: () => {
      message.success("操作成功！");
      reloadTable();
    }
  });

  const handleEditTenant=async (item:SaasTenantDto)=>{
   await setEditTenant({
      name:item.name,
      id:item.id,
    })
    await handleEditModalVisible(true)
  }

  const columns: ProColumns<SaasTenantDto>[] = [
    {
      title: '操作',
      render: (_, record) =>
        <Dropdown
          overlay={
            <Menu
              selectedKeys={[]}
            >
              <Menu.Item onClick={() => handleEditTenant(record!) } key="edit">编辑</Menu.Item>
              <Menu.Item onClick={() => doDeleteTenant(record.id)} key="delete">删除</Menu.Item>
            </Menu>
          }
        >
          <Button type="primary">
            <SettingOutlined /> 操作 <DownOutlined />
          </Button>
        </Dropdown>
    },
    {
      title: '租户名称',
      dataIndex: 'name',
    }
  ]
  return (
    <PageHeaderWrapper>
      <ProTable<SaasTenantDto>
        headerTitle="用户信息"
        actionRef={actionRef}
        search={false}
        rowKey="id"
        toolBarRender={() => [
          <Button icon={<PlusOutlined />} onClick={() => handleCreateModalVisible(true)} type="primary" >
            新建
          </Button>
        ]}
        request={async (params = {}) => {
          const response = await queryTenants({ skipCount: params.current! - 1, maxResultCount: params.pageSize });
          const data = response.items;
          return {
            data,
            page: params.current,
            success: true,
            total: data.totalCount,
          }
        }}
        columns={columns}
      />
      <CreateForm
        visible={createModalVisible}
        onCancel={() => handleCreateModalVisible(false)}
        onSubmit={() => reloadTable()} />
      <EditForm
        visible={editModalVisible}
        onCancel={() => handleEditModalVisible(false)}
        onSubmit={() => reloadTable()}
        editTenant={editTenant!} />
    </PageHeaderWrapper>
  )
}

export default Tenants;
