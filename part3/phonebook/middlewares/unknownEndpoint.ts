import type { RequestHandler } from "express";
const unknownEndpoint: RequestHandler = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};
export default unknownEndpoint;
