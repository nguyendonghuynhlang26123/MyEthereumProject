import React from 'react';
import MaleGender from '../assets/male.svg';
import FemaleGender from '../assets/female.svg';
import BisexGender from '../assets/bisex.svg';
import { Link } from 'react-router-dom';
import { PenguunImg } from './PenguunImg';

export const PenguunCard = ({ penguun, className = '', onClick = (ev) => {} }) => {
  const getGenderImg = (gender) => {
    if (gender == '0') return MaleGender;
    else if (gender == '1') return FemaleGender;
    else return BisexGender;
  };

  return (
    <Link
      to={`/penguuns/${penguun.id}`}
      className={
        'w-52 py-4 px-2 my-4 mx-2 border border-gray-300 rounded-md group hover:opacity-90 hover:bg-gray-200 hover:shadow cursor-pointer flex flex-col items-start ' +
        className
      }
      onClick={onClick}
    >
      <span className="bg-main rounded-lg text-white px-4 text-sm font-bold">Gen# {penguun.generation}</span>
      <span className="text-gray-400 text-xs px-1">Breed count: {penguun.breedCount}</span>
      <PenguunImg className="w-full object-cover rounded-md group-hover:opacity-90 my-2" dna={penguun.dna} />

      <div className="flex flex-row justify-between w-full items-end">
        <div>
          <span className="text-sm text-gray-600 mt-3 ">#{penguun.id}</span>
          <span className="flex flex-row items-center gap-1">
            <h1 className="text-lg font-bold truncate">{penguun.name}</h1>
            <img src={getGenderImg(penguun.gender)} alt="" className="w-5 h-5" />
          </span>
        </div>
        <div className="flex items-end gap-1"></div>
      </div>
    </Link>
  );
};
