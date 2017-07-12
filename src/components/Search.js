import React from 'react';
import SearchTable from './SearchTable';
import FontAwesome from 'react-fontawesome';
import '../styles/search.scss'

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      searchDjName: props.params.query || '',
      isSearching: false,
    }
  }

  componentWillMount() {
    if (this.props.params.query) {
      this.fetchDjData(this.props.params.query);
    }
  }

  fetchDjData(djName) {
    this.setState({ ...this.state, isSearching: true });
    fetch('http://setlistspy.com/setlistSearch', {
      method: 'POST',
      body: JSON.stringify(djName),
      headers: { 'Content-Type': 'application/json' },
    })
    .then(r => r.json())
    .then((data) => {
      this.setState({
        ...this.state,
        isSearching: false,
        data: data,
      });
    });
  }

  render() {
    return (
      <div id="main">
        <h1>setspy.fm</h1>
        <img id="logo" src={require('./logo.jpg')}></img><br/>
        <h4>Discover music played, recorded, & remixed by your favorite DJs & artists.</h4>
          <input type="text" onChange={e => this.setState({ ...this.state, searchDjName: e.target.value })} disabled={this.state.isSearching}/>
          <button onClick={e => this.fetchDjData(this.state.searchDjName)} disabled={this.state.isSearching}>
            <FontAwesome name={ this.state.isSearching ? 'spinner' : 'search' } spin={this.state.isSearching} />
          </button>
        { (this.state.data.dj_tracks) ? <SearchTable data={this.state.data} /> : <div></div> }
      </div>
    );
  }
}
