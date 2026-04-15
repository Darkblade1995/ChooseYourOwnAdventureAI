import { useState, useEffect } from 'react';

function StoryGame({ story, onNewStory }) {
    const [currentNodeId, setCurrentNodeId] = useState(null);
    const [currentNode, setCurrentNode] = useState(null);
    const [options, setOptions] = useState([]);
    const [isEnding, setIsEnding] = useState(false);
    const [isWinningEnding, setIsWinningEnding] = useState(false);

    useEffect(() => {
        if (story && story.root_node) {
            setCurrentNodeId(story.root_node.id);
        }
    }, [story]);

    useEffect(() => {
        if (currentNodeId && story && story.all_nodes) {
            const node = story.all_nodes[currentNodeId];

            if (!node) return;

            setCurrentNode(node);
            setIsEnding(node.is_ending);
            setIsWinningEnding(node.isWinning_ending);

            if (!node.is_ending && node.options?.length > 0) {
                setOptions(node.options);
            } else {
                setOptions([]);
            }
        }
    }, [currentNodeId, story]);

    const chooseOption = (optionId) => {
        setCurrentNodeId(optionId);
    };

    const restartStory = () => {
        if (story && story.root_node) {
            setCurrentNodeId(story.root_node.id);
        }
    };

    return (
        <div className="story-game">
            <header className="story-header">
                <h2>{story?.title}</h2>
            </header>

            <div className="story-content">
                {currentNode && (
                    <div className="story-node">
                        <p>{currentNode.content}</p>

                        {isEnding ? (
                            <div className="story-ending">
                                <h3>
                                    {isWinningEnding
                                        ? "Congratulations"
                                        : "The End"}
                                </h3>
                                <p>
                                    {isWinningEnding
                                        ? "You reached a winning ending"
                                        : "Your adventure has ended."}
                                </p>
                            </div>
                        ) : (
                            <div className="story-options">
                                <h3>What will you do?</h3>
                                <div className="option-list">
                                    {options.map((option, index) => (
                                        <button
                                            key={index}
                                            onClick={() =>
                                                chooseOption(option.node_id)
                                            }
                                            className="option-btn"
                                        >
                                            {option.text}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="story-controls">
                <button onClick={restartStory} className="reset-btn">
                    Restart story
                </button>
            </div>

            {onNewStory && (
                <button onClick={onNewStory} className="new-story-btn">
                    New Story
                </button>
            )}
        </div>
    );
}

export default StoryGame;