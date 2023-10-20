import React, { useState } from 'react';
import MonacoEditor from 'react-monaco-editor';

function App() {
  const initialCode = `// Welcome to the Code Editor
function helloWorld() {
  console.log('Hello, world!');
}`;

  const [code, setCode] = useState(initialCode);
  const [isLocked, setIsLocked] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [output, setOutput] = useState('');

  const handleEditorChange = (newValue, e) => {
    setCode(newValue);
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1000);
  };

  const handleLockUnlockClick = () => {
    setIsLocked(!isLocked);
  };

  const handleRunClick = () => {
    try {
      // Use eval to execute the code and capture the output
      const result = eval(code);
      setOutput(result === undefined ? 'Code executed successfully.' : result.toString());
    } catch (error) {
      console.error('Error:', error);
      setOutput('Error: ' + error.message);
    }
  };

  return (
    <div className="App">
      <h1>Basic Code Editor</h1>
      <button onClick={handleCopyClick}>{isCopied ? "Copied!" : "Copy"}</button>
      <button onClick={handleLockUnlockClick}>{isLocked ? "Unlock" : "Lock"}</button>
      <button onClick={handleRunClick}>Run</button>
      <MonacoEditor
        width="800"
        height="300"
        language="javascript"
        theme="vs-dark"
        value={code}
        options={{
          selectOnLineNumbers: true,
          readOnly: isLocked,
        }}
        onChange={handleEditorChange}
      />
      <div className="output">
        <h2>Output:</h2>
        <pre>{output}</pre>
      </div>
    </div>
  );
}

export default App;
