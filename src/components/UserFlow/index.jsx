import React, { useState } from 'react';

const UserFlow = ({ data }) => {
  const [currentNode, setCurrentNode] = useState(data.nodes[0]);
  const [history, setHistory] = useState([data.nodes[0]]);

  const handleButtonClick = (buttonNode) => {
    setCurrentNode(buttonNode);
    setHistory(prevHistory => [...prevHistory, buttonNode]);
  };

  const handleBackClick = () => {
    setHistory(prevHistory => {
      if (prevHistory.length > 1) {
        const newHistory = prevHistory.slice(0, -1);
        setCurrentNode(newHistory[newHistory.length - 1]);
        return newHistory;
      }
      return prevHistory;
    });
  };

  const handleRefreshClick = () => {
    setCurrentNode(data.nodes[0]);
    setHistory([data.nodes[0]]);
  };

  const connectedEdges = data.edges.filter(edge => edge.source === currentNode.id);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white border-2 border-gray-300 rounded-lg shadow-lg mb-6 w-96 h-96 flex flex-col p-4">
        <h1 className="text-xl font-bold mb-4 text-center">{currentNode.data.cardTitle}</h1>
        <div className="flex-grow overflow-y-auto">
          <div className="text-base max-h-40" dangerouslySetInnerHTML={{ __html: currentNode.data.cardText }} />
        </div>
        <div className="grid grid-cols-1 gap-1 mt-2">
          {connectedEdges.map(edge => {
            const buttonNode = data.nodes.find(node => node.id === edge.target);
            return (
              <button
                key={buttonNode.id}
                className="bg-blue-500 text-white text-sm py-1 rounded-lg shadow hover:bg-blue-600 transition duration-200"
                onClick={() => handleButtonClick(buttonNode)}
              >
                {buttonNode.data.cardTitle}
              </button>
            );
          })}
        </div>
        <div className="mt-1">
          <div className="flex justify-between gap-1">
            <button
              className="w-full text-sm bg-gray-500 text-white py-2 rounded-lg shadow hover:bg-gray-600 transition duration-200"
              onClick={handleBackClick}
              disabled={history.length <= 1}
            >
              Back
            </button>
            <button
              className="w-full text-sm bg-red-500 text-white py-2 rounded-lg shadow hover:bg-red-600 transition duration-200"
              onClick={handleRefreshClick}
            >
              Restart
            </button>
          </div>
        </div>
      </div>
    </div>
  );

};

export default UserFlow;