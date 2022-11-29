import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  deleteObject,
} from 'firebase/storage';
import app from '../config/firebase-config';

const storage = getStorage(app);

export const createRef = (url) => {
  return ref(storage, url);
};

export const uploadImage = async (ref, imageFile) => {
  await uploadBytes(ref, imageFile);
};

export const downloadImage = async (ref, callback) => {
  const imageUrl = await getDownloadURL(ref);
  callback(imageUrl);
};

export const getListImages = async (ref, callback) => {
  const listImages = await listAll(ref);
  callback(listImages.items);
};

export const downloadImages = async (ref, callback) => {
  const listImages = await listAll(ref);

  listImages.items.forEach(async (image) => {
    const imageUrl = await getDownloadURL(image);
    callback((prev) => [...prev, imageUrl]);
  });
};

export const deleteImage = async (ref) => {
  deleteObject(ref);
};
