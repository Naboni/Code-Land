import request from "supertest";
import { app } from "../../app";

const createSolution = (x:number) => {
  return request(app).post("/solution").send({
    "solutionCode": "Solution"+x,
    "userId": "wxhhpQ2EtYY6ILBOLy692usL6om2",
    "questionId": "df18a0c0-85f6-41ec-b2b8-a2d04e60a484",
    "topicId": "344a64f1-10f3-4cab-aebb-84275b6024be"
  });
};

const deleteSolution = (id: string) => {
    return request(app).delete("/solution/" + id)
}

it("can fetch a list of solutions", async () => {
  await request(app).get("/solutions").send().expect(200);
});

it("can create a solution", async () => {
  const solution = await createSolution(75).expect(201);
   await deleteSolution(solution.body.solution.id)
});

it("can delete a solution", async () => {
  const solution = await createSolution(699);
  await deleteSolution(solution.body.solution.id).expect(204)
});
