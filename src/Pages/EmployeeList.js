import React, { useEffect, useState } from 'react';
import { getEmployees, deleteEmployee } from '../api'; 
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { Button, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    getEmployees()
      .then(response => setEmployees(response.data.data))
      .catch(error => console.error('Error fetching employees:', error));
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteEmployee(id)
          .then(() => {
            Swal.fire(
              'Deleted!',
              'Employee has been deleted.',
              'success'
            );
            setEmployees(employees.filter(emp => emp.id !== id));
          })
          .catch(error => console.error('Error deleting employee:', error));
      }
    });
  };

  return (
    <div className="container mx-auto px-4">
      <Link to="/add-employee" className="bg-blue-500 text-white px-4 py-2 mb-2 rounded inline-flex items-center hover:bg-blue-600">
        Add New
      </Link>
      <Table>
        <TableHead>
          <TableHeadCell>First Name</TableHeadCell>
          <TableHeadCell>Last Name</TableHeadCell>
          <TableHeadCell>Email</TableHeadCell>
          <TableHeadCell>Actions</TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          {employees.map(employee => (
            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800" key={employee.id}>
              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                <Link to={`/employee/${employee.id}`} className="text-blue-500 hover:underline">
                  {employee.first_name}
                </Link>
              </TableCell>
              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{employee.last_name}</TableCell>
              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{employee.email}</TableCell>
              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                <Link to={`/edit-employee/${employee.id}`} className="bg-green-500 text-white px-2 py-1 rounded mr-2">Edit</Link>
                <button
                  onClick={() => handleDelete(employee.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default EmployeeList;
