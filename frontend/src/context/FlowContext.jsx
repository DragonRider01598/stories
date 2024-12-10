import React, { createContext, useState } from 'react';
import { useNodesState, useEdgesState } from 'reactflow';

export const FlowContext = createContext();

export const FlowProvider = ({ children }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selected, setSelected] = useState({ x: 300, y: 169 });

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