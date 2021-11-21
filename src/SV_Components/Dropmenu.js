import React from "react";
import "../SV_Styles/HeaderStyles.css";

export function Dropmenu(props) {
  return <div className="dropDown">{props.children}</div>;
}
export function MenuItem(props) {
  return (
    <div onClick={props.onClick} className="menuitem">
      {props.children}
    </div>
  );
}

export function DropButton(props) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="dropButton" onClick={() => setOpen(!open)}>
      {props.text}
      {open && props.children}
    </div>
  );
}
