import * as React from 'react';

import './App.css';
import { AudioRecordTable } from './components/AudioRecordTable';
import { UploadAudio } from './components/UploadAudio';
export function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1 className="App-title">Online Voice to Text Converter</h1>
            </header>
            <div className="App-body">
                <UploadAudio/>
                <hr/>
                <AudioRecordTable />
            </div>
        </div>
    );
}
