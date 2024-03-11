import homeIcon from "../icons/home.png";
import documentIcon from "../icons/google-docs.png";
import graphIcon from "../icons/bar-graph.png";
import groupIcon from "../icons/people.png";
import settingIcon from "../icons/setting.png";
import powerIcon from "../icons/power.png";
import questionIcon from "../icons/question.png";
import packageIcon from "../icons/package.png"
import reportIcon from "../icons/report.png"
import historyIcon from "../icons/file.png"
import testIcon from "../icons/approval.png"
import calendarIcon from "../icons/calendar.png"


import idebtificationIcon from "../icons/identification.png";
import charityIcon from "../icons/charity.png";
import clipboardIcon from "../icons/clipboard.png";


export const  ImageData = [
    homeIcon,documentIcon,graphIcon,groupIcon,settingIcon,powerIcon,questionIcon
];


export const  OptionData = [
    {title:"Face Recognition",img:idebtificationIcon},
    {title:"Daily Visit",img:clipboardIcon},
    {title:"Donate",img:charityIcon},
    {title:"Work Orders",img:packageIcon},
    {title:"Reports",img:reportIcon},
    {title:"Report History",img:historyIcon},
    {title:"Test History",img:testIcon},
    {title:"Calendar Type",img:calendarIcon},
]

export const tableHead = ["DONOR","PANELS","BARCODE","SOURCE","DATE","AMOUNT($)","OBSERVER BY","STATUS","ACTION"];


export const tableInfo = [
    {id:1,DONOR:"jimmy Testington",PANELS:"3 Panel, 12 panel U Cup",BARCODE:1792602401,SOURCE:"medicaid",DATE:"07/18/2023",
    AMOUNT: "0.00",OBSERVER:"Chavan Vishal",STATUS:"Unable to Donate"},
    {id:2,DONOR:"jimmy Testington",PANELS:"3 Panel, 12 panel U Cup",BARCODE:1792602402,SOURCE:"medicaid",DATE:"07/18/2023",
    AMOUNT: "0.00",OBSERVER:"Chavan Vishal",STATUS:"Refused"},
    {id:3,DONOR:"jimmy Testington",PANELS:"3 Panel, 12 panel U Cup",BARCODE:1792602409,SOURCE:"medicaid",DATE:"07/18/2023",
    AMOUNT: "0.00",OBSERVER:"Chavan Vishal",STATUS:"Dublicate/Error"},
]

export const eventList = [{ id: 1, type: "success", textData: "working Fine " },{ id: 2, type: "error", textData: "working Fine 2" }]
