import type { INodes } from '@gdi/store-base';
import { selectors, useDispatch, useSelector } from '@gdi/store-base';
import { useEffect } from 'react';
import { Flow } from './Flow';
import { useNodes } from './Flow.hooks';

export type FlowContainerProps = {
  nodes: INodes;
  nodesUrl?: string;
};

export function FlowContainer(props: FlowContainerProps) {
  const { nodes: allNodes, nodesUrl } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'BOOTSTRAP_FLOW',
      nodes: allNodes,
    });
  }, [nodesUrl]);

  const data = useSelector(selectors.base.$flow);

  const { nodes, edges, callbacks } = useNodes(data as any);

  return <Flow nodes={nodes} edges={edges} callbacks={callbacks} />;
}

export default FlowContainer;
