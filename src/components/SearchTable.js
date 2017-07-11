import React from 'react';
import ReactDataGrid from 'react-data-grid';

export default class SearchTable extends React.Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      dj_tracks: props.data.dj_tracks,
      rows: [],
      columns: [{ key: 'artist_track', name: 'Artist - Track' }]
    }
  }

  createRows() {
    let rows = [];
    for (let i = 1; i < this.state.dj_tracks.length; i++) {
      rows.push({
        id: i,
        artist_track:  this.state.dj_tracks[i].artist + " - " + this.state.dj_tracks[i].title
      });
    }
    this.setState({
      ...this.state,
      rows: rows
    });
  }

  componentDidMount(){
    this.createRows();
  }

  render() {
    return  (
      <div id="SearchTable">
        <ReactDataGrid
          columns={this.state.columns}
          rowGetter={i => this.state.rows[i]}
          rowsCount={this.state.rows.length}
          minHeight={500} />
      </div>
      );
  }
}
