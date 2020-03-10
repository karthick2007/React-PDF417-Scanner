import React, { Component } from 'react';
import Camera, {FACING_MODES} from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import Webcam from "react-webcam";
import MyCamera from './Camera/camera';
import logo from './download.jpg'

class App extends Component {



    state= {
      imgSrc : '',
      firstName :'',
      lastName:'',
    }

  scan(){

        try{
          document.getElementById('error').style.display = 'inline';
          let driverData = window.doScan(document.querySelector('img'));
            console.log(driverData);
            if(driverData !== undefined){
              this.setState({
                firstName:driverData.firstName,
                lastName: driverData.lastName
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

    // setRef = webcam => {
    //   this.webcam = webcam;
    // };
    

     handleFiles(event) {
       var file = event.target.files[0];
       var url = URL.createObjectURL(file);
       this.setState({
         imgSrc:url
       })
     
     }


   handleTakePhoto (dataUri) {
    console.log(dataUri);
    this.setState({
      imgSrc:dataUri
    })
    
  }
  render() {
    // const videoConstraints = {
    //   width: 1024,
    //   height: 720,
    //   facingMode: "environment"
    // };
    
    return (
      <div className="App">
        <div className="App-header">

          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <input type="file" id="myFile" onChange={this.handleFiles.bind(this)}></input>
        <label id="error" style={{ display: "none" }}></label>
        <img onLoad={this.scan.bind(this)} style={{ display: 'none' }} src={this.state.imgSrc} alt=''>

        </img>
        <p>{this.state.firstName}</p>
        <p>{this.state.lastName}</p >
        <div style={{ position: 'relative',display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <svg style={{position: 'absolute', zIndex: '9999', width: '300',height: '200'}}>
        <rect style={{ width: '100%',height: '80%', fill:'none', 'stroke-width': '5' , stroke: 'black' }}/>
         </svg>
         <Camera style={{width: '100%', height: '100%', position: 'absolute', zIndex: '9997' }}
 
          idealFacingMode={FACING_MODES.ENVIRONMENT}
          isImageMirror={false}
          isMaxResolution={true}
          isFullscreen = {false }
          sizeFactor = {0.5}
          idealResolution = {{width: 640, height: 480}}
          onTakePhoto={(dataUri) => this.handleTakePhoto(dataUri)
          }/>
     
         
         </div>  
         
         {/* <Webcam
        audio={false}
        width='1024'
        height='720'
        screenshotFormat="image/jpeg"
        
        videoConstraints={videoConstraints}
        
        ref={this.setRef}
        style={{ transform: 'rotate(0deg)' }}
        
      />
      <button onClick={this.handleTakePhoto.bind(this)}>Capture photo</button> */}
        
      </div>
    );
  }
}



export default App;
