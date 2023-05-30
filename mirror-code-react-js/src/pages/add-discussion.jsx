import React, { useState, useEffect, useRef } from 'react';

import axios from 'axios';
import queryString from 'query-string';
import { IconAlertCircle } from '@tabler/icons-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, TextInput, NativeSelect, Alert } from '@mantine/core';

// codemirror
import { basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { python } from '@codemirror/lang-python';
import { indentUnit } from '@codemirror/language';
import { indentWithTab } from '@codemirror/commands';
import { EditorView, keymap } from '@codemirror/view';
import { HighlightStyle } from '@codemirror/language';
import { oneDarkTheme } from '@codemirror/theme-one-dark';
import { syntaxHighlighting } from '@codemirror/language';

import { useAuth } from '../hooks/useAuth';
import { highlight } from '../constants/theme';

import SimpleNav from '../components/simple-nav';
import CenterContent from '../components/center-content';

import classes from '../styles/add-discussion.module.css';

export default function AddDiscussion() {
  const codeRef = useRef('');
  const selectRef = useRef(null);

  const [value, setValue] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  const { authUser } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const { q } = queryString.parse(location.search);

  async function handleSubmit(discussion) {
    setIsPosting(true);
    await axios.post(`http://localhost:3001/discussion`, discussion);
    setIsPosting(false);
    navigate(`/discussion?q=${q}`);
  }

  return (
    <>
      <SimpleNav />
      <br />
      <br />

      <CenterContent>
        <div className={classes.wrapper}>
          <div className={classes.header}>
            <TextInput
              style={{ width: '100%' }}
              placeholder="Enter title"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              size="sm"
              required
            />
            <NativeSelect ref={selectRef} data={['Python']} style={{ width: '20%' }} variant="filled" />
            <div className={classes.actions}>
              <Link to={`/discussion?q=${q}`}>
                <Button variant="default">Cancel</Button>
              </Link>
              <Button
                color="green"
                loading={isPosting}
                onClick={() =>
                  handleSubmit({ description: codeRef.current, tag: selectRef.current.value, title: value, user_id: authUser.uid, questionId: q })
                }
              >
                Post
              </Button>
            </div>
          </div>
          <DiscussionEditor codeRef={codeRef} />
        </div>
        <br />
        <NewAlert />
      </CenterContent>
    </>
  );
}

function DiscussionEditor({ codeRef }) {
  useEffect(() => {
    const myHighlightStyle = HighlightStyle.define(highlight);
    const state = EditorState.create({
      doc: `# Intuition
<!-- Describe your first thoughts on how to solve this problem. -->

# Approach
<!-- Describe your approach to solving the problem. -->

# Complexity
- Time complexity:
<!-- Add your time complexity here, e.g. $$O(n)$$ -->

- Space complexity:
<!-- Add your space complexity here, e.g. $$O(n)$$ -->

# Code

class Solution:
#     def mostPoints(self, questions: List[List[int]]) -> int:
#         maxPtsEarned = 0
#         visitedQuestions = {}
#         return self.getPointsEarned(0, questions, visitedQuestions)
    
#     def getPointsEarned(self, startIdx, questions, visitedQuestions):
#         if startIdx >= len(questions): return 0
#         key = self.getKey(questions, startIdx)

#         if key in visitedQuestions:
#             return visitedQuestions[key]
        
#         maxPtsEarned = 0
#         for i in range(startIdx, len(questions)):
#             question = questions[i]
#             possibleStartIdx = question[1] + i + 1
#             nextStartIdx = possibleStartIdx if possibleStartIdx < len(questions) else len(questions)
#             pointsEarned = question[0] + self.getPointsEarned(nextStartIdx, questions, visitedQuestions)
#             maxPtsEarned = max(maxPtsEarned, pointsEarned)
        
#         visitedQuestions[key] = maxPtsEarned
#         return visitedQuestions[key]
    
#     def getKey(self, questions, idx):
#         return '{}-{}-{}'.format(questions[idx][0], questions[idx][1], idx)

    def mostPoints(self, questions: List[List[int]]) -> int:
        dp = [0] * (len(questions) + 1) 
        for i in range(len(questions) - 1, -1, -1):
            points, jump = questions[i][0], questions[i][1]
            dp[i] = max(points + dp[min(jump + i + 1, len(questions))], dp[i + 1])
        return dp[0];
      
      `,
      extensions: [
        basicSetup,
        python(),
        indentUnit.of('    '),
        keymap.of([indentWithTab]),
        EditorView.updateListener.of((e) => (codeRef.current = e.state.doc.toString())),
        oneDarkTheme,
        syntaxHighlighting(myHighlightStyle),
      ],
    });
    new EditorView({ state, parent: document.querySelector('#discussion-editor') });
  }, []);

  return (
    <div style={{ padding: '10px' }}>
      <div id="discussion-editor" spellCheck="false"></div>
    </div>
  );
}

function NewAlert() {
  return (
    <Alert icon={<IconAlertCircle size="1rem" />} title="Information" radius="xs">
      You are creating a new discussion thread for this question!
    </Alert>
  );
}
