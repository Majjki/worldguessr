import { useState } from 'react';
import { useTranslation } from '@/components/useTranslations';
import { FaEdit, FaCheck, FaTimes } from 'react-icons/fa';

export default function GuestNameInput({ currentName, onNameChange, ws, isGuest }) {
  const { t: text } = useTranslation("common");
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(currentName || '');
  const [isChanging, setIsChanging] = useState(false);

  // Only show for guest players
  if (!isGuest) {
    return null;
  }

  const handleStartEdit = () => {
    setIsEditing(true);
    setTempName(currentName || '');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempName(currentName || '');
  };

  const handleSubmit = () => {
    if (!tempName.trim() || tempName.length > 20) {
      return;
    }

    setIsChanging(true);
    
    if (ws && ws.send) {
      ws.send(JSON.stringify({
        type: 'setGuestName',
        name: tempName.trim()
      }));
    }

    setIsEditing(false);
    setIsChanging(false);
    
    if (onNameChange) {
      onNameChange(tempName.trim());
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (isEditing) {
    return (
      <div className="guest-name-input-container">
        <input
          type="text"
          value={tempName}
          onChange={(e) => setTempName(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder={text("enterYourName") || "Enter your name"}
          maxLength={20}
          className="guest-name-input"
          autoFocus
        />
        <button onClick={handleSubmit} className="guest-name-btn confirm" disabled={!tempName.trim() || tempName.length > 20}>
          <FaCheck />
        </button>
        <button onClick={handleCancel} className="guest-name-btn cancel">
          <FaTimes />
        </button>
        <style jsx>{`
          .guest-name-input-container {
            display: flex;
            align-items: center;
            gap: 5px;
            margin: 10px 0;
          }
          .guest-name-input {
            padding: 5px 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 14px;
            min-width: 120px;
          }
          .guest-name-btn {
            padding: 5px 8px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .guest-name-btn.confirm {
            background-color: #4CAF50;
          }
          .guest-name-btn.confirm:hover {
            background-color: #45a049;
          }
          .guest-name-btn.cancel {
            background-color: #f44336;
          }
          .guest-name-btn.cancel:hover {
            background-color: #da190b;
          }
          .guest-name-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="guest-name-display">
      <span className="guest-name-text">{currentName}</span>
      <button onClick={handleStartEdit} className="guest-name-edit-btn" title={text("changeName") || "Change name"}>
        <FaEdit />
      </button>
      <style jsx>{`
        .guest-name-display {
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 10px 0;
        }
        .guest-name-text {
          font-weight: bold;
          color: white;
        }
        .guest-name-edit-btn {
          padding: 4px 6px;
          border: none;
          border-radius: 3px;
          background-color: #007bff;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
        }
        .guest-name-edit-btn:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
}