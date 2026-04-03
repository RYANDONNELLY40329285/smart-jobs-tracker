import request from "supertest";
import app from "../src/app.js";
import { jest } from "@jest/globals";
import prisma from "../src/db/prisma.js";

describe("Jobs API", () => {

  // -------------------------
  // CREATE JOB
  // -------------------------
  it("should create a job", async () => {
    const res = await request(app)
      .post("/jobs")
      .send({
        title: "Test Engineer",
        company: "TestCorp"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Test Engineer");
  });

  it("should fail if title is missing", async () => {
    const res = await request(app)
      .post("/jobs")
      .send({
        company: "TestCorp"
      });

    expect(res.statusCode).toBe(400);
  });

  // -------------------------
  // GET JOBS
  // -------------------------
  it("should get all jobs", async () => {
    const res = await request(app).get("/jobs");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // -------------------------
  // STATUS VALIDATION
  // -------------------------
  it("should reject invalid status transition", async () => {
    const create = await request(app)
      .post("/jobs")
      .send({ title: "Dev", company: "X" });

    const jobId = create.body.id;

    const res = await request(app)
      .put(`/jobs/${jobId}`)
      .send({ status: "OFFER" }); // invalid

    expect(res.statusCode).toBe(400);
  });

  // -------------------------
  // NOTES
  // -------------------------
  it("should add a note to a job", async () => {
    const create = await request(app)
      .post("/jobs")
      .send({ title: "QA", company: "Y" });

    const jobId = create.body.id;

    const res = await request(app)
      .post(`/jobs/${jobId}/notes`)
      .send({ content: "Test note" });

    expect(res.statusCode).toBe(201);
    expect(res.body.content).toBe("Test note");
  });

  it("should fetch notes for a job", async () => {
    const create = await request(app)
      .post("/jobs")
      .send({ title: "QA2", company: "Y" });

    const jobId = create.body.id;

    await request(app)
      .post(`/jobs/${jobId}/notes`)
      .send({ content: "Another note" });

    const res = await request(app)
      .get(`/jobs/${jobId}/notes`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  // -------------------------
  // INTERVIEWS
  // -------------------------
  it("should add an interview", async () => {
    const create = await request(app)
      .post("/jobs")
      .send({ title: "DevOps", company: "Z" });

    const jobId = create.body.id;

    const res = await request(app)
      .post(`/jobs/${jobId}/interviews`)
      .send({
        stage: "Technical",
        date: "2026-04-10"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.stage).toBe("Technical");
  });

  it("should fetch interviews", async () => {
    const create = await request(app)
      .post("/jobs")
      .send({ title: "Backend", company: "Z" });

    const jobId = create.body.id;

    await request(app)
      .post(`/jobs/${jobId}/interviews`)
      .send({
        stage: "HR",
        date: "2026-04-11"
      });

    const res = await request(app)
      .get(`/jobs/${jobId}/interviews`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  // -------------------------
  // ANALYTICS
  // -------------------------
  it("should return analytics summary", async () => {
    const res = await request(app)
      .get("/analytics/summary");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("totalApplications");
  });

  it("should return weekly analytics", async () => {
    const res = await request(app)
      .get("/analytics/weekly");

    expect(res.statusCode).toBe(200);
  });



it("should return 404 for non-existent job", async () => {
  const res = await request(app).get("/jobs/99999");

  expect(res.statusCode).toBe(404);
});

it("should fail when adding empty note", async () => {
  const create = await request(app)
    .post("/jobs")
    .send({ title: "Test", company: "X" });

  const jobId = create.body.id;

  const res = await request(app)
    .post(`/jobs/${jobId}/notes`)
    .send({});

  expect(res.statusCode).toBe(400);
});

it("should fail if interview missing fields", async () => {
  const create = await request(app)
    .post("/jobs")
    .send({ title: "Test", company: "X" });

  const jobId = create.body.id;

  const res = await request(app)
    .post(`/jobs/${jobId}/interviews`)
    .send({});

  expect(res.statusCode).toBe(400);
});


it("should return 404 when updating non-existent job", async () => {
  const res = await request(app)
    .put("/jobs/99999")
    .send({ status: "SCREENING" });

  expect(res.statusCode).toBe(404);
});

it("should return 404 when deleting non-existent job", async () => {
  const res = await request(app)
    .delete("/jobs/99999");

  expect(res.statusCode).toBe(404); 
});

it("should fail if interview date missing", async () => {
  const create = await request(app)
    .post("/jobs")
    .send({ title: "Test", company: "X" });

  const jobId = create.body.id;

  const res = await request(app)
    .post(`/jobs/${jobId}/interviews`)
    .send({ stage: "HR" });

  expect(res.statusCode).toBe(400);
});


it("should fail when note content missing", async () => {
  const create = await request(app)
    .post("/jobs")
    .send({ title: "Test", company: "X" });

  const jobId = create.body.id;

  const res = await request(app)
    .post(`/jobs/${jobId}/notes`)
    .send({});

  expect(res.statusCode).toBe(400);
});

it("should allow valid status transitions", async () => {
  const create = await request(app)
    .post("/jobs")
    .send({ title: "Dev", company: "X" });

  const id = create.body.id;

  await request(app).put(`/jobs/${id}`).send({ status: "SCREENING" });
  await request(app).put(`/jobs/${id}`).send({ status: "INTERVIEW" });

  const res = await request(app)
    .put(`/jobs/${id}`)
    .send({ status: "OFFER" });

  expect(res.statusCode).toBe(200);
});




  afterAll(async () => {
  await prisma.$disconnect();
});

it("should fail if status is missing", async () => {
  const create = await request(app)
    .post("/jobs")
    .send({ title: "Dev", company: "X" });

  const id = create.body.id;

  const res = await request(app)
    .put(`/jobs/${id}`)
    .send({}); // no status

  expect(res.statusCode).toBe(400);
});

it("should delete a job successfully", async () => {
  const create = await request(app)
    .post("/jobs")
    .send({ title: "Delete Me", company: "X" });

  const id = create.body.id;

  const res = await request(app)
    .delete(`/jobs/${id}`);

  expect(res.statusCode).toBe(200);
});

it("should fetch a single job", async () => {
  const create = await request(app)
    .post("/jobs")
    .send({ title: "Single Job", company: "X" });

  const id = create.body.id;

  const res = await request(app)
    .get(`/jobs/${id}`);

  expect(res.statusCode).toBe(200);
  expect(res.body.id).toBe(id);
});


it("should handle empty analytics", async () => {
  const res = await request(app)
    .get("/analytics/summary");

  expect(res.statusCode).toBe(200);
});


});