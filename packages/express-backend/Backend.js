import express from "express";
import cors from "cors";
import userService from "./User-Services.js"; 

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.get("/users", async (req, res) => {
  const { name, job } = req.query;
  try {
    const users = await userService.getUsers(name, job);
    console.log(users)
    res.send({ users_list: users });
  } catch (error) {
    res.status(500).send({ error: "Error fetching users" });
  }
});


app.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userService.findUserById(id);
    if (!user) {
      res.status(404).send("Resource not found.");
    } else {
      res.send(user);
    }
  } catch (error) {
    res.status(500).send({ error: "Error fetching user" });
  }
});


app.post("/users", async (req, res) => {
  const userToAdd = req.body;
  try {
    const newUser = await userService.addUser(userToAdd);
    console.log("POST");
    console.log(newUser);
    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).send({ error: "Error adding user" });
  }
});


app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await userService.findUserById(id);
    if (!result) {
      res.status(404).send("Resource not found.");
    } else {
      await result.deleteOne();
      res.status(204).send();
    }
  } catch (error) {
    res.status(500).send({ error: "Error deleting user" });
  }
});

app.listen(port, () => {
  console.log(`IDV App listening at http://localhost:${port}`);
});
