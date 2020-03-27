import { Modal, Form, Input, message } from "antd";
import React from "react";
import { useRequest } from "@umijs/hooks";
import { TenantUpdateDto } from "../data";
import { updateTenant } from "../service";

interface EditFormProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: () => void;
  editTenant: TenantUpdateDto;
}
const EditForm: React.FC<EditFormProps> = props => {
  const { visible, onCancel, onSubmit, editTenant } = props;
  const [form] = Form.useForm();
  const { run: doEditTenant } = useRequest(updateTenant, {
    manual: true,
    onSuccess: () => {
      message.success("操作成功！");
      onCancel();
      onSubmit();
    }
  });
  const handleOk = () => {
    form.validateFields().then(values => {
      form.resetFields();
      doEditTenant({
        id: editTenant?.id,
        name:values.name,
      })
    })
  }
  return (
    <Modal onOk={handleOk} title="编辑租户" onCancel={onCancel} visible={visible}>
      <Form form={form} layout="vertical" initialValues={editTenant} name="edit_tenant">
        <Form.Item
          label="租户名称"
          name="name"
          rules={[{
            required: true,
            message: "租户名称不能为空!"
          }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default EditForm;
