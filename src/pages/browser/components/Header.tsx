import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../components/UserSettingsModal";
import { useToggleModal } from "../../../modals";

const Header: React.FC<HeaderProps> = ({ className }) => {
  const toggleUserSettingsModal = useToggleModal("UserSettingsModal");
  return (
    <header
      className={
        (className ? className + " " : "") +
        "px-6 w-full h-14 flex items-center bg-white border-b border-gray-200 shadow-sm"
      }
    >
      <div className="font-brand text-3xl text-gray-900 translate-y-4">Gossip</div>
      <form className="px-4 h-10 ml-auto flex items-center border border-gray-200 rounded-full shadow-sm">
        <input
          className="p-0 border-0"
          type="text"
          name="search"
          id="search"
          placeholder="Search"
          autoComplete="off"
          aria-label="search"
        />
        <button className="ml-1" type="submit">
          <FontAwesomeIcon icon="search" fixedWidth />
        </button>
      </form>
      <button className="ml-4 w-10 h-10 text-lg rounded-full hover:bg-gray-100">
        <FontAwesomeIcon icon="bell" fixedWidth />
      </button>
      <button
        className="ml-4 w-10 h-10 text-lg rounded-full hover:bg-gray-100"
        onClick={toggleUserSettingsModal.bind(null, undefined)}
      >
        <FontAwesomeIcon icon="user-circle" fixedWidth />
      </button>
    </header>
  );
};

Header.propTypes = { className: PropTypes.string };

export default Header;

export type HeaderProps = { className?: string };
