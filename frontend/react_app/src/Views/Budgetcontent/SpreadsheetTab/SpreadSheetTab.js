import React, { useState } from 'react';
import Spreadsheet from 'react-spreadsheet';
import './SpreadSheetTab.css';

const SpreadsheetTab = () => {
  const initialData = Array.from({ length: 20 }, () => Array.from({ length: 10 }, () => ({ value: "" })));
  const [data, setData] = useState(initialData);

  const addRow = () => {
    const newRow = Array.from({ length: data[0].length }, () => ({ value: "" }));
    setData([...data, newRow]);
  };

  const addColumn = () => {
    const newData = data.map(row => [...row, { value: "" }]);
    setData(newData);
  };

  const deleteRow = () => {
    if (data.length > 1) {
      const newData = data.slice(0, -1);
      setData(newData);
    }
  };

  const deleteColumn = () => {
    if (data[0].length > 1) {
      const newData = data.map(row => row.slice(0, -1));
      setData(newData);
    }
  };

  return (
    <div className="spreadsheet-container">
      <div className="spreadsheet-wrapper">
        <Spreadsheet data={data} onChange={setData} />
      </div>
      <div className="spreadsheet-controls">
        <button onClick={addRow}>Add Row</button>
        <button onClick={addColumn}>Add Column</button>
        <button onClick={deleteRow}>Delete Row</button>
        <button onClick={deleteColumn}>Delete Column</button>
      </div>
    </div>
  );
};

export default SpreadsheetTab;
