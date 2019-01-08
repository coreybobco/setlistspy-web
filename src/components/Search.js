import React from 'react';
import SearchResults from './SearchResults';
import FontAwesome from 'react-fontawesome';
import '../styles/search.scss'

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      searchName: props.params.query || '',
      isSearching: false,
      results: false,
      frameIndex: 0
    }

    let animationPath = [0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1];

    setInterval(() => {
       this.setState(previousState => {
         return {
            frameIndex: (this.state.frameIndex + 1) % animationPath.length,
            eyeOpen: animationPath[this.state.frameIndex] == 0,
        };
      });
    }, 299);
  }

  componentWillMount() {
    if (this.props.params.query) {
      this.fetchSearchStats(this.props.params.query);
    }
    this.state.frameIndex += 1;
    console.log(this.state.frameIndex);
  }

  fetchSearchStats(searchTerm) {
    const urls = [
      process.env.API_URL + 'tracks/?setlists__dj__name=' + searchTerm,
      process.env.API_URL + 'tracks/stats/?artist__name=' + searchTerm,
    ];

    Promise.all(urls.map(url => fetch(url)))
    .then(responses => Promise.all(
      responses.map(r => r.json())
    ))
    .then(function(values){
      let data = {}
      data.DJTrackStats = values[0];
      data.ArtistTrackStats = values[1];
      return data;
    }).then(data => {
      console.log(data);
      this.setState({
        ...this.state,
        isSearching: false,
        data: data,
        searchComplete: true,
      });
    })
  }
  
  render() {
    let sprite = this.state.eyeOpen
      ? require('./logo1.png')
      : require('./logo2.png');
    return (
      <div id="main">
        <img src={sprite}/>
        <h4>Discover music played, recorded, & remixed by your favorite DJs & artists.</h4>
          <input type="text" onChange={e => this.setState({ ...this.state, searchName: e.target.value })} disabled={this.state.isSearching}/>
          <button onClick={e => this.fetchSearchStats(this.state.searchName)} disabled={this.state.isSearching}>
            <FontAwesome name={ this.state.isSearching ? 'spinner' : 'search' } spin={this.state.isSearching} />
          </button>
        { (this.state.searchComplete ) ? <SearchResults searchName={this.state.searchName} data={this.state.data} /> : <div></div> }
      </div>
    );
  }
}
