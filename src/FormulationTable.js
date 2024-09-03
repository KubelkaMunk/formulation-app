// src/FormulationTable.js
import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const FormulationTable = () => {
  const [rowData, setRowData] = useState([]); // State to store data
  const [loading, setLoading] = useState(true); // State to handle loading status

  useEffect(() => {
    // Fetch data from the Node.js server
    fetch('http://localhost:5000/api/formulations') // Replace with your server's URL and endpoint
      .then((response) => response.json()) // Parse the JSON from the response
      .then((data) => {
        setRowData(data); // Set the data in state
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error('Error fetching data:', error); // Log any errors
        setLoading(false); // Set loading to false even if there's an error
      });
  }, []); // Empty dependency array means this runs once on component mount

  // Column definitions for AG Grid
  const columnDefs = [
    { headerName: 'Formulation Number', field: 'Formulationnumber', sortable: true, filter: true },
    { headerName: 'Formulation Name', field: 'Formulationname_x', sortable: true, filter: true },
    { headerName: 'Trial', field: 'Trial', sortable: true, filter: true },
    { headerName: 'Status', field: 'Status', sortable: true, filter: true },
    { headerName: 'Formulation Type', field: 'Formulationtype', sortable: true, filter: true },
    { headerName: 'Technology', field: 'Technology', sortable: true, filter: true },
    { headerName: 'Product', field: 'Product', sortable: true, filter: true },
    { headerName: 'Creator', field: 'FormulationCreator', sortable: true, filter: true },
    { headerName: 'Ingredient Number', field: 'Ingredientnumber', sortable: true, filter: true },
    { headerName: 'Type', field: 'Type', sortable: true, filter: true },
    { headerName: 'Amount', field: 'Amount', sortable: true, filter: true },
  ];

  // Display loading state while data is being fetched
  if (loading) {
    return <div>Loading data...</div>;
  }

  return (
    <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
      <AgGridReact
        rowData={rowData} // Data to be displayed in the grid
        columnDefs={columnDefs} // Column definitions
        defaultColDef={{ flex: 1, minWidth: 100 }} // Default column properties
        pagination={true} // Enable pagination
        paginationPageSize={20} // Set page size
      />
    </div>
  );
};

export default FormulationTable;
