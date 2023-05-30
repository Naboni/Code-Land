import React, { useState, useEffect, useRef } from 'react';

import axios from 'axios';
import queryString from 'query-string';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IconAlertCircle, IconArrowUp, IconMessage } from '@tabler/icons-react';
import { Button, TextInput, NativeSelect, Alert, Textarea } from '@mantine/core';

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
import CenterLoading from '../components/center-loading';

import classes from '../styles/add-discussion.module.css';

function useDiscussion(id) {
  return useQuery({
    queryKey: [id],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:3001/discussion/${id}`);
      return data.discussion;
    },
  });
}

export default function DiscussionView() {
  const { authUser, loading } = useAuth();
  const location = useLocation();
  const { d } = queryString.parse(location.search);

  const codeRef = useRef('');
  const selectRef = useRef(null);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, status } = useDiscussion(d);

  const [value, setValue] = useState(data?.title);
  const [isVoting, setIsVoting] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  async function handleUpVote() {
    setIsVoting(true);
    await axios.put(`http://localhost:3001/discussion`, Object.assign({}, data, { up_vote_count: data.up_vote_count + 1 }));
    queryClient.invalidateQueries([data.id]);
    setIsVoting(false);
    setHasVoted(true);
  }

  useEffect(() => {
    if (data) setValue(data?.title);
  }, [data]);

  // useEffect(() => {
  //   axios.put(`http://localhost:3001/discussion`, Object.assign({}, data, { seen_count: data.seen_count + 1 }));
  // }, []);

  if (loading || status === 'loading') return <CenterLoading />;

  const isUserAuthor = authUser.uid === data.user_id;

  async function handleSubmit(discussion) {
    setIsPosting(true);
    await axios.put(`http://localhost:3001/discussion`, discussion);
    setIsPosting(false);
    navigate(`/discussion?q=${data.questionId}`);
  }

  return (
    <>
      <SimpleNav />
      <br />
      <br />
      <CenterContent>
        <div className={classes.contentWrapper}>
          <div className={classes.wrapper}>
            <div className={classes.header}>
              <TextInput
                disabled={!isUserAuthor}
                style={{ width: '100%' }}
                placeholder="Enter title"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                size="sm"
                required
              />
              <NativeSelect disabled={!isUserAuthor} ref={selectRef} data={['Python']} style={{ width: '20%' }} variant="filled" />
              {isUserAuthor && (
                <div className={classes.actions}>
                  <Link to={`/discussion?q=${data.questionId}`}>
                    <Button variant="default">Cancel</Button>
                  </Link>
                  <Button
                    color="green"
                    loading={isPosting}
                    onClick={() =>
                      handleSubmit({
                        id: data.id,
                        title: value,
                        user_id: authUser.uid,
                        questionId: data.questionId,
                        tag: selectRef.current.value,
                        description: codeRef.current,
                      })
                    }
                  >
                    Update
                  </Button>
                </div>
              )}
            </div>
            <DiscussionEditor codeRef={codeRef} doc={data.description} />
            <br />
            {isUserAuthor && <EditAlert />}
            <br />
            <CommentEditor authUser={authUser} data={data} />
          </div>
          <div className={classes.infoWrapper}>
            <div className={classes.content}>
              <h4>Comments</h4>
              <p>{data.comment.length}</p>
            </div>
            <br />
            <div className={classes.content}>
              <h4>Views</h4>
              <p>{data.seen_count}</p>
            </div>
            <br />
            <hr />
            <br />
            <div className={classes.content}>
              <h4>Votes</h4>
              <Button disabled={hasVoted} loading={isVoting} leftIcon={<IconArrowUp />} onClick={handleUpVote}>
                {data.up_vote_count}
              </Button>
            </div>
          </div>
        </div>
        <br />
      </CenterContent>
    </>
  );
}

function DiscussionEditor({ codeRef, doc }) {
  useEffect(() => {
    const myHighlightStyle = HighlightStyle.define(highlight);
    const state = EditorState.create({
      doc,
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

function EditAlert() {
  return (
    <Alert icon={<IconAlertCircle size="1rem" />} title="Information" radius="xs" color="yellow">
      You are editing your previous discussion thread for this question!
    </Alert>
  );
}

function CommentEditor({ data, authUser }) {
  const [value, setValue] = useState('');
  const [isCommenting, setIsCommenting] = useState(false);

  const queryClient = useQueryClient();

  async function handleSubmit(comment) {
    setIsCommenting(true);
    await axios.post(`http://localhost:3001/comment`, comment);
    setIsCommenting(false);
    setValue('');
    queryClient.invalidateQueries([data.id]);
  }

  return (
    <>
      <p className={classes.commentTitle}>
        <IconMessage />
        Comments ({data.comment.length})
      </p>
      <div className={classes.commentWrapper}>
        <Textarea variant="unstyled" placeholder="Type comment here..." value={value} onChange={(event) => setValue(event.currentTarget.value)} />
        <br />
        <Button
          loading={isCommenting}
          onClick={() =>
            handleSubmit({
              text: value,
              user_id: authUser.uid,
              user_name: authUser.displayName,
              user_profile: authUser.photoURL,
              discussionId: data.id,
            })
          }
          color="green"
        >
          Comment
        </Button>
      </div>
      <CommentWrapper comments={data.comment} />
    </>
  );
}

function CommentWrapper({ comments }) {
  return (
    <div className={classes.discussionWrapper}>
      {comments.length === 0 ? (
        <h1>No Comments.</h1>
      ) : (
        <div>
          {comments.map((c, i) => (
            <CommentItem key={i} c={c} />
          ))}
        </div>
      )}
    </div>
  );
}

function CommentItem({ c }) {
  return (
    <div className={classes.cWrapper}>
      <div className={classes.header}>
        <div className={classes.avatar}>
          <img src={c.user_profile} width="100%" alt="userProfile" />
        </div>

        <h3>{c.user_name}</h3>
        <p>{new Date(c.createdAt).toLocaleDateString()}</p>
      </div>
      <p className={classes.text}>{c.text}</p>
    </div>
  );
}
