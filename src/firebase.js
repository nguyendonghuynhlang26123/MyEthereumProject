import firebase from 'firebase/app';
import 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD4Rfc6rQ3yjUOmk01SAxqtiCp81vclX2w',
  authDomain: 'myethereumprj.firebaseapp.com',
  projectId: 'myethereumprj',
  storageBucket: 'myethereumprj.appspot.com',
  messagingSenderId: '807408199164',
  appId: '1:807408199164:web:af186f220408a5c8427e79',
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
// const storage = getStorage(app);

const storageRef = firebase.storage().ref();
const getImg = async (path) => {
  return storageRef.child(path).getDownloadURL();
};
export { getImg };
