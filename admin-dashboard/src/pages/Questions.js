import { Row, Col, Card, Radio, Table, Button, Modal } from "antd";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";
import { useState } from "react";
import { CollectionCreateForm } from "../components/form/question";
import CenterLoading from "../components/CenterLoading";
import CenterContent from "../components/CenterContent";

const columns = [
  {
    title: "TITLE",
    dataIndex: "question_title",
    key: "question_title",
    width: "32%",
  },
  {
    title: "TOPIC",
    dataIndex: "topic",
    key: "topic",
  },

  {
    title: "DIFFICULTY",
    key: "difficulty",
    dataIndex: "difficulty",
  },
  {
    title: "FAVORITES",
    key: "favorites",
    dataIndex: "favorites",
  },
  {
    title: "DISCUSSION POSTS",
    key: "discussion_posts",
    dataIndex: "discussion_posts",
  },
  {
    title: "CREATED DATE",
    key: "createdAt",
    dataIndex: "createdAt",
  },
];

function useQuestions() {
  return useQuery({
    queryKey: ["questions"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:3001/questions");
      return data.questions;
    },
  });
}

function useTopics() {
  return useQuery({
    queryKey: ["topics"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:3001/topics");
      return data.topics;
    },
  });
}

function Questions() {
  const { status: questionStatus, data: questionData } = useQuestions();
  const { status: topicStatus, data: topics } = useTopics();

  const data = questionData?.map((question) => ({
    key: question?.id,
    question_title: question?.question_title,
    topic: question?.topic?.topic_name,
    difficulty: question?.question_difficulty,
    favorites: question?.favorites?.length,
    discussion_posts: question?.discussion?.length,
    createdAt: moment(question?.createdAt).format("MMM Do YY"),
  }));

  const onChange = (e) => console.log(`radio checked:${e.target.value}`);

  const [open, setOpen] = useState(false);

  return (
    <div>
      <CenterContent>
      {questionStatus === "loading" || topicStatus === "loading" ? (
        <CenterLoading />
      ) : questionStatus === "error" || topicStatus === "error" ? (
        <h3>Error</h3>
      ) : (
        <div className="tabled">
          <div
            style={{
              margin: "0 0 20px 0",
              display: "flex",
              justifyContent: "end",
            }}
          >
            {topicStatus === "loading" ? (
              "Loading..."
            ) : topicStatus === "error" ? (
              "Error"
            ) : (
              <Button
                type="primary"
                onClick={() => {
                  setOpen(true);
                }}
              >
                Add question
              </Button>
            )}
            <CollectionCreateForm
              open={open}
              topics={topics}
              setOpen={setOpen}
              onCancel={() => {
                setOpen(false);
              }}
            />
          </div>
          <Row gutter={[24, 0]}>
            <Col xs="24" xl={24}>
              <Card
                bordered={false}
                className="criclebox tablespace mb-24"
                title="Questions Table"
                extra={
                  <>
                    <Radio.Group onChange={onChange} defaultValue="aa">
                      <Radio.Button value="a">All</Radio.Button>
                      <Radio.Button value="b">REPORTED</Radio.Button>
                    </Radio.Group>
                  </>
                }
              >
                <div className="table-responsive">
                  <Table
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    className="ant-border-space"
                  />
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      )}
      </CenterContent>
    </div>
  );
}

export default Questions;
