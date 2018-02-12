import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import './main.css'
import Card from './Card.js'

class App extends Component {

  constructor(props) {
    super(props)
    const desc = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempus massa enim, sed ultrices augue consequat ac. Quisque nulla sem.'
    this.albums = [
      {name: '1980s Cool Girl', model: 'Mind BNK48', link: 'https://www.facebook.com/bnk48official.mind/', desc: desc, photos: [require('./img/mind_cool/1.jpg'), require('./img/mind_cool/2.jpg'), require('./img/mind_cool/3.jpg'), require('./img/mind_cool/4.jpg')]},
      {name: 'In The Minimal Style', model: 'Tarwaan BNK48', link: 'https://www.facebook.com/bnk48official.tarwaan/', desc: desc, photos: [require('./img/tarwaan/1.jpg'), require('./img/tarwaan/2.jpg'), require('./img/tarwaan/3.jpg'), require('./img/tarwaan/4.jpg'), require('./img/tarwaan/5.jpg')]},
      {name: 'Make It Snow', model: 'Maysa BNK48', link: 'https://www.facebook.com/bnk48official.maysa/', desc: desc, photos: [require('./img/maysa/1.jpg'), require('./img/maysa/2.jpg'), require('./img/maysa/3.jpg')]},
      {name: 'Girl With A Red Scarf', model: 'Kaimook BNK48', link: 'https://www.facebook.com/bnk48official.kaimook/', desc: desc, photos: [require('./img/kaimook/1.jpg'), require('./img/kaimook/2.jpg'), require('./img/kaimook/3.jpg'), require('./img/kaimook/4.jpg'), require('./img/kaimook/5.jpg'), require('./img/kaimook/6.jpg'), require('./img/kaimook/7.jpg')]},
      {name: 'Among The People', model: 'Pupe BNK48', link: 'https://www.facebook.com/bnk48official.pupe/', desc: desc, photos: [require('./img/pupe/1.jpg'), require('./img/pupe/2.jpg')]},
      {name: 'Sweet Sunshine', model: 'Mind BNK48', link: 'https://www.facebook.com/bnk48official.mind/', desc: desc, photos: [require('./img/mind2/1.jpg'), require('./img/mind2/2.jpg')]},
      {name: 'Madam Waan', model: 'Tarwaan BNK48', link: 'https://www.facebook.com/bnk48official.tarwaan/', desc: desc, photos: [require('./img/tarwaan2/1.jpg'), require('./img/tarwaan2/2.jpg')]},
      {name: 'Bubble World', model: 'Maysa BNK48', link: 'https://www.facebook.com/bnk48official.maysa/', desc: desc, photos: [require('./img/maysa2/1.jpg'), require('./img/maysa2/2.jpg')]}
    ]
    this.state = this.GenerateState(this.albums, '')
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
      console.log(str)
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
        <nav className="navbar navbar-dark bg-dark">
          <a className="navbar-brand" href="/">BNK48 Gallery</a>
          <form className="form-inline my-2 my-lg-0 w-25">
            <input className="form-control w-100" type="text" placeholder="Search" value={this.state.search} onChange={this.Searching} />
          </form>
        </nav>
        <div className="container">
          <div className="row">
            <div className="col-12 albums">
              <div className="row">
                {(this.state.cards.length > 0)? this.state.cards : <div class="col not-found"><h1><b>Not Found Albums</b></h1></div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
