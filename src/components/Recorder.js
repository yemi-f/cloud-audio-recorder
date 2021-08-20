import React from 'react';
import { useReactMediaRecorder } from "react-media-recorder";
import { FaPause } from 'react-icons/fa';
import { GoPrimitiveDot } from 'react-icons/go';
import { Button, Row, Col } from 'antd';


const Recorder = ({ recStatus, updateRecStatus, folderId, headers, updateUploading, updateCurrentBlob, updateDefaultFileName }) => {
    const uploadFile = (audioBlob) => {
        updateUploading(true);

        const formData = new FormData();
        const fileName = `${new Date()}.wav`;

        const metadata = {
            'name': fileName,
            'mimeType': 'audio/wav',
            "parents": [folderId]
        };

        updateDefaultFileName(fileName);


        formData.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
        formData.append("file", audioBlob)

        const xhr = new XMLHttpRequest();
        xhr.open('post', 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id');
        xhr.setRequestHeader('Authorization', headers.Authorization);
        xhr.responseType = 'json';
        xhr.onload = () => {
            updateUploading(false);
        };
        xhr.send(formData);
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const handleStopRecording = (_, blob) => {
        updateUploading(true);
        updateCurrentBlob(blob);
        uploadFile(blob);
        stopRecording();
        updateRecStatus("idle");
        scrollToTop();
    }

    const {
        startRecording,
        pauseRecording,
        resumeRecording,
        stopRecording,
    } = useReactMediaRecorder({ onStop: handleStopRecording });


    const handleRecStatus = () => {
        if (recStatus === "idle") {
            startRecording();
            updateRecStatus("pause");
        }
        else if (recStatus === "pause") {
            pauseRecording();
            updateRecStatus("resume");
        }
        else if (recStatus === "resume") {
            resumeRecording();
            updateRecStatus("pause");
        }
    }


    return (
        <Row gutter={[16, 16]} className="recorder" >
            <Col span={8} className="center-child" >
                {recStatus !== "idle" && <Button size="large" shape="round">Delete</Button>}
            </Col>
            <Col span={8} className="center-child" >
                <Button size="large" type="danger" shape={recStatus === "resume" ? "round" : "circle"}
                    onClick={handleRecStatus}>
                    <IconGenerator status={recStatus} />
                </Button>
            </Col>
            <Col span={8} className="center-child" >
                {recStatus !== "idle" && <Button size="large" onClick={stopRecording} shape="round" >Save</Button>}
            </Col>
        </Row>
    )
}

const IconGenerator = ({ status }) => {
    if (status === "idle") return <GoPrimitiveDot className="icons" />

    if (status === "pause") return <FaPause className="icons" />

    if (status === "resume") return <span>Resume</span>
}


export default Recorder;