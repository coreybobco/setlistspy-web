import React from 'react';
import SearchTable from './SearchTable';
import FontAwesome from 'react-fontawesome';
import '../styles/search.scss'

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      searchDjName: '',
      isSearching: false,
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
        <input type="text" onChange={e => this.setState({ ...this.state, searchDjName: e.target.value })} />
        <button disabled={this.state.isSearching} onClick={e => this.fetchDjData(this.state.searchDjName)}>
          <FontAwesome name="search"/>
        </button>
        { (this.state.data.dj_tracks) ? <SearchTable data={this.state.data} /> : <div></div> }
      </div>
    );
  }
}
