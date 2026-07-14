const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

// middle were
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Express Server Architecture is Run");
});

// validation middle were
const validationMiddle = (req, res, next) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).send({
      success: false,
      message: "name and email required",
    });
  }

  next();
};

let users = [
  { id: 1, name: "Ripon", address: "Dhaka", email: "ripon301252@gmail.com" },
  { id: 2, name: "Amena", address: "cumilla", email: "amena@gmail.com" },
  { id: 3, name: "Mysha", address: "Chandpur", email: "mysha@gmail.com" },
  { id: 4, name: "Rumon", address: "Faridpur", email: "rumon@gmail.com" },
  { id: 5, name: "Rupok", address: "Barisal", email: "rupok@gmail.com" },
];

// GET all users
app.get("/users", (req, res) => {
  res.send(users);
});

// Get single user
// app.get("/users/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   const user = users.filter((u) => u.id === id);

//   if (user.length === 0) {
//     return res.status(404).send({
//       success: false,
//       message: "User not found",
//     });
//   }

//   res.send({
//     success: true,
//     data: user[0],
//   });
// });

app.get("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).send({
      success: false,
      message: "User not found",
    });
  }

  res.send({
    success: true,
    data: user,
  });
});

// POST user
app.post("/users", validationMiddle, (req, res, next) => {
  try {
    const newUser = {
      id: users.length + 1,
      ...req.body,
    };

    users.push(newUser);

    res.status(201).send({
      success: true,
      data: newUser,
    });
  } catch (err) {
    next(err); // trigger global error handler
  }
});

// PUT user
app.put("/users/:id", (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    let user = users.find((u) => u.id === id);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    Object.assign(user, req.body);

    res.send({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
});

// DELETE user
app.delete("/users/:id", (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const user = users.find((u) => u.id === id);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    users = users.filter((u) => u.id !== id);

    res.send({
      success: true,
      message: "User deleted",
    });
  } catch (err) {
    next(err);
  }
});

// global error handler
app.use((err, req, res, next) => {
  console.error(err.message);

  res.status(500).send({
    success: false,
    message: "Something went wrong",
    error: err.message,
  });
});

// root route
app.listen(port, () => {
  console.log("Express Server Architecture On Port");
});
