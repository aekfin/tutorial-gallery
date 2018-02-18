import React, { Component } from 'react';
import uniqid from 'uniqid'
import $ from 'jquery'

console.log(uniqid())

class AddAlbum extends Component {
  constructor(props) {
    super(props)
    var firebase = props.firebase 
    var storage = firebase.storage()
    var pathReference = storage.ref('images/jdl7bdgn/1.jpg')

    console.log(pathReference.getDownloadURL().then(function (url) {
      console.log(url)
    }))

    this.state = {name: '', model: '', desc: '', image: {html: null, selected: -1, images: []}}
    this.HandleChange = this.HandleChange.bind(this)
    this.AddImageList = this.AddImageList.bind(this)
    this.ChangeToCover = this.ChangeToCover.bind(this)
    this.RemoveImage = this.RemoveImage.bind(this)
  }

  readURL(input) {
    var self = this
    if (input.files && input.files[0]) {
      var reader = new FileReader()
      reader.onload = function(e) {
        self.AddImageList(e.target.result)
      }
      reader.readAsDataURL(input.files[0])
    }
  }

  componentDidMount() {
    var self = this
    $('#uploadImage').change(function (input) {
      self.readURL(this)
    })
    $('#image-upload').click(function () {
      $('#uploadImage').click()
    })
  }

  HandleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  AddImageList(src) {
    this.state.image.images.push(src)
    var selected = (this.state.image.selected === -1) ? 0 : this.state.image.selected
    this.RenderImageList(selected)
  }

  RemoveImage(index) {
    return () => {
      this.state.image.images.splice(index, 1)
      var selected = (this.state.image.selected === index) ? -1 : this.state.image.selected
      this.RenderImageList(selected)
    }
  }

  ChangeToCover(index) {
    return () => {
      this.setState({
        image: {
          html: this.state.image.html,
          selected: index,
          images: this.state.image.images
        }
      })
    }
  }

  RenderImageList(selected) {
    var html = this.state.image.images.map((image, index) =>
      <div className="preview-img-list" key={image}>
        <div className="preview-img-list-in" style={{backgroundImage: 'url(' + image + ')'}}>
          <div className="img-action" onClick={this.RemoveImage(index)}><i className="material-icons pa">&#xE872;</i></div>
          <div className="img-action" onClick={this.ChangeToCover(index)}><i className="material-icons pa">&#xE876;</i></div>
        </div>
      </div>
    )
    
    this.setState({
      image: {
        html: html,
        selected: selected,
        images: this.state.image.images
      }
    })
  }

  render() {
    return (
      <div className="AddAlbum">
        <div className="modal fadeInQuick" id="AddAlbumModal">
          <div className="modal-dialog modal-lg modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title container">Add New Album</h4>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="container">
                  <div className="row">
                    <div className="col-12 col-lg-6">
                    <form>
                      <div className="form-group">
                        <label>Album Name</label>
                        <input type="text" className="form-control" placeholder="Enter album name" name="name" value={this.state.name} onChange={this.HandleChange} />
                      </div>
                      <div className="form-group">
                        <label>Model</label>
                        <input type="text" className="form-control" placeholder="Enter name of model" name="model" value={this.state.model} onChange={this.HandleChange} />
                      </div>
                      <div className="form-group">
                        <label>Description</label>
                        <textarea className="form-control" placeholder="Enter description about this album" name="desc" value={this.state.desc} onChange={this.HandleChange}></textarea>
                        <small className="form-text text-muted">Please write a short description not over 3 lines. (158 character)</small>
                      </div>
                    </form>
                    </div>
                    <div className="col-12 col-lg-6">
                      <label className="btn btn-info" id="image-upload">Upload Photos</label>
                      <label className="btn btn-danger" id="image-clear">Clear</label>
                      <input type="file" id="uploadImage" accept="image/*" />
                      <div className="preview-img text-center">
                        <div 
                          className="preview-img-in" 
                          style={(this.state.image.selected !== -1) ? {backgroundImage: 'url(' + this.state.image.images[this.state.image.selected] + ')'} : {backgroundColor: 'lightgray'}}
                        ></div>
                        <small className="text-muted">Cover Of Album</small>
                      </div>
                      {this.state.image.html}
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer text-center d-block">
                <button type="button" className="btn btn-secondary w-25" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-success w-25">Add</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddAlbum;