import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";
import morgan from "morgan";
import PersonModel from "./models/person";
import { PersonJoiSchema } from "./types";
const app = express();

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

function personNotFound(req: express.Request, res: express.Response) {
  return res
    .status(404)
    .json({ error: `Person with id ${req.params.id} does not exist` });
}

app.get("/api/persons/:id", (req, res) => {
  PersonModel.findById(req.params.id).then(
    (person) => {
      if (person) return res.json(person);
      return personNotFound(req, res);
    },
    (err) => personNotFound(req, res)
  );
});

app.delete("/api/persons/:id", async (req, res) => {
  const deletedPerson = await PersonModel.findByIdAndDelete(req.params.id);
  if (deletedPerson) {
    return res.sendStatus(204);
  } else {
    return res.sendStatus(404); // item to be deleted was **not found**
  }
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App running on port ${PORT}`));
