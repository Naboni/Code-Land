import { useQuery } from "@tanstack/react-query";
import { Form, Input, Modal, Radio, Select } from "antd";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export const TopicCreateForm = ({ open, onCancel, setOpen }) => {
  const [form] = Form.useForm();
  const [isPosting, setIsPosting] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(topic) {
    setIsPosting(true);
    setOpen(false);
    await axios.post(`http://localhost:3001/topic`, topic);
    setIsPosting(false);
    navigate(`/topics`);
  }

  return (
    <Modal
      visible={open}
      title="Add a topic"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            handleSubmit(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="topic_in_modal"
        initialValues={{
          modifier: "public",
        }}
      >
        <Form.Item
          name="topic_name"
          label="Title"
          rules={[
            {
              required: true,
              message: "Please input the title of topic!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        
          <Form.Item
            name="topic_type"
            label="Topic Type"
            rules={[
              {
                required: true,
                message: "Please input a unique topic type!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        
      </Form>
    </Modal>
  );
};
