import request from "supertest";
import { app } from "../../app";

const createDiscusssion = (x:number) => {
  return request(app).post("/discussion").send({
    "title": "Discusssion",
    "description": "Description",
    "tag": "Tag",
    "user_id": "wxhhpQ2EtYY6ILBOLy692usL6om2",
    "seen_count": 0,
    "up_vote_count": 0,
    "down_vote_count": 0,
    "questionId": "df18a0c0-85f6-41ec-b2b8-a2d04e60a484"
  });
};

const deleteDiscusssion = (id: string) => {
    return request(app).delete("/discussion/" + id)
}

it("can fetch a list of discussions", async () => {
  await request(app).get("/discussions/df18a0c0-85f6-41ec-b2b8-a2d04e60a484").send().expect(200);
});

it("can create a discussion", async () => {
  const discussion = await createDiscusssion(75).expect(201);
   await deleteDiscusssion(discussion.body.discussion.id)
});

it("can delete a discussion", async () => {
  const discussion = await createDiscusssion(699);
  await deleteDiscusssion(discussion.body.discussion.id).expect(204)
});
