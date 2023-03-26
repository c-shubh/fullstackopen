import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import { PersonJoiSchema, type PersonOmitId } from "./types";

function helpExit() {
  console.log(`
  Usage: pnpm exec ts-node mongo.ts [<name> <number>]
  
  name: Person's name to add to phonebook
  number: Person's number to add to phonebook
  `);
  process.exit(1);
}

function connectDB() {
  const url = process.env.MONGO_URL;
  if (url) {
    mongoose.set("strictQuery", false);
    mongoose.connect(url);

    const personSchema = new mongoose.Schema<PersonOmitId>({
      name: String,
      number: String,
    });
    const Person = mongoose.model("Person", personSchema);

    return Person;
  } else {
    console.log(
      "Set MONGO_URL env variable's value to mongodb connection string"
    );
    process.exit(1);
  }
}

function validate(name: string, number: string) {
  const validationResult = PersonJoiSchema.validate({ name, number });
  if (validationResult.error) {
    console.error(validationResult.error.details[0].message);
    return false;
  }
  return true;
}

function insertPerson(Person: mongoose.Model<PersonOmitId>) {
  const name: string = process.argv[2];
  const number: string = process.argv[3];

  if (validate(name, number)) {
    const person = new Person<PersonOmitId>({
      name,
      number,
    });

    person.save().then((result) => {
      console.log(`added ${result.name} number ${result.number} to phonebook`);
      mongoose.connection.close();
    });
  }
}

function printAllPersons(Person: mongoose.Model<PersonOmitId>) {
  Person.find({}).then((persons) => {
    console.log("phonebook:");
    for (const p of persons) {
      console.log(`${p.name} ${p.number}`);
    }
    mongoose.connection.close();
  });
}

const argc = process.argv.length;
const Person = connectDB();

if (argc === 2) {
  printAllPersons(Person);
} else if (argc === 4) {
  insertPerson(Person);
} else {
  helpExit();
}
