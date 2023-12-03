import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./table.module.css";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";

const Table = () => {
  const [userData, setUserData] = useState([]);

  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAllRows, setSelectAllRows] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const filteredUsers = userData.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const visiblePages = 5;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setSelectAllRows(false);
  };

  const handleCheckboxChange = (userId) => {
    setSelectedRows((prevSelectedRows) => {
      console.log(prevSelectedRows);
      if (prevSelectedRows?.includes(userId)) {
        return prevSelectedRows?.filter((id) => id !== userId);
      } else {
        return [...prevSelectedRows, userId];
      }
    });
  };

  const handleSelectAllRows = () => {
    setSelectAllRows((prevSelectAllRows) => !prevSelectAllRows);
    setSelectedRows(() => {
      if (selectAllRows == []) {
        const newSelectedRows = filteredUsers.map((user) => user.id);
        return newSelectedRows;
      } else {
        return [];
      }
    });
  };

  const handleDeleteSelectedRows = () => {
    setUserData((prevUserData) =>
      prevUserData.filter((user) => !selectedRows.includes(user.id))
    );
    setSelectedRows([]);
    setSelectAllRows(false);
  };

  const handleEditUser = (userId) => {
    console.log(`Edit user with ID ${userId}`);
  };

  const handleDeleteUser = (userId) => {
    setUserData((prevUserData) =>
      prevUserData.filter((user) => user.id !== userId)
    );
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.filter((id) => id !== userId)
    );
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    for (
      let i = Math.max(1, currentPage - Math.floor(visiblePages / 2));
      i <= Math.min(totalPages, currentPage + Math.floor(visiblePages / 2));
      i++
    ) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          disabled={i === currentPage}
          className={styles.paginationButtons}
        >
          {i}
        </button>
      );
    }

    return buttons;
  };

  useEffect(() => {
    const getUsersData = async () => {
      try {
        const usersData = await axios.get(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        setUserData(usersData.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUsersData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset to the first page when searching
            setSelectAllRows(false); // Reset selectAllRows when searching
          }}
          className={styles.searchBar}
        />
        <button
          onClick={handleDeleteSelectedRows}
          disabled={selectedRows.length === 0}
          className={styles.buttonStyles}
        >
          Delete Selected
        </button>
      </div>

      <table className={styles.tableContainer}>
        <thead>
          <tr>
            <th className={styles.tableColHeader}>
              <input
                type="checkbox"
                checked={selectAllRows}
                onChange={handleSelectAllRows}
                disabled={filteredUsers.length === 0}
                className={styles.checkbox}
              />
              Name
            </th>
            <th className={styles.tableColHeader}>Email</th>
            <th className={styles.tableColHeader}>Role</th>
            <th className={styles.tableColHeader}>Actions</th>
          </tr>
        </thead>
        {userData ? (
          <tbody className={styles.tableBody}>
            {filteredUsers
              .slice(
                (currentPage - 1) * usersPerPage,
                currentPage * usersPerPage
              )
              .map((user) => (
                <tr
                  key={user.id}
                  style={{
                    backgroundColor: selectedRows.includes(user.id)
                      ? "#F8FAFC"
                      : "transparent",
                  }}
                >
                  <td className={styles.tableData}>
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(user.id)}
                      onChange={() => handleCheckboxChange(user.id)}
                      className={styles.checkbox}
                    />
                    {user.name}
                  </td>
                  <td className={styles.tableData}>{user.email}</td>
                  <td className={styles.tableData}>{user.role}</td>
                  <td className={styles.tableData}>
                    <button
                      onClick={() => handleEditUser(user.id)}
                      className={styles.rowButtons}
                    >
                      <BiEdit size={20} />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className={styles.rowButtons}
                    >
                      <MdDeleteOutline size={20} />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        ) : (
          <div>Loading...</div>
        )}
      </table>

      <div className={styles.pagination}>
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className={styles.paginationButtons}
        >
          <MdKeyboardDoubleArrowLeft size={20} />
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={styles.paginationButtons}
        >
          <IoIosArrowBack size={18} />
        </button>
        {renderPaginationButtons()}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={styles.paginationButtons}
        >
          <IoIosArrowForward size={18} />
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={styles.paginationButtons}
        >
          <MdKeyboardDoubleArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default Table;
