import React from 'react';
import NotFound from '../assets/notfound.png';
import Egg from '../assets/egg.png';
import LazyLoad from 'react-lazyload';
import { getImg } from '../firebase';

export const PenguunImg = ({ isHatched = true, dna, className, ...props }) => {
  const [img, setImg] = React.useState(NotFound);
  const [blur, setBlur] = React.useState(true);

  React.useEffect(() => {
    let mutable = true;
    getImg(dna)
      .then((url) => {
        if (mutable) {
          setImg(url);
          setBlur(false);
        }
      })
      .catch((err) => {
        console.log(`Cannot find image for ${dna} `);
        if (mutable) {
          setImg(NotFound);
          setBlur(false);
        }
      });
    return () => {
      mutable = false;
    };
  }, []);
  return isHatched ? (
    <img {...props} src={img} className={`${className} ${blur ? ' filter blur-lg' : ''}`} />
  ) : (
    <img {...props} src={Egg} className={`${className}`} />
  );
};
