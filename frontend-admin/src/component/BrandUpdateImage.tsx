import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNotify, useRedirect } from 'react-admin';
import axios from 'axios';
import "./css/ProductUpdateImage.css"
const BrandUpdateImage = () => {
    const { id } = useParams<{ id: string }>();
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const notify = useNotify();
    const redirect = useRedirect();
    const token = localStorage.getItem('jwt-token');
    console.log(token)
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const selectedFile = event.target.files[0];
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

 const handleUpload = async () => {
    if (!file) {
        notify('Please select a file.');
        return;
    }

    const formData = new FormData();
    formData.append('logo', file);

    const token = localStorage.getItem('jwt-token');
    console.log('Token:', token);

    try {
        await axios.put(`http://localhost:8080/api/admin/brands/${id}/logo`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });

        notify('Image updated successfully.');
        redirect('/brands');
    } catch (error) {
        if (error.response && error.response.status === 401) {
            notify('Unauthorized: Please check your login status.');
        } else {
            notify('Error updating image.');
        }
        console.error(error);
    }
};


    return (
        <div className="container" >
            <h2>Cập nhật hình ảnh cho thương hiệu {id} </h2>
            < div className="image-preview" >
                {
                    preview ? (
                        <img src={preview} alt="Image preview" className="preview-img" />
                    ) : (
                        <p>Chưa có hình ảnh</ p >
                    )}
                < input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="file-input"
                />
                <button onClick={handleUpload} className="upload-button" > Cập nhật </button>
            </div>
        </div>
    );
};


export default BrandUpdateImage