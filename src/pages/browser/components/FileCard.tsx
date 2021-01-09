import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FileCard: React.FC<FileCardProps> = ({}) => (
  <Link
    to="/editor"
    className="relative m-0 h-0 pt-full bg-gray-50 border border-gray-300 rounded shadow-md transition duration-150 hover:border-blue-400"
  >
    <footer className="absolute right-0 bottom-0 left-0 pt-4 pb-3 pl-4 pr-2 border-t border-gray-300">
      <div className="font-bold text-gray-900 overflow-ellipsis overflow-hidden">
        My first presentation
      </div>
      <div className="flex items-center">
        <span className="text-gray-600 text-sm">
          <FontAwesomeIcon className="mr-1" icon="calendar" fixedWidth />
          <span>last week</span>
        </span>
        <button className="w-8 h-8 ml-auto rounded-full transition duration-150 hover:bg-white hover:shadow">
          <FontAwesomeIcon className="" icon="ellipsis-h" fixedWidth />
        </button>
      </div>
    </footer>
  </Link>
);

FileCard.propTypes = {};

export default FileCard;

export type FileCardProps = {};
