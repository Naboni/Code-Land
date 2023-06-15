
import {
    Row,
    Col,
    Card,
    Radio,
    Table,
    Button,
  } from "antd";
  
  
  import { useQuery } from "@tanstack/react-query";
  import axios from 'axios';
  import moment from "moment";
import { useState } from "react";
import { TopicCreateForm } from "../components/form/topic";
 
  const columns = [
    {
      title: "TITLE",
      dataIndex: "topic_name",
      key: "topic_name",
      width: "32%",
    },
    {
      title: "QUESTIONS",
      key: "questions",
      dataIndex: "questions",
    },
    {
      title: "SOLUTIONS",
      key: "solutions",
      dataIndex: "solutions",
    },
    {
      title: "CREATED DATE",
      key: "createdAt",
      dataIndex: "createdAt",
    },
  ];
  
  function useTopics() {
      return useQuery({
        queryKey: ['topics'],
        queryFn: async () => {
          const { data } = await axios.get('http://localhost:3001/topics');
          return data.topics;
        },
      });

  }

  function Topics() {

    const { status, data: topicData } = useTopics();

  const [open, setOpen] = useState(false);

  
    const data = topicData?.map((topic) => ({
      key: topic?.id,
      topic_name: topic?.topic_name,
      questions: topic?.question?.length,
      solutions: topic?.solution?.length,
      createdAt: moment(topic?.createdAt).format("MMM Do YY"),
    }));
  
    const onChange = (e) => console.log(`radio checked:${e.target.value}`);
  
    return (
      <>
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
                Add topic
              </Button>
            <TopicCreateForm
              open={open}
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
                title="Topics Table"
                extra={
                  <>
                    <Radio.Group onChange={onChange} defaultValue="a">
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
      </>
    );
  }
  
  export default Topics;
  