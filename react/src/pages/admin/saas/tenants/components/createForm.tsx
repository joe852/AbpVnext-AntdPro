import React from "react"
import { Modal, Form, Input, message } from "antd"
import { useRequest } from '@umijs/hooks';
import { createTenant } from "../service";
import { TenantCreateDto } from "../data.d";

interface CreateFormProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: () => void;
}

const CreateForm: React.FC<CreateFormProps> = props => {
  const { visible, onCancel, onSubmit } = props;
  const [form] = Form.useForm();
  const { run: doCreateTenant } = useRequest(createTenant, {
    manual: true,
    onSuccess: () => {
      message.success("操作成功！");
      onCancel();
      onSubmit();
    }
  });
  const handleOK = () => {
    form.validateFields().then(values => {
      doCreateTenant(values as TenantCreateDto);
    })
  }
  return (
    <Modal title="新增租户" onOk={handleOK} onCancel={onCancel} visible={visible}>
      <Form layout="vertical" form={form} name="create_tenant">
        <Form.Item
          label="租户名称"
          name="name"
          rules={[{
            required: true,
            message: "租户名称不能为空!"
          }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="管理员邮箱地址"
          name="adminEmailAddress"
          rules={[{
            required: true,
            message: "管理员邮箱地址不能为空!"
          },{
            type:'email',
            message:"请输入正确格式的邮箱地址！",
          }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="管理员密码"
          name="adminPassword"
          rules={[{
            required: true,
            message: "管理员密码不能为空!"
          }]}>
          <Input type="password" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateForm
