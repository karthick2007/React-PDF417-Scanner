import React, { Component } from 'react';
import Camera, {FACING_MODES} from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import Webcam from "react-webcam";

class App extends Component {



    state= {
      imgSrc : '',
      firstName :'',
      lastName:'',
    }

  scan(){

        try{
          document.getElementById('error').style.display = 'none';
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
        <input type="file" id="myFile" onChange={this.handleFiles.bind(this)}></input>
        <label id="error" style={{ display: "none" }}></label>
        <img onLoad={this.scan.bind(this)} style={{ display: 'none' }} src={this.state.imgSrc} alt=''>
        </img>
        <p>{this.state.firstName}</p>
        <p>{this.state.lastName}</p >
        <div style={{ position: 'relative',display: 'flex', justifyContent: 'center', alignItems: 'flex-start',width:'90%',height: '50vh' }}>
        <svg style={{position: 'absolute', zIndex: '9999', width: '95%',height: '125', justifyContent: 'center'}}>
           <rect style={{ width: '100%',height: '80%', fill:'none', 'stroke-width': '15' , stroke: 'grey' }}/>
         </svg>
         <Camera style={{ position: 'absolute',width:'50%',opacity : '50%' }}

          idealFacingMode={FACING_MODES.ENVIRONMENT}
          isImageMirror={false}
          isMaxResolution={true}
          isFullscreen = {false }
          sizeFactor = {0.5}
          idealResolution = {{width: 1024, height: 720}}
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
