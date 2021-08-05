import {React, useState, useCallback} from 'react'
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import {recognisePicture} from '../../services/medication.services';
const Compress = require('compress.js')

const Webcam = (props) => {
    const [dataUri, setDataUri] = useState('');

        const handleTakePhoto = (dataUri) => {
          // Do stuff with the photo...
          console.log('takePhoto');
          console.log(typeof(dataUri))
        }
      
      
        const handleTakePhotoAnimationDone = (dataUri) => {
            // const file = new File([dataUri], "File name",{ type: "image/png" })
            sendImage(dataUri)
        }

        
        const sendImage = useCallback(async (image) => {
            try {
              
                const data = await recognisePicture(image);
                console.log(data)
            } catch (e) {
                console.error(e);
            }
        })
      
        const handleCameraError = (error) => {
          console.log('handleCameraError', error);
        }
      
        const handleCameraStart = (stream) => {
          console.log('handleCameraStart');
        }
      
        const handleCameraStop = () => {
          console.log('handleCameraStop');
        }
        
    return (
        <>
        {dataUri ?
        <>
        <div className={'demo-image-preview '}>
            <img src={dataUri} />
        </div> 

        <button className='countdown-wrapper__button btn'>
            Verzenden
        </button>

        <button className='countdown-wrapper__button btn' onClick={() => setDataUri(false)}>
            Opnieuw
        </button>
        </>
        :
        <Camera
            onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } }
            onTakePhotoAnimationDone = { (dataUri) => { handleTakePhotoAnimationDone(dataUri); } }
            onCameraError = { (error) => { handleCameraError(error); } }
            idealFacingMode = {FACING_MODES.ENVIRONMENT}
            idealResolution = {{width: 640, height: 480}}
            imageType = {IMAGE_TYPES.JPG}
            imageCompression = {0.57}
            isMaxResolution = {false}
            isImageMirror = {false}
            isSilentMode = {false}
            isDisplayStartCameraError = {true}
            isFullscreen = {false}
            sizeFactor = {1}
            onCameraStart = { (stream) => { handleCameraStart(stream); } }
            onCameraStop = { () => { handleCameraStop(); } }
        />
        }

        </>
    )
}

export default Webcam
