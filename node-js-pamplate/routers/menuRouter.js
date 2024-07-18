const express = require('express');
const router = express.Router();
const menu = require('../models/Menu');

router.post("/", async (req, res) => {
    try {
        const data = req.body;
        const newMenu = new menu(data);
        const response = await newMenu.save();
        console.log('response saved');
        res.status(200).json({ response });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const menuData = await menu.find();
        console.log("data was fetched");
        console.log(menuData);
        res.status(200).json(menuData);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "server error" });
    }
});

router.get('/:waters', async (req, res) => {
    try {
        const waters = req.params.waters;
        if (['boil', 'stil', 'fresh'].includes(waters)) {
            const response = await menu.find({ water: waters });
            console.log('response fetched', response);
            res.status(200).json(response);
        } else {
            console.log('invalid water type');
            res.status(404).json({ error: 'invalid water type' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "server error" });
    }
});

router.put('/:Id',async(req,res)=>{
    
    try {
        const menu_id=req.params.id;
        const Userupdate=req.body;

        const responce=await menu.findByIdAndUpdate(menu_id,Userupdate,{
            new: true,
            runValidators: true
        });
        if (!responce) {
            res.status(401).json({message:"someting error while updating error"})
        }
        
    } catch (error) {
        res.status(401).json({message:"server error"})
    }   
})

module.exports = router;
