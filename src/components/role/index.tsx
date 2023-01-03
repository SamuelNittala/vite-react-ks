import React, { useMemo } from "react";

export const Parent = () => {
  const [mixed, setMixed] = React.useState({name: "samuel", role: "user"})
  const options = useMemo(() => ({ showSideBar: (mixed.role === "admin")}), [mixed.role]);
  console.log('parent render');
  return (
    <div>
      <Child options={options} />
      <button onClick={() => {setMixed((prev) => ({...prev, role: "admin"}))}}> change role </button>
      <button onClick={() => {setMixed((prev) => ({...prev, name: "nani"}))}}> change name </button>
      <h1> {mixed.name} </h1>
    </div>
  );
};

export const Child = React.memo(({ options: {showSideBar }}: { options:{showSideBar: boolean }}) => {
  console.log('child render');
  return <div>{showSideBar ? "admin" : "user"}</div>;
});

const Role = (props: {}) => {
  return (
    <div>
      <Parent />
    </div>
  );
};

export default Role;
