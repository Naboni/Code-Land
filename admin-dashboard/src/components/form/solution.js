import { useQuery } from "@tanstack/react-query";
import { Form, Input, Modal, Radio, Select } from "antd";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export const SolutionCreateForm = ({ open, onCancel, setOpen, topics, questions, userId }) => {
  const [form] = Form.useForm();
  const [isPosting, setIsPosting] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(solution) {
    setIsPosting(true);
    setOpen(false);
    await axios.post(`http://localhost:3001/solution`, {...solution, userId, official: true});
    setIsPosting(false);
    navigate(`/solutions`);
  }

  const { Option } = Select;

  return (
    <Modal
      visible={open}
      title="Add a solution"
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
          name="questionId"
          label="Question"
          rules={[
            {
              required: true,
              message: "Please select a question!",
            },
          ]}
        >
          <Select
            placeholder="Select a question"
            allowClear
            showSearch
            style={{ width: "100%" }}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
          >
            {questions.map((question) => (
              <Option key={question.id} value={question.id}>
                {question.question_title}
              </Option>
            ))}
          </Select>
        </Form.Item>
          
        <Form.Item name="solutionCode" label="Description">
          <Input.TextArea rows={10} />
        </Form.Item>
        
      </Form>
    </Modal>
  );
};
