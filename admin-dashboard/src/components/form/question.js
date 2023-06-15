import { useQuery } from "@tanstack/react-query";
import { Form, Input, Modal, Radio, Select } from "antd";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export const CollectionCreateForm = ({ open, onCancel, setOpen, topics }) => {
  const [form] = Form.useForm();
  const [isPosting, setIsPosting] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(question) {
    setIsPosting(true);
    setOpen(false);
    await axios.post(`http://localhost:3001/question`, question);
    setIsPosting(false);
    navigate(`/questions`);
  }

  const { Option } = Select;

  return (
    <Modal
      visible={open}
      title="Add a question"
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
        name="form_in_modal"
        initialValues={{
          modifier: "public",
        }}
      >
        <Form.Item
          name="question_title"
          label="Title"
          rules={[
            {
              required: true,
              message: "Please input the title of question!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="topicId"
          label="Topic"
          rules={[
            {
              required: true,
              message: "Please select a topic!",
            },
          ]}
        >
          <Select
            placeholder="Select a topic"
            allowClear
            showSearch
            style={{ width: "100%" }}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
          >
            {topics.map((topic) => (
              <Option key={topic.id} value={topic.id}>
                {topic.topic_name}
              </Option>
            ))}
          </Select>
        </Form.Item>
          <Form.Item
            name="optimal_complexity"
            label="Optimal Complexity"
            rules={[
              {
                required: true,
                message: "Please input the title of optimal complexity!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        <Form.Item name="question_prompt" label="Description">
          <Input.TextArea rows={10} />
        </Form.Item>
        <Form.Item name="sample_input" label="Sample input">
          <Input.TextArea rows={1} />
        </Form.Item>
        <Form.Item name="sample_output" label="Sample output">
          <Input.TextArea rows={1} />
        </Form.Item>
        <Form.Item
          name="question_difficulty"
          className="collection-create-form_last-form-item"
        >
          <Radio.Group>
            <Radio value="easy">Easy</Radio>
            <Radio value="medium">Medium</Radio>
            <Radio value="hard">Hard</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};
