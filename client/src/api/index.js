import axios from 'axios';

const baseURL = 'http://localhost:4010/';

export const validateUser = async (token) => {
    try {
        const res = await axios.get(`${baseURL}api/users/login`, {
            headers : {
                Authorization : "Bearer " + token,
            }
        })
        return res.data;
    } catch (error) {
        
    }
}

// Creamos el fetch para obtener los datos de los usuarios

export const getAllUsers = async () => {
    try {
        const res = await axios.get(`${baseURL}api/users/getUsers`);
        return res.data;
    } catch (error) {
        return null;
    }
}

export const getAllArtist = async () => {
    try {
      const res = await axios.get(`${baseURL}api/artists/getAll`);
      return res.data;
    } catch (error) {
      return null;
    }
  };

  export const getAllSongs = async () => {
    try {
      const res = await axios.get(`${baseURL}api/songs/getAll`);
      return res.data;
    } catch (error) {
      return null;
    }
  };

  export const getAllAlbums = async () => {
    try {
      const res = await axios.get(`${baseURL}api/albums/getAll`);
      return res.data;
    } catch (error) {
      return null;
    }
  };

  export const changeUserRole = async (userId, role) => {
    try {
      const res = await axios.put(`${baseURL}api/users/updateRole/${userId}`, { 
        data: { role : role }
      });
      return res;
    } catch (error) {
      return null;
    }
  }

  export const removeUser = async (userId) => {
    try {
      const res = await axios.delete(`${baseURL}api/users/deleteUser/${userId}`);
      return res;
    } catch (error) {
      return null;
    }
  }

  export const saveNewSong = async (data) => {
    try {
      const res = axios.post(`${baseURL}api/songs/save`, {...data});
      return (await res).data.song;
    } catch (error) {
      return null;
    }
  }