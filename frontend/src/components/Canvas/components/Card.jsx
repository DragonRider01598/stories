import React, { useContext, useEffect, useState , useCallback} from 'react';
import { Handle } from 'reactflow';
import { FlowContext } from '../../../context/FlowContext';
import { FaTrash } from 'react-icons/fa';

const Card = (props) => {
  const { id } = props;
  const intro = props.type === 'introNode';
  const { nodes, setNodes, edges, setEdges, setSelected } = useContext(FlowContext);

  let cardTitle = props.data?.cardTitle || '';
  let cardText = props.data?.cardText || '';
  
  const [title, setTitle] = useState(cardTitle);
  const [text, setText] = useState(cardText);

  const deleteNode = (nodeId) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
  };

  const deleteConnectedEdges = (handleType) => {
    setEdges((eds) => eds.filter((edge) => {
      if (handleType === 'top') {
        return edge.target !== id;
      } else {
        return edge.source !== id;
      }
    }));
  };

  const handleBottomEdgeLimit = useCallback(() => {
    setEdges((eds) => {
      const connectedEdges = eds.filter((edge) => edge.source === id);
      console.log(connectedEdges)
      if (connectedEdges.length > 4) {
        return eds.filter((edge) => edge.source !== id || connectedEdges.indexOf(edge) < 4);
      }
      return eds;
    });
  }, [setEdges, id]);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id
          ? { ...node, data: { cardTitle: title, cardText: text } }
          : node
      )
    );
  }, [text, title, setNodes, id, setSelected]);

  useEffect(() => {
    handleBottomEdgeLimit();
  }, [edges, id, handleBottomEdgeLimit]);

  return (
    <div className="relative max-h-96 py-3 px-6 pr-8 border rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out">
      {!intro && (
        <Handle
          type="target"
          position="top"
          onClick={() => deleteConnectedEdges('top')}
          style={{
            width: 20,
            height: 20,
            borderRadius: '50%',
            backgroundColor: '#AFAFAF',
            zIndex: -2,
            position: 'absolute',
            top: -10,
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        />
      )}
      <Handle
        type="source"
        position="bottom"
        onClick={() => deleteConnectedEdges('bottom')}
        style={{
          width: 20,
          height: 20,
          borderRadius: '50%',
          backgroundColor: '#AFAFAF',
          zIndex: -2,
          position: 'absolute',
          bottom: -10,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      />
  
      <div
        className="w-full min-w-60 max-w-96 max-h-16 min-h-8 outline-none break-words font-semibold text-lg text-gray-900 border-b border-gray-300 pb-2 mb-2 overflow-y-auto nodrag cursor-text z-10"
        contentEditable
        suppressContentEditableWarning
        onFocus={(e) => {
          if (e.target.textContent === (intro ? 'Enter your Story Title here' : 'Enter your Title here')) {
            e.target.textContent = '';
          }
  
          const currentNode = nodes.find((n) => n.id === id);
          if (currentNode) {
            setSelected({ x: currentNode.position.x, y: currentNode.position.y });
          }
        }}
        onBlur={(e) => {
          const text = e.target.textContent.trim();
          setTitle(text);
          if (!text) {
            e.target.textContent = (intro ? 'Enter your Story Title here' : 'Enter your Title here');
          }
        }}
      >
        {title || (intro ? 'Enter your Story Title here' : 'Enter your Title here')}
      </div>
  
      <div
        className="w-full min-w-60 max-w-96 max-h-80 min-h-16 outline-none break-words text-gray-700 mt-1 text-sm leading-relaxed overflow-y-auto nodrag cursor-text"
        contentEditable
        suppressContentEditableWarning
        onFocus={(e) => {
          if (e.target.textContent === 'Add your text here...') {
            e.target.textContent = '';
          }
  
          const currentNode = nodes.find((n) => n.id === id);
          if (currentNode) {
            setSelected({ x: currentNode.position.x, y: currentNode.position.y });
          }
        }}
        onBlur={(e) => {
          const text = e.target.innerHTML;
          setText(text);
          if (!text) {
            e.target.textContent = 'Add your text here...';
          }
        }}
        dangerouslySetInnerHTML={{ __html: text || 'Add your text here...' }}
      >
      </div>
  
      {!intro && (
        <div
          onClick={() => deleteNode(id)}
          className="absolute top-6 right-2 cursor-pointer"
        >
          <FaTrash className="text-red-600 hover:text-red-700 transition duration-200" />
        </div>
      )}
    </div>
  );
};

export default Card;