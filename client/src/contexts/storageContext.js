import React, { useContext } from 'react';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
} from 'firebase/storage';
import app from '../config/firebase-config';

const StorageContext = React.createContext();
const storage = getStorage(app);

export function useStorage() {
  return useContext(StorageContext);
}

export function StorageProvider({ children }) {
  const createRef = (url) => {
    return ref(storage, url);
  };

  const uploadImage = async (ref, imageFile) => {
    await uploadBytes(ref, imageFile);
    // const imageUrl = await getDownloadURL(ref);
    // callback(imageUrl);
    // return imageUrl;
  };

  const downloadImage = async (ref, callback) => {
    const imageUrl = await getDownloadURL(ref);
    callback(imageUrl);
  };

  const getListImages = async (ref, callback) => {
    const listImages = await listAll(ref);
    callback(listImages.items);
  };

  const downloadImages = async (ref, callback) => {
    const listImages = await listAll(ref);

    listImages.items.forEach(async (image) => {
      const imageUrl = await getDownloadURL(image);
      callback((prev) => [...prev, imageUrl]);
    });
  };

  const value = {
    createRef,
    uploadImage,
    downloadImage,
    getListImages,
    downloadImages,
  };

  return (
    <StorageContext.Provider value={value}>{children}</StorageContext.Provider>
  );
}
