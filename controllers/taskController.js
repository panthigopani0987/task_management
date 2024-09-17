const Task = require('../models/task');

const createTask = async (req, res) => {
    try {
       
        const { description, category } = req.body;

        
        const task = await Task.create({
            user: req.user._id, 
            description: description,
            category: category
        });

        res.status(201).json(task);

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

module.exports = {
    createTask
};
