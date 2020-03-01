import React, { Component } from 'react';
import Camera, {FACING_MODES} from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import Webcam from "react-webcam";

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

    setRef = webcam => {
      this.webcam = webcam;
    };
    

     handleFiles(event) {
       var file = event.target.files[0];
       var url = URL.createObjectURL(file);
       this.setState({
         imgSrc:url
       })
     
     }


   handleTakePhoto () {
    let dataUri = this.webcam.getScreenshot();
    console.log(dataUri);
    this.setState({
      imgSrc:dataUri
    })
    
  }
  render() {
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "environment"
    };
    
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
        {/* <div style = {{display:'flex',justifyContent:'space-between'}}>
        <button style = {{width:'150px'}}></button>
         <Camera 
          idealFacingMode={FACING_MODES.ENVIRONMENT}
          isImageMirror={false}
          isMaxResolution={true}
          isFullscreen = {false }
          idealResolution = {{width: 640, height: 480}}
          onTakePhoto={(dataUri) => this.handleTakePhoto(dataUri)
          }/>
     <button style = {{width:'150px'}}></button>
         
         </div>   */}
         
         <Webcam
        audio={false}
        height={300}
        screenshotFormat="image/jpeg"
        width={200}
        videoConstraints={videoConstraints}
        
        ref={this.setRef}
       
        
      />
      <button onClick={this.handleTakePhoto.bind(this)}>Capture photo</button>
        
      </div>
    );
  }
}



export default App;
