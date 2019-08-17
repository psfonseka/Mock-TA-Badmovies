import React from 'react';
const axios = require('axios');

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      genres: []
    };
  }
  componentDidMount() {
    this.getGenres();
  }

  getGenres() {
    //make an axios request in this component to get the list of genres from your endpoint GET GENRES
    axios.get('/movies/genres')
    .then(data => {
      let results = data.data;
      const uniq = new Set(results.map(e => JSON.stringify(e)));
      const res = Array.from(uniq).map(e => JSON.parse(e));
      this.setState({
        genres: res
      });
    });
  }

  render() {
    return (
      <div className="search">
        <button onClick={() => {this.props.swapFavorites()}}>{this.props.showFaves ? "Show Results" : "Show Favorites"}</button>
        <br/><br/>

        {/* Make the select options dynamic from genres !!! */}
        {/* How can you tell which option has been selected from here? */}

        <select>
          {this.state.genres.map((genre) => {
            return <option key={genre.id} value={genre.id}>{genre.name}</option>
          })}
          {/* <option value="theway">The Way</option>
          <option value="thisway">This Way</option>
          <option value="thatway">That Way</option> */}
        </select>
        <br/><br/>

        <button>Search</button>

      </div>
    );
  }
}

export default Search;