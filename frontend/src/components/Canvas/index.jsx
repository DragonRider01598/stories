import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactFlow, { Controls, Background, addEdge } from 'reactflow';
import 'reactflow/dist/style.css';
import { FlowProvider, FlowContext } from '../../context/FlowContext';
import { AuthContext } from '../../context/AuthContext';
import Card from './components/Card';
import Navbar from '../Navbar';

const nodeTypes = {
  introNode: (nodeProps) => <Card {...nodeProps} />,
  buttonNode: (nodeProps) => <Card {...nodeProps} />
};

const Canvas = () => {
  return (
    <FlowProvider>
      <FlowCanvas />
    </FlowProvider>
  );
};

const FlowCanvas = () => {
  const { nodes, setNodes, onNodesChange, edges, setEdges, onEdgesChange, selected, setSelected } = useContext(FlowContext);
  const [showOptions, setShowOptions] = useState(false);
  const { isLogged } = useContext(AuthContext);
  const navigate = useNavigate();

  const onConnect = (params) => {
    setEdges((eds) => addEdge(params, eds));
  };

  const addNode = (additionalProps = {}) => {
    const newNode = nodes.length === 0 ? {
      id: `0`,
      type: 'introNode',
      position: { x: 300, y: 169 },
      intro: true,
    } : {
      id: `${nodes.length + 1}`,
      type: 'buttonNode',
      position: { x: selected.x + 200, y: selected.y + 100 },
      ...additionalProps,
    };
    setSelected((positions) => ({ x: positions.x + 100, y: positions.y + 100 }));
    setNodes((nds) => nds.concat(newNode));
  };

  const onDownload = () => {
    const data = {
      nodes: nodes,
      edges: edges,
    };

    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${Date.now()}.story`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFileLoad = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      try {
        const parsedData = JSON.parse(content);
        setNodes(parsedData.nodes.map((node) => ({
          ...node,
        })));
        setEdges(parsedData.edges);
      } catch (error) {
        console.error("Failed to parse file content:", error);
      }
    };
    reader.readAsText(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      handleFileLoad(file);
    }
  };

  const onLoad = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.story';
    input.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        handleFileLoad(file);
      }
    };
    input.click();
  };

  const onUpload = async () => {
    if (isLogged) {
      let title = prompt('Please provide a title to your story');
      let data = {
        nodes: nodes.map((node) => ({
          id: node.id,
          data: node.data,
        })),
        edges: edges.map(({ source, target, id }) => ({
          source,
          target,
          id,
        })),
      };
      data['title'] = title;

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/story/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
      });

      if (response.ok) {
        alert('Story was successfully uploaded');
      } else {
        let obj = await response.json();
        alert(obj.message);
      }
    } else {
      alert('You are not logged in');
    }
  };

  const onRead = () => {
    let obj = {
      nodes: nodes.map((node) => ({
        id: node.id,
        data: node.data,
      })),
      edges: edges.map(({ source, target, id }) => ({
        source,
        target,
        id,
      })),
    };

    navigate('/read', { state: { title: "Preview", nodes: obj.nodes, edges: obj.edges } });
  }

  return (
    <div
      className="relative w-screen h-screen overflow-hidden bg-gray-900"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <Navbar />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        snapToGrid={true}
        snapGrid={[20, 20]}
        defaultViewport={{ x: 0, y: 0, zoom: 1.5 }}
      >
        <Controls className="top-1 h-0" />
        <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2">
          <button
            onClick={() => setShowOptions(!showOptions)}
            className="px-6 py-2 bg-gray-800 text-white rounded shadow-lg hover:bg-gray-700 transition duration-200 ease-in-out"
          >
            Options
          </button>

          {/* Buttons are hidden by default on mobile and shown when showOptions is true */}
          <div className={`${showOptions ? 'flex' : 'hidden'} flex-col space-y-2`}>
            <button
              onClick={() => addNode()}
              className="px-6 py-2 bg-teal-600 text-white rounded shadow-lg hover:bg-teal-700 transition duration-200 ease-in-out"
            >
              Add Node
            </button>
            <button
              onClick={onDownload}
              className="px-6 py-2 bg-green-600 text-white rounded shadow-lg hover:bg-green-700 transition duration-200 ease-in-out"
            >
              Download Story
            </button>
            <button
              onClick={onLoad}
              className="px-6 py-2 bg-yellow-600 text-white rounded shadow-lg hover:bg-yellow-700 transition duration-200 ease-in-out"
            >
              Load Story
            </button>
            <button
              onClick={onUpload}
              className="px-6 py-2 bg-red-600 text-white rounded shadow-lg hover:bg-red-700 transition duration-200 ease-in-out"
            >
              Upload Story
            </button>
            <button
              onClick={onRead}
              className="px-6 py-2 bg-blue-600 text-white rounded shadow-lg hover:bg-blue-700 transition duration-200 ease-in-out"
            >
              Preview
            </button>
          </div>
        </div>
        <Background />
      </ReactFlow>
    </div>
  );
};

export default Canvas;