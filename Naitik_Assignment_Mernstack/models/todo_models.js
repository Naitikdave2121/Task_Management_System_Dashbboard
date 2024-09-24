const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define Schemas
const registration=new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
})

const projectDetailsSchema = new mongoose.Schema({
    ProjectName: {
        type: String,
        required: true
    },
    Reason: {
        type: String,
        required: true
    },
    Category: {
        type: String,
        required: true
    },
    StartDate: {
        type: String,
        required: true
    },
    EndDate: {
        type: String,
        required: true
    },
    type: {
        type: String,
    },
    Priority: {
        type: String,
        required: true
    },
    Division: {
        type: String,
        required: true
    },
    Department: {
        type: String,
        required: true
    },
    Location: {
        type: String,
        required: true
    },
    Status: {
        type: String,
        required: true,
        default: 'Registered'
    }
});

// Create Models
const Registration=mongoose.model("Authantication_Redistration",registration);
const projectdetails = mongoose.model('projectdetails2', projectDetailsSchema);

module.exports = {  projectdetails,Registration };
