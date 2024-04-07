const User = require("../models/user")
const List = require("../models/list")
const bcrypt = require("bcryptjs")
const dotenv = require("dotenv").config();
const jwt = require('jsonwebtoken');

const addTask = async (req, res) => {
    try {
        // const existingUser = await User.findOne({ email });
        const token = req.header('Authorization').replace('Bearer ', '')
        console.log(token)
        const { task,completed,starred } = req.body;
        const decoded = jwt.verify(token, process.env.SECRET_KEY); // Verify JWT token
        const userId = decoded.userId;
        const existingUser = await User.findById(userId);
        
        if (existingUser) {
            const list = new List({ task,  user: existingUser,completed,starred });
            await list.save().then(() => res.status(200).json({ list }))
            existingUser.list.push(list);
            existingUser.save()
        }

    }
    catch (err) {
        res.status(400).json({ message: "There was an error creating the list." })
    }
}

const updateTask= async (req, res) => {
    try {
        // console.log(1)
        const { task, completed,starred } = req.body;
        // console.log(1)
        const list = await List.findByIdAndUpdate(req.params.id, { task, completed, starred },{new:true});
        if (!list) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task updated" });


    }
    catch (err) {
        res.status(400).json({ message: "There was an error updating the list." })
    }
}

const deleteTask = async (req, res) => {
    try {
        // Extract authToken from request headers
        console.log(1)
        const token = req.header('Authorization').replace('Bearer ', '')
        console.log(token)
        if (!token) {
            return res.status(401).json({ message: "Authentication token not provided" });
        }
      console.log(token)
        // Find the user by authToken
        const decoded = jwt.verify(token, process.env.SECRET_KEY); // Verify JWT token
        const userId = decoded.userId;

        const existingUser = await User.findById(userId);
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Remove the task from the user's list
        existingUser.list.pull(req.params.id);

        // Save the updated user object
        await existingUser.save();

        // Delete the task from the List collection
        await List.findByIdAndDelete(req.params.id);

        // Respond with success
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
};


const getTasks= async (req, res) => {
    // console.log(1)
    const userId = req.user;
    // console.log(1)
    const list = await List.find( { user: userId }).sort({ createdAt: -1 });
    // console.log(list)
    // console.log(1)
    if (list.length !== 0) {
        res.status(200).json({ list });
    }
    else {
        res.status(200).json({ message: "No Task" });
    }


}

module.exports= {getTasks,addTask,updateTask,deleteTask}
