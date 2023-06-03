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

function useSolutions(userId) {
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

export function Progress() {
  const { authUser, loading } = useAuth();

  const { status, data } = useSolutions(authUser?.uid);
  if (loading) return <CenterLoading height="100vh" width="100vw" />;

  return (
    <div>
      <SimpleNav />
      <div className={classes.header}>
        <h1>Quality Coding Questions</h1>
        <p>The practice you need to ace the coding interviews.</p>
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
            <div className={classes.topics}>
              {data?.map((t, idx) => (
                <TopicItem key={idx} topic={t} />
              ))}
            </div>
          )}
        </CenterContent>
      </div>
    </div>
  );
}

export function TopicItem({ topic }) {
  let solutionSet = new Set();
  topic.solutions.forEach(solution => {
    solutionSet.add(solution.questionId);
  });
  const solvedQuestions = solutionSet.size;
  const totalQuestions = topic.question.length;
  const percentage = totalQuestions === 0 ? 0 : (solvedQuestions/totalQuestions) * 100;
  const completed = (solvedQuestions === totalQuestions || percentage === 100 || totalQuestions === 0) ? true : false;
  
  return (
    <Link to={`/topic-${topic.topic_name.toLowerCase()}`}>
      <div className={classes.progressWrapper}>
        <h3>{topic.topic_name}</h3>
        <CircularProgress status={completed} percentage={percentage}/>
      </div>
    </Link>
  );
}

function CircularProgress({status, percentage}) {
  return (
    <>
      {!status ? (
        <RingProgress
          sections={[{ value: percentage, color: "blue" }]}
          label={
            <Text color="blue" weight={700} align="center" size="xl">
              {percentage.toFixed(0)}%
            </Text>
          }
        />
      ) : (
        <RingProgress
          sections={[{ value: 100, color: "teal" }]}
          label={
            <Center>
              <ThemeIcon color="teal" variant="light" radius="xl" size="xl">
                <IconCheck size={22} />
              </ThemeIcon>
            </Center>
          }
        />
      )}
    </>
  );
}
