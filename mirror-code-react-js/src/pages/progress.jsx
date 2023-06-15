import axios from "axios";
import { Button } from "@mantine/core";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import classes from "../styles/index.module.css";
import CenterLoading from "../components/center-loading";
import SimpleNav from "../components/simple-nav";
import CenterContent from "../components/center-content";
import { useAuth } from "../hooks/useAuth";
import { ThemeIcon, RingProgress, Text, Center } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import Heatmap from "../components/heatmap";

function useTopics(userId) {
  return useQuery({
    queryKey: [`topics1-${userId}`],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:3001/topics/user/${userId}`
      );
      return data.topics;
    },
  });
}

function useSolutions(userId) {
  return useQuery({
    queryKey: [`solution-${userId}`],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:3001/solution/user/${userId}`
      );
      return data.solution;
    },
  });
}

export function Progress() {
  const { authUser, loading } = useAuth();

  const { status, data } = useTopics(authUser?.uid);
  const { status: solutionStatus, data: solutionData } = useSolutions(
    authUser?.uid
  );
  console.log("a", solutionData);
  if (loading) return <CenterLoading height="100vh" width="100vw" />;

  return (
    <div>
      <SimpleNav />
      <div className={classes.header}>
        <h1>Track Progress</h1>
        <p>Track progress for each topics and questions</p>
      </div>

      <br />
      <br />
      <br />
      <div className={classes.topicsWrapper}>
        <CenterContent>
          {status === "loading" ? (
            <CenterLoading height="50vh" width="75vw" />
          ) : status === "error" ? (
            <h3>Error: Something went wrong</h3>
          ) : (
            <div>
              <div className={classes.topics}>
                {data?.map((t, idx) => (
                  <TopicItem key={idx} topic={t} />
                ))}
              </div>
              <div style={{ height: "100px", margin: "50px" }}>
                <div style={{ padding: "9px 12px 0px 12px" }}>
                  <div style={{ fontWeight: 600 }}>
                    {solutionData.length} Submissions in the last 365 days
                  </div>
                  <hr />
                  <div style={{ padding: "12px" }}>
                    <Heatmap solutions={solutionData} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </CenterContent>
      </div>
    </div>
  );
}

export function TopicItem({ topic }) {
  let solutionSet = new Set();
  topic.solutions.forEach((solution) => {
    solutionSet.add(solution.questionId);
  });
  const solvedQuestions = solutionSet.size;
  const totalQuestions = topic.question.length;
  const percentage =
    totalQuestions === 0 ? 0 : (solvedQuestions / totalQuestions) * 100;
  const completed =
    solvedQuestions === totalQuestions ||
    percentage === 100 ||
    totalQuestions === 0
      ? true
      : false;

  return (
    <Link to={`/topic-${topic.topic_name.toLowerCase()}`}>
      <div className={classes.progressWrapper}>
        <h5 style={{ padding: "0 0 0 10px" }}>{topic.topic_name}</h5>
        <CircularProgress status={completed} percentage={percentage} />
      </div>
    </Link>
  );
}

function CircularProgress({ status, percentage }) {
  return (
    <>
      {!status ? (
        <RingProgress
          size={70}
          sections={[{ value: percentage, color: "blue" }]}
          label={
            <Text color="blue" weight={700} align="center" size="sm">
              {percentage.toFixed(0)}%
            </Text>
          }
        />
      ) : (
        <RingProgress
          size={70}
          sections={[{ value: 100, color: "teal" }]}
          label={
            <Center>
              <ThemeIcon color="teal" variant="light" radius="sm" size="sm">
                <IconCheck size={22} />
              </ThemeIcon>
            </Center>
          }
        />
      )}
    </>
  );
}
