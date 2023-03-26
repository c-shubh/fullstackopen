import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";
import morgan from "morgan";
import errorHandler from "./middlewares/errorHandler";
import unknownEndpoint from "./middlewares/unknownEndpoint";
import PersonModel from "./models/person";
import { PersonJoiSchema, PersonPutJoiSchema } from "./validation/JoiSchemas";
const app = express();

/* ------------------------------ Middlewares ------------------------------- */

app.use(cors());
app.use(express.json());
app.use(
  morgan(function (tokens, req, res) {
    // tiny format:
    // :method :url :status :res[content-length] - :response-time ms
    const msg: any = [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
    ];
    if (req.method === "POST") {
      // @ts-ignore
      msg.push(JSON.stringify(req.body));
    }
    return msg.join(" ");
  })
);

/* --------------------------------- Routes --------------------------------- */

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.get("/api/persons", (req, res) => {
  PersonModel.find({}).then((persons) => {
    res.json(persons);
  });
});

app.post("/api/persons", async (req, res) => {
  /* validation */
  const validationResult = PersonJoiSchema.validate(req.body);
  if (validationResult.error) {
    return res
      .status(422)
      .json({ error: validationResult.error.details[0].message });
  }

  /* user sent data is valid */
  const name: string = req.body.name;
  const number: string = req.body.number;
  const newPerson = new PersonModel({ name, number });
  const savedPerson = await newPerson.save();

  res.json(savedPerson);
});

app.put("/api/persons/:id", (req, res, next) => {
  /* validation */
  const validationResult = PersonPutJoiSchema.validate(req.body);
  if (validationResult.error) {
    return res
      .status(422)
      .json({ error: validationResult.error.details[0].message });
  }

  const person = {
    number: req.body.number,
  };

  PersonModel.findByIdAndUpdate(req.params.id, person, { new: true })
    .then((updatedPerson) => {
      if (updatedPerson) return res.json(updatedPerson);
      return res.sendStatus(404);
    })
    .catch((error) => next(error));
});

app.get("/api/persons/:id", (req, res, next) => {
  PersonModel.findById(req.params.id)
    .then((person) => {
      if (person) return res.json(person);
      else return res.sendStatus(404);
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
  PersonModel.findByIdAndRemove(req.params.id)
    .then((result) => {
      return res.sendStatus(204);
    })
    .catch((error) => next(error));
});

app.get("/info", (req, res) => {
  PersonModel.countDocuments({}).then((count) => {
    const str =
      `Phonebook has info for ${count} people` +
      "<br /><br />" +
      `${new Date()}`;
    res.send(str);
  });
});

/* ----------------------------- Error handlers ----------------------------- */

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App running on port ${PORT}`));
