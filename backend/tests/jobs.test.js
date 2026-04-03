import request from "supertest";
import app from "../src/app.js";
import { jest } from "@jest/globals";

describe("Jobs API", () => {

  it("should create a job", async () => {
    const res = await request(app)
      .post("/jobs")
      .send({
        title: "Test Engineer",
        company: "TestCorp"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Test Engineer");
    expect(res.body.company).toBe("TestCorp");
  });

});