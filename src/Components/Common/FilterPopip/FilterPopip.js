// import React, { useState } from "react";
// import "./FilterPopip.scss";
// import FilterLocation from "./FilterLocation/FilterLocation";
// import FilterTime from "./FilterTime/FilterTime";
// import FilterForm from "./FilterForm/FilterForm";
// import DropDownBox from "./DropDownBox/DropDownBox";
// import { toast } from "react-toastify";

// const FilterPopip = () => {

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     toast.success("Search");
//   };

//   const handleClear = (e) => {
//     e.preventDefault();
//     toast.success("Clear");
//   };

//   return (
//     <div className="filter_popip">
//       <form onSubmit={handleSubmit}>
//         <div className="filter_class_search">
//           <FilterLocation/>
//           <FilterTime/>
//         </div>
//         <div className="filter_class_option">
//           <FilterForm/>
//         </div>
//         <div className="filter_possion">
//           <DropDownBox id={1} />
//           <DropDownBox id={2} />
//         </div>
//         <div className="saving_button">
//           <button onClick={handleClear}>Clear</button>
//           <button type="submit">Search</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default FilterPopip;

import React, { useState, useEffect } from "react";
import "./FilterPopip.scss";
import FilterLocation from "./FilterLocation/FilterLocation";
import FilterTime from "./FilterTime/FilterTime";
import FilterForm from "./FilterForm/FilterForm";
import DropDownBox from "./DropDownBox/DropDownBox";
// import { toast } from "react-toastify";

const FilterPopip = () => {
    const [formData, setFormData] = useState({
        location: "",
        time: "",
        formValue: "",
        DropDownBox1: "",
        DropDownBox2: "",
        // Add more form fields as needed
    });

    const [clearFlag, setClearFlag] = useState(false); // State to trigger clearing in child components

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform search based on formData
        // You can access form values from formData.location, formData.time, etc.
        // toast.success("Search");
    };

    const handleClear = (e) => {
        e.preventDefault();
        setClearFlag((prev) => !prev); // Toggle clear flag
    };

    const handleInputChange = (name, value) => {
        // Update form data on input change
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    useEffect(() => {
        if (clearFlag) {
            // Clear the form data when clearFlag is true
            setFormData({
                location: "",
                time: "",
                formValue: "",
                // Reset other form fields as needed
            });
            // Reset the clearFlag to false after clearing
            setClearFlag(false);
            // toast.success("Clear");
        }
    }, [clearFlag]);

    return (
        <div className="filter_popip">
            <form onSubmit={handleSubmit}>
                <div className="filter_class_search">
                    <FilterLocation
                        value={formData.location}
                        onChange={(value) => handleInputChange("location", value)}
                        onClear={clearFlag}
                    />
                    <FilterTime
                        value={formData.time}
                        onChange={(value) => handleInputChange("time", value)}
                        onClear={clearFlag}
                    />
                </div>
                <div className="filter_class_option">
                    <FilterForm
                        value={formData.formValue}
                        onChange={(value) => handleInputChange("location", value)}
                        onClear={clearFlag}
                    />
                </div>
                <div className="filter_possion">
                    <DropDownBox
                        id={1}
                        value={formData.DropDownBox1}
                        onChange={(value) => handleInputChange("DropDownBox1", value)}
                        onClear={clearFlag}
                    />
                    <DropDownBox
                        id={2}
                        value={formData.DropDownBox2}
                        onChange={(value) => handleInputChange("DropDownBox2")}
                        onClear={clearFlag}
                    />
                </div>
                <div className="saving_button">
                    <button onClick={handleClear}>Clear</button>
                    <button type="submit">Search</button>
                </div>
            </form>
        </div>
    );
};

export default FilterPopip;
