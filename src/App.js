import React, { Component } from "react";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { albumList: [], albumNum: 4 };
  }

  fetchApi = async (searchTerm) => {
    await fetch(
      `https://itunes.apple.com/search?term=${searchTerm}&media=music&entity=album&attribute=artistTerm&limit=200`
    )
      .then((res) => res.json())
      .then((albumObj) => this.setState({ albumList: albumObj.results }));
  };

  handleInput = (e) => {
    if (e.code === "Enter") {
      // fetchApi
      this.fetchApi(e.target.value);
      this.setState({ albumNum: 4 });
    }
  };

  handleOnClick = () => {
    if (this.state.albumNum > this.state.albumList.length) {
      alert("already reach max of results");
    }
    this.setState((prevState) => ({ albumNum: prevState.albumNum + 4 }));
  };

  render() {
    const { albumList, albumNum } = this.state;
    const title =
      albumList.length > 0
        ? `${albumList.slice(0, albumNum).length}/${albumList.length} results`
        : "Search Albums by Artist Name";

    const renderedAlbumList = albumList
      .slice(0, albumNum)
      .map((album, index) => (
        <li key={index} className="album-item">
          <div className="album-item_container">
            <img src={album.artworkUrl100} alt="" />
            <p>{album.collectionCensoredName}</p>
          </div>
        </li>
      ));
    return (
      <>
        {/* navbar */}
        <nav className="navbar">
          <div className="navbar_search-container">
            <input
              type="text"
              className="navbar_searchbar"
              id="navbar_searchbar"
              placeholder="Search..."
              required
              onKeyPress={this.handleInput}
            />
            <button id="navbar_button">
              <img
                className="navbar_search-icon"
                src="https://img.icons8.com/material-outlined/24/000000/search--v1.png"
                alt=""
              />
            </button>
          </div>
        </nav>

        {/* header */}
        <header className="heading">
          <div className="" id="heading_loader"></div>
          <h1 className="heading_title" id="heading_title">
            {title}
          </h1>
        </header>

        {/* album */}
        <main className="album">
          <ul className="album-list" id="album-list">
            {/* map the album list */}
            {renderedAlbumList}
          </ul>

          <div className="button_container">
            <button className="button_loadmore" onClick={this.handleOnClick}>
              Load more
            </button>
          </div>
        </main>
      </>
    );
  }
}
