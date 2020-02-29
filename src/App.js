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

    
    let driverData = window.doScan(document.querySelector('img'));
    this.setState({
      firstName:driverData.firstName
    })

    if(JSON.stringify(driverData) === '{}'){
      throw new Error('Error');
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
    // Do stuff with the photo...
    console.log(dataUri);
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
        
      <img onLoad={this.scan.bind(this)} style={{display:'none'}} src = {this.state.imgSrc} alt = ''>
    
      </img>
      <p>{this.state.firstName}</p>
      <Camera
        idealFacingMode = {FACING_MODES.ENVIRONMENT}
        isMaxResolution = {true}
      onTakePhoto={ (dataUri) => this.handleTakePhoto.bind(this,dataUri)
      }
     
    />
      </div>
    );
  }
}

export default App;
