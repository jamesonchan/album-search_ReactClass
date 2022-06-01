import { useState } from "react";
import "./css/album.css";
import "./css/navbar.css";
import "./css/heading.css";
import "./css/loader.css";

function App() {
  const [albumList, setAlbumList] = useState([]);
  const [albumNum, setAlbumNum] = useState(4);

  const fetchApi = async (searchTerm) => {
    await fetch(
      `https://itunes.apple.com/search?term=${searchTerm}&media=music&entity=album&attribute=artistTerm&limit=200`
    )
      .then((res) => res.json())
      .then((albumObj) => setAlbumList(albumObj.results));
  };

  const handleInput = (e) => {
    if (e.code === "Enter") {
      fetchApi(e.target.value);
      setAlbumNum(4);
    }
  };

  const handleOnClick = () => {
    if (albumNum > albumList.length) {
      alert("already reach max of results");
    }
    setAlbumNum((albumNum) => albumNum + 4);
  };

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
            onKeyPress={handleInput}
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
          {albumList.length > 0
            ? `${albumList.slice(0, albumNum).length}/${
                albumList.length
              } results`
            : "Search Albums by Artist Name"}
        </h1>
      </header>

      {/* album */}
      <main className="album">
        <ul className="album-list" id="album-list">
          {/* map the album list */}
          {albumList.slice(0, albumNum).map((album, index) => (
            <li key={index} className="album-item">
              <div className="album-item_container">
                <img src={album.artworkUrl100} alt="" />
                <p>{album.collectionCensoredName}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="button_container">
          <button className="button_loadmore" onClick={handleOnClick}>
            Load more
          </button>
        </div>
      </main>
    </>
  );
}

export default App;
