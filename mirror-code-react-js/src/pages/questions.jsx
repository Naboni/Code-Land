import React, { useState } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import SimpleNav from '../components/simple-nav';
import CenterLoading from '../components/center-loading';
import CenterContent from '../components/center-content';

import { createRoomInfo } from '../utils/createRoomInfo';

import classes from '../styles/questions.module.css';

function useQuestions() {
  return useQuery({
    queryKey: ['questions'],
    queryFn: async () => {
      const { data } = await axios.get('http://localhost:3001/questions');
      return data.questions;
    },
  });
}

export default function Questions() {
  const { status, data } = useQuestions();

  return (
    <div>
      <SimpleNav />
      <div className={classes.header}>
        <h1>Quality Coding Questions</h1>
        <p>The practice you need to ace the coding interviews.</p>
      </div>

      <div className={classes.questions}>
        <CenterContent>
          {status === 'loading' ? (
            <CenterLoading height="50vh" width="75vw" />
          ) : status === 'error' ? (
            <h3>Error: Something went wrong</h3>
          ) : (
            <FormattedQuestions questions={data} />
          )}
        </CenterContent>
      </div>
    </div>
  );
}

function FormattedQuestions({ questions }) {
  const [formatBy, setFormatBy] = useState('question_difficulty');

  const formattedQuestions = {};

  questions.forEach((question) => {
    const formatKey = formatBy === 'question_difficulty' ? question[formatBy] : question['topic'][formatBy];
    const formatValue = formattedQuestions[formatKey];

    if (!formatValue) formattedQuestions[formatKey] = [];

    formattedQuestions[formatKey].push(question);
  });

  return (
    <div>
      <div className={classes.filters}>
        <div
          className={`${classes.filter} ${formatBy === 'question_difficulty' && classes.selectedFilter}`}
          onClick={() => setFormatBy('question_difficulty')}
        >
          GROUP BY DIFFICULTY
        </div>
        <div className={`${classes.filter} ${formatBy === 'topic_type' && classes.selectedFilter}`} onClick={() => setFormatBy('topic_type')}>
          GROUP BY CATEGORY
        </div>
      </div>
      <div className={classes.formattedQuestions}>
        {Object.keys(formattedQuestions).map((key, i) => {
          return (
            <div key={i} style={{ width: '100%' }}>
              <h4 style={{ color: 'black' }}>{`${key.toUpperCase()} (${formattedQuestions[key].length})`}</h4>
              {formattedQuestions[key].map((q, i) => (
                <QuestionsItem key={i} question={q} />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const difficultyColor = {
  easy: 'lime',
  medium: 'turquoise',
  hard: 'orangered',
};

function QuestionsItem({ question }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function handleClick(q) {
    queryClient.setQueryData([q.id], q);

    const { success, username, room } = await createRoomInfo();
    if (success) return navigate(`/mirror-editor/?r=${room}&u=${username}&q=${q.id}`);
    throw new Error('Error');
  }

  return (
    <div className={classes.questionItem} onClick={() => handleClick(question)}>
      <h5>{question.question_title}</h5>
      <div className={classes.difficulty} style={{ backgroundColor: difficultyColor[question['question_difficulty']] }}></div>
    </div>
  );
}
