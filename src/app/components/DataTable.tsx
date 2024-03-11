import React, { useEffect, useState } from "react";
import Image from "next/image";

import { tableHead, tableInfo } from "./Data";
import { useDispatch, useSelector } from "react-redux";
import kababMenu from "../icons/dots.png";
import { DownOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";
import { Dropdown, Space, Menu } from "antd";
import { Button, Modal } from "antd";
import { UseDispatch } from "react-redux";
import { addUsers } from "../storeFolder/UserReducer";
import { updateUser } from "../storeFolder/UserReducer";
import { deleteUser } from "../storeFolder/UserReducer";

const items: MenuProps["items"] = [
  {
    label: "Edit",
    key: "0",
  },
  {
    label: "Delet",
    key: "1",
  },
  {
    type: "divider",
  },
];
const DataTable = () => {
  const users = useSelector((state: any) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();

  const handelUpdate = (event: any) => {
    event.preventDefault();
    dispatch(updateUser(updateValues));
    setViewModel(false);
  };

  const [inputValues, setInputValues] = useState<Record<string, string>>({});

  const handleInputChange = (e: any, fieldName: string) => {
    setInputValues((prevState) => ({
      ...prevState,
      [fieldName]: e.target.value,
    }));
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = (event: any) => {
    event.preventDefault();
    dispatch(addUsers(inputValues));

    setIsModalOpen(false);
    setInputValues({});
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [updatedData, setUpdatedData] = useState<any>([]);

  const deletfunt = (item: any, index: number) => {
    setUpdatedData(item);
  };

  const [selectedValue, setSelectedValue] = useState("");
  const [viewModel, setViewModel] = useState(false);

  const showViewModal = () => {
    setViewModel(true);
  };

  const handleModelOk = (event: any) => {
    setViewModel(false);
  };

  const handleCancelOk = () => {
    setViewModel(false);
  };

  const [getUpdateData, setGetUpdateData] = useState({});

  const deletUserData = (idx: any) => {
    dispatch(deleteUser({ BARCODE: idx }));
  };

  const handleMenuClick = (key: any) => {
    setSelectedValue(key);
    if (key.key == "edit") {
      setViewModel(true);
    }
    if (key.key == "delete") {
      deletUserData(updatedData.BARCODE);
    }
  };
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="edit">Edit</Menu.Item>
      <Menu.Item key="delete">Delete</Menu.Item>
    </Menu>
  );

  const [updateValues, setUpdateValues] = useState<Record<string, string>>({});

  useEffect(() => {
    setUpdateValues(updatedData);
  }, [updatedData]);

  const handleInputUpdate = (e: any, fieldName: string) => {
    setUpdateValues((prevState) => ({
      ...prevState,
      [fieldName]: e.target.value,
    }));
  };

  useEffect(() => {
    // Initialize updateValues with initial values
    const initialValues: Record<string, string> = {};
    tableHead.forEach((item) => {
      initialValues[item] = updateValues[item] || "";
    });
    setUpdateValues(initialValues);
  }, []);

  return (
    <div className="ml-12">
      <div className="flex mt-10 items-center">
        <h1 className="text-2xl font-bold">Work Orders</h1>

        <span
          onClick={showModal}
          className="w-40 cursor-pointer bg-blue-600 text-white font-bold p-3 rounded-[40px]"
        >
          {" "}
          + REACT ORDER
        </span>
      </div>

      <div className="mt-4">
        <p>
          {" "}
          <span className="font-bold">Date:</span> 06/07/2024 - 07/08/2024
        </p>
      </div>

      <Modal
        okButtonProps={{ style: { backgroundColor: "blue" } }}
        title="Creat"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {tableHead.map((item) => {
          if (item == "ACTION") {
            return null;
          }

          return (
            <>
              <div className="flex justify-between mt-5">
                <p>{item}</p>
                <input
                  type="text"
                  value={inputValues[item] || ""}
                  onChange={(e) => handleInputChange(e, item)}
                  className="border"
                />{" "}
              </div>
            </>
          );
        })}
      </Modal>

      <table>
        <thead className=" bg-gray-400">
          <tr className="flex py-4">
            {tableHead.map((item) => (
              <>
                <th className="mx-6 font-bold text-md">{item}</th>
              </>
            ))}
          </tr>
        </thead>
        <tbody>
          {users?.map((item: any, index: any) => (
            <>
              <tr className="flex text-center mt-4 justify-between">
                <td className="whitespace-normal flex justify-center text-center flex-1">
                  {item.DONOR}
                </td>
                <td className="whitespace-normal flex justify-center text-center flex-1">
                  {item.PANELS}
                </td>
                <td className="flex-1">{item.BARCODE}</td>
                <td className="flex-1">{item.SOURCE}</td>
                <td className="flex-1">{item.DATE}</td>
                <td className="flex-1">{item.AMOUNT}</td>
                <td className="flex-1">{item.OBSERVER}</td>
                <td className="flex-1">{item.STATUS}</td>
                <td className="flex-1">
                  <Dropdown overlay={menu} trigger={["click"]}>
                    <a
                      onClick={(e) => e.preventDefault()}
                      className=" cursor-pointer"
                    >
                      <Space>
                        <Image
                          src={kababMenu}
                          onClick={() => deletfunt(item, index)}
                          alt="Logo"
                          width={20}
                          height={80}
                        />
                      </Space>
                    </a>
                  </Dropdown>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>

      <Modal
        okButtonProps={{ style: { backgroundColor: "blue" } }}
        title="Creat"
        open={viewModel}
        onOk={handelUpdate}
        onCancel={handleCancelOk}
      >
        {tableHead.map((item) => {
          if (item == "BARCODE" || item == "ACTION") {
            return null;
          }

          return (
            <>
              <div className="flex justify-between mt-5">
                <p>{item}</p>
                <input
                  type="text"
                  value={updateValues[item] || ""}
                  onChange={(e) => handleInputUpdate(e, item)}
                  className="border"
                />{" "}
              </div>
            </>
          );
        })}
      </Modal>
    </div>
  );
};

export default DataTable;
