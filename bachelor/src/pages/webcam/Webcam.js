import { React, useState, useCallback, useMemo, useEffect } from 'react';
import { ReactDOM } from 'react-dom';
import { useDropzone } from 'react-dropzone';

import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { recognisePicture } from '../../services/medication.services';
import Lottie from 'react-lottie';
import Processing from '../../assets/lotties/processing.json';

var ReactDOMServer = require('react-dom/server');
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
  const [files, setFiles] = useState([]);

  useEffect(() => {
    return () => {
      setRendering(false);
    };
  });

  const handleTakePhoto = (dataUri) => {
    // Do stuff with the photo...
    console.log('takePhoto');
    console.log(typeof dataUri);
  };

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
    sendImage(dataUri);
    setDataUri(dataUri);
  };

  const sendBase64 = () => {
    setRendering(false);
  };

  const sendImage = useCallback(async (image) => {
    try {
      // const data = await recognisePicture(image);
    } catch (e) {
      console.error(e);
    }
  });

  const handleCameraError = (error) => {
    console.log('handleCameraError', error);
  };

  const handleCameraStart = (stream) => {
    console.log('handleCameraStart');
  };

  const handleCameraStop = () => {
    console.log('handleCameraStop');
  };
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles,
  } = useDropzone({
    accept: 'image/*',
    multiple: false,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
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
      {rendering ? (
        <>
          {dataUri ? (
            <>
              <div className={'demo-image-preview '}>
                <img src={dataUri} />
              </div>

              <button
                className='countdown-wrapper__button btn'
                onClick={() => sendBase64()}>
                Verzenden
              </button>

              <button
                className='countdown-wrapper__button btn'
                onClick={() => setDataUri(false)}>
                Opnieuw
              </button>
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
                  <button
                    className='countdown-wrapper__button btn'
                    onClick={() => setUpload(false)}>
                    Bestand Uploaden?
                  </button>
                </>
              ) : (
                <div className='container'>
                  <div {...getRootProps({ style })}>
                    {files.length > 0 ? (
                      <>
                        <img className='dropzone-img' src={files[0].preview} />
                        <button
                          className='countdown-wrapper__button btn'
                          onClick={remove}>
                          Verwijder de afbeelding
                        </button>
                        <button
                          className='countdown-wrapper__button btn'
                          onClick={() => setDataUri(false)}>
                          Verzenden
                        </button>
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
          <h2>De gegevens worden nu verwerkt</h2>
          <Lottie
            options={defaultOptions}
            height={'100%'}
            width={'100%'}
            className='test'
          />
        </>
      )}
    </>
  );
};

export default Webcam;
