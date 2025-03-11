const express=require("express");
const { createPoll, getPollById, voteOnPoll } = require("../controllers/PollController");

const router =express.Router();
router.post("/create",createPoll)
router.get("/:id",getPollById)
router.post("/:id/vote",voteOnPoll)

module.exports=router; 