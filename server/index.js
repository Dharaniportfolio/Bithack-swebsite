const express = require('express')
const mongoose = require('mongoose')
const usermodel = require('./models/usermodel')
const staffmodel = require('./models/staffmodel')
const problemModel = require('./models/problemmodel')
const Registration = require('./models/registrationmodel')
const connectDB= require('./db');
const cors = require('cors')
const multer = require('multer');
const path = require('path');

const app = express()
app.use(express.json())
app.use(cors())

connectDB.getDatabase();

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    usermodel.findOne({ username: username })
      .then((user) => {
        if (user) {
          if (user.password === password) {
            res.json("student");
          } else {
            res.json("invalid credential");
          }
        }else{
            staffmodel.findOne({username : username})
            .then((user) => {
                if(user){
                    if(user.password === password){
                        res.json("staff");
                    }else {
                        return res.json("invalid credentials");
                      } 
                    }
            }) 
        }
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  });
  

  app.post('/problems', async (req, res) => {
    const { category, domain, title, description, maxParticipants, problemCode } = req.body;
  
    try {
      // Check if the problemCode already exists
      const existingProblem = await problemModel.findOne({ problemCode });
      if (existingProblem) {
        return res.status(400).json({ error: 'Problem code must be unique' });
      }
  
      const newProblem = new problemModel({
        category,
        domain,
        title,
        description,
        maxParticipants,
        problemCode,
      });
  
      await newProblem.save();
      res.status(201).json({ message: 'Problem statement created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create problem statement' });
    }
  });
  

  app.get('/domains', async (req, res) => {
    try {
      const domains = await problemModel.distinct('domain');
      res.json(domains);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch domains' });
    }
  });


  app.get('/api/problems/:domain', async (req, res) => {
    try {
      const domain = req.params.domain.toUpperCase();  // Convert domain to uppercase
      const problems = await problemModel.find({ domain });
      if (problems.length === 0) {
        return res.status(404).json({ message: 'No problems found for the domain' });
      }
      res.status(200).json(problems);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching problems', error });
    }
  });
  

  app.get('/api/problems/:domain/:problemCode', async (req, res) => {
    const { domain, problemCode } = req.params;
    
    try {
      const problem = await problemModel.findOne({ domain: domain.toUpperCase(), problemCode });
      
      if (!problem) {
        return res.status(404).json({ message: 'Problem not found' });
      }
      
      res.status(200).json(problem);
    } catch (error) {
      console.error('Error fetching problem:', error);
      res.status(500).json({ message: 'Error fetching problem', error });
    }
  });

  // Assuming you have a Registration model set up for fetching registration data
  app.get('/api/registrations', async (req, res) => {
    try {
      const registrations = await Registration.aggregate([
        { $group: { _id: '$problem', count: { $sum: 1 } } }
      ]);
  
      const registrationCounts = {};
      registrations.forEach(({ _id, count }) => {
        registrationCounts[_id] = count;
      });
  
      res.status(200).json(registrationCounts);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching registration data' });
    }
  });
  

  
  
  const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  
  const upload = multer({ storage: storage });
  app.post('/register/:domain/:problemCode', upload.single('abstractProof'), async (req, res) => {
    const { domain, problemCode } = req.params;
    const { teamLeadRollNo, teamLeadName, teamLeadMobile, student1RollNo, student1Name, teamName } = req.body;

    try {
        // Fetch the problem based on domain and problemCode
        const problem = await problemModel.findOne({ domain: domain.toUpperCase(), problemCode });

        if (!problem) {
            return res.status(404).json({ message: 'Problem not found' });
        }

        // Check if the max participants limit has been reached
        if (problem.registeredCount >= problem.maxParticipants) {
            return res.status(400).json({ message: 'Registration limit reached' });
        }

        // Create a new registration
        const registration = new Registration({
            teamLead: {
                rollNo: teamLeadRollNo,
                name: teamLeadName,
                mobile: teamLeadMobile,
            },
            student1: {
                rollNo: student1RollNo,
                name: student1Name,
            },
            teamName,
            abstractProof: req.file.path,  // Ensure multer is saving the file correctly
            problem: problem._id,  // Store the ObjectId of the problem
        });

        await registration.save();

        // Increment the registeredCount for the problem and save the changes
        problem.registeredCount += 1;
        await problem.save();  // Save the updated problem

        res.status(200).json({ message: 'Registration successful' });
    } catch (error) {
        console.error('Error saving registration:', error);
        res.status(500).json({ message: 'Registration failed' });
    }
});


app.listen(5000,() => {
    console.log("server is running")
})


