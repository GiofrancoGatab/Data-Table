// src/DataTable.js
import React, { useState } from 'react';

// Sample Data
const data = [
  { lastName: 'Gatab', firstName: 'Giofranco', course: 'IT', birthdate: '2002/04/03' },
  { lastName: 'Smith', firstName: 'Jane', course: 'CS', birthdate: '2003/05/15' },
  { lastName: 'Johnson', firstName: 'Jim', course: 'IS', birthdate: '2002/09/20' },
  { lastName: 'Williams', firstName: 'Jill', course: 'DS', birthdate: '2003/07/30' },
  { lastName: 'Brown', firstName: 'Bob', course: 'IT', birthdate: '2003/12/25' },
];

const DataTable = () => {
  const [filter, setFilter] = useState('');
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');

  // Calculate age based on birthdate
  const calculateAge = (birthdate) => {
    const birth = new Date(birthdate);
    const today = new Date();
    return today.getFullYear() - birth.getFullYear() - (today < new Date(today.getFullYear(), birth.getMonth(), birth.getDate()) ? 1 : 0);
  };

  // Filter data
  const filteredData = data.filter(item => {
    const birthdate = new Date(item.birthdate);
    const isWithinDateRange = (!minDate || birthdate >= new Date(minDate)) && (!maxDate || birthdate <= new Date(maxDate));
    return (
      (item.lastName.toLowerCase().includes(filter.toLowerCase()) ||
       item.firstName.toLowerCase().includes(filter.toLowerCase()) ||
       item.course.toLowerCase().includes(filter.toLowerCase()) ||
       calculateAge(item.birthdate).toString().includes(filter)) &&
      isWithinDateRange
    );
  });

  return (
    <div>
      <h1>Student Data Table</h1>
      <input
        type="text"
        placeholder="Filter by Last Name, First Name, Age, or Course"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <br />
      <label>
        Min Birthdate:
        <input
          type="date"
          value={minDate}
          onChange={(e) => setMinDate(e.target.value)}
        />
      </label>
      <label>
        Max Birthdate:
        <input
          type="date"
          value={maxDate}
          onChange={(e) => setMaxDate(e.target.value)}
        />
      </label>
      <table border="1" style={{ marginTop: '20px', width: '100%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>Last Name</th>
            <th>First Name</th>
            <th>Course</th>
            <th>Birthdate</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>{item.lastName}</td>
              <td>{item.firstName}</td>
              <td>{item.course}</td>
              <td>{item.birthdate}</td>
              <td>{calculateAge(item.birthdate)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
