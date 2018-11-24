import React from 'react';
import SearchResults from './SearchResults';
import FontAwesome from 'react-fontawesome';
import '../styles/search.scss'

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      searchDjName: props.params.query || '',
      isSearching: false,
      results: false,
    }
  }

  componentWillMount() {
    if (this.props.params.query) {
      this.fetchDjData(this.props.params.query);
    }
  }

  fetchTracksPlayedByDJ(djName) {
    this.setState({ ...this.state, isSearching: true });
    fetch('http://localhost:6400/api/tracks/?setlists__dj__name=' + djName, {
      method: 'GET'
    })
    .then(r => r.json())
    .then((data) => {
      this.setState({
        ...this.state,
        isSearching: false,
        data: data,
        searchComplete: true,
      });
    });
  }

  
  render() {
    console.log(this.state);
    return (
      <div id="main">
        <h1>Setlist Spy</h1>
        <img id="logo" src={require('./logo.jpg')}></img><br/>
        <h4>Discover music played, recorded, & remixed by your favorite DJs & artists.</h4>
          <input type="text" onChange={e => this.setState({ ...this.state, searchDjName: e.target.value })} disabled={this.state.isSearching}/>
          <button onClick={e => this.fetchTracksPlayedByDJ(this.state.searchDjName)} disabled={this.state.isSearching}>
            <FontAwesome name={ this.state.isSearching ? 'spinner' : 'search' } spin={this.state.isSearching} />
          </button>
        { (this.state.searchComplete ) ? <SearchResults data={this.state.data} /> : <div></div> }
      </div>
    );
  }
}
