const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ScrumdataModel = require("./models/Scrumdata");
const cors = require("cors");

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://user1:passuser1@scrum-retro-db.c3tyj.mongodb.net/scrumdb?retryWrites=true&w=majority"
);

app.get("/getScrumdata", async (req, res) => {
  const data = await ScrumdataModel.find({});

  res.status(200).json({
    success: true,
    data,
  });
});

app.post("/postScrumdata", async (req, res) => {
  const { sprint, name, wentwell, wentwrong, focusarea, remarks } = req.body;

  const newScrumdata = await ScrumdataModel.create({
    sprint,
    name,
    wentwell,
    wentwrong,
    focusarea,
    remarks,
  });

  res.status(201).json({
    success: true,
    newScrumdata,
  });
});

app.put("/update/:id", async (req, res) => {
  const { sprint, name, wentwell, wentwrong, focusarea, remarks } = req.body;

  const updatedData = {
    sprint,
    name,
    wentwell,
    wentwrong,
    focusarea,
    remarks,
  };

  await ScrumdataModel.findByIdAndUpdate(req.params.id, updatedData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

app.delete("/delete/:id", async (req, res) => {
  const scrumData = await ScrumdataModel.findById(req.params.id);

  if (!scrumData) {
    res.status(404).json({
      message: "Scrum Data not found",
      success: false,
    });
  }

  await scrumData.remove();

  const id = req.params.id;

  res.status(200).json({
    message: "Scrum Data deleted successfully",
    success: true,
  });
});

app.listen(3001, () => {
  console.log("SERVER RUN SUCCESSFUL!");
});
