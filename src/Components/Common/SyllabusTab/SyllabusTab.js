import React from "react";
import "./SyllabusTab.scss";
import Syllabus from "./syllabus/syllabus";

const SyllabusTab = () => {
    const name = "General";
    const name2 = "Outline";
    const name3 = "Training material";

    return (
        <div className="syllabus_tab">
            <div className="syllabus_tab_button">
                <Syllabus name={name} />
                <Syllabus name={name2} />
                <Syllabus name={name3} />
            </div>
            <div className="syllabus_tab_button">
                <Syllabus name={name} />
                <Syllabus name={name2} />
                <Syllabus name={name3} />
            </div>
            <div className="syllabus_tab_button">
                <Syllabus name={name} />
                <Syllabus name={name2} />
                <Syllabus name={name3} />
            </div>
            <div className="syllabus_tab_button">
                <Syllabus name={name} />
                <Syllabus name={name2} />
                <Syllabus name={name2} />
                <Syllabus name={name3} />
            </div>
        </div>
    );
};

export default SyllabusTab;
