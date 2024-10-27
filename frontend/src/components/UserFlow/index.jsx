import React, { useState } from 'react';
import Navbar from "../Navbar";

const data = {
  "nodes": [
    {
      "id": "0",
      "data": {
        "cardTitle": "The Heart of the Forest",
        "cardText": "You find yourself standing at the edge of a dense, ancient forest. Sunlight filters through the canopy, casting eerie shadows on the forest floor. A faint, otherworldly hum emanates from deep within the woods, drawing you closer. As you step into the forest, you can't shake the feeling that something extraordinary awaits."
      },
    },
    {
      "id": "2",
      "data": {
        "cardTitle": "Explore the Forest",
        "cardText": "You follow the hum deeper into the forest. The trees grow taller and the undergrowth becomes thicker. Strange, glowing mushrooms illuminate your path, and unfamiliar creatures rustle in the bushes."
      },
    },
    {
      "id": "3",
      "data": {
        "cardTitle": "Turn Back",
        "cardText": "<p data-sourcepos=\"63:1-63:172\">You hesitate and decide to return to the safety of the familiar. As you turn away from the forest, you feel a sense of relief. However, a part of you yearns for adventure.</p><p data-sourcepos=\"65:1-65:152\"><strong>Ending:</strong> You return to your ordinary life, but the memory of the forest haunts you. You wonder what might have happened if you had chosen to explore.</p>"
      },
    },
    {
      "id": "4",
      "data": {
        "cardTitle": "Follow the Hum",
        "cardText": "The hum grows louder as you press on. Eventually, it leads you to a hidden clearing. In the center, a towering, ancient tree stands. Its branches are covered in strange, shimmering crystals. As you approach, the tree seems to pulse with energy."
      },
    },
    {
      "id": "5",
      "data": {
        "cardTitle": "Find a Safe Place",
        "cardText": "You find a sheltered spot and rest for a while. As you do, you hear a faint rustling in the bushes. A small, furry creature emerges, its eyes filled with curiosity."
      },
    },
    {
      "id": "6",
      "data": {
        "cardTitle": "Touch the Tree",
        "cardText": "<p data-sourcepos=\"30:1-30:238\">As you touch the crystals, a surge of energy courses through your body. You feel a connection to the tree, as if it's part of you. A vision flashes before your eyes: a future where the forest is protected and the creatures within thrive.</p><p data-sourcepos=\"32:1-32:117\"><strong>Ending:</strong> You have become the guardian of the forest, tasked with protecting its secrets and ensuring its survival.</p>"
      },
    },
    {
      "id": "7",
      "data": {
        "cardTitle": "Observe from a Distance",
        "cardText": "<p data-sourcepos=\"36:1-36:172\">You watch the tree from afar, fascinated by its beauty. However, as you do so, a dark figure emerges from the shadows. It is a sinister creature, drawn to the tree's power.</p><p data-sourcepos=\"38:1-38:140\"><strong>Ending:</strong> The creature attacks, seeking to drain the tree of its energy. You are powerless to stop it, and the forest falls into darkness.</p>"
      },
    },
    {
      "id": "8",
      "data": {
        "cardTitle": "Befriend the Creature",
        "cardText": "<p data-sourcepos=\"51:1-51:202\">The creature, a magical fox, becomes your guide. It leads you to a hidden village deep within the forest. The villagers are peaceful and welcoming, and they share their knowledge of the forest with you.</p><p data-sourcepos=\"53:1-53:134\"><strong>Ending:</strong> You live a peaceful life in the village, learning the ways of the forest and becoming a respected member of the community.</p>"
      },
    },
    {
      "id": "9",
      "data": {
        "cardTitle": "Leave it Alone",
        "cardText": "<p data-sourcepos=\"57:1-57:151\">You ignore the creature and continue your journey. However, the forest becomes more dangerous. You encounter hostile creatures and treacherous terrain.</p><p data-sourcepos=\"59:1-59:181\"><strong>Ending:</strong> You are lost in the forest, unable to find your way back. The darkness and solitude drive you mad, and you become one with the forest, forever trapped within its depths.</p>"
      },
    }
  ],
  "edges": [
    {
      "source": "0",
      "target": "3",
      "id": "reactflow__edge-0-3"
    },
    {
      "source": "0",
      "target": "2",
      "id": "reactflow__edge-0-2"
    },
    {
      "source": "2",
      "target": "4",
      "id": "reactflow__edge-2-4"
    },
    {
      "source": "2",
      "target": "5",
      "id": "reactflow__edge-2-5"
    },
    {
      "source": "4",
      "target": "6",
      "id": "reactflow__edge-4-6"
    },
    {
      "source": "4",
      "target": "7",
      "id": "reactflow__edge-4-7"
    },
    {
      "source": "5",
      "target": "8",
      "id": "reactflow__edge-5-8"
    },
    {
      "source": "5",
      "target": "9",
      "id": "reactflow__edge-5-9"
    }
  ]
};

const UserFlow = () => {
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
    <div className='h-screen w-screen'>
      <Navbar className="fixed w-full"/>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white border-2 border-gray-300 rounded-lg shadow-lg mb-6 w-full max-w-xl h-full md:max-w-lg lg:max-w-2xl md:h-auto flex flex-col p-6 lg:p-8">
        <h1 className="text-2xl lg:text-3xl font-bold mb-4 text-center">{currentNode.data.cardTitle}</h1>

        <div className="flex-grow overflow-y-auto max-h-64 md:max-h-80 lg:max-h-96 mb-6">
          <div className="text-lg lg:text-xl" dangerouslySetInnerHTML={{ __html: currentNode.data.cardText }} />
        </div>

        <div className="grid grid-cols-1 gap-3 mt-4 lg:grid-cols-2 lg:gap-4">
          {connectedEdges.map(edge => {
            const buttonNode = data.nodes.find(node => node.id === edge.target);
            return (
              <button
                key={buttonNode.id}
                className="bg-blue-500 text-white text-sm lg:text-base py-2 rounded-lg shadow hover:bg-blue-600 transition duration-200"
                onClick={() => handleButtonClick(buttonNode)}
              >
                {buttonNode.data.cardTitle}
              </button>
            );
          })}
        </div>

        <div className="mt-6 lg:mt-8">
          <div className="flex flex-col lg:flex-row justify-between gap-3 lg:gap-6">
            <button
              className="w-full text-sm lg:text-base bg-gray-500 text-white py-3 rounded-lg shadow hover:bg-gray-600 transition duration-200"
              onClick={handleBackClick}
              disabled={history.length <= 1}
            >
              Back
            </button>
            <button
              className="w-full text-sm lg:text-base bg-red-500 text-white py-3 rounded-lg shadow hover:bg-red-600 transition duration-200"
              onClick={handleRefreshClick}
            >
              Restart
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
    
  );
};

export default UserFlow;