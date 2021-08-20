import React from 'react';
import { Col, Divider } from 'antd';
import { FaSpinner } from 'react-icons/fa';

const RecordingCard = ({ recording, fromDrive = false, spinner = false, defaultFileName }) => {
    return (
        <>
            <Divider />
            <Col span={24} className="audio-card ">
                <div className="pb-8">
                    {fromDrive ? recording.name : defaultFileName} {spinner && <FaSpinner className="spinner" color="#1890ff" />}
                </div>
                <audio
                    className="audio-panel"
                    controls
                    src={fromDrive ? `https://drive.google.com/u/1/uc?id=${recording.id}&export=download` : recording}
                >
                    Your browser does not support the
                    <code>audio</code> element.
                </audio>
            </Col>
        </>
    )
}

export default RecordingCard;
