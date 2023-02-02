import React, { useCallback } from 'react';
import ReactFlow,
{
  Background,
  Connection, 
  ConnectionMode, 
  Controls,  
  addEdge, 
  useEdgesState, 
  useNodesState 
} from 'reactflow';
import { zinc } from "tailwindcss/colors";
import 'reactflow/dist/style.css';
import './global.css'
import ContetntSquare from './components/nodes/content-square';
import DefaultEdge from './components/edges/Default-edge';
import * as Toolbar from '@radix-ui/react-toolbar';
import ButtonSquare from './components/nodes/buttons-square';
import ConditionSquare from './components/nodes/conditions-square';
import ConnectionSquare from './components/nodes/connection-square';
import RandomSquare from './components/nodes/randon-square';
import DelaySquare from './components/nodes/delay-square';
import IntegrationSquare from './components/nodes/integration-square';
import {AiFillAlert, AiOutlineArrowsAlt, AiOutlineClockCircle} from 'react-icons/ai'
import {BiBookContent} from 'react-icons/bi'
import {BsLightningChargeFill, BsArrowLeftRight, BsArrowsAngleContract, BsGraphUp} from 'react-icons/bs'
import ActionSquare from './components/nodes/action-square';
/*
  Notes: 
  Nodes = Tudo que vai aparecer em tela(Pode ter seu próprio estilo e configuração),
  Edges = As conexões(As linhas de conexão, também possuindo suas próprias configurações)
*/

const NODE_TYPES = {
  square: ContetntSquare,
  button: ButtonSquare,
  action: ActionSquare,
  condition: ConditionSquare,
  connection: ConnectionSquare,
  random: RandomSquare,
  delay: DelaySquare,
  integration: IntegrationSquare,
}

const EDGE_TYPES = {
  default: DefaultEdge,
}

// data = transporta informações da aplicação até os Nodes
const INITIAL_NODES = [
  {
    id: crypto.randomUUID(),
    type: 'square',
    position: {
      x: 200,
      y: 400,
    },
    data: {}
  },
  {
    id: crypto.randomUUID(),
    type: 'square',
    position: {
      x: 1000,
      y: 400,
    },
    data: {}
  },
]

function App() {
  const [edges, setEdges, onEdgesChanges] = useEdgesState([]);
  const [nodes, setNodes, onNodesChanges] = useNodesState(INITIAL_NODES);

  const onConnect = useCallback((connection) => {
    return setEdges(edges => addEdge(connection, edges))
  }, [])

  function addSquareNode(type) {
    setNodes(nodes => [
      ...nodes,
      {
        id: crypto.randomUUID(),
        type: type,
        position: {
          x: 750,
          y: 350,
        },
        data: {}
      }
    ])
  }
 
  return (
    <div className='w-screen h-screen'>
      
      <ReactFlow 
      nodeTypes={NODE_TYPES}
      edgeTypes={EDGE_TYPES}
      nodes={nodes}
      edges={edges}
      onEdgesChange={onEdgesChanges}
      onConnect={onConnect}
      onNodesChange={onNodesChanges}
      connectionMode={ConnectionMode.Loose}
      defaultEdgeOptions={{
        type: 'default'
      }}
      >
        <Background
          gap={1}
          size={10}
          color={zinc[300]}
        />
        <Controls />
      </ReactFlow>
      <Toolbar.Root className='fixed flex top-20 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-lg border border-zinc-300 px-8 h-24 w-4/6 overflow-hidden'>
        <Toolbar.Button
        className='h-14 w-20 mr-6  rounded-lg bg-green-300  mt-4'
        onClick={() => addSquareNode('square')}
        >
          Conteúdo 
          <BiBookContent className='ml-8'/>
        </Toolbar.Button>
        <Toolbar.Button
        className='h-14 w-20 mb-2 mr-6 bg-green-300 mt-4 rounded-lg'
        onClick={() => addSquareNode('button')}
        >
          Botões
          <AiFillAlert className='ml-7'/>
        </Toolbar.Button>
        <Toolbar.Button
        className='h-14 w-20 mr-6 bg-green-300 mt-4 rounded-lg houver:mt-4'
        onClick={() => addSquareNode('action')}
        >
          Ação
          <BsLightningChargeFill className='ml-7'/>
        </Toolbar.Button>
        <Toolbar.Button
        className='h-14 w-20 mr-6 bg-green-300 mt-4 rounded-lg houver:mt-4'
        onClick={() => addSquareNode('condition')}
        >
          <p>Condição</p>
          <BsArrowLeftRight className='ml-7'/>
        </Toolbar.Button>
        <Toolbar.Button
        className='h-14 w-20 mr-6 bg-green-300 mt-4 rounded-lg houver:mt-4'
        onClick={() => addSquareNode('connection')}
        >
          Conexão
          <BsArrowsAngleContract className='ml-7'/>
          
        </Toolbar.Button>
        <Toolbar.Button
        className='h-14 w-28 mr-6 bg-green-300 mt-4 rounded-lg houver:mt-4'
        onClick={() => addSquareNode('random')}
        >
          Randomização
          <AiOutlineArrowsAlt className='ml-11'/>
        </Toolbar.Button>
        <Toolbar.Button
        className='h-14 w-20 mr-6 bg-green-300 mt-4 rounded-lg houver:mt-4'
        onClick={() => addSquareNode('delay')}
        >
          Delay
          <AiOutlineClockCircle className='ml-8'/>
        </Toolbar.Button>
        <Toolbar.Button
        className='h-14 w-20 mr-6 bg-green-300 mt-4 rounded-lg houver:mt-4'
        onClick={() => addSquareNode('integration')}
        >
          Integração
          <BsGraphUp className='ml-7'/>
        </Toolbar.Button>
      </Toolbar.Root>
      
    </div>
  );
}

export default App;