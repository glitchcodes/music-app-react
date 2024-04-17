import "./styles.css";
import { useState } from "react";

const tempMusicData = [
  {
    id: 1,
    title: "Song 1",
    artist: "Artist A",
    genre: "Pop"
  },
  {
    id: 2,
    title: "Rhythm of the Rain",
    artist: "Rainy Days Band",
    genre: "Rock"
  },
  {
    id: 3,
    title: "Jazz Nights",
    artist: "Smooth Sounds Trio",
    genre: "Jazz"
  },
  {
    id: 4,
    title: "Country Roads",
    artist: "Western Winds",
    genre: "Country"
  },
  {
    id: 5,
    title: "Electric Dreams",
    artist: "Future Funk",
    genre: "Electronic"
  },
  {
    id: 6,
    title: "Soulful Serenade",
    artist: "Groove Guardians",
    genre: "Pop"
  },
  {
    id: 7,
    title: "Classical Crescendo",
    artist: "Symphony Orchestra",
    genre: "Classical"
  }
];

const tempPlaylist = [

];

function Navbar({children, onSearch}) {
  return (
    <nav className="container">
      <Logo />
      <Search onSearch={onSearch} />
      { children }
    </nav>
  );
}

function Logo() {
  return <h1>React Music App</h1>
}

function NumberResult({music}) {
  return (
    <p>
      Found <strong>{ music.length }</strong> results
    </p>
  );
}

function Search({onSearch}) {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault()
    onSearch(query);
  }

  return (
    <form onSubmit={handleSearch}>
      <input
        className="search"
        type="text"
        placeholder="Search music..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}

function Music({list, onAddMusic, onAddToPlaylist, onSortMusic}) {
  const [music, setMusic] = useState({});

  const handleAddMusic = () => {
    setMusic({...music, id: Date.now()});
    onAddMusic(music);
  }

  const handleAddToPlaylist = (music) => {
    return onAddToPlaylist(music)
  }

  return (
    <div className="container">
      <section>
        <h2>Music List</h2>

        <div>
          <input type="text" placeholder="Music name" value={music.title} onChange={(e) => setMusic(music => {
            return {...music, title: e.target.value}
          })}/>
        </div>

        <div>
          <input type="text" placeholder="Music artist" value={music.artist} onChange={(e) => setMusic(music => {
            return {...music, artist: e.target.value}
          })}/>
        </div>

        <div>
          <input type="text" placeholder="Music genre" value={music.genre} onChange={(e) => setMusic(music => {
            return {...music, genre: e.target.value}
          })}/>
        </div>

        <button type="submit" style={{marginTop: '1rem'}} onClick={handleAddMusic}>Add music</button>

        <hr style={{margin: '2rem 0'}}/>

        <button type="button" style={{display: 'block', marginBottom: '1rem'}} onClick={() => onSortMusic('title')}>
          Sort by title
        </button>
        <button type="button" style={{display: 'block', marginBottom: '1rem'}} onClick={() => onSortMusic('artist')}>
          Sort by artist
        </button>
        <button type="button" style={{display: 'block', marginBottom: '1rem'}} onClick={() => onSortMusic('genre')}>
          Sort by genre
        </button>

      </section>
      <ul>
        {list.map((music) => (
          <li key={music.id}>
            {music.title} by {music.artist} ({music.genre})
            <button onClick={() => handleAddToPlaylist(music)}>💖</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Box({children}) {
  return <div className="container">{children}</div>
}

function Playlist({ playlist }) {
  return (
    <>
      <section>
        <h2>Playlist</h2>
        <p>Total songs: { playlist.length }</p>
      </section>
      {playlist.length > 0 ? (
        <ul>
          {playlist.map((music, index) => (
            <li key={index}>
              {music.title} by {music.artist} ({music.genre})
              <p>
                <span>⭐</span>
                <span>{music.rating}</span>
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No music added yet. Start adding one!</p>
      )}
    </>
  );
}

function Main({children}) {
  return (
    <div className="container">
      {children}
    </div>
  );
}

export default function App() {
  const [music, setMusic] = useState(tempMusicData);
  const [playlist, setPlaylist] = useState(tempPlaylist);

  const addToPlaylist = (music) => {
    // If music is already in the playlist, cancel
    if (playlist.some((p => p.id === music.id))) return;

    setPlaylist([...playlist, music]);
  }

  const handleAddMusic = (e) => {
    setMusic((musics) => [...musics, e])
  }

  const handleSearch = (e) => {
    if (e.length === 0) return setMusic(tempMusicData);

    setMusic((music) => {
      return music.filter(item => {
        return item.title.toLowerCase().includes(e.toLowerCase())
      })
    })
  }

  const handleSortMusicList = (type) => {
    let sortedItems = [];

    switch (type) {
      case 'title':
        sortedItems = music.sort((a, b) => {
          if (b.title < a.title) {
            return 1;
          } else if (b.title > a.title) {
            return -1
          } else {
            return 0;
          }
        });
        setMusic(music => [...sortedItems])
        break;
      case 'artist':
        sortedItems = music.sort((a, b) => {
          if (b.artist < a.artist) {
            return 1;
          } else if (b.artist > a.artist) {
            return -1
          } else {
            return 0;
          }
        });
        setMusic(music => [...sortedItems])

        break;
      case 'genre':
        sortedItems = music.sort((a, b) => {
          if (b.genre < a.genre) {
            return 1;
          } else if (b.genre > a.genre) {
            return -1
          } else {
            return 0;
          }
        });
        setMusic(music => [...sortedItems])

        break;
    }
  }

  return (
    <>
      <Navbar onSearch={handleSearch}>
        <NumberResult music={music} />
      </Navbar>
      <Main>
        <Box>
          <Music list={music} onAddMusic={handleAddMusic} onAddToPlaylist={addToPlaylist} onSortMusic={handleSortMusicList} />
        </Box>
        <Box>
          <Playlist playlist={playlist} />
        </Box>
      </Main>
    </>
  );
}
