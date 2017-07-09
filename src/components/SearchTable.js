import React from 'react';

const SearchTable = (props) => (
  <div>
    <table>
      <thead>
        <tr>
          <th>Artist - Track</th>
        </tr>
      </thead>
      <tbody>
        { props.data.dj_tracks && props.data.dj_tracks.map((djTrack) =>
          <tr key={djTrack.artist + djTrack.title}>
            <td>{djTrack.artist} - {djTrack.title}</td>
          </tr>
        )}
      </tbody>
    </table>
    <table>
      <thead>
        <tr>
          <th>Track</th>
        </tr>
      </thead>
      <tbody>
        { props.data.artist_tracks && props.data.artist_tracks.map((artistTrack) =>
          <tr key={artistTrack.track}>
            <td>{artistTrack.track}</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

export default SearchTable;
