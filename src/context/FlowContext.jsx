import React, { createContext, useContext } from 'react';
import { useNodesState, useEdgesState } from 'reactflow';

export const FlowContext = createContext();

export const useFlow = () => useContext(FlowContext);

export const FlowProvider = ({ children }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  return (
    <FlowContext.Provider
      value={
        {
          nodes,
          setNodes,
          onNodesChange,
          edges,
          setEdges,
          onEdgesChange
        }}>
      {children}
    </FlowContext.Provider>
  );
};