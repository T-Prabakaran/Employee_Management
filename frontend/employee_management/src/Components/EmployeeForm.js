import React, { useState } from 'react';
import axios from 'axios';
import './EmployeeForm.css';

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    employeeId: '',
    department: '',
    dob: '',
    gender: '',
    designation: '',
    salary: '',
    blood_group: '',
    experience: '',
    marital_status: '',
    email: '',
    phone_number: '',
    joining_date: ''
  });

  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if dob and joining_date are greater than today's date
    const today = new Date().toISOString().slice(0, 10);
    if (formData.dob > today || formData.joining_date > today) {
      alert('INVALID Date of Birth or Joining Date');
      return;
    }
    try {
      await axios.post('https://employee-management-5lbx.onrender.com/form/submit', formData);
      alert('Employee added successfully!');
    } catch (error) {
      alert('Failed to add employee. Please try again.');
    }
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className="form-container">
      <h1>ADD NEW EMPLOYEE</h1>
      <form onSubmit={handleSubmit} className="employee-form">
        {currentStep === 1 && (
          <>
            <div className="form-group">
              <label htmlFor="name">Employee Name:</label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                maxLength={30}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="employeeId">Employee ID:</label>
              <input
                type="text"
                name="employeeId"
                id="employeeId"
                value={formData.employeeId}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="department">Department:</label>
              <select
                name="department"
                id="department"
                value={formData.department}
                onChange={handleChange}
                required
              >
                <option value="">Select Department</option>
                <option value="IT">IT</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
                <option value="Logistics">Logistics</option>
                <option value="Designing">Designing</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="dob">Date of Birth:</label>
              <input
                type="date"
                name="dob"
                id="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label><h4>GENDER:</h4></label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    onChange={handleChange}
                    required
                  />{' '}
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    onChange={handleChange}
                    required
                  />{' '}
                  Female
                </label>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="designation">Designation:</label>
              <input
                type="text"
                name="designation"
                id="designation"
                value={formData.designation}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="salary">Salary:</label>
              <input
                type="number"
                name="salary"
                id="salary"
                value={formData.salary}
                onChange={handleChange}
                min={1} // Minimum value set to 1
                required
              />
            </div>
          </>
        )}

        {currentStep === 2 && (
          <>
            <div className="form-group">
              <label htmlFor="blood_group">Blood Group:</label>
              <select
                name="blood_group"
                id="blood_group"
                value={formData.blood_group}
                onChange={handleChange}
                required
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="experience">Experience:</label>
              <input
                type="text"
                name="experience"
                id="experience"
                value={formData.experience}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Marital Status:</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="marital_status"
                    value="Yes"
                    onChange={handleChange}
                    required
                  />{' '}
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="marital_status"
                    value="No"
                    onChange={handleChange}
                    required
                  />{' '}
                  No
                </label>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone_number">Phone Number:</label>
              <input
                type="tel"
                name="phone_number"
                id="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="joining_date">Joining Date:</label>
              <input
                type="date"
                name="joining_date"
                id="joining_date"
                value={formData.joining_date}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}

        {currentStep > 1 && (
          <button type="button" className="previous-button" onClick={prevStep}>
            Previous
          </button>
        )}

        {currentStep < 2 ? (
          <button type="button" className="next-button" onClick={nextStep}>
            Next
          </button>
        ) : (
          <button type="submit" className="submit-button">
            Submit
          </button>
        )}
      </form>
    </div>
  );
};

export default EmployeeForm;
