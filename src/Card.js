import React, { Component } from 'react'

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: {
        selected: 0
      }
    }
    this.state = this.GenerateState(0)
  }

  GenerateState(selected, modalClass) {
    return {
      card: {
        style: {
          backgroundImage: 'url(' + this.props.albums.photos[0] + ')'
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
      this.state.modal.selected = index
      this.setState(this.GenerateState(index))
      var state = this.GenerateState(index)
      state.modal.class = 'img-main fadeIn'
      setTimeout(() => {
        this.setState(state)
      }, 10);
    }
  }

  UpdateImageClass() {
    return this.props.albums.photos.map((photo, index) =>
      <img className={this.state.modal.selected === index ? 'nav-image' : 'nav-image-active'} key={photo} src={photo} onClick={this.ChangeImage(index)} alt="previewImage" />
    )
  }

  render() {
    return (
      <div className="col-12 col-sm-6 col-xl-4">
        <div className="card fadeIn">
          <div className="card-img-top" style={this.state.card.style} data-toggle="modal" data-target={'#' + this.props.albums.name}></div>
          <div className="card-body">
            <h5 className="card-title">{this.props.albums.name}</h5>
            <div className="card-text">
              <div className="album-model" >{this.props.albums.model}</div>
              <div className="album-desc" >{this.props.albums.desc}</div>
              <div className="text-right album-link"><a href={this.props.albums.link} target="_blank" >{this.props.albums.link}</a></div>
            </div>
          </div>
        </div>
        <div className="modal fadeInQuick" id={this.props.albums.name} tabIndex="-1" role="dialog" aria-hidden="true">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-body">
                <div className="modal-main-image" style={this.state.modal.style}>
                  <img className={this.state.modal.class} src={this.props.albums.photos[this.state.modal.selected]} alt="main" />
                  <div>{this.state.modal.images}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card
