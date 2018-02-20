import React, { Component } from 'react'

var selected = 0
class Card extends Component {
  constructor(props) {
    super(props)
    this.firebase = props.firebase 
    this.database = this.firebase.database() 
    this.storage = this.firebase.storage()

    selected = this.props.album.cover
    this.state = this.GenerateState(this.props.album.cover)
  }

  GenerateState(selected) {
    return {
      card: {
        style: {
          backgroundImage: 'url(' + this.props.album.photos[this.props.album.cover] + ')'
        }
      },
      modal: {
        selected: selected,
        class: 'img-main',
        images: this.UpdateImageClass()
      }
    }
  }

  ChangeImage(index) {
    return () => {
      selected = index
      this.setState(this.GenerateState(index))
      var state = this.GenerateState(index)
      state.modal.class = 'img-main fadeIn'
      setTimeout(() => {
        this.setState(state)
      }, 10)
    }
  }

  UpdateImageClass() {
    return this.props.album.photos.map((photo, index) =>
      <img className={selected === index ? 'nav-image' : 'nav-image-active'} key={photo} src={photo} onClick={this.ChangeImage(index)} alt="previewImage" />
    )
  }

  RemoveAlbum() {
    return () => {
      this.database.ref('albums/' + this.props.album.key).remove()
      this.storage.ref('images/').child(this.props.album.photoPath + '/1.jpg').delete()
    }
  }

  render() {
    return (
      <div className="col-12 col-sm-6 col-xl-4">
        <div className="card fadeIn">
        {(!this.props.edit) && 
          <div className="card-img-top" style={this.state.card.style} data-toggle="modal" data-target={'#' + this.props.album.name}></div>
        }
        {(this.props.edit) &&
          <div className="card-img-top" style={this.state.card.style}>
            <div className="fadeInQuick">
              <div className="remove-box">
                <i className="material-icons remove" data-toggle="modal" data-target={'#remove-' + this.props.album.name}>&#xE5CD;</i>
              </div>
            </div> 
          </div>
        }
          <div className="card-body">
            <h5 className="card-title">{this.props.album.name}</h5>
            <div className="card-text">
              <div className="album-model" >{this.props.album.model}</div>
              <div className="album-desc" >{this.props.album.desc}</div>
              <div className="text-right album-link"><a href={this.props.album.link} target="_blank" >{this.props.album.link}</a></div>
            </div>
          </div>
        </div>
        <div className="modal fadeInQuick" id={this.props.album.name} tabIndex="-1" role="dialog" aria-hidden="true">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-body">
                <div className="modal-main-image" style={this.state.modal.style}>
                  <img className={this.state.modal.class} src={this.props.album.photos[this.state.modal.selected]} alt="main" />
                  <div>{this.state.modal.images}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal fadeInQuick" id={'remove-' + this.props.album.name}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-body text-center">
                <h2>Remove this album?</h2>
                <h4 style={{marginBottom: '25px'}}>"{this.props.album.name}"</h4>
                <button className="btn btn-secondary w-25" data-dismiss="modal" >Cancel</button>
                <button className="btn btn-danger w-50" data-dismiss="modal" style={{marginLeft: '10px'}} onClick={this.RemoveAlbum()}>Remove</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card
