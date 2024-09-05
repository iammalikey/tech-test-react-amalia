import React, { useEffect, useState } from 'react';
import { getEmployee } from '../api';
import { useParams } from 'react-router-dom';

function EmployeeDetail() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getEmployee(id)
      .then(response => {
        setEmployee(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching employee details:', error);
        setError('Failed to fetch employee details.');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Employee Details</h1>
      {employee ? (
        <div>
          <p><strong>First Name:</strong> {employee.first_name}</p>
          <p><strong>Last Name:</strong> {employee.last_name}</p>
          <p><strong>Email:</strong> {employee.email}</p>
        </div>
      ) : (
        <p>No employee details found.</p>
      )}
    </div>
  );
}

export default EmployeeDetail;
