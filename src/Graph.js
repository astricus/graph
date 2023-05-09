/*eslint require-jsdoc: 0, valid-jsdoc: 0, no-console: 0, max-lines: 0*/
import React from 'react';
// import { JsonTree } from 'react-editable-json-tree';
// import Form from 'react-jsonschema-form';
// import ReactTooltip from 'react-tooltip';
// import { select } from 'd3-selection';
// import { zoom } from 'd3-zoom';
import { toast } from 'react-toastify';
// import defaultConfig from 'react-d3-graph/src/components/graph/graph.config';
import { Graph } from 'react-d3-graph';
// import { select } from 'd3-selection';
import {
  genId,
  generateFormSchema,
  loadDataset,
  setValue,
  tooltipReducer,
} from './utils';
import { isDeepEqual, merge } from 'react-d3-graph/src/utils';
import { connect } from 'react-redux';
import { defaultConfig } from './graph.config';
import ContextMenu from './components/ContextMenu';
import { selectZoom } from './store/settings/settings.selectors';
import { setZoom } from './store/settings/settings.actions';

// import 'react-toastify/dist/ReactToastify.css';
// import './styles.css';

const sandboxData = loadDataset();
const NOT_ALLOWED_PROPERTIES = ['height', 'width'];
const isPropertyDocumented = (k) => !NOT_ALLOWED_PROPERTIES.includes(k);

// eslint-disable-next-line no-undef
// const reactD3GraphVersion = '2.6.0';

/**
 * This is a sample integration of react-d3-graph, in this particular case all the rd3g config properties
 * will be exposed in a form in order to allow on the fly graph configuration.
 * The data and configuration that are initially loaded can be manipulated via queryParameter on this same
 * Sandbox. You can dynamically load different datasets that are under the `data` folder. If you want
 * for instance to load the data and config under the `small` folder you just need to append "?data=small"
 * to the url when accessing the sandbox.
 */
class Sandbox extends React.Component {
  constructor(props) {
    super(props);

    const { config: configOverride, data, fullscreen } = sandboxData;
    const config = Object.assign(defaultConfig, configOverride);
    // TODO: refactor this labelPosition assignment, move to somewhere
    // in generateFormSchema
    if (config.node.labelPosition === null) {
      config.node.labelPosition = '';
    }
    const schemaProps = generateFormSchema(config, '', {});
    const schema = {
      type: 'object',
      properties: schemaProps,
    };
    const uiSchema = {
      ...Object.keys(schemaProps)
        .filter(isPropertyDocumented)
        .reduce(tooltipReducer, schemaProps),
      height: { 'ui:readonly': 'true' },
      width: { 'ui:readonly': 'true' },
      'link.markerWidth': { 'ui:readonly': 'true' },
      'link.markerHeight': { 'ui:readonly': 'true' },
    };

    this.state = {
      config,
      generatedConfig: {},
      schema,
      uiSchema,
      data: {
        id: genId(),
        nodes: [],
        links: [],
      },
      fullscreen: true,
      nodeIdToBeRemoved: null,
      file: null,
      clicked: null,
      rightClicked: null,
      rightClickedPosition: { x: 0, y: 0 },
      link: 'http://localhost:8000',
      search: '',
    };
  }

  componentDidUpdate(prevProps) {
    const { graphData } = this.props;
    // if (currentZoom !== prevProps.currentZoom) {
    //   select('svg').call(zoom.scaleTo, currentZoom);
    // }
    if (graphData !== prevProps.graphData) {
      if (graphData?.nodes?.length > 0 && graphData?.links?.length > 0) {
        this.setState((state) => ({
          ...state,
          data: graphData,
        }));
      } else {
        this.setState((state) => ({
          ...state,
          data: {
            id: genId(),
            nodes: [],
            links: [],
          },
        }));
      }
    }
  }

  removeRightClickedNode = () => {
    if (this.state.rightClicked) {
      this.setState({ ...this.state, rightClicked: null });
    }
  };
  removeRightClickedNodeOnPressure = (event) => {
    if (event.pressure > 0 && this.state.rightClicked) {
      this.setState({ ...this.state, rightClicked: null });
    }
  };

  componentDidMount() {
    document.addEventListener('click', this.removeRightClickedNode);
    document.addEventListener('pointermove', this.removeRightClickedNodeOnPressure);
    const { graphData } = this.props;
    if (graphData?.nodes?.length > 0 && graphData?.links?.length > 0) {
      this.setState((state) => ({
        ...state,
        data: graphData,
      }));
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.removeRightClickedNode);
    document.removeEventListener('pointermove', this.removeRightClickedNodeOnPressure);
  };

  onClickGraph = () => {
    this.setState({ node: null });
    // toast('Clicked the graph');
  };

  onClickNode = (id, node) => {
    // NOTE: below sample implementation for focusAnimation when clicking on node
    this.setState({
      clicked: node,
      data: {
        ...this.state.data,
        focusedNodeId: this.state.data.focusedNodeId !== id ? id : null
      }
    });
  };

  onDoubleClickNode = (id, node) => {
    toast(`Double clicked node ${id} in position (${node.x}, ${node.y})`);
  };

  onRightClickNode = (event, id, node) => {
    event.preventDefault();
    this.setState({
      ...this.state,
      rightClicked: node,
      rightClickedPosition: { x: event.clientX, y: event.clientY },
    });
    // toast(`Right clicked node ${id} in position (${node.x}, ${node.y})`);
  };

  onClickLink = (source, target) => {
    this.setState({ clicked: { source, target } });
    // toast(`Clicked link between ${source} and ${target}`);
  };

  onRightClickLink = (event, source, target) => {
    event.preventDefault();
    toast(`Right clicked link between ${source} and ${target}`);
  };

  onMouseOverNode = (id, node) => {
    // console.info(
    //   `Do something when mouse is over node ${id} in position (${node.x}, ${node.y})`
    // );
  };

  onMouseOutNode = (id, node) => {
    // console.info(
    //   `Do something when mouse is out of node ${id} in position (${node.x}, ${node.y})`
    // );
  };

  onMouseOverLink = (source, target) => {
    // console.info(
    //   `Do something when mouse is over link between ${source} and ${target}`
    // );
  }

  onMouseOutLink = (source, target) => {
    // console.info(
    //   `Do something when mouse is out of link between ${source} and ${target}`
    // );
  }

  onNodePositionChange = (nodeId, x, y) => {
    // console.info(
    //   `Node ${nodeId} is moved to new position. New position is (${x}, ${y}) (x,y)`
    // );
  }

  /**
   * Sets on/off fullscreen visualization mode.
   */
  onToggleFullScreen = () => {
    const fullscreen = !this.state.fullscreen;

    this.setState({ fullscreen });
  };

  /**
   * Called when the graph's zoom changes
   * @param {number} prevZoom Previous zoom level
   * @param {number} newZoom New zoom level
   */
  onZoomChange = (prevZoom, newZoom) => {
    if (prevZoom === newZoom) return;
    this.props.setZoom(newZoom);
    // this.setState({ currentZoom: newZoom });
  };

  /**
   * Play stopped animations.
   */
  restartGraphSimulation = () => this.refs.graph.restartSimulation();

  /**
   * Pause ongoing animations.
   */
  pauseGraphSimulation = () => this.refs.graph.pauseSimulation();

  /**
   * If you have moved nodes you will have them restore theirs positions
   * when you call resetNodesPositions.
   */
  resetNodesPositions = () => this.refs.graph.resetNodesPositions();

  /**
   * Append a new node with some randomness.
   */
  onClickAddNode = () => {
    if (this.state.data.nodes && this.state.data.nodes.length) {
      const maxIndex = this.state.data.nodes.length - 1;
      const minIndex = 0;

      let i = Math.floor(Math.random() * (maxIndex - minIndex + 1) + minIndex),
        nLinks = Math.floor(Math.random() * (5 - minIndex + 1) + minIndex);
      const newNode = `Node ${this.state.data.nodes.length}`;

      this.state.data.nodes.push({ id: newNode });

      while (
        this.state.data.nodes[i] &&
        this.state.data.nodes[i].id &&
        nLinks
      ) {
        this.state.data.links.push({
          source: newNode,
          target: this.state.data.nodes[i].id,
        });

        i++;
        nLinks--;
      }

      this.setState({
        data: this.state.data,
      });
    } else {
      // 1st node
      const data = {
        nodes: [{ id: 'Node 1' }],
        links: [],
      };

      this.setState({ data });
    }
  };

  /**
   * Remove a node.
   */
  onClickRemoveNode = () => {
    if (this.state.data.nodes && this.state.data.nodes.length > 1) {
      const id = this.state.data.nodes[0].id;

      this.state.data.nodes.splice(0, 1);
      const links = this.state.data.links.filter(
        (l) => l.source !== id && l.target !== id
      );
      const data = { nodes: this.state.data.nodes, links };

      this.setState({ data });
    } else {
      toast('Need to have at least one node!');
    }
  };

  _buildGraphConfig = (data) => {
    let config = {},
      schemaPropsValues = {};

    for (let k of Object.keys(data.formData)) {
      // Set value mapping correctly for config object of react-d3-graph
      setValue(config, k, data.formData[k]);
      // Set new values for schema of jsonform
      schemaPropsValues[k] = {};
      schemaPropsValues[k]['default'] = data.formData[k];
    }

    return { config, schemaPropsValues };
  };

  refreshGraph = (data) => {
    const { config, schemaPropsValues } = this._buildGraphConfig(data);

    this.state.schema.properties = merge(
      this.state.schema.properties,
      schemaPropsValues
    );

    this.setState({
      config,
    });
  };

  /**
   * Generate graph configuration file ready to use!
   */
  onSubmit = (data) => {
    const { config } = this._buildGraphConfig(data);

    this.setState({ generatedConfig: config });
  };

  onClickSubmit = () => {
    // Hack for allow submit button to live outside jsonform
    // document.body.querySelector('.invisible-button').click();
  };

  resetGraphConfig = () => {
    const generatedConfig = {};

    const schemaProps = generateFormSchema(defaultConfig, '', {});

    const schema = {
      type: 'object',
      properties: schemaProps,
    };

    this.setState({
      config: defaultConfig,
      generatedConfig,
      schema,
    });
  };

  /**
   * Before removing elements (nodes, links)
   * from the graph data, this function is executed.
   * https://github.com/oxyno-zeta/react-editable-json-tree#beforeremoveaction
   */
  onBeforeRemoveGraphData = (key, keyPath, deep, oldValue) => {
    if (
      keyPath &&
      keyPath[0] &&
      keyPath[0] === 'nodes' &&
      oldValue &&
      oldValue.id
    ) {
      this.setState({
        nodeIdToBeRemoved: oldValue.id,
      });
    }

    return Promise.resolve();
  };

  // onAddFile = (event) => {
  //   const { files } = event.target;
  //   this.setState({ file: files[0] });
  // };

  // onSubmitFile = async () => {
  //   try {
  //     const formData = new FormData();
  //     formData.append('data', this.state.file);
  //     const response = await fetch(`${this.state.link}/load_data`, {
  //       method: 'PUT',
  //       body: formData,
  //     });
  //     const data = await response.json();
  //     this.setState({ data });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // onPlus = async () => {
  //   try {
  //     const response = await fetch(`${this.state.link}/plus`, {
  //       method: 'POST',
  //     });
  //     const data = await response.json();
  //     this.setState({ data });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // onMinus = async () => {
  //   try {
  //     const response = await fetch(`${this.state.link}/minus`, {
  //       method: 'POST',
  //     });
  //     const data = await response.json();
  //     this.setState({ data });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // onSubmitSearch = async () => {
  //   try {
  //     const { link, search } = this.state;
  //     const response = await fetch(`${link}/unfold?concept=${search}`, {
  //       method: 'POST',
  //     });
  //     const data = await response.json();
  //     this.setState({ data });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // onSubmitExpand = async () => {
  //   try {
  //     const { link, search } = this.state;
  //     const response = await fetch(`${link}/expand?concept=${search}`, {
  //       method: 'POST',
  //     });
  //     const data = await response.json();
  //     this.setState({ data });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  /**
   * Update graph data each time an update is triggered
   * by JsonTree
   * @param {Object} data update graph data (nodes and links)
   */
  // onGraphDataUpdate = (data) => {
  //   const removedNodeIndex = data.nodes.findIndex((n) => !n);

  //   let removedNodeId = null;

  //   if (removedNodeIndex !== -1 && this.state.nodeIdToBeRemoved) {
  //     removedNodeId = this.state.nodeIdToBeRemoved;
  //   }

  //   const nodes = data.nodes.filter(Boolean);
  //   const isValidLink = (link) =>
  //     link && link.source !== removedNodeId && link.target !== removedNodeId;
  //   const links = data.links.filter(isValidLink);

  //   this.setState({
  //     data: {
  //       id: data.id,
  //       links,
  //       nodes,
  //     },
  //   });
  // };

  onInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  copyConfigToClipboard = () => {
    if (
      !this.state.generatedConfig ||
      !Object.keys(this.state.generatedConfig).length
    ) {
      return;
    }

    try {
      navigator.clipboard
        .writeText(JSON.stringify(this.state.generatedConfig, null, 2))
        .then(() => {
          toast('✔️ Configuration copied to clipboard!');
        })
        .catch(console.error);
    } catch (error) {
      console.error(error);
    }
  };

  // componentDidMount() {
  //   toast.configure();
  // }

  renderNodeValues = () => {
    const { clicked } = this.state;
    // console.log(clicked);
    const filteredKeys = ['highlighted', 'x', 'y', 'vx', 'vy'];
    if (clicked) {
      return Object.keys(clicked)
        .filter((item) => !filteredKeys.includes(item))
        .flatMap((key) => {
          if (typeof clicked[key] !== 'object') {
            return (
              <p className='mb-1'>
                {key}: {clicked[key]}
              </p>
            );
          } else {
            if (Array.isArray(clicked[key])) {
              return (
                <p className='mb-1'>
                  {key}: [<br />
                  {clicked[key].map((item, index) => (
                    <>
                      <span>
                        {index}: {item}
                      </span>
                      <br />
                    </>
                  ))}
                  ]
                </p>
              );
            } else return <p />;
          }
        });
    } else {
      return <p>The node is not selected</p>;
    }
  };

  render() {
    // This does not happens in this sandbox scenario running time, but if we set staticGraph config
    // to true in the constructor we will provide nodes with initial positions
    const data = {
      id: this.state.data.id,
      nodes: this.state.data.nodes,
      links: this.state.data.links,
      focusedNodeId: this.state.data.focusedNodeId,
    };

    const graphProps = {
      id: 'graph',
      data,
      config: {
        ...this.state.config,
        currentZoom: this.props.currentZoom,
      },
      onClickNode: this.onClickNode,
      onDoubleClickNode: this.onDoubleClickNode,
      onRightClickNode: this.onRightClickNode,
      onClickGraph: this.onClickGraph,
      onClickLink: this.onClickLink,
      onRightClickLink: this.onRightClickLink,
      onMouseOverNode: this.onMouseOverNode,
      onMouseOutNode: this.onMouseOutNode,
      onMouseOverLink: this.onMouseOverLink,
      onMouseOutLink: this.onMouseOutLink,
      onNodePositionChange: this.onNodePositionChange,
      onZoomChange: this.onZoomChange,
    };
    graphProps.config = Object.assign({}, graphProps.config, {
      height: window.innerHeight,
      width: window.innerWidth,
    });

    return (
      <div className='mt-16'>
        <Graph key={data.id} ref='graph' {...graphProps} />
        <ContextMenu
          node={this.state.rightClicked}
          x={this.state.rightClickedPosition.x}
          y={this.state.rightClickedPosition.y}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  graphData: state.data.present.graph,
  currentZoom: selectZoom,
});

const mapDispatchToProps = {
  setZoom,
};

export default connect(mapStateToProps, mapDispatchToProps)(Sandbox);
