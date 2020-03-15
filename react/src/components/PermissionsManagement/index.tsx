import React, { useState } from 'react';
import { Modal, Tabs, Checkbox, Divider, Tree, Button } from 'antd';
import { GetPermissionListResultDto, PermissionGroupDto, PermissionGrantInfoDto } from '@/services/data';
import { connect } from 'dva';
import _ from 'lodash';
import { createTree } from "../../utils/utils";

const { TabPane } = Tabs;

const TabContent = (permissionItem: PermissionGroupDto) => {
  const keys = _.map(permissionItem.permissions, 'name');

  const defaultCheckedKeys=_.map(_.filter(permissionItem.permissions, t=>t.isGranted),'name');
  const [checKedKeys, handleChecKedKeys] = useState<string[]>(defaultCheckedKeys);
  const selectedAllChange = (e: any) => {
    handleChecKedKeys(e.target.checked ? keys : []);
  }
  const treeData = createTree(permissionItem.permissions, 'parentName', 'name', null, 'children', [{
    target: 'key',
    targetFunction(item: PermissionGrantInfoDto) {
      return item.name;
    },
  }, {
    target: 'title',
    targetFunction(item: PermissionGrantInfoDto) {
      return item.displayName;
    }
  }])
  const treeCheckHandle=(checkedKeys:any)=>{
    handleChecKedKeys(checkedKeys);
  }
  return (
    <TabPane tab={permissionItem.displayName} key={permissionItem.name}>
      <Checkbox onChange={selectedAllChange}>选择全部</Checkbox>
      <Divider />
      <Tree
        defaultExpandAll
        checkedKeys={checKedKeys}
        onCheck={treeCheckHandle}
        checkable
        treeData={treeData}
      />
    </TabPane>
  )
}
interface PermissionManagementProps {
  modalVisible: boolean;
  onCancel: () => void;
  providerName: string;
  providerKey: string;
  permissions: GetPermissionListResultDto;
}
const PermissionManagement: React.FC<PermissionManagementProps> = props => {
  const { modalVisible, onCancel, permissions: { entityDisplayName, groups } } = props;
  const footer = (
    <>

      <Button onClick={onCancel}>取消</Button>
      <Button  style={{marginLeft:8}} type='primary'>授予所有权限</Button>
      <Button  style={{marginLeft:8}} type='primary'>确认</Button>
    </>
  )
  return (
    <Modal
      title={`权限管理:${entityDisplayName}`}
      visible={modalVisible}
      footer={footer}
      onCancel={onCancel}>

      <Tabs tabPosition="left">
        {groups.map(item => TabContent(item))}
      </Tabs>
    </Modal>
  )
}
export default connect()(PermissionManagement);
