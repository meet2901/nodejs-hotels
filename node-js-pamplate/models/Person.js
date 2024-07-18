const { TopologyType } = require('mongodb');
const mongoose = require('mongoose');
const bcrypt=require('bcrypt');
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    id: {
        type: Number,
        required: true
    },
    work: {
        type: String,
        enum: ['waiter', 'chef', 'manager'],
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: Number,
        required: true
    },
    address: {
        type: String
    },
    salary: {
        type: Number,
        required: false
    },
    username:{
        required:true,
        type: String
    },
    password:{
       required:true,
        type:String
    }

});

personSchema.pre('save',async(next)=>{

    const person=this;
    if (!person.isModified('password')) {
        return next();
    }
try {
    //hash password generate 
    const salt= await bcrypt.genSalt(10);
    const hashpass=await bcrypt.hash(person.password,salt);
    person.password=hashpass;
    next()
} catch (error) {
    return next(error);
}
});


personSchema.method.comparePassword= async (candidatePassword)=>{
    try {
        const isMatch=await bcrypt.comparePassword(candidatePassword,this.password)
        return isMatch;
    } catch (error) {
        throw error;
    }
}
const person = mongoose.model('person', personSchema);

module.exports = person;