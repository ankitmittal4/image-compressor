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
            <div className="flex justify-center items-center flex-col text-center mx-auto">
                <h1 className="text-white text-2xl font-bold mb-10">
                    Image Compressor
                </h1>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="mb-4"
                />
            </div>
            <div className="flex mx-auto mt-20 max-w-4xl border-red-500 border-4 p-10 justify-between">
                {/* Left Side: Original Image */}
                <div className="">
                    {image && (
                        <div className="mb-4 text-center">
                            <h2 className="text-xl font-semibold text-white mb-4 ">
                                Original Image
                            </h2>
                            <div className="w-64 h-64 overflow-hidden rounded-lg shadow-md">
                                {' '}
                                {/* Fixed size container */}
                                <img
                                    src={image}
                                    alt="Original"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <button
                                onClick={handleCompressImage}
                                className="mt-4 text-white bg-blue-700 px-4 py-2 rounded-md hover:bg-blue-800 transition-colors mx-auto "
                            >
                                Compress Image
                            </button>
                        </div>
                    )}
                </div>

                {/* Right Side: Compressed Image */}
                {compressedImage && (
                    <div className="text-center">
                        <h2 className="text-xl font-semibold text-white mb-4">
                            Compressed Image
                        </h2>
                        <div className="w-64 h-64 overflow-hidden rounded-lg shadow-md">
                            <img
                                src={compressedImage}
                                alt="Compressed"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <a
                            href={compressedImage}
                            download="compressed-image.jpg"
                            className="mt-4 inline-block bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
                        >
                            Download Compressed Image
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};
export { ImageCompressor };
