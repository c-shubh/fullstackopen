import express from "express";
import { Person } from "./types";
const app = express();

const persons: Person[] = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.sendStatus(400);
  }

  const found = persons.find((person) => person.id === id);
  if (found) {
    return res.json(found);
  } else {
    return res
      .status(404)
      .json({ error: `Person with id ${id} does not exist` });
  }
});

app.get("/info", (req, res) => {
  const str =
    `Phonebook has info for ${persons.length} people` +
    "<br /><br />" +
    `${new Date()}`;
  res.send(str);
});

app.listen(3000, () => console.log("App running on port 3000"));
