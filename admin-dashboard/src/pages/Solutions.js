import { Row, Col, Card, Radio, Table, Button } from "antd";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";
import { SolutionCreateForm } from "../components/form/solution";
import { useState } from "react";
import CenterContent from "../components/CenterContent";
import CenterLoading from "../components/CenterLoading";
import { useAuth } from "../hooks/useAuth"
import {
  LoadingOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
const columns = [
  {
    title: "QUESTION",
    dataIndex: "question_title",
    key: "question_title",
    width: "32%",
  },
  {
    title: "TOPIC",
    dataIndex: "topic_name",
    key: "topic_name",
    width: "32%",
  },
  {
    title: "DIFFICULTY",
    key: "question_difficulty",
    dataIndex: "question_difficulty",
  },
  {
    title: "CREATED DATE",
    key: "createdAt",
    dataIndex: "createdAt",
  },
];

function useSolutions() {
  return useQuery({
    queryKey: ["solutions"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:3001/solutions");
      return data.solutions;
    },
  });
}

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

function Solutions() {
  const { status, data: solutionData, refetch } = useSolutions();
  const { status: questionStatus, data: questionData } = useQuestions();
  const { status: topicStatus, data: topics } = useTopics();
  const { authUser, loading } = useAuth();


  const data = solutionData?.map((solution) => ({
    key: solution?.id,
    question_title: solution?.question?.question_title,
    topic_name: solution?.topic?.topic_name,
    question_difficulty: solution?.question?.question_difficulty,
    createdAt: moment(solution?.createdAt).format("MMM Do YY"),
  }));

  const onChange = (e) => console.log(`radio checked:${e.target.value}`);
  const [open, setOpen] = useState(false);

  const [isReloading, setIsReloading] = useState(false);
  // write a function to fetch and update the data of solutions
  const reloadSolutions = async () => {
    setIsReloading(true);
    refetch();
    setIsReloading(false);
  };

  return (
    <div>
      <CenterContent>
        {questionStatus === "loading" || topicStatus === "loading" || loading ? (
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
              <Button
                type="primary"
                onClick={() => {
                  setOpen(true);
                }}
              >
                Add solution
              </Button>
              <SolutionCreateForm
                open={open}
                topics={topics}
                setOpen={setOpen}
                questions={questionData}
                userId={authUser.uid}
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
                  title="Solutions Table"
                  extra={
                    <>
                      <Radio.Group onChange={onChange} defaultValue="a">
                        <Radio.Button value="a">All</Radio.Button>
                        <Radio.Button value="b">REPORTED</Radio.Button>
                        <Radio.Button value="b" onClick={reloadSolutions}>
                          {!isReloading ? <ReloadOutlined  /> : <LoadingOutlined />}
                          </Radio.Button>
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

export default Solutions;
