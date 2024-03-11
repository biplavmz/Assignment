import React, { useEffect, useState } from "react";
import { Dayjs } from "dayjs";
import type { BadgeProps, CalendarProps } from "antd";
import { Badge, Calendar } from "antd";
import { Button, Modal } from "antd";
import { TimePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Radio } from "antd";
import { addEvent } from "../storeFolder/EventReducer";

const getMonthData = (value: Dayjs) => {
  if (value.month() === 8) {
    return 1394;
  }
};

const Calender = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(1);
  const [selectedType, setSelectedType] = useState("");

  const calenderEvent = useSelector((state: any) => state.event);

  const dispatch = useDispatch();

  const handleOptionChange = (e: any) => {
    setSelectedOption(e.target.value); // Update state with the selected option value
  };

  useEffect(() => {
    if (selectedOption == 1) {
      setSelectedType("success");
    } else if (selectedOption == 2) {
      setSelectedType("warning");
    }
  }, [selectedOption]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const [newCases, setNewCases] = useState<any>([]);

  const handleOk = () => {
    let res = { id: selectedDate, type: selectedType, textData: text };
    dispatch(addEvent(res));

    const isDuplicateId = newCases.some(
      (existingCase: any) => existingCase.id === selectedDate
    );

    if (!isDuplicateId) {
      setNewCases((prevCases: any) => [...prevCases, res]);
    } else {
      console.log("Duplicate id found, skipping addition.");
    }

    setIsModalOpen(false);
    setText("");
  };

  const [newData, setNewData] = useState<any[]>([]);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getListData = (value: Dayjs) => {
    let listData;
    calenderEvent.forEach((item: any) => {
      // newData
      switch (value.date()) {
        case item.id:
          listData = [{ type: item.type, content: item.textData }];
          break;

        default:
      }
    });

    return listData || [];
  };

  const handleDateSelect = (date: any) => {
    setIsModalOpen(true);
    setSelectedDate(date.$D);
    setModalVisible(true);
  };
  const monthCellRender = (value: Dayjs) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item: any) => (
          <li key={item.content}>
            <Badge
              status={item.type as BadgeProps["status"]}
              text={item.content}
            />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

  const [text, setText] = useState("");

  return (
    <>
      <Calendar onSelect={handleDateSelect} cellRender={cellRender} />;
      <Modal
        okButtonProps={{ style: { backgroundColor: "blue" } }}
        title="Create New Event"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <TimePicker.RangePicker />
        <div className="mt-5">
          <h1>Event Title</h1>

          <Radio.Group
            name="radiogroup"
            value={selectedOption}
            onChange={handleOptionChange}
          >
            <Radio value={1}>Add Event</Radio>
            <Radio value={2}>Add Reminder</Radio>
          </Radio.Group>
          <textarea
            className="mt-2  border-2"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type something..."
            rows={2}
            cols={60}
          />
        </div>
      </Modal>
    </>
  );
};

export default Calender;
