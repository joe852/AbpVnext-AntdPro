import { Modal } from 'antd';
import React from 'react';

interface CreateOrUpdateFormProps {
  visible: boolean;
  onCancel: () => void;
}
const CreateOrUpdateForm: React.FC<CreateOrUpdateFormProps> = props => {
  const { visible, onCancel } = props;
  return (
    <Modal onCancel={onCancel} visible={visible}>
      123
    </Modal>
  );
};
export default CreateOrUpdateForm;
