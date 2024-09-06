import React, { useState } from 'react';

function Toolbar({ addNote }) {
  const [content, setContent] = useState('');
  const [color, setColor] = useState('#ffd700');
  const [fontSize, setFontSize] = useState(16);
  const [fontStyle, setFontStyle] = useState('Arial');
  const [isTodo, setIsTodo] = useState(false);
  const [image, setImage] = useState(null);

  const handleAddNote = () => {
    addNote({
      content,
      color,
      fontSize,
      fontStyle,
      isTodo,
      image,
      tasks: isTodo ? [] : null,
      id: Date.now(),
    });
    setContent('');
    setIsTodo(false);
    setImage(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const shareNote = (platform) => {
    const shareText = encodeURIComponent(content);
    const shareUrl = window.location.href; // Placeholder for the note's link (can be updated with actual link logic)

    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${shareText}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${shareText}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${shareText}`, '_blank');
        break;
      case 'gmail':
        window.open(`mailto:?subject=Note&body=${shareText}`, '_self');
        break;
      case 'instagram':
        alert('Instagram does not support direct web sharing, but you can copy the note!');
        break;
      case 'webshare':
        if (navigator.share) {
          navigator.share({
            title: 'Sticky Note',
            text: content,
            url: shareUrl,
          }).catch((err) => console.log('Sharing failed', err));
        } else {
          alert('Web Share is not supported on this device.');
        }
        break;
      default:
        console.log('Unknown platform');
    }
  };

  return (
    <div className="note-editor" style={{ backgroundColor: color }}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your note here..."
        className="note-input"
        style={{ fontFamily: fontStyle, fontSize: `${fontSize}px` }}
      />

      {/* Inside placeholder: options below */}
      <div className="note-options">
        {/* To-Do List Option */}
        <label>
          <input
            type="checkbox"
            checked={isTodo}
            onChange={() => setIsTodo(!isTodo)}
            className="todo-checkbox"
          />
          To-Do List
        </label>

        {/* Font Style Selector */}
        <select
          value={fontStyle}
          onChange={(e) => setFontStyle(e.target.value)}
          className="font-style-selector"
        >
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
          <option value="Georgia">Georgia</option>
          <option value="Verdana">Verdana</option>
        </select>

        {/* Color Picker */}
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="color-picker"
        />

        {/* Font Size Slider */}
        <input
          type="range"
          min="10"
          max="40"
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
          className="font-size-slider"
        />

        {/* Choose File Button */}
        <label className="file-label">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="file-input"
          />
          Choose File
        </label>

        {/* Add Note Button */}
        <button className="add-note-button" onClick={handleAddNote}>Add Note</button>

        {/* Share Buttons */}
        <div className="share-buttons">
          <button className="share-button" onClick={() => shareNote('whatsapp')}>WhatsApp</button>
          <button className="share-button" onClick={() => shareNote('facebook')}>Facebook</button>
          <button className="share-button" onClick={() => shareNote('twitter')}>Twitter</button>
          <button className="share-button" onClick={() => shareNote('gmail')}>Gmail</button>
          <button className="share-button" onClick={() => shareNote('instagram')}>Instagram</button>
          <button className="share-button" onClick={() => shareNote('webshare')}>More</button>
        </div>
      </div>
    </div>
  );
}

export default Toolbar;
