const group = require("../models/groupModel")

// Get all data //
const getGroups = async (req, res) => {
    // const group_id = req.group_id;

    try {
        const groupData = await group.find().sort({ createdAt: -1 });
        res.status(200).json(groupData);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

// Get a single data //
const getGroup = async (req, res) => {
    try {
        const groupId = req.params.groupId;
        const groupData = await group.findById(groupId);
        // res.status(200).json(groupData);
        if (!groupData) {
            return res.status(404).json({ error: "Group not found" });
        }
        res.status(200).json(groupData);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
};

// Create data //
const createGroup = async (req, res) => {
    const { name, initial, color } = req.body; // make sure this is destructuring all 3  
    try {
      const newgroup = new group({ name, initial, color });
      const savedGroup = await newgroup.save();
      res.status(201).json(savedGroup); 
    } catch (err) {
        console.log("Request to create group with name:", name);
        console.error("Error in createGroup:", err);
      res.status(400).json({error: err.message}); 
    }
  };
  

// Update data //
const editGroup = async (req, res) => {
    try {
        const groupId = req.params.groupId;
        const { name } = req.body;
        const updatedGroup = await group.findByIdAndUpdate(groupId, { name }, { new: true });

        if (!updatedGroup) {
            return res.status(404).json({ error: "Group not found" });
        }

        res.status(200).json(updatedGroup);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


// Delete dta //
const deleteGroup = async (req, res) => {
    try {
        const groupId = req.params.groupId;
        const deletedGroup = await group.findByIdAndDelete(groupId);

        if (!deletedGroup) {
            return res.status(404).json({ error: "Group not found" });
        }

        res.status(200).json({ message: "Group deleted", data: deletedGroup });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


module.exports = {
    getGroups,
    getGroup,
    createGroup,
    editGroup,
    deleteGroup
};
