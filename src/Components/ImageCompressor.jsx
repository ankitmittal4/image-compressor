import { useState } from 'react';

const ImageCompressor = () => {
    const [image, setImage] = useState('');
    const [compressedImage, setCompressedImage] = useState('');
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileReader = new FileReader();
            fileReader.onloadend = () => {
                setImage(fileReader.result);
            };
            fileReader.readAsDataURL(file);
        }
    };
    const handleCompressImage = () => {
        if (!image) {
            return;
        }
        const img = new Image();
        img.src = image;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            canvas.width = img.width;
            canvas.height = img.height;

            ctx.drawImage(img, 0, 0, img.width, img.height);

            canvas.toBlob(
                (blob) => {
                    const compressedImageUrl = URL.createObjectURL(blob);
                    setCompressedImage(compressedImageUrl);
                },
                'image/jpeg',
                0.7,
            );
        };
    };
    return (
        <div className="p-4">
            <h1 className="text-white text-2xl font-bold mb-4">
                Image Compressor
            </h1>
            <input
                type="file"
                accept="image"
                onChange={handleImageUpload}
                className="mb-4"
            />
            {image && (
                <div className="mb-4">
                    <h2 className="text-xl font-semibold">Original Image</h2>
                    <img
                        src={image}
                        alt="Original"
                        className="max-w-full h-auto"
                    />
                </div>
            )}
            <button
                onClick={handleCompressImage}
                className="text-white bg-blue-700 p-2 rounded-md"
            >
                Compress Image
            </button>
            {compressedImage && (
                <div className="mt-4">
                    <h2 className="text-xl font-semibold">Compressed Image</h2>
                    <img
                        src={compressedImage}
                        alt="Compressed"
                        className="max-w-full h-auto"
                    />
                    <a
                        href={compressedImage}
                        download="compressed-image.jpg"
                        className="mt-2 inline-block bg-green-500 text-white px-4 py-2 rounded"
                    >
                        Download Compressed Image
                    </a>
                </div>
            )}
        </div>
    );
};
export { ImageCompressor };
