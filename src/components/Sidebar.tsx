import React from 'react';
import ethereumIcon from '../assets/ethereum.svg';
import { Link } from 'react-router-dom';

export type SidebarProps = {
  items: {
    label: string;
    icon: any;
    className?: string;
    action?: () => void;
    href: string;
  }[];
  currentIndex?: number;
  open?: boolean;
};

export const Sidebar = ({ items, currentIndex = 0, open }: SidebarProps) => {
  return (
    <div className={`h-screen shadow-md relative w-80 bg-white dark:bg-gray-700 ${open ? 'block ' : 'hidden'}`}>
      <div className="flex items-center justify-start pt-4 ml-8">
        <p className="font-bold dark:text-white text-2xl leading-4 flex flex-row justify-between items-center py-2 logo">
          My
          <img src={ethereumIcon} className="mx-2" />
          project
        </p>
      </div>
      <nav className="mt-6">
        <div>
          {items?.map((item, i) => (
            <Link
              className={`w-full border-l-4 border-transparent text-gray-800 dark:text-white flex items-center pl-8 p-2 my-2 transition-colors duration-200 justify-start ${
                currentIndex == i ? 'border-purple-500 text-purple-500 font-bold' : ''
              }`}
              to={item.href}
              key={i}
              onClick={(ev) => {
                if (item.action) item.action();
              }}
            >
              <span className="text-left">{item.icon}</span>
              <span className={`mx-2 text-sm ${item.className}`}>{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};
