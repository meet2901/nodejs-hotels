const express = require('express');
const router = express.Router();
const person = require('../models/Person');

router.post("/", async (req, res) => {
    try {
        const data = req.body;
        const newPerson = new person(data);
        const response = await newPerson.save();
        console.log('response saved');
        res.status(200).json({ response });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const data = await person.find();
        console.log("data was fetched");
        console.log(data);
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "server error" });
    }
});

router.get('/:worktype', async (req, res) => {
    try {
        const worktype = req.params.worktype; // Extract the worktype from the URL parameter 
        if (['manager', 'chef', 'waiter'].includes(worktype)) {
            const response = await person.find({ work: worktype });
            console.log('response fetched');
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'invalid worktype' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "server error" });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const person_id = req.params.id;
        const updatedPersonData = req.body;
        const response = await person.findByIdAndUpdate(person_id, updatedPersonData, {
            new: true,
            runValidators: true
        });

        if (!response) {
            return res.status(404).json({ error: "user not found" });
        }

        console.log('data updated');
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "server error" });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const person_id = req.params.id;
        const response = await person.findByIdAndDelete(person_id);

        if (!response) {
            return res.status(404).json({ error: "user not found" });
        }
        console.log('data deleted');
        res.status(200).json({ message: 'person deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "server error" });
    }
});

module.exports = router;
