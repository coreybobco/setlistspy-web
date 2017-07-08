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
  </div>
);

export default SearchTable;
