import React from 'react';
import ReactDataGrid from 'react-data-grid';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import '../styles/searchresults.scss'

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
  render() {
    const rows = this.props.data.map((track, i) => ({
      id: i,
      artist_track: `${track.artist.name} - ${track.title}`,
    }));

    return  (
    <div id="SearchResults">
      <Tabs>
        <TabList>
          <Tab>Tracks They Played</Tab>
          <Tab>Who Played Them</Tab>
        </TabList>

        <TabPanel>
          <div id="SearchTable">
            <ReactDataGrid
              columns={[{ key: 'artist_track', name: 'Artist - Track' }]}
              rowGetter={i => rows[i]}
              rowsCount={rows.length}
              rowRenderer={RowRenderer}
              minHeight={500} />
          </div>
        </TabPanel>
        <TabPanel>
          <h4>Work in Progress</h4>
        </TabPanel>
      </Tabs>
    </div>
      );
  }
}
