import React from 'react';
import NotFound from '../assets/notfound.png';
import { getImg } from '../firebase';

export const PenguunImg = ({ dna, className, ...props }) => {
  const [img, setImg] = React.useState(NotFound);
  const [blur, setBlur] = React.useState(true);

  React.useEffect(() => {
    getImg(`images/${dna}.png`)
      .then((url) => {
        setImg(url);
        setBlur(false);
      })
      .catch((err) => {
        console.log(`Cannot find image for ${dna} `);
        setImg(NotFound);
        setBlur(false);
      });
  }, []);
  return <img {...props} src={img} className={`${className} ${blur ? ' filter blur-lg' : ''}`} />;
};
