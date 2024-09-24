    const { response } = require("express");
    const xlsx = require('xlsx');
    const { TODO, T1, excel,projectdetails,Registration} = require("../models/todo_models");
    const jwt = require('jsonwebtoken');


    const loginauth=async(req,res)=>{
        try {
            const {Email,Password}=req.body;
            Registration.findOne({email:Email})
            .then(user=>{
                if(user){
                    if(user.Password===Password){
                        res.json("Success");
                    }
                    else{
                        res.json("password is incorrect");
                    }
                }
                else{
                    res.json("No record exist");
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
    const Register_Auth = async (req, res) => {
        try {
            console.log(req.body);
            const registration = await Registration.create(req.body);
            res.json(registration);
        } catch (err) {
            res.json(err);
        }
    };
    const getprojectdata=async(req,res)=>{
        try {
            const data=await projectdetails.find({});
            console.log(data);
            res.json({success:true,data:data}) 
        } catch (error) {
            console.log(error);
        }
    }
    const insertcontroller=async(req,res)=>{
        try {

            console.log(req.body);
            const data=new projectdetails(req.body);
            await data.save();
            res.json({ message: "Data successfully inserted" });
        
        } catch (error) {
            console.log(error)
        }
    }
    const closeupdate1=async(req,res,next)=>{
        try {
            const id = req.params.id;
            console.log(`Updating status for project with id: ${id}`);
            
            const result = await projectdetails.findOneAndUpdate(
                { _id: id },
                { $set: { Status: 'Close' } },
                { new: true }
            );
    
            if (result) {
                console.log("updated successfully");
            } else {
                console.log("fail")
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Failed to update status' });
        }
    }
    const cancelupdate=async(req,res)=>{
        try {
            const id = req.params.id;
            console.log(`Updating status for project with id: ${id}`);
            
            const result = await projectdetails.findOneAndUpdate(
                { _id: id },
                { $set: { Status: 'Cancel' } },
                { new: true }
            );
    
            if (result) {
                console.log("updated successfully");
            } else {
                console.log("fail")
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Failed to update status' });
        }
    }
    const updatedata=async(req,res,next)=>{
        try {
            const id = req.params.id;
            console.log(`Updating status for project with id: ${id}`);
            
            const result = await projectdetails.findOneAndUpdate(
                { _id: id },
                { $set: { Status: 'Running' } },
                { new: true }
            );
    
            if (result) {
                console.log("updated successfully");
            } else {
                console.log("fail")
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Failed to update status' });
        }
    }

    const countdashboard=async(req,res)=>{
        try {
                const totalproject=await projectdetails.countDocuments({});
                const closeproject=await projectdetails.countDocuments({Status:'Close'});
                const runningProjects=await projectdetails.countDocuments({Status: 'Running' })
                const overdueRunningProjects = await projectdetails.countDocuments({ 
                    Status: 'Running', 
                    EndDate: { $lt: new Date().toISOString().split('T')[0] }
                  });
                  const cancelledProjects = await projectdetails.countDocuments({ Status: 'Cancel' });
                  res.json({
                    totalproject,
                    closeproject,
                    runningProjects,
                    overdueRunningProjects,
                    cancelledProjects,
                  });

        } catch (error) {
            console.log(error);
        }
    }
    
    const getchdata = async (req, res) => {
        try {
            const departmentStats = await projectdetails.aggregate([
                {
                    $group: {
                        _id: '$Department',
                        totalProjects: { $sum: 1 },
                        completedProjects: {
                            $sum: { $cond: { if: { $eq: ['$Status', 'Close'] }, then: 1, else: 0 } }
                        }
                    }
                },
                {
                    $project: {
                        _id: 1,
                        totalProjects: 1,
                        completedProjects: 1,
                        percentage: { $multiply: [{ $divide: ["$completedProjects", "$totalProjects"] }, 100] } // Calculate percentage
                    }
                }
            ]);
            res.json(departmentStats);
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    };
    



    module.exports = {
        insertcontroller,
        getprojectdata,
        updatedata,
        closeupdate1,
        Register_Auth,
        loginauth,
        cancelupdate,
        countdashboard,
        getchdata
    
    };
