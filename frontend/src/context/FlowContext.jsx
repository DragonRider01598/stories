import React, { createContext, useState, useEffect } from 'react';
import { useNodesState, useEdgesState } from 'reactflow';

export const FlowContext = createContext();

export const FlowProvider = ({ children }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(() => {
    const savedNodes = localStorage.getItem('nodes');
    return savedNodes ? JSON.parse(savedNodes) : [];
  });
  const [edges, setEdges, onEdgesChange] = useEdgesState(() => {
    const savedEdges = localStorage.getItem('edges');
    return savedEdges ? JSON.parse(savedEdges) : [];
  });
  const [selected, setSelected] = useState({ x: 300, y: 169 });

  useEffect(() => {
    localStorage.setItem('nodes', JSON.stringify(nodes));
  }, [nodes]);

  useEffect(() => {
    localStorage.setItem('edges', JSON.stringify(edges));
  }, [edges]);

  return (
    <FlowContext.Provider
      value={
        {
          nodes,
          setNodes,
          onNodesChange,
          edges,
          setEdges,
          onEdgesChange,
          selected,
          setSelected
        }}>
      {children}
    </FlowContext.Provider>
  );
};