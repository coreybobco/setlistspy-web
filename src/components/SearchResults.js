const React = require('react');
const ReactDataGrid = require('react-data-grid');
const {findDOMNode} = require('react-dom');
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import '../styles/searchresults.scss';
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

  static propTypes = {
    fetchMoreDJResults: React.PropTypes.func
  }

  constructor(props) {
      super(props);
      this.canvas = null;
      this.state = {
        data: {
          'DJTrackStats': {'count':0, results:[]},
          'ArtistTrackStats': {'count':0, results:[]}
        },
        lastOffset: 0,
        results: false,
      }
      this.scrollListener = () => {
        if ((this.canvas.scrollHeight - (this.canvas.scrollTop + this.canvas.clientHeight)) < 500) {
          this.fetchMoreDJResults = this.fetchMoreDJResults.bind(this);
          this.fetchMoreDJResults();
        }
      };
  }
  
  canvas = null

  componentDidMount() {
    this.canvas = findDOMNode(this).querySelector('.react-grid-Canvas');
    this.canvas.addEventListener('scroll', this.scrollListener.bind(this));
  }

  componentWillUnmount() {
    if (this.canvas) {
      this.canvas.removeEventListener('scroll', this.scrollListener.bind(this));
    }
  }

  fetchMoreDJResults() {
    // Infinite scroll
    let offset = this.props.data.DJTrackStats.results.length;
    if (offset >= this.props.data.DJTrackCount || offset == this.state.lastOffset) {
      // All results retrieved or same request already made
      return;
    }
    this.setState({
      lastOffset: offset,
    });
    const urls = [
      process.env.API_URL + 'tracks/?setlists__dj__name=' + this.props.data.searchTerm + '&offset=' + offset,
    ];
    console.log(offset);

    var next_page_data = null;
    Promise.all(urls.map(url => fetch(url)))
    .then(responses => Promise.all(
      responses.map(r => r.json())
    ))
    .then(function(values){
      let data = {}
      data.DJTrackStats = values[0];
      data.DJTrackCount = values[0]['count'];
      return data;
    }).then(data => {
      this.setState({
        ...this.state,
        data: data,
      });
      this.props.data.DJTrackStats.results = this.props.data.DJTrackStats.results.concat(this.state.data.DJTrackStats.results);
    })
  }
  
  render() {
    // if (this.props.data.DJTrackStats) {
      if (this.props.data.DJTrackStats.results.length > 0) {
        this.props.data.DJTrackStatsRows = this.props.data.DJTrackStats.results.map((track, i) => ({
          id: i,
          artist_track: `${track.artist.name} - ${track.title}`,
        }));
      }
    // }
    // this.props.data.DJTrackCount = this.props.data.DJTrackStats.results.length ? this.props.data.DJTrackStats : 0;
    
    // if (this.props.data.DJTrackStats) {
      if (this.props.data.ArtistTrackStats.results.length > 0) {
        this.props.data.ArtistTrackStatsRows = this.props.data.ArtistTrackStats.results.map((track, i) => ({
          id: i,
          artist_track: `${track.artist.name} - ${track.title}`,
        }));
      }
    // }
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
              rowGetter={(i) => this.props.data.DJTrackStatsRows[i]}
              rowsCount={this.props.data.DJTrackStats.results ? this.props.data.DJTrackStats.results.length : 0}
              rowRenderer={RowRenderer}
              minHeight={500} 
            />
          </div>
        </TabPanel>
        <TabPanel>
          <div id="SearchTable">
            <ReactDataGrid
              columns={[{ key: 'artist_track', name: 'Artist - Track' }]}
              rowGetter={i => this.props.data.ArtistTrackStatsRows[i]}
              rowsCount={this.props.data.ArtistTrackStatsRows ? this.props.data.ArtistTrackStatsRows.length : 0}
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
