import ReactFlow, {
  Controls,
  Edge,
  MiniMap,
  Node,
  OnConnect,
  OnEdgesChange,
  OnInit,
  OnNodesChange,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Wrapper, controlsStyle, minimapStyle } from './Flow.style';
import { nodeTypes } from './nodes';
import FlowEditor from './_parts/FlowEditor/FlowEditor';

export type FlowProps = {
  nodes: Node[];
  edges: Edge[];
  callbacks: {
    onConnect?: OnConnect;
    onInit?: OnInit;
    onNodesChange?: OnNodesChange;
    onEdgesChange?: OnEdgesChange;
    onClick: (node: any) => void;
    onDoubleClick: (node: any) => void;
  };
};

export function Flow(props: FlowProps) {
  const { nodes, edges, callbacks } = props;

  return (
    <Wrapper className='Flow-wrapper' data-testid='Flow-wrapper'>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        proOptions={{ hideAttribution: true }}
        onConnect={callbacks.onConnect}
        onInit={callbacks.onInit}
        onNodesChange={callbacks.onNodesChange}
        onEdgesChange={callbacks.onEdgesChange}
        onNodeClick={(event, node) => callbacks.onClick(node)}
        onNodeDoubleClick={(event, node) => callbacks.onDoubleClick(node)}
        nodeTypes={nodeTypes as any}
        fitView
      >
        <MiniMap style={minimapStyle} zoomable pannable />
        <Controls style={controlsStyle} />
      </ReactFlow>
      {/* <FlowEditor onChange={() => {}} /> */}
    </Wrapper>
  );
}

export default Flow;
