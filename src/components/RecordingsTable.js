import React, { useState, useEffect } from 'react';
import { Row } from 'antd';
import RecordingCard from './RecordingCard';


const RecordingsTable = ({ folderId, headers, uploading, currentBlob, defaultFileName }) => {
    const [audioFilesList, setAudioFilesList] = useState([]);
    const [isPrimary, setIsPrimary] = useState(true);

    useEffect(() => {
        const params = escape(`'${folderId}' in parents and trashed=false and mimeType = 'audio/wav'`)
        const fields = escape("files(id,name,mimeType,webViewLink,webContentLink)");

        if (audioFilesList.length === 1) {
            fetch(audioFilesList[0].webContentLink)
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                    setIsPrimary(false);
                })
        }

        fetch(`https://www.googleapis.com/drive/v3/files?q=${params}&fields=${fields}`,
            { headers: headers })
            .then(res => res.json())
            .then(data => { setAudioFilesList(data.files) })
            .catch(err => { console.log(err) })
    }, [folderId, headers, audioFilesList])

    return (
        <Row gutter={[16, 16]}>
            {uploading &&
                <RecordingCard recording={currentBlob} fromDrive={false} spinner={true} defaultFileName={defaultFileName} />}
            {audioFilesList && audioFilesList.map(recording =>
                <React.Fragment key={recording.id} >
                    <RecordingCard recording={recording} fromDrive={true} spinner={false} isPrimary={isPrimary} />
                </React.Fragment>)}
        </Row>
    )
}



export default RecordingsTable;