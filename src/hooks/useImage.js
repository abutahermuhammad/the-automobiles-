import React from 'react';

const useImage = (image64Encoded) => {
    let API_KEY = process.env.IMGBB_API_KEY;
    let URL = `https://api.imgbb.com/1/upload`;

    const encode64 = (image) => {
        const reader = new FileReader();
        reader.readAsDataURL(image)
        reader.onloadend = () => console.log('img64 ', reader.result);
    }

    // const decode64 = (image) => {
    //     const reader = new FileReader();
    //     reader.onloadend = () => reader.result;
    //     reader.readAsDataURL(image);
    // }

    const uploadImage = (image) => {
        let url = `https://api.imgbb.com/1/upload?key=${API_KEY}&image=${image}`;
    }

    const loadImage = () => {}


    return {
        encode64,
        // decode64,
        uploadImage,
        loadImage
    };
};

export default useImage;
