import { React, useState, useMemo, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { recognisePicture } from '../../services/medication.services';
import Lottie from 'react-lottie';
import Processing from '../../assets/lotties/processing.json';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
};

const activeStyle = {
  borderColor: '#2196f3',
};

const acceptStyle = {
  borderColor: '#00e676',
};

const rejectStyle = {
  borderColor: '#ff1744',
};

const Webcam = (props) => {
  const [dataUri, setDataUri] = useState('');
  const [rendering, setRendering] = useState(true);
  const [upload, setUpload] = useState(true);
  const [uploadFile, setUploadFile] = useState([]);
  const [files, setFiles] = useState([]);
  const [responseSwitch, setResponseSwitch] = useState(true);
  const [response, setResponse] = useState({});

  const handleTakePhoto = (dataUri) => {
    // Do stuff with the photo...
    console.log('takePhoto');
    console.log(typeof dataUri);
  };

  const clearStates = () => {
    setRendering(true)
    setResponseSwitch(true)
    setResponse({})
    setUpload(true)
    setDataUri(false)
  }

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Processing,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const handleTakePhotoAnimationDone = (dataUri) => {
    // const file = new File([dataUri], "File name",{ type: "image/png" })
    setDataUri(dataUri);
  };

  const sendBase64 = () => {
    setRendering(false);
    sendImage(dataUri);

  };

  const sendImage = (async (image) => {
    try {
      const data = await recognisePicture(image);
      if(data) {
        setResponse({response: data})
        setResponseSwitch(false)
        console.log(data)
        console.log(response)
      }
      console.log(response)

    } catch (e) {
      console.error(e);
    }
  });

  const sendUploadImg = () => {
    setRendering(false)
    sendImage(uploadFile)
  }
 
  const handleCameraError = (error) => {
    console.log('handleCameraError', error);
  };

  const handleCameraStart = (stream) => {
    console.log('handleCameraStart');
  };

  const handleCameraStop = () => {
    console.log('handleCameraStop');
  };
  
  // code for dropzone
  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject} = useDropzone({

    accept: 'image/*',
    multiple: false,
    
    onDrop: (acceptedFiles) => {
      var file = acceptedFiles[0]
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadFile(event.target.result)
      };
      reader.readAsDataURL(file);

      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
            file: file.DATURL
          })
        )
      );
    },
  });

  const remove = (file) => {
    setFiles({}); // remove the file from the array
  };

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  return (
    <>
      {responseSwitch ?
        ( <>
            {rendering ? (
              <>
                {dataUri ? (
                  <>
                  <div className='container'>
                    <div className='row justify-content-center text-center'>
                        <div className={'demo-image-preview '}>
                          <img src={dataUri}  alt='preview'/>
                        </div>

                        <button
                          className='countdown-wrapper__button btn btn-red'
                          onClick={() => setDataUri(false)}>
                          Opnieuw
                        </button>
                        
                        <button
                          className='countdown-wrapper__button btn'
                          onClick={() => sendBase64()}>
                          Verzenden
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {upload ? (
                      <>
                        {' '}
                        <Camera
                          onTakePhoto={(dataUri) => {
                            handleTakePhoto(dataUri);
                          }}
                          onTakePhotoAnimationDone={(dataUri) => {
                            handleTakePhotoAnimationDone(dataUri);
                          }}
                          onCameraError={(error) => {
                            handleCameraError(error);
                          }}
                          idealFacingMode={FACING_MODES.ENVIRONMENT}
                          idealResolution={{ width: 640, height: 480 }}
                          imageType={IMAGE_TYPES.JPG}
                          imageCompression={0.57}
                          isMaxResolution={false}
                          isImageMirror={false}
                          isSilentMode={false}
                          isDisplayStartCameraError={true}
                          isFullscreen={false}
                          sizeFactor={1}
                          onCameraStart={(stream) => {
                            handleCameraStart(stream);
                          }}
                          onCameraStop={() => {
                            handleCameraStop();
                          }}
                        />
                        <div className='upload-wrapper'>
                          <button
                            className='countdown-wrapper__button btn'
                            onClick={() => setUpload(false)}>
                            Bestand Uploaden?
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className='container'>
                        <div className='go-back pb-50' onClick={() => setUpload(true)}>
                          <svg xmlns="http://www.w3.org/2000/svg" className='icon--back' viewBox="0 0 30 30"><path d="M 6.9804688 8.9902344 A 1.0001 1.0001 0 0 0 6.2929688 9.2929688 L 1.3808594 14.205078 A 1.0001 1.0001 0 0 0 1.3769531 15.792969 A 1.0001 1.0001 0 0 0 1.3828125 15.796875 L 6.2929688 20.707031 A 1.0001 1.0001 0 1 0 7.7070312 19.292969 L 4.4140625 16 L 28 16 A 1.0001 1.0001 0 1 0 28 14 L 4.4140625 14 L 7.7070312 10.707031 A 1.0001 1.0001 0 0 0 6.9804688 8.9902344 z"></path></svg>
                          Keer terug
                        </div>
                        <h4 className='text-center pb-50'> Sleep je bestanden hier of klik op de grijze zone</h4>
                        <div {...getRootProps({ style })}>
                          {files.length > 0 ? (
                            <>
                              <img className='dropzone-img' src={files[0].preview} alt='dropzone'/>
                              <div className='button-wrapper d-flex'>
                                <button
                                  className='countdown-wrapper__button btn btn-red'
                                  onClick={remove}>
                                  Verwijder de afbeelding
                                </button>
                                <button
                                  className='countdown-wrapper__button btn'
                                  onClick={sendUploadImg}>
                                  Verzenden
                                </button>
                              </div>
                            </>
                          ) : (
                            <>
                              <input {...getInputProps()} />
                              <p>
                                Drag 'n' drop some files here, or click to select
                                files
                              </p>
                            </>
                            )}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </>
              ) : (
                <>
                <div className='container'>
                  <div className='row'>
                    <h2 className='text-center'>De gegevens worden nu verwerkt</h2>
                    <Lottie
                      options={defaultOptions}
                      height={'100%'}
                      width={'100%'}
                      className='test'
                    />
                    </div>
                  </div>
                </>
              )
            }
            </>) :(<> 
        <div className='container'>
          <div className='row response-wrapper'>
            <h4 className='text-center pb-50'> Hier is de data die ik vond: </h4>
            <div className='response-wrapper__response-data' dangerouslySetInnerHTML={  {__html: response.response}}></div>
            <button className='btn' onClick={() => {clearStates(); }}>Opnieuw?</button>
          </div>
        </div> 
        </>
        )
      }
 </>
  );
};

export default Webcam;
