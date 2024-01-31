import React from 'react';
import { Button } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';

export default function StatusChip({ title, closeIcon = false, onClick = () => { } }) {
    let bgColor = '#2D3748';

    if (title === "Inactive") {
        bgColor = "#b9b9b9"
    } else if (title === "Draft") {
        bgColor = "#285d9a"
    } else if (title === "Admin") {
        bgColor = "#2f903f"
    } else if (title === "Fresher") {
        bgColor = "#D45B13"
    } else if (title === "Online fee-fresher") {
        bgColor = "#2F903F"
    } else if (title === "Offline fee-fresher") {
        bgColor = "#D45B13"
    }

    const buttonStyle = {
        backgroundColor: bgColor,
        color: 'white',
        borderRadius: '15px',
    };

    return (
        <Button style={buttonStyle} onClick={onClick}>
            {title} {closeIcon ? <CloseCircleOutlined /> : ''}
        </Button>
    );
};
