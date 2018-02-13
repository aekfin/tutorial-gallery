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

    this.state = {name: '', modal: '', desc: ''}
    this.HandleChangeName = this.HandleChangeName.bind(this)
    this.HandleChangeModel = this.HandleChangeModel.bind(this)
    this.HandleChangeDesc = this.HandleChangeDesc.bind(this)
    this.UploadImage = this.UploadImage.bind(this)
  }

  readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function(e) {
        $('#preview').attr('src', e.target.result);
      }
      reader.readAsDataURL(input.files[0]);
    }
  }

  componentDidMount() {
    var self = this
    $('#uploadImage').change(function (input) {
      self.readURL(this);
    })
    $('#image-upload').click(function () {
      $('#uploadImage').click()
    })
  }

  HandleChangeName(event) {
    this.setState({name: event.target.value, modal: this.state.model, desc: this.state.desc})
  }

  HandleChangeModel(event) {
    this.setState({name: this.state.name, modal: event.target.value, desc: this.state.desc})
  }

  HandleChangeDesc(event) {
    this.setState({name: this.state.name, modal: this.state.model, desc: event.target.value})
  }

  UploadImage(input) {
    console.log(input)
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
                        <input type="text" className="form-control" placeholder="Enter album name" value={this.state.name} onChange={this.handleChangeName} />
                      </div>
                      <div className="form-group">
                        <label>Model</label>
                        <input type="text" className="form-control" placeholder="Enter name of model" value={this.state.model} onChange={this.handleChangeModel} />
                      </div>
                      <div className="form-group">
                        <label>Description</label>
                        <textarea className="form-control" value={this.state.desc} onChange={this.handleChangeDesc} placeholder="Enter description about this album"></textarea>
                        <small className="form-text text-muted">Please write a short description not over 3 lines. (158 character)</small>
                      </div>
                    </form>
                    </div>
                    <div className="col-12 col-lg-6">
                      <label class="btn btn-secondary" id="image-upload">Upload Photos</label>
                      <input type="file" id="uploadImage" accept="image/*" multiple />
                      <img id="preview" className="preview-img" />
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