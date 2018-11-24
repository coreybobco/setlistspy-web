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
    const DJTrackStatsRows = this.props.data.DJTrackStats.results.map((track, i) => ({
      id: i,
      artist_track: `${track.artist.name} - ${track.title}`,
    }));
    const ArtistTrackStatsRows = this.props.data.ArtistTrackStats.map((track, i) => ({
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
              rowGetter={i => DJTrackStatsRows[i]}
              rowsCount={DJTrackStatsRows.length}
              rowRenderer={RowRenderer}
              minHeight={500} 
            />
          </div>
        </TabPanel>
        <TabPanel>
              <div id="SearchTable">
            <ReactDataGrid
              columns={[{ key: 'artist_track', name: 'Artist - Track' }]}
              rowGetter={i => ArtistTrackStatsRows[i]}
              rowsCount={ArtistTrackStatsRows.length}
              rowRenderer={RowRenderer}
              minHeight={500} 
            />
          </div>
        </TabPanel>
      </Tabs>
    </div>
      );
  }
}
