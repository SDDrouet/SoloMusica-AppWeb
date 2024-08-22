import React, { useEffect, useRef, useState} from 'react'
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { motion } from 'framer-motion';

import { BiCloudUpload } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';

import { storage } from '../config/firebase.config';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';
import FilterButtons from './FilterButtons';
import { filterByLanguage, filters } from '../utils/supportfunctions';
import { getAllAlbums, getAllArtist, getAllSongs, saveNewAlbum, saveNewArtist, saveNewSong } from '../api';


const DashboardNewSong = () => {
  const [songName, setSongName] = useState('');
  const [fileAudioName, setFileAudioName] = useState('');
  const [songImageCover, setSongImageCover] = useState(null);
  const [{allArtists, allAlbums}, dispath] = useStateValue();
  const [{ filterTerm, artistFilter, albumFilter, languageFilter },] = useStateValue();
  const [isImageLoading, setIsImageLoading] = useState(false)
  const [imageUploadProgress, setImageUploadProgress] = useState(0);

  const [audioImageCover, setAudioImageCover] = useState(null);
  const [audioUploadProgress, setAudioUploadProgress] = useState(0);
  const [isAudioLoading, setIsAudioLoading] = useState(false);


  //artist
  const [artistImageCover, setArtistImageCover] = useState(null);
  const [isArtistLoading, setIsArtistLoading] = useState(false);
  const [artistUploadProgress, setArtistUploadProgress] = useState(0);
  const [artistName, setArtistName] = useState('');
  const [twitter, setTwitter] = useState('');
  const [instagram, setInstagram] = useState('');

  //album
  const [albumImageCover, setAlbumImageCover] = useState(null);
  const [isAlbumLoading, setIsAlbumLoading] = useState(false);
  const [albumUploadProgress, setAlbumUploadProgress] = useState(0);
  const [albumName, setAlbumName] = useState('');


  const [setAlert, setSetAlert] = useState(null);
  const [alertMsg, setAlertMsg] = useState("");

  useEffect(() => {
    if (!allArtists) {
      getAllArtist().then((data) => {
        dispath({
          type: actionType.SET_ALL_ARTISTS,
          allArtists: data.artist,
        });
      });
    }

    if (!allAlbums) {
      getAllAlbums().then((data) => {
        dispath({
          type: actionType.SET_ALL_ALBUMS,
          allAlbums: data.album,
        });
      });
    }

  }, []);

  const deleteFileImage = (url, isImage) => {
      if (isImage) {
        setIsImageLoading(true);  
      }

      const deletRef = ref(storage, url);

      deleteObject(deletRef).then(() => {
        setSongImageCover(null);
        setIsImageLoading(false);
      });

  }

  const deleteFileAudio = (url, isImage) => {
    if (isImage) {
      setIsAudioLoading(true);      
    }

    const deletRef = ref(storage, url);

    deleteObject(deletRef).then(() => {
      setAudioImageCover(null);
      setIsAudioLoading(false);
    });

  }

  const deleteFileArtist = (url, isImage) => {
    if (isImage) {
      setIsArtistLoading(true);      
    }

    const deletRef = ref(storage, url);

    deleteObject(deletRef).then(() => {
      setArtistImageCover(null);
      setIsArtistLoading(false);
    });

  }

  const deleteFileAlbum = (url, isImage) => {
    if (isImage) {
      setIsAlbumLoading(true);      
    }

    const deletRef = ref(storage, url);

    deleteObject(deletRef).then(() => {
      setAlbumImageCover(null);
      setIsAlbumLoading(false);
    });
  }

  const saveSong = () => {
    if(!songImageCover || !audioImageCover || !songName || !artistFilter || !albumFilter || !languageFilter) {
      // alerta
    } else {
      setIsAudioLoading(true);
      setIsImageLoading(true);

      const data = {
        name: songName,
        imageUrl: songImageCover,
        songUrl: audioImageCover,
        album: albumFilter,
        artist: artistFilter,
        language: languageFilter,
        category: filterTerm,
      };

      saveNewSong(data).then(res => {
        getAllSongs().then(songs => {
          dispath({
            type: actionType.SET_ALL_SONGS,
            allSongs: songs.song,
          });
        });
      });

      setSongName('');
      setIsAudioLoading(false);
      setIsImageLoading(false);
      setSongImageCover(null);
      setAudioImageCover(null);
      dispath({ type: actionType.SET_FILTER_TERM, filterTerm: null });
      dispath({ type: actionType.SET_ARTIST_FILTER, artistFilter: null });
      dispath({ type: actionType.SET_ALBUM_FILTER, albumFilter: null });
      dispath({ type: actionType.SET_LANGUAGE_FILTER, languageFilter: null });

    }
  }

  const saveArtist = () => {
    if (!artistImageCover || !artistName || !twitter || !instagram) {
      //alert
    } else {
      setIsArtistLoading(true);

      const data =  {
        name: artistName,
        imageUrl: artistImageCover,
        twitter: `x.com/${twitter}`,
        instagram: `www.instagram.com/${instagram}`,
      }

      saveNewArtist(data).then(res => {
        getAllArtist().then(data => {
          dispath({
            type: actionType.SET_ALL_ARTISTS,
            allArtists: data.artist,
          });
        });
      });

      setIsArtistLoading(false);
      setArtistImageCover(null);
      setArtistName('');
      setTwitter('');
      setInstagram('');

    }

  }

  const saveAlbum = () => {
    if (!albumImageCover || !albumName) {
      //alert
    } else {
      setIsAlbumLoading(true);

      const data = {
        name: albumName,
        imageUrl: albumImageCover,
      }

      saveNewAlbum(data).then(res => {
        getAllAlbums().then(data => {
          dispath({
            type: actionType.SET_ALL_ALBUMS,
            allAlbums: data.album,
          });
        });
      });

      setIsAlbumLoading(false);
      setAlbumImageCover(null);
      setAlbumName('');
    }
  }

  return (
    <div className='flex items-start justify-start gap-4 w-full'>
    {/* new song  Form*/}
    <div className='flex flex-col items-center w-full justify-center px-4 py-7 border border-secondaryColorLight rounded-md bg-secondaryColor gap-4'>

      <input
        type="text"
        placeholder='Nombre de la canción'
        className='w-full p-3 rounded-md text-base font-semibold border-2 border-primaryColor text-primaryColor outline-none shadow-sm bg-quaternaryColor'
        value={songName}
        onChange={(e) => setSongName(e.target.value)}
      />

      <div className='flex w-full justify-between flex-wrap items-center gap-4'>
        <FilterButtons filterData={allArtists} flag="Artista" />
        <FilterButtons filterData={allAlbums} flag="Álbum" />
        <FilterButtons filterData={filterByLanguage} flag="Idioma" />
        <FilterButtons filterData={filters} flag="Género" />
      </div>

      <div className='bg-primaryColorLight backdrop-blur-md w-full h-300 rounded-md border-2 border-primaryColor hover:border-tertiaryColor'>
        {isImageLoading && <FileLoader progress={imageUploadProgress}/>}
        {!isImageLoading && (
          <>
            {!songImageCover ? (
              <FileUploader
                updateState = {setSongImageCover}
                setProgress = {setImageUploadProgress}
                isLoading = {setIsImageLoading}
                isImage={true}
              />
            ) : (
              <div className='relative w-full h-full overflow-hidden rounded-md'>
                <img 
                  src={songImageCover}
                  className='w-full h-full object-cover cursor-default'
                  alt=""
                />

                <button
                  type='button'
                  className='absolute bottom-3 right-3 p-3 rounded-full bg-red-500 hover:bg-deleteColor text-xl cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease-in-out'
                  onClick={() => deleteFileImage(songImageCover, true)}
                >
                  <MdDelete className='text-quaternaryColor'/>
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Audio File */}
      <div className='bg-primaryColorLight backdrop-blur-md w-full h-300 rounded-md border-2 border-primaryColor hover:border-tertiaryColor'>
        {isAudioLoading && <FileLoader progress={audioUploadProgress}/>}
        {!isAudioLoading && (
          <>
            {!audioImageCover ? (
              <FileUploader
                updateState = {setAudioImageCover}
                setProgress = {setAudioUploadProgress}
                isLoading = {setIsAudioLoading}
                isImage={false}
                setFileAudioName={setFileAudioName}
              />
            ) : (
              <div className='relative w-full h-full flex flex-col items-center justify-center overflow-hidden rounded-md'>
                <p className='text-base text-quaternaryColor mb-4'>{fileAudioName}</p>
                
                <audio src={audioImageCover} controls></audio>

                <button
                  type='button'
                  className='absolute bottom-3 right-3 p-3 rounded-full bg-red-500 hover:bg-deleteColor text-xl cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease-in-out'
                  onClick={() => deleteFileAudio(audioImageCover, false)}
                >
                  <MdDelete className='text-quaternaryColor'/>
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <div className='flex items-center justify-center w-60 cursor-pointer'>
          {isImageLoading || isAudioLoading ? (
            <DisabledButton />
          ) : (
            <motion.button
              whileTap={{ scale: 0.90 }}
              className='px-8 py-2 w-full rounded-md text-primaryColor font-semibold bg-tertiaryColor hover:shadow-lg hover:bg-tertiaryColorLight'
              onClick={saveSong}
            >
              Guardar Canción
            </motion.button>
          )}
      </div>
    </div>

    <div className='flex flex-col items-start justify-start w-full gap-4'>

    {/* new artist Form*/}

    <div className='flex w-full h-1/2 flex-col items-center justify-center px-4 py-8 border border-secondaryColorLight rounded-md bg-secondaryColor gap-4'>
      <p className='text-quaternaryColor font-semibold text-2xl'>Nuevo Artista</p>

      <div className='relative flex w-full h-full items-start justify-start gap-4'>
          {/* insertar imagen*/}
          <div className='bg-primaryColorLight backdrop-blur-md w-1/2 h-300 rounded-md border-2 border-primaryColor hover:border-tertiaryColor'>
        {isArtistLoading && <FileLoader progress={artistUploadProgress}/>}
        {!isArtistLoading && (
          <>
            {!artistImageCover ? (
              <FileUploader
                updateState = {setArtistImageCover}
                setProgress = {setArtistUploadProgress}
                isLoading = {setIsArtistLoading}
                isImage={true}
              />
            ) : (
              <div className='relative w-full h-full overflow-hidden rounded-md'>
                <img 
                  src={artistImageCover}
                  className='w-full h-full object-cover cursor-default'
                  alt=""
                />

                <button
                  type='button'
                  className='absolute bottom-3 right-3 p-3 rounded-full bg-red-500 hover:bg-deleteColor text-xl cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease-in-out'
                  onClick={() => deleteFileArtist(artistImageCover, true)}
                >
                  <MdDelete className='text-quaternaryColor'/>
                </button>
              </div>
            )}
          </>
        )}
      </div>

        {/* campos de entrada*/}

        <div className='flex flex-col items-center justify-center w-1/2 h-full gap-2'>
          <input
            type="text"
            placeholder='Nombre del artista...'
            className='w-full p-3 rounded-md text-base font-semibold text-primaryColor border-2 border-primaryColor outline-none shadow-sm bg-quaternaryColor'
            value={artistName}
            onChange={(e) => setArtistName(e.target.value)}
          />

          <div className='flex items-center p-3 border-2 border-primaryColor rounded-md bg-quaternaryColor w-full'>
            <p className='text-base font-semibold text-gray-400'>x.com/</p>
            <input
              type="text"
              placeholder='X ID (Twitter ID)'
              className='text-base font-semibold text-primaryColor outline-none bg-transparent'
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
            />
          </div>

          <div className='flex items-center p-3 border-2 border-primaryColor rounded-md bg-quaternaryColor w-full'>
            <p className='text-base font-semibold text-gray-400'>www.instagram.com/</p>
            <input
              type="text"
              placeholder='Instagram ID'
              className='text-base font-semibold text-primaryColor outline-none bg-transparent'
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
            />
          </div>

          <div className='absolute bottom-0 right-0 w-60 cursor-pointer'>
          {isArtistLoading ? (
            <DisabledButton />
          ) : (
            <motion.button
              whileTap={{ scale: 0.90 }}
              className='px-8 py-2 w-full rounded-md text-primaryColor font-semibold bg-tertiaryColor hover:shadow-lg hover:bg-tertiaryColorLight'
              onClick={saveArtist}
            >
              Guardar Artista
            </motion.button>
          )}
      </div>
        </div>


      </div>

    </div>

    {/* new album Form*/}

    <div className='flex w-full h-1/2 flex-col items-center justify-center px-4 py-8 border border-secondaryColorLight rounded-md bg-secondaryColor gap-4'>
      <p className='text-quaternaryColor font-semibold text-2xl'>Nuevo Álbum</p>

      <div className='relative flex w-full h-full items-start justify-start gap-4'>
          {/* insertar imagen*/}
          <div className='bg-primaryColorLight backdrop-blur-md w-1/2 h-300 rounded-md border-2 border-primaryColor hover:border-tertiaryColor'>
        {isAlbumLoading && <FileLoader progress={albumUploadProgress}/>}
        {!isAlbumLoading && (
          <>
            {!albumImageCover ? (
              <FileUploader
                updateState = {setAlbumImageCover}
                setProgress = {setAlbumUploadProgress}
                isLoading = {setIsAlbumLoading}
                isImage={true}
              />
            ) : (
              <div className='relative w-full h-full overflow-hidden rounded-md'>
                <img 
                  src={albumImageCover}
                  className='w-full h-full object-cover cursor-default'
                  alt=""
                />

                <button
                  type='button'
                  className='absolute bottom-3 right-3 p-3 rounded-full bg-red-500 hover:bg-deleteColor text-xl cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease-in-out'
                  onClick={() => deleteFileAlbum(albumImageCover, true)}
                >
                  <MdDelete className='text-quaternaryColor'/>
                </button>
              </div>
            )}
          </>
        )}
      </div>

        {/* campos de entrada*/}

        <div className='flex flex-col items-center justify-start w-1/2 h-52 gap-2'>
          <input
            type="text"
            placeholder='Nombre del álbum...'
            className='w-full p-3 rounded-md text-base font-semibold text-primaryColor border-2 border-primaryColor outline-none shadow-sm bg-quaternaryColor'
            value={albumName}
            onChange={(e) => setAlbumName(e.target.value)}
          />


          <div className='absolute bottom-0 right-0 w-60 cursor-pointer'>
          {isAlbumLoading ? (
            <DisabledButton />
          ) : (
            <motion.button
              whileTap={{ scale: 0.90 }}
              className='px-8 py-2 w-full m-0 rounded-md text-primaryColor font-semibold bg-tertiaryColor hover:shadow-lg hover:bg-tertiaryColorLight'
              onClick={saveAlbum}
            >
              Guardar Álbum
            </motion.button>
          )}
      </div>
        </div>


      </div>
    </div>

    </div>
    </div>
  )
}

export const DisabledButton = () => {
  return (
   <>
    <button disabled type="button" className="px-8 py-2 w-full font-semibold rounded-md text-primaryColor bg-quaternaryColor hover:bg-quaternaryColorLight hover:text-tertiaryColorLight focus:z-10 focus:ring-4 focus:outline-none focus:ring-tertiaryColorLight focus:text-tertiaryColorLight dark:bg-primaryColorLight dark:text-gray-400 inline-flex items-center justify-center">
    <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-quaternaryColor animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
    </svg>
    Cargando...
    </button>

   </>
  )
}

export const FileLoader = ({progress}) => {
  return (
    <div className='flex items-center justify-center w-full h-full gap-4'>
      
      <div className='w-20 h-20 mr-6 min-w-[40px] bg-tertiaryColor animate-ping rounded-full flex items-center justify-center relative'>
        <div className='absolute inset-0 rounded-full bg-tertiaryColorLight blur-xl'></div>
      </div>
      <BiCloudUpload className='text-6xl text-quaternaryColor'/>
      
      <p className='text-xl text-quaternaryColor font-semibold'>
        {Math.round(progress) > 0 && <>{`${Math.round(progress)}%`}</>}
      </p>
    </div>
  )
}

export const FileUploader = ({updateState, setProgress, isLoading, isImage, setFileAudioName}) => {

  const uploadFile = (e) => {
    isLoading(true)
    const uploadedFile = e.target.files[0];

    const storageRef = ref(
      storage,
      `${isImage ? "Img" : "Audio"}/${Date.now()}-${uploadedFile.name}`,
    );

    if (!isImage) {
      setFileAudioName(uploadedFile.name);
    }    

    const uploadTask = uploadBytesResumable(storageRef, uploadedFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          updateState(downloadURL);          
          isLoading(false)
        });
      }
    );
  }

  return <label>
    <div className='flex flex-col items-center justify-center h-full cursor-pointer'>
        <div className='flex flex-col justify-center items-center text-quaternaryColor'>
          <p className='font-bold text-5xl'>
            <BiCloudUpload />
          </p>
          <p className='text-lg'>Presiona para cargar un{ isImage ? "a imagen" : " audio"}</p>
        </div>
    </div>
    <input 
      type="file"
      name="upload-file"
      accept={`${isImage ? "image/*" : "audio/*"}`}
      className='w-0 h-0'
      onChange={uploadFile}
    />
  </label>
}


export default DashboardNewSong