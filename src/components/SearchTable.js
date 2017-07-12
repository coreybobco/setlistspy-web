import React from 'react';
import ReactDataGrid from 'react-data-grid';

const { Row } = ReactDataGrid;

const rowStyle = {
};
const rowWrapperStyle = {
};

class RowRenderer extends React.Component {
  setScrollLeft(scrollBy) {
    this.row.setScrollLeft(scrollBy);
  }

  render() {
    return (
      <div style={rowWrapperStyle}>
        <Row style={rowStyle} ref={ node => this.row = node } {...this.props}/>
      </div>
    );
  }
}

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
          rowRenderer={RowRenderer}
          minHeight={500} />
      </div>
      );
  }
}
