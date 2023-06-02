import { useState, useEffect } from "react";
import queryString from 'query-string';

import { Textarea, Button } from "@mantine/core";
import { FaSyncAlt } from "react-icons/fa";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
// style
import classes from "./prompt.module.css";
// local
import { displayNotification } from "../../utils/displayNotification";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";
import { useLocation } from "react-router-dom";

export default function Prompt({ socketRef, room, editorRef }) {
  const [value, setValue] = useState(editorRef.current);
  const [syncedValue, setSyncedValue] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  const { authUser } = useAuth();
  const userId = authUser?.uid;

  const location = useLocation();
  const { q } = queryString.parse(location.search);
  const questionId = q;


  const handleSync = () => {
    setSyncedValue(value);
    socketRef.current.emit("sync_prompt", { room, prompt: value });
  };

  const handleFavorite = () => {
    isFavorite ?
      axios.delete(`http://localhost:3001/favorite/user/${userId}/${questionId}`).then(() => {
        setIsFavorite(false);
      }
    )
    :
      axios.post(`http://localhost:3001/favorite/`, { userId, questionId }).then(() => {
        setIsFavorite(true);
      }
    )
  }

  useEffect(() => {
    if (userId && questionId){
      axios.get(`http://localhost:3001/favorite/user/${userId}/${questionId}`).then((res) => {
        console.log("res", res)
        if (res.data.isFavorite) {
          setIsFavorite(true);
        }
      }
    )
    }
  }, [userId, questionId])

  useEffect(() => {
    if (!socketRef.current) return;
    socketRef.current.on("prompt_sync", (prompt) => {
      // incase 3rd person joins, set editorRef to the new val
      editorRef.current = prompt;
      // change syncedValue b/c we want sync to be disable if not edited
      setSyncedValue(prompt);
      setValue(prompt);
      if (prompt !== "") {
        displayNotification({
          mssg: <p style={{ margin: 0 }}>Prompt updated just now.</p>,
          color: "lime",
        });
      }
    });

    return () => {
      socketRef.current.off("prompt_sync");
    };
  }, [socketRef.current]);

  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <h3>Prompt</h3>
        <div className={classes.roomBtn}>
          {isFavorite ? 
            <AiFillStar style={{color: "#FFD700"}} onClick={handleFavorite}/>
            :
            <AiOutlineStar style={{color: "#FFD700"}} onClick={handleFavorite}/>
          }
          <Button disabled={syncedValue === value} variant="filled" leftIcon={<FaSyncAlt />} color={"green"} onClick={handleSync}>
            Sync
          </Button>
        </div>
      </div>
      <Textarea
        value={value}
        style={{ height: "64vh", overflow: "auto" }}
        onChange={(e) => {
          editorRef.current = e.target.value;
          setValue(e.target.value);
        }}
        minRows={26}
        placeholder="Write question prompt here."
        variant="filled"
      />
    </div>
  );
}
