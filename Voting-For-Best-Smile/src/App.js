
import React, { useState } from 'react';
import './App.css';

const emojis = ['😀', '😃', '😄', '😁', '😆'];
const initialVotes = emojis.reduce ((acc, emoji) => ({ ...acc, [emoji]: 0 }), {});

function App () {
    const [votes, setVotes] = useState(initialVotes);
    const [showResults, setShowResults] = useState(false); 

    const handleVote = (emoji) => {
        setVotes((prevVotes) => ({
            ...prevVotes,
            [emoji]: prevVotes[emoji] + 1,
        }));
    };

    const handleShowResults = () => {
        setShowResults(true);
    };

    const getWinner = () => {
        const maxVotes = Math.max(...Object.values(votes));
        const winningEmoji = Object.keys(votes).find((emoji) => votes[emoji] === maxVotes);
        return winningEmoji;
    };

    return (
        <div className='App'>
            <h1>Emoji Voting App</h1>
            <div className='emoji-list'>
                {emojis.map((emoji) => (
                    <div key = {emoji} className='emoji-item'>
                        <span role = "img" aria-label = 'emoji' onClick={() => handleVote(emoji)}>
                            {emoji}
                        </span>
                        <span className='vote-count'>{votes[emoji]}</span>
                    </div>
                ))}
            </div>
            <button onClick={handleShowResults} disabled = {!Object.values(votes).some((count) => count > 0 )}>
                Show Results
            </button>
            {showResults && (
                <div className='winner'>
                    <h2>Winner:</h2>
                    {getWinner()}
                </div>
            )}
        </div>
    );
}

export default App;