import React from "react";

const AddUnitPopup = ({
  newUnitName,
  setNewUnitName,
  handleCreateUnit,
  setShowAddUnitPopup,
}) => {
  return (
    <div className="addUnitPopup">
      <h2>Create Unit</h2>
      <input
        type="text"
        placeholder="Unit Name"
        value={newUnitName}
        onChange={(e) => setNewUnitName(e.target.value)}
      />
      <button onClick={handleCreateUnit}>Create</button>
      <button onClick={() => setShowAddUnitPopup(false)}>Cancel</button>
    </div>
  );
};

export default AddUnitPopup;
