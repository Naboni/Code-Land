import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

const topics = [
  {
    id: '344a64f1-10f3-4cab-aebb-84275b6024be',
    topic_name: 'Array',
    topic_type: 'array',
  },
  {
    id: 'ea198d13-0a6a-4ab8-8af6-598974c89570',
    topic_name: 'Stack',
    topic_type: 'stack',
  },
  {
    id: '707989c4-4df8-4d26-a5d6-b0de5a88941f',
    topic_name: 'Graph',
    topic_type: 'graph',
  },
  {
    id: '2daf426a-d009-4918-a1d2-3f16b8559740',
    topic_name: 'Recursion',
    topic_type: 'recursion',
  },
  {
    id: '486dd46e-d96d-4694-8e18-bdb1a1b5ccf2',
    topic_name: 'String',
    topic_type: 'string',
  },
  {
    topic_name: 'Sorting',
    topic_type: 'sorting',
  },
];

const questions = [
  {
    question_title: 'Two Number Sum',
    question_prompt: `Write a function that takes in a non-empty array of distinct integers and an integer representing a target sum. If any two numbers in the input array sum up to the target sum, the function should return them in an array, in any order. If no two numbers sum up to the target sum, the function should return an empty array.

    Note that the target sum has to be obtained by summing two different integers in the array; you can't add a single integer to itself in order to obtain the target sum.
    
    You can assume that there will be at most one pair of numbers summing up to the target sum.`,
    question_difficulty: 'easy',
    sample_input: `array = [3, 5, -4, 8, 11, 1, -1, 6]
    targetSum = 10`,
    sample_output: `[-1, 11] // the numbers could be in reverse order`,
    optimal_complexity: `O(n) time | O(n) space - where n is the length of the input array`,

    topicId: '344a64f1-10f3-4cab-aebb-84275b6024be',
  },
  {
    question_title: 'Three Number Sum',
    question_prompt: `Write a function that takes in a non-empty array of distinct integers and an integer representing a target sum. The function should find all triplets in the array that sum up to the target sum and return a two-dimensional array of all these triplets. The numbers in each triplet should be ordered in ascending order, and the triplets themselves should be ordered in ascending order with respect to the numbers they hold.

    If no three numbers sum up to the target sum, the function should return an empty array.`,
    question_difficulty: 'medium',
    sample_input: `array = [12, 3, 1, 2, -6, 5, -8, 6]
    targetSum = 0`,
    sample_output: `[[-8, 2, 6], [-8, 3, 5], [-6, 1, 5]]`,
    optimal_complexity: `O(n^2) time | O(n) space - where n is the length of the input array`,

    topicId: '344a64f1-10f3-4cab-aebb-84275b6024be',
  },
  {
    question_title: 'Four Number Sum',
    question_prompt: `Write a function that takes in a non-empty array of distinct integers and an integer representing a target sum. The function should find all quadruplets in the array that sum up to the target sum and return a two-dimensional array of all these quadruplets in no particular order.

    If no four numbers sum up to the target sum, the function should return an empty array.`,
    question_difficulty: 'hard',
    sample_input: `array = [7, 6, 4, -1, 1, 2]
    targetSum = 16`,
    sample_output: `[[7, 6, 4, -1], [7, 6, 1, 2]] // the quadruplets could be ordered differently`,
    optimal_complexity: `Average: O(n^2) time | O(n^2) space - where n is the length of the input array Worst: O(n^3) time | O(n^2) space - where n is the length of the input array`,

    topicId: '344a64f1-10f3-4cab-aebb-84275b6024be',
  },
  {
    question_title: 'Find Closest Value In BST',
    question_prompt: `Write a function that takes in a Binary Search Tree (BST) and a target integer value and returns the closest value to that target value contained in the BST.

    You can assume that there will only be one closest value.
    
    Each BST node has an integer value, a left child node, and a right child node. A node is said to be a valid BST node if and only if it satisfies the BST property: its value is strictly greater than the values of every node to its left; its value is less than or equal to the values of every node to its right; and its children nodes are either valid BST nodes themselves or None / null.`,

    question_difficulty: 'easy',

    sample_input: `tree =   10
       /     \
      5      15
    /   \   /   \
   2     5 13   22
 /           \
1            14
target = 12`,
    sample_output: `13`,
    optimal_complexity: `Average: O(log(n)) time | O(1) space - where n is the number of nodes in the BST Worst: O(n) time | O(1) space - where n is the number of nodes in the BST`,

    topicId: '707989c4-4df8-4d26-a5d6-b0de5a88941f',
  },
  {
    question_title: 'Permutations',
    question_prompt: `Write a function that takes in an array of unique integers and returns an array of all permutations of those integers in no particular order.

    If the input array is empty, the function should return an empty array.`,

    question_difficulty: 'medium',

    sample_input: `array = [1, 2, 3]`,
    sample_output: `[[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]`,
    optimal_complexity: `O(n*n!) time | O(n*n!) space - where n is the length of the input array`,

    topicId: '2daf426a-d009-4918-a1d2-3f16b8559740',
  },
];

async function addQuestions() {
  for await (const question of questions) {
    await prismaClient.question.upsert({
      where: { question_title: question.question_title },
      create: question,
      update: question,
    });
  }
}

async function addTopics() {
  for await (const topic of topics) {
    await prismaClient.topic.upsert({
      where: { topic_type: topic.topic_type },
      create: topic,
      update: topic,
    });
  }
}

addTopics();
// addQuestions();

prismaClient.$disconnect();
