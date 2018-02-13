import React, { Component } from 'react'
import * as firebase from "firebase";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import './main.css'
import Card from './Card.js'
import AddAlbum from './AddAlbum.js'

var config = {
  apiKey: 'AIzaSyBjpgheUOcUnm3sEnGYdaSnTogYl7_a4h8',
  authDomain: 'bnk48gallery.firebaseapp.com',
  databaseURL: 'https://bnk48gallery.firebaseio.com',
  storageBucket: 'bnk48gallery.appspot.com'
}

firebase.initializeApp(config)

// var storage = firebase.storage()
// var pathReference = storage.ref('images/jdl7bdgn/1.jpg')

// console.log(pathReference.getDownloadURL().then(function (url) {
//   console.log(url)
// }))

// firebase.database().ref('albums/').push(album)

class App extends Component {

  constructor(props) {
    super(props)
    this.isLoading = true
    this.albums = []
    var self = this
    firebase.database().ref('albums/').once('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val()
        self.albums.push(childData)
      })
      self.setState(self.GenerateState(self.albums, ''))
      self.isLoading = false
    })
    this.state = this.GenerateState([], '')
    this.Searching = this.Searching.bind(this)
  }

  GenerateState(albums, search) {
    return {
      cards: albums.map(album =>
        <Card key={album.name} albums={album} />
      ),
      search: search
    }
  }
  
  Searching(event) {
    const input = event.target.value.toLowerCase()
    if (input.length >= 3) {
      var str = input.split(' ')
      var albums = []
      str.forEach(s => {
        if (s !== '') {
          this.albums.forEach((album) => {
            if (album.name.toLowerCase().indexOf(s) >= 0 || album.model.toLowerCase().indexOf(s) >= 0 || album.desc.toLowerCase().indexOf(s) >= 0) {
              if (albums.indexOf(album) === -1) {
                albums.push(album)
              }
            }
          })
        }
      })
      this.setState(this.GenerateState([], input))
      this.setState(this.GenerateState(albums, input))
    } else {
      this.setState(this.GenerateState(this.albums, input))
    }
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar navbar-dark bg-dark justify-content-left">
          <ul className="nav">
            <a className="navbar-brand" href="/">BNK48 Gallery</a>
            <li className="nav-item">
              <a className="nav-link" href="/" data-toggle="modal" data-target="#AddAlbumModal" >Add Album</a>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0 w-25">
            <input className="form-control w-100" type="text" placeholder="Search" value={this.state.search} onChange={this.Searching} />
          </form>
        </nav>
        <div className="container">
          <div className="row">
            <div className="col-12 albums">
              <div className="row">
                {(this.state.cards.length > 0)? this.state.cards : <div className="col not-found"><h1><b>{(this.isLoading) ? 'Loading...' : 'Not Found Albums'}</b></h1></div>}
              </div>
            </div>
          </div>
        </div>
        <AddAlbum firebase={firebase} />
      </div>
    );
  }
}

export default App;
