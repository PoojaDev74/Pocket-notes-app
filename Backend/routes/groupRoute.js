
const express = require("express");

const groups = require("../models/groupModel");

const router = express.Router();

// Require Controllers //
const {
    getGroups, 
    getGroup, 
    createGroup,
    editGroup,
    deleteGroup,
} = require(`../controllers/groupController`);

// Get entire records //
router.get("/", getGroups);

// Get single record //
router.get("/:groupId", getGroup);

// Create record //
router.post("/", createGroup);

// Update record //
router.patch("/:groupId", editGroup);

// Delete data //
router.delete("/:groupId",deleteGroup);


module.exports = router;
