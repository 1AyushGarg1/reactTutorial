import { IoBarChartSharp } from "react-icons/io5";
import { FaWpforms } from "react-icons/fa";
import { MdQueryStats,MdAdminPanelSettings } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import react from "react";

const links = [
  { id: 1, text: "stats", path: "stats", icon: <IoBarChartSharp /> },
  { id: 2, text: "add jobs", path: ".", icon: <FaWpforms /> },
  { id: 3, text: "all-jobs", path: "all-jobs", icon: <MdQueryStats /> },
  { id: 4, text: "profile", path: "profile", icon: <ImProfile /> },
  { id: 5, text: "admin", path: "admin", icon: <MdAdminPanelSettings /> },
];

export default links;
// This is a first way to do this