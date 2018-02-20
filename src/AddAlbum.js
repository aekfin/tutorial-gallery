import React, { Component } from 'react';
import uniqid from 'uniqid'
import $ from 'jquery'

class AddAlbum extends Component {
  constructor(props) {
    super(props)
    this.firebase = props.firebase 
    this.database = this.firebase.database() 
    this.storage = this.firebase.storage()

    this.state = {name: '', model: '', link: '', desc: '', validation: true, image: {html: null, selected: -1, images: []}}
    this.isUploading = false
    this.HandleChange = this.HandleChange.bind(this)
    this.AddImageList = this.AddImageList.bind(this)
    this.ChangeToCover = this.ChangeToCover.bind(this)
    this.RemoveImage = this.RemoveImage.bind(this)
    this.UploadData = this.UploadData.bind(this)
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
      <div className="preview-img-list fadeIn" key={image}>
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

  Validation() {
    if (this.state.name === '' || this.state.model === '' || this.state.link === '' || this.state.desc === '' || this.state.image.selected === -1 || this.state.image.images.length === 0) {
      return false
    } else {
      return true
    }
  }

  UploadData() {
    this.setState({validation: this.Validation()})
    if (this.Validation()) {
      this.isUploading = true
      const pathName = uniqid()
      const dbRef = this.database.ref('albums/')
      var ref = dbRef.push({
        cover: this.state.image.selected,
        desc: this.state.desc,
        link: this.state.link,
        model: this.state.model,
        name: this.state.name,
        photoPath: pathName,
        photos: []
      })
      var image = this.state.image
      if (image.selected !== 0) {
        const temp = image.images[0]
        image.images[0] = image.images[image.selected]
        image.images[image.selected] = temp
      }
      image.images.forEach((img, index) => {
        const pathReference = this.storage.ref('images/' + pathName + '/' + (index + 1) + '.jpg')
        const i = index
        var self = this
        pathReference.putString(img, 'data_url').then(function(snapshot) {
          ref.child('photos').push(snapshot.downloadURL)
          if (i === image.images.length - 1) {
            self.isUploading = false
            $('#AddAlbumModal').modal('toggle')
            self.setState({name: '', model: '', link: '', desc: '', validation: true, image: {html: null, selected: -1, images: []}})
          }
        })
      })
    }
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
                        <label>Link</label>
                        <input type="text" className="form-control" placeholder="Enter url" name="link" value={this.state.link} onChange={this.HandleChange} />
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
                {this.state.validation === false && <div className="text-center text-danger"><b>Please fill all of fields.</b></div>}
              </div>
              <div className="modal-footer text-center d-block">
                {this.isUploading === true && <div className="not-found fadeInQuick" style={{marginTop: '0px'}}><h1><b>Uploading Album...</b></h1></div>}
                {this.isUploading === false && <button type="button" className="btn btn-secondary w-25" data-dismiss="modal">Close</button>}
                {this.isUploading === false && <button type="button" className="btn btn-success w-25" onClick={this.UploadData}>Add</button>}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddAlbum;