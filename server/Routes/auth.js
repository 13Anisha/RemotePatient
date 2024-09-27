import express from 'express';
import bcrypt from 'bcryptjs';
import Doctor from '../models/Doctor.js';
import Patient from '../models/Patient.js';
import admin from '../firebaseAdmin.js';

const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Based on the role, store in the corresponding collection
    if (role === 'Doctor') {
      const doctor = new Doctor({ name, email, password: hashedPassword, role });
      await doctor.save();
      return res.status(201).json({ message: 'Doctor registered successfully' });
    } else {
      const patient = new Patient({ name, email, password: hashedPassword, role });
      await patient.save();
      return res.status(201).json({ message: 'Patient registered successfully' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

//login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
       
        let user = await Doctor.findOne({ email });
        
        
        if (!user) {
            user = await Patient.findOne({ email });
        }

        if (!user) {
            return res.status(401).json({ message: 'Invalid email' });
        }

       
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' }); 
        }

        res.status(200).json({ message: 'Login successful', user: { name: user.name, email: user.email, role: user.role } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

//google auth
router.post('/google', async (req, res) => {
    const { idToken } = req.body; // Receive the ID token from the client
  
    try {
      // Verify the ID token
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      const { email } = decodedToken;
  
      // Check if user exists in Patient or Doctor collections
      const patient = await Patient.findOne({ email });
      const doctor = await Doctor.findOne({ email });
  
      if (!patient && !doctor) {
        return res.status(401).json({ message: 'Invalid email, please sign up.' });
      }
  
      // You can add your login logic here (e.g., create session, JWT, etc.)
      const userType = patient ? 'Patient' : 'Doctor'; // Determine user type
  
      res.status(200).json({ message: 'Login successful', user: { email, userType } });
    } catch (error) {
      console.error('Error verifying token:', error);
      res.status(500).json({ message: 'Server error, please try again.' });
    }
  });

export default router;
