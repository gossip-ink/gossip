import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navigation: React.FC<NavigationProps> = ({ width }) => (
  <aside
    className="h-full flex flex-col bg-gray-50 border-r border-gray-200 shadow-sm"
    style={{ width: `${width}px` }}
  >
    <section className="p-2">
      <a className="block px-4 py-1 rounded-full cursor-pointer transition duration-150 hover:bg-white hover:shadow-sm">
        <FontAwesomeIcon className="mr-1" icon="inbox" fixedWidth />
        <span>Inbox</span>
      </a>
      <a className="block px-4 py-1 rounded-full cursor-pointer transition duration-150 hover:bg-white hover:shadow-sm">
        <FontAwesomeIcon className="mr-1" icon="users" fixedWidth />
        <span>Shared</span>
      </a>
      <a className="block px-4 py-1 rounded-full cursor-pointer transition duration-150 hover:bg-white hover:shadow-sm">
        <FontAwesomeIcon className="mr-1" icon="star" fixedWidth />
        <span>Starred</span>
      </a>
      <a className="block px-4 py-1 rounded-full cursor-pointer transition duration-150 hover:bg-white hover:shadow-sm">
        <FontAwesomeIcon className="mr-1" icon="trash-alt" fixedWidth />
        <span>Trash</span>
      </a>
    </section>
    <section className="p-2 border-t">
      <header className="mb-2 mx-2 text-gray-700 font-bold text-sm uppercase">
        Personal Workspace
      </header>
      <a className="block px-4 py-1 rounded-full cursor-pointer transition duration-150 hover:bg-white hover:shadow-sm">
        <FontAwesomeIcon className="mr-1" icon="folder" fixedWidth />
        <span>My First Folder</span>
      </a>
    </section>
    <section className="p-2 border-t">
      <header className="mb-2 mx-2 text-gray-700 font-bold text-sm uppercase">
        Team Workspaces
      </header>
      <a className="block px-4 py-1 rounded-full cursor-pointer transition duration-150 hover:bg-white hover:shadow-sm">
        <FontAwesomeIcon className="mr-1" icon="building" fixedWidth />
        <span>Gossip Inc</span>
      </a>
      <a className="block px-4 py-1 rounded-full cursor-pointer transition duration-150 hover:bg-white hover:shadow-sm">
        <FontAwesomeIcon className="mr-1" icon="building" fixedWidth />
        <span>Alibaba Group</span>
      </a>
      <a className="block px-4 py-1 rounded-full cursor-pointer transition duration-150 hover:bg-white hover:shadow-sm">
        <FontAwesomeIcon className="mr-1" icon="building" fixedWidth />
        <span>IDEAS Lab</span>
      </a>
    </section>
  </aside>
);

Navigation.propTypes = {
  width: PropTypes.number.isRequired,
};

export default Navigation;

export type NavigationProps = {
  width: number;
};
