import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import Cookies from 'js-cookie';
import Recorder from '../components/Recorder';
import RecordingsTable from '../components/RecordingsTable';

const { Content, Footer } = Layout;


const Homepage = ({ user }) => {
    const [uploading, setUploading] = useState(false);
    const [currentBlob, setCurrentBlob] = useState(null);
    const [defaultFileName, setDefaultFileName] = useState("");
    const [folderId, setFolderId] = useState(Cookies.get("folderId"));
    const [folderName, setFolderName] = useState(Cookies.get("folderName"));


    const updateUploading = bool => { setUploading(bool) };
    const updateCurrentBlob = blob => { setCurrentBlob(blob) };
    const updateDefaultFileName = name => { setDefaultFileName(name) };

    const headers = {
        Authorization: `Bearer ${user.tokenObj.access_token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
    };

    const [recStatus, setRecStatus] = useState("idle");

    const updateRecStatus = nm => {
        setRecStatus(nm);
    }



    useEffect(() => {
        const handleFolderCreation = () => {
            const name = "cloud-recorder-by-A";
            fetch("https://www.googleapis.com/drive/v3/files", {
                method: 'POST', // or 'PUT'
                headers: headers,
                body: JSON.stringify({
                    name: name,
                    mimeType: 'application/vnd.google-apps.folder'
                }),
            }).then(response => response.json())
                .then(data => {
                    setFolderId(data.id);
                    setFolderName(name);
                    Cookies.set("folderName", name, { secure: true });
                    Cookies.set("folderId", data.id, { secure: true });
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }

        if (!folderId) {
            handleFolderCreation();
        }
    })


    return (
        <Layout>
            <Content>
                <p>Saving to {folderName}</p>
                <RecordingsTable folderId={folderId} headers={headers} defaultFileName={defaultFileName}
                    currentBlob={currentBlob} uploading={uploading} />
            </Content>
            <Footer>
                <Recorder recStatus={recStatus}
                    updateRecStatus={updateRecStatus} folderId={folderId} headers={headers}
                    updateDefaultFileName={updateDefaultFileName}
                    updateCurrentBlob={updateCurrentBlob}
                    updateUploading={updateUploading} />
            </Footer>
        </Layout>
    )
}

export default Homepage;