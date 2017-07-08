import React from 'react';
import SearchTable from './SearchTable';

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
      <div>
        <input type="text" onChange={e => this.setState({ ...this.state, searchDjName: e.target.value })} />
        <button disabled={this.state.isSearching} onClick={e => this.fetchDjData(this.state.searchDjName)}>
          { this.state.isSearching
              ? 'Searching...'
              : 'Search'
          }
        </button>
        <SearchTable data={this.state.data} />
      </div>
    );
  }
}
