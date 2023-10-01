import React, { useState } from 'react';

function App() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const shortenUrl = async () => {
    try {
      const response = await fetch('http://localhost:3001/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ longUrl }),
      });
      const data = await response.json();
      setShortUrl(data.shortUrl);
    } catch (error) {
      console.error('Error shortening URL:', error);
    }
  };

  const copyToClipboard = () => {
    const completeShortUrl = `http://localhost:3001/${shortUrl}`;
    const textField = document.createElement('textarea');
    textField.innerText = completeShortUrl;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    document.body.removeChild(textField);
    setIsCopied(true);
  }
  return (
    <div className="App">
      <h1>URL Shortener</h1>
      <div>
        <input
          type="text"
          placeholder="Enter a long URL"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />
        <button onClick={shortenUrl}>Shorten</button>
      </div>
      {shortUrl && (
        <div>
          <p>Short URL: <a href={`http://localhost:3001/${shortUrl}`} target="_blank" rel="noopener noreferrer">{shortUrl}</a></p>
          <button onClick={copyToClipboard}>Copy Short URL</button>
          {isCopied && <p>Short URL copied to clipboard!</p>}
        </div>
      )}
    </div>
  );
}

export default App;
