import React, { useEffect, useState } from "react";

import * as random from "lib0/random";
import { Button } from "@mantine/core";
import { useFullscreen } from "@mantine/hooks";
import { BsFullscreen, BsFullscreenExit } from "react-icons/bs";

// codemirror
import * as Y from "yjs";
import { basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { WebsocketProvider } from "y-websocket";
import { python } from "@codemirror/lang-python";
import { indentUnit } from "@codemirror/language";
import { indentWithTab } from "@codemirror/commands";
import { EditorView, keymap } from "@codemirror/view";
import { HighlightStyle } from "@codemirror/language";
import { oneDarkTheme } from "@codemirror/theme-one-dark";
import { syntaxHighlighting } from "@codemirror/language";
import { yCollab, yUndoManagerKeymap } from "y-codemirror.next";

// style
import classes from "./editor.module.css";

// components
import Output from "./output";

//local
import { highlight, userColors } from "../../constants/theme";
import { displayNotification } from "../../utils/displayNotification";

export default function Editor({ socketRef, room, userName, codeRef, optionRef }) {
  const [result, setResult] = useState({
    submittedAt: "Not submitted",
    executionTime: "0",
    output: { data: "Click 'Run Code' to see program output.", stderr: false },
  });
  const [codeExecuting, setCodeExecuting] = useState(false);
  const { ref, toggle, fullscreen } = useFullscreen();

  useEffect(() => {
    const userColor = userColors[random.uint32() % userColors.length];

    const yDoc = new Y.Doc();
    let provider = null;
    try {
      const provider = new WebsocketProvider("ws://localhost:1234", room, yDoc);
      const yText = yDoc.getText("codemirror");

      provider.awareness.setLocalStateField("user", {
        name: userName,
        color: userColor.color,
        colorLight: userColor.light,
      });

      const myHighlightStyle = HighlightStyle.define(highlight);
      const state = EditorState.create({
        doc: yText.toString(),
        extensions: [
          basicSetup,
          python(),
          indentUnit.of("    "),
          keymap.of([...yUndoManagerKeymap, indentWithTab]),
          EditorView.updateListener.of((e) => (codeRef.current = e.state.doc.toString())),
          // yjs
          yCollab(yText, provider.awareness),
          // theme
          oneDarkTheme,
          syntaxHighlighting(myHighlightStyle),
        ],
      });
      new EditorView({ state, parent: document.querySelector("#editor") });
    } catch (_) {
      displayNotification({
        mssg: (
          <p style={{ margin: 0 }}>
            <b>Error!</b> Something went wrong. Try refreshing.
          </p>
        ),
        color: "red",
      });
    }
    return () => {
      if (provider) {
        provider.disconnect(); //the provider should stop propagating changes if user leaves editor
        yDoc.destroy(); //We destroy doc we created and disconnect
      }
    };
  }, []);

  useEffect(() => {
    if (!socketRef.current) return;
    socketRef.current.on("code_executing", () => {
      setCodeExecuting(true);
    });

    socketRef.current.on("run_result", ({ executionTime, output, submittedAt }) => {
      setResult({ output, executionTime, submittedAt });
      setCodeExecuting(false);
    });

    return () => {
      socketRef.current.off("run_result");
      socketRef.current.off("code_executing");
    };
  }, [socketRef.current]);

  const handleRunCode = async () => {
    try {
      setCodeExecuting(true);
      if (codeRef.current.trim().length === 0) throw new Error("No data provided");
      const payload = {
        language: optionRef.current.value,
        code: codeRef.current,
      };

      // emit execute_code
      socketRef.current.emit("execute_code", { room, payload });
    } catch (_) {
      displayNotification({
        mssg: (
          <p style={{ margin: 0 }}>
            <b>Error!</b> Check your input.
          </p>
        ),
        color: "red",
      });
      setCodeExecuting(false);
    }
  };

  return (
    <div ref={ref} className={classes.wrapper}>
      <div>
        <div className={classes.header}>
          <h3>Your Code</h3>
          <div className={classes.action}>
            <Button className={classes.toggleBtn} onClick={toggle}>
              {fullscreen ? <BsFullscreenExit className={classes.icon} /> : <BsFullscreen className={classes.icon} />}
            </Button>
            <Button variant="filled" onClick={handleRunCode} loading={codeExecuting}>
              Run Code
            </Button>
          </div>
        </div>
        <div id="editor" spellCheck="false"></div>
      </div>
      <Output result={result} codeExecuting={codeExecuting} />
    </div>
  );
}
