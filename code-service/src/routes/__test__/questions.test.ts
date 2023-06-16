import request from "supertest";
import { app } from "../../app";

const createQuestion = (x:number) => {
  return request(app).post("/question").send({
    question_title: "asdaasdv852852avav852eac"+x,
    question_prompt:
      'You are given a string s that consists of only digits.\n\nCheck if we can split s into two or more non-empty substrings such that the numerical values of the substrings are in descending order and the difference between numerical values of every two adjacent substrings is equal to 1.\n\nFor example, the string s = "0090089" can be split into ["0090", "089"] with numerical values [90,89]. The values are in descending order and adjacent values differ by 1, so this way is valid.\nAnother example, the string s = "001" can be split into ["0", "01"], ["00", "1"], or ["0", "0", "1"]. However all the ways are invalid because they have numerical values [0,1], [0,1], and [0,0,1] respectively, all of which are not in descending order.\nReturn true if it is possible to split s as described above, or false otherwise.\n\nA substring is a contiguous sequence of characters in a string.',
    sample_input: 's = "1234"',
    sample_output: "false",
    question_difficulty: "medium",
    optimal_complexity: "O(n)",
    topicId: "344a64f1-10f3-4cab-aebb-84275b6024be",
  });
};

const deleteQuestion = (id: string) => {
    return request(app).delete("/question/" + id)
}

it("can fetch a list of questions", async () => {
  await request(app).get("/questions").send().expect(200);
});

it("can create a question", async () => {
  const question = await createQuestion(705).expect(201);
   await deleteQuestion(question.body.question.id)
});

it("can delete a question", async () => {
  const question = await createQuestion(609);
  await deleteQuestion(question.body.question.id).expect(204)
});
