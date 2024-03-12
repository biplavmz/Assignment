"use client"; // This is a client component 👈🏽

import React from "react";
import Image from "next/image";
import DataTable from "./DataTable";
import Calender from "./Calender";

import arrowIcon from "../icons/right-arrow.png";
import profileImg from "../icons/bear_1.jpg";
import { useState } from "react";
import { ImageData, OptionData } from "./Data";
import rightIcon from "../icons/right (1).png";
import backIcon from "../icons/back.png";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  const [menu, setMenu] = useState("");

  console.log(menu, "menudata");

  return (
    <>
      <div className="flex">
        <div className="w-20  shadow min-h-screen">
          <div className="flex justify-center">
            <Image
              src={profileImg}
              alt="Vercel Logo"
              width={50}
              height={80}
              className="mt-5"
              priority
            />
          </div>

          <div className="flex justify-center">
            {!isOpen ? (
              <Image
                src={arrowIcon}
                alt="Vercel Logo"
                width={20}
                height={80}
                className="mt-5  cursor-pointer"
                onClick={toggleCollapse}
              />
            ) : (
              <Image
                src={backIcon}
                alt="Vercel Logo"
                width={20}
                height={80}
                className="mt-5  cursor-pointer"
                onClick={toggleCollapse}
              />
            )}
          </div>

          <div>
            {ImageData.map((item) => (
              <div className="flex justify-center w-20">
                <Image
                  src={item}
                  alt="Vercel Logo"
                  width={30}
                  height={80}
                  className="mt-10"
                  priority
                />
              </div>
            ))}
          </div>
        </div>
        <div>
          <div>
            <h1 className=" font-bold text-xl mt-8 ml-5">HOME</h1>
          </div>

          {isOpen && (
            <div
              className={`${
                isOpen ? "true" : "false"
              } transition-all duration-500 ease-in-out delay-200 w-64  cursor-pointer`}
            >
              <div className="ml-4 ">
                {OptionData.map((item) => (
                  <>
                    <div
                      className={`flex items-end hover:bg-green-100 pb-4 rounded-lg ${
                        item.title == menu && "bg-green-200"
                      }`}
                      onClick={() => setMenu(item.title)}
                    >
                      <Image
                        src={item.img}
                        alt="Vercel Logo"
                        width={20}
                        height={80}
                        className="mt-5"
                        priority
                      />
                      <span className="ml-3 text-sm ">{item.title}</span>
                      <Image
                        src={rightIcon}
                        alt="Vercel Logo"
                        width={20}
                        height={80}
                        className="mt-5 ml-auto"
                      />
                    </div>
                  </>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className={`${!isOpen ? "ml-2 sm:ml-4 md:ml-8 lg:ml-12 xl:ml-16" : ""}`}>
          {menu == "Calendar Type" ? <Calender /> : <DataTable />}
        </div>
      </div>
    </>
  );
};

export default Menu;
