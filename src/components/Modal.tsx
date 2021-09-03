import React from 'react';

type ModalProps = {
  title: string;
  children: any;
  buttons: {
    label: string;
    action: () => void;
    className?: string;
  }[];
  cancelAction: () => void;
};

export const Modal = (props: ModalProps) => {
  return (
    <div className="flex items-center justify-center fixed left-0 bottom-0 w-full h-full bg-gray-800 z-50">
      <div className="bg-white rounded-lg w-1/2">
        <div className="flex flex-col items-start p-4">
          <div className="flex items-center w-full divide-y divide-fuchsia-300">
            <div className="text-gray-900 font-medium text-lg">
              {props.title}
            </div>

            <button
              onClick={props.cancelAction}
              className="ml-auto fill-current text-gray-700 w-6 h-6 cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
              </svg>
            </button>
          </div>
          <div className="py-4">{props.children}</div>
          <div className="ml-auto ">
            {props.buttons?.map((b, i) => (
              <button
                key={i}
                className={`font-bold py-2 px-4 rounded mx-1 ${
                  b.className || 'bg-blue-500 hover:bg-blue-700 text-white'
                }`}
                onClick={b.action}
              >
                {b.label}
              </button>
            ))}
            <button
              className={`mx-1 py-2 px-4 rounded border hover:bg-gray-100 `}
              onClick={props.cancelAction}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
