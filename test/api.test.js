const app = require("../api");
const request = require("supertest");

describe("GET /healthz", () => {
    test("testing...", async() => {
        const response = await request(app).get("/healthz");
        expect(response.body).toEqual(" 200 OK ");
        expect(response.statusCode).toBe(200);
    });
});