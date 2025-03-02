import { useState } from 'react';
import { ImageCompressor } from './Components/ImageCompressor';
function App() {
    // const apiKey = import.meta.API_KEY;

    return (
        <div className="min-h-screen bg-slate-700 p-4">
            <ImageCompressor />
        </div>
    );
}

export default App;
