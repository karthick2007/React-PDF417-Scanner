import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Camera, {FACING_MODES} from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

class App extends Component {


  

    state= {
      imgSrc : '',
      firstName:''
    }
    
 

  scan(){

    try{
      let driverData = window.doScan(document.querySelector('img'));

    if(driverData !== undefined){
      this.setState({
        firstName:driverData.firstName
      })
    }
    

    if(JSON.stringify(driverData) === '{}'){
      throw new Error('Error');
    }
  }catch(err){
    let errorElement = document.getElementById('error');
    errorElement.innerHTML = "Error in scanning";
    errorElement.style.display = 'inline';
    errorElement.style.color = 'red';
    }

    }
    

     handleFiles(event) {
       var file = event.target.files[0];
       var url = URL.createObjectURL(file);
       this.setState({
         imgSrc:url
       })
     
     }


   handleTakePhoto (dataUri) {

    this.setState({
      imgSrc:dataUri
    })
    
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <input type="file" id="myFile" onChange = {this.handleFiles.bind(this)}></input>
        <label id = "error" style = {{display:"none"}}></label>
      <img onLoad={this.scan.bind(this)} style={{display:'none'}} src = {this.state.imgSrc} alt = ''>
    
      </img>
      <p>{this.state.firstName}</p>
      <Camera
        idealFacingMode = {FACING_MODES.ENVIRONMENT}
        isImageMirror = {false}
        isMaxResolution = {true}
      onTakePhoto={ (dataUri) => this.handleTakePhoto(dataUri)
      }
     
    />
      </div>
    );
  }
}

export default App;
