const express=require("express");
const { createPoll, getPollById, voteOnPoll, reactToPoll, addCommentToPoll } = require("../controllers/PollController");

const router =express.Router();
router.post("/create",createPoll)
router.get("/:id",getPollById)
router.post("/:id/vote",voteOnPoll)
router.post('/:id/reaction', reactToPoll);
router.post('/:id/comments', addCommentToPoll);
module.exports=router; 