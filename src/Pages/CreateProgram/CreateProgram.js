import React, { useState, useEffect } from "react";
import styles from "./CreateProgram.module.scss";
import classNames from "classnames/bind";
import Button from "../../Components/Common/Button";
import ProgramMetadata from "../CreateProgram/ProgramMetadata/ProgramMetadata"
import ProgramSyllabuses from "./ProgramSyllabus/ProgramSyllabus"

import CreateProgramActions from "./CreateProgramActions/CreateProgramActions";

const cx = classNames.bind(styles);

function CreateProgram() {
    const [programName, setProgramName] = useState("");
    const [isProgramCreated, setIsProgramCreated] = useState(false);
    const [clickedValue, setClickedValue] = useState(null); // State to capture clicked value

    const handleProgramNameChange = (event) => {
        setProgramName(event.target.value);
    };

    const handleCreateProgram = () => {
        if (!programName) {
            // toast.warning("Program name cannot be empty!");
            return; // Don't proceed if program name is empty
        }
        setIsProgramCreated(true);
    };

    useEffect(() => {
        // Scroll to the top when the component mounts
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={cx("create-program")}>
            <div className={cx("container")}>
                <div className={cx("content")}>
                    <h1>T r a i n i n g p r o g r a m</h1>
                    {isProgramCreated && (
                        <>
                            <h3>{programName}</h3>

                        </>
                    )}
                </div>

                {isProgramCreated && (
                    <div className="create-program__metadata create-program__section">
                        <ProgramMetadata modifiedDate={"23/07/2022"} modifiedBy={"Warrior Tran"} />
                          <div className="create-program__syllabuses create-program__section">
                    <ProgramSyllabuses />
                </div>
              
               
                        <div className="create-program__actions create-program__section">
                            <CreateProgramActions />
                        </div>
                      
                    </div>
                )}

                <div className={cx("create-form")}>
                    {!isProgramCreated && (
                        <>
                            <p>Program name</p>
                            <div className={cx("search-variable")}>
                                <input
                                    type="text"
                                    placeholder="Name the program"
                                    onChange={handleProgramNameChange}
                                />
                            </div>
                            <Button
                                title="Create"
                                type="normal"
                                onClick={handleCreateProgram}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CreateProgram; 