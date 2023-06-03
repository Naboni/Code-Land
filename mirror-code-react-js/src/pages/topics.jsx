import axios from "axios";
import { Button } from "@mantine/core";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import classes from "../styles/index.module.css";
import CenterLoading from "../components/center-loading";
import SimpleNav from "../components/simple-nav";
import CenterContent from "../components/center-content";

function useTopics() {
  return useQuery({
    queryKey: ["topics"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:3001/topics");
      return data.topics;
    },
  });
}

export function Topics() {
  const { status, data } = useTopics();
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
  return (
    <Link to={`/topic-${topic.topic_name.toLowerCase()}`}>
      <div className={classes.topic}>
        <h3>{topic.topic_name}</h3>
      </div>
    </Link>
  );
}
