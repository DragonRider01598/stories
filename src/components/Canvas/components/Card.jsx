import React, { useContext, useEffect, useState } from 'react';
import { Handle } from 'reactflow';
import { FlowContext } from '../../../context/FlowContext';
import { FaTrash } from 'react-icons/fa';

const Card = (props) => {
  const { id } = props;
  let cardTitle, cardText = '';
  if (props.data) {
    cardText = props.data.cardText;
    cardTitle = props.data.cardTitle;

  }
  const intro = props.type === 'introNode';
  const { setNodes, setEdges } = useContext(FlowContext);
  const [title, setTitle] = useState(cardTitle);
  const [text, setText] = useState(cardText);


  const deleteNode = (nodeId) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
  };

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id
          ? { ...node, data: { cardTitle: title, cardText: text } }
          : node
      )
    )
  }, [text, title, setNodes, id]);

  return (
    <div className="relative max-h-96 py-3 px-6 pr-8 border rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out">
      {!intro && (
        <Handle
          type="target"
          position="top"
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