import React from "react";
import "./styles.css";
import usePagination from "./usePagination";
export type ObjectType = {
  id: number;
  name: string;
  value: number;
};

const objects = [
  { id: 1, name: "Object 1", value: 100 },
  { id: 2, name: "Object 2", value: 200 },
  { id: 3, name: "Object 3", value: 300 },
  { id: 4, name: "Object 4", value: 400 },
  { id: 5, name: "Object 5", value: 500 },
  { id: 6, name: "Object 6", value: 600 },
  { id: 7, name: "Object 7", value: 700 },
  { id: 8, name: "Object 8", value: 800 },
  { id: 9, name: "Object 9", value: 900 },
  { id: 10, name: "Object 10", value: 1000 },
  { id: 11, name: "Object 11", value: 1100 },
  { id: 12, name: "Object 12", value: 1200 },
  { id: 13, name: "Object 13", value: 1300 },
  { id: 14, name: "Object 14", value: 1400 },
  { id: 15, name: "Object 15", value: 1500 },
  { id: 16, name: "Object 16", value: 1600 },
  { id: 17, name: "Object 17", value: 1700 },
  { id: 18, name: "Object 18", value: 1800 },
  { id: 19, name: "Object 19", value: 1900 },
  { id: 20, name: "Object 20", value: 2000 },
];

const TableRow = (props: any) => {
  return (
    <tr>
      <td> {props.obj.id} </td>
      <td> {props.obj.name} </td>
      <td> {props.obj.value} </td>
    </tr>
  );
};
const PTable = (props: {}) => {
  const paginatedData = usePagination<ObjectType>({count: 6, data: objects})
  const [page, setPage] = React.useState(0);
  return (
    <div>
      <table>
        <tr>
          <th> Id </th>
          <th> Name </th>
          <th> Value </th>
        </tr>
        {paginatedData[page].map((obj) => (
          <TableRow obj={obj} />
        ))}
      </table>
      {paginatedData.map((data, index) => <button onClick={() => setPage(index)}>{index + 1 }</button>)}
    </div>
  );
};

export default PTable;
