import express, { json } from "express";
import Person from "../models/person.model.js";

export const personRouter = express.Router();

personRouter.get("/people", async (req, res) => {
  const people = await Person.find().select({
    _id: 1,
    name: 1,
    surname: 1,
    email: 1,
    date: 1,
  });
  res.json(people);
});

personRouter.get("/person/:id", async (req, res) => {
  const person = await Person.findById({ _id: req.params.id }).select({
    _id: 1,
    name: 1,
    surname: 1,
    email: 1,
    date: 1,
  });
  res.json(person);
});

personRouter.post("/person", async (req, res) => {
  const { name, surname, email } = req.body;
  const userEmail = await Person.findOne({ email: email });
  if (userEmail) {
    res.status(409).send("The email is already in use");
    return;
  }
  const newUser = new Person({ name, surname, email });
  await newUser.save();
  res.status(200).send("user registered succesfully");
});

personRouter.put("/person/:id", async (req, res) => {
  const { name, surname, email } = req.body;
  await Person.updateOne(
    { _id: req.params.id },
    { $set: { name, surname, email } }
  );
  res.status(200).send("person was update succesfully");
});

personRouter.delete("/person/:id", async (req, res) => {
  await Person.deleteOne({ _id: req.params.id });
  res.status(200).send("person was deleted succesfully");
});