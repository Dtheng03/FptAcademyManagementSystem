import React from 'react';
import './syllabus.scss';

const syllabus = ({ name }) => {
    return (
        <div className='syllabus'>
            <button>{name}</button>
        </div>
    );
};

export default syllabus;