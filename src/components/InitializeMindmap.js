import React, { Component } from 'react';
import { dummyMindmapNodes } from '../assets/data/dummyData';
import Mindmap from './MindMap/Mindmap';
import axios from 'axios';

const url = "https://bachelor-mindmap-default-rtdb.firebaseio.com/mindmapNodes.json"

class InitializeMindmap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mindmapId: "42", // props.mindmapId
      loading: true,
      nodes: dummyMindmapNodes
    }
  }

  componentDidMount() {
    axios.get(url) // Timeout 1 sec for sake of developing
      .then(response => {
        this.setState(
          {
            nodes: Object.values(response.data),
            loading: false
          }
        )
      })
      .catch(error => {
        console.log(error);
        this.runWithDummyData() // For sake of developing
      })
  }

  /* Use dummy data for sake of developing */
  runWithDummyData = () => {
    this.setState({loading: false})
  }

  render() {
    console.log(this.state.nodes)
    const loadingAnimation = <p>Loading...</p>

    return (
      this.state.loading ?
        loadingAnimation : this.state.nodes ?
        <Mindmap nodes={this.state.nodes} /> :
          <p>Could not load data</p>
    );
  }
}

export default InitializeMindmap;