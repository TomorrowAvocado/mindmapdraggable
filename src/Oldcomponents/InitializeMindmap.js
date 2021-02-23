import React, { Component } from 'react';
import { dummyMindmapNodes } from '../assets/data/dummyData';
import Canvas from './Canvas';
import axios from 'axios';

const url = "http://localhost:8080/api/mindmaps/"

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
    axios.get(url + this.state.mindmapId, {timeout: 1000}) // Timeout 1 sec for sake of developing
      .then(response => {
        this.setState(
          {
            nodes: response.data,
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

    const loadingAnimation = <p>Loading...</p>

    return (
      this.state.loading ?
        loadingAnimation :
        <Canvas nodes={this.state.nodes} />
    );
  }
}

export default InitializeMindmap;