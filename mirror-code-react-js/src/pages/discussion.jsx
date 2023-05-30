import React, { useEffect, useState } from 'react';

import axios from 'axios';
import queryString from 'query-string';
import { Button, TextInput } from '@mantine/core';
import { IconArrowUp, IconEye } from '@tabler/icons-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import SimpleNav from '../components/simple-nav';
import CenterContent from '../components/center-content';
import CenterLoading from '../components/center-loading';

import classes from '../styles/discussion.module.css';

function useDiscussion(id) {
  return useQuery({
    queryKey: ['q' + id],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:3001/discussions/${id}`);
      return data.discussions;
    },
  });
}

export default function Discussion() {
  const location = useLocation();
  const { q } = queryString.parse(location.search);

  // const status = '';
  const { status, data } = useDiscussion(q);
  // const data = [
  //   {
  //     id: 'cdb72574-7f65-4184-b9bf-10a37f182a65',
  //     title: '🎉Python O(n) time | O(h) space DFS solution🎉',
  //     description:
  //       "# Definition for a binary tree node.\n# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val\n#         self.left = left\n#         self.right = right\n\nclass TreeInfo:\n    def __init__(self, currentTotalSum, maxSum):\n        self.currentTotalSum = currentTotalSum\n        self.maxSum = maxSum\n        \nclass Solution:\n    def maxPathSum(self, root: Optional[TreeNode]) -> int:\n        return self.getTreeInfo(root).currentTotalSum\n    \n    def getTreeInfo(self, tree):\n        if tree is None: return TreeInfo(float('-inf'), 0)\n\n        leftTreeInfo = self.getTreeInfo(tree.left)\n        rightTreeInfo = self.getTreeInfo(tree.right)\n\n        value = tree.val\n        maxSum = max(leftTreeInfo.maxSum, rightTreeInfo.maxSum)\n        maxSumAsBranch = max(maxSum + value, value)\n\n        currentSum = leftTreeInfo.maxSum + value + rightTreeInfo.maxSum\n        maxSumWithRoot = max(currentSum, maxSumAsBranch)\n\n        maxPathSum = max(leftTreeInfo.currentTotalSum, rightTreeInfo.currentTotalSum, maxSumWithRoot)\n\n        return TreeInfo(maxPathSum, maxSumAsBranch)",
  //     tag: 'Python',
  //     user_id: 'DVJanoEO9YXuPYFhNBVa6nYGpiA3',
  //     seen_count: 0,
  //     up_vote_count: 0,
  //     down_vote_count: 0,
  //     questionId: 'b108c32a-1655-4b04-a868-ee64b5e8cde1',
  //     createdAt: '2023-05-13T14:10:41.295Z',
  //   },
  // ];

  return (
    <>
      <SimpleNav />
      <br />
      <br />
      <CenterContent>
        {status === 'loading' ? (
          <CenterLoading height="50vh" width="75vw" />
        ) : status === 'error' ? (
          <h3>Error: Something went wrong</h3>
        ) : (
          <DiscussionWrapper data={data} q={q} />
        )}
      </CenterContent>
    </>
  );
}

function DiscussionWrapper({ data, q }) {
  const [value, setValue] = useState('');
  const [filteredData, setFilteredData] = useState(data ?? []);

  useEffect(() => {
    if (value === '') return setFilteredData(data);

    setFilteredData(data.filter((d) => d.title.toLowerCase().includes(value.toLowerCase())));
  }, [value, data]);

  return (
    <div className={classes.discussionWrapper}>
      <div className={classes.filterHeader}>
        <TextInput style={{ width: '100%' }} placeholder="Search..." value={value} onChange={(e) => setValue(e.target.value)} size="sm" />

        <Link to={`/add-discussion?q=${q}`}>
          <Button>+ Add discussion</Button>
        </Link>
      </div>
      {filteredData.length === 0 ? (
        <h1>No Discussions.</h1>
      ) : (
        <div>
          {filteredData.map((d, i) => (
            <DiscussionItem key={i} d={d} />
          ))}
        </div>
      )}
    </div>
  );
}

function DiscussionItem({ d }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function handleClick() {
    queryClient.setQueryData([d.id], d);

    navigate(`/discussion-view?d=${d.id}`);
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.avatar}>
        <h2>U</h2>
      </div>
      <div>
        <h4 onClick={handleClick} className={classes.title}>
          {d.title}
        </h4>
        <div className={classes.sub}>
          {/* <p className={classes.user}>
          User <span>{d.user_id}</span>
        </p> */}
          <p>Posted: {new Date(d.createdAt).toLocaleDateString()}</p> <p className={classes.tag}>{d.tag}</p>
        </div>
        <div className={classes.sub}>
          <p className={classes.withIcon}>
            <IconArrowUp />
            {d.up_vote_count}
          </p>
          <p className={classes.withIcon}>
            <IconEye /> {d.seen_count}
          </p>
        </div>
      </div>
    </div>
  );
}
