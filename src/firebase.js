import firebase from 'firebase/app';
import 'firebase/storage';

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
const getImg = async (dna) => {
  const rs = await fetch(`http://localhost:4000/getSrc/${dna}`, { mode: 'no-cors' }); //Just wait for this function to upload generated img

  return storageRef.child(`images/${dna}.png`).getDownloadURL();
};
export { getImg };
