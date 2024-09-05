import React, { useState } from 'react';
import { createEmployee } from '../api';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Label } from "flowbite-react";

function AddEmployee() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');

  const [firstNameTouched, setFirstNameTouched] = useState(false);
  const [lastNameTouched, setLastNameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);

  const navigate = useNavigate();

  const validateFirstName = () => {
    if (!firstName) {
      setFirstNameError('Please provide a valid first name.');
      return false;
    }
    setFirstNameError('');
    return true;
  };

  const validateLastName = () => {
    if (!lastName) {
      setLastNameError('Please provide a valid last name.');
      return false;
    }
    setLastNameError('');
    return true;
  };

  const validateEmail = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Please provide a valid email.');
      return false;
    } else if (!emailPattern.test(email)) {
      setEmailError('Please enter a valid email address.');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setFirstNameTouched(true);
    setLastNameTouched(true);
    setEmailTouched(true);

    const isFirstNameValid = validateFirstName();
    const isLastNameValid = validateLastName();
    const isEmailValid = validateEmail();

    if (!isFirstNameValid || !isLastNameValid || !isEmailValid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please correct the errors in the form.',
      });
      return;
    }

    const employeeData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
    };

    createEmployee(employeeData)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Employee has been added!',
          customClass: {
            confirmButton: 'confirm-btn'
          },
          buttonsStyling: false
        }).then(() => {
          navigate('/');
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to add employee. Please try again.',
          customClass: {
            confirmButton: 'error-btn'
          },
          buttonsStyling: false
        });
        console.error('Error adding employee:', error);
      });

  };

  return (
    <div className="container mx-auto px-4">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-4">
          <div className="w-1/3">
            <div className="mb-2 block">
              <Label htmlFor="firstName" value="First Name" />
            </div>
            <input
              type="text"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                validateFirstName();
              }}
              onBlur={() => setFirstNameTouched(true)}
              className={`border rounded px-3 py-2 w-full ${
                firstNameError && firstNameTouched ? 'border-red-500' : 'border-green-500'
              }`}
              required
            />
            {firstNameTouched && (
              <p className={`text-sm ${firstNameError ? 'text-red-500' : 'text-green-500'}`}>
                {firstNameError || 'Looks good!'}
              </p>
            )}
          </div>
          <div className="w-1/3">
            <div className="mb-2 block">
              <Label htmlFor="lastName" value="Last Name" />
            </div>
            <input
              type="text"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                validateLastName();
              }}
              onBlur={() => setLastNameTouched(true)}
              className={`border rounded px-3 py-2 w-full ${
                lastNameError && lastNameTouched ? 'border-red-500' : 'border-green-500'
              }`}
              required
            />
            {lastNameTouched && (
              <p className={`text-sm ${lastNameError ? 'text-red-500' : 'text-green-500'}`}>
                {lastNameError || 'Looks good!'}
              </p>
            )}
          </div>
          <div className="w-1/3">
            <div className="mb-2 block">
              <Label htmlFor="email" value="Email" />
            </div>
            <input
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validateEmail();
              }}
              onBlur={() => setEmailTouched(true)}
              className={`border rounded px-3 py-2 w-full ${
                emailError && emailTouched ? 'border-red-500' : 'border-green-500'
              }`}
              required
            />
            {emailTouched && (
              <p className={`text-sm ${emailError ? 'text-red-500' : 'text-green-500'}`}>
                {emailError || 'Looks good!'}
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 mb-2 rounded inline-flex items-center hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEmployee;
