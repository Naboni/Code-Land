import request from "supertest";
import { app } from "../../app";

const createTopic = (x:number) => {
    // create a variable that is unique
    const random = Math.floor(Math.random() * 1000000)
  return request(app).post("/topic").send({
    "topic_name": "Topic"+random,
    "topic_type": "topic"+random
  });
};

const deleteTopic = (id: string) => {
    return request(app).delete("/topic/" + id)
}

it("can fetch a list of topics", async () => {
  await request(app).get("/topics").send().expect(200);
});

it("can create a topic", async () => {
  const topic = await createTopic(75).expect(201);
   await deleteTopic(topic.body.topic.id)
});

it("can delete a topic", async () => {
  const topic = await createTopic(699);
  await deleteTopic(topic.body.topic.id).expect(204)
});
