import { connect } from "dva";
import classNames from "./index.css";
import { Icon } from "antd";
import Box from "../Box";
import Node from "../Node";
import Input from "../Input";
import { useState } from "react";

export default connect(
  state => ({
    variables: state.slides.attributeVars,
    selectedArributeId: state.slides.selectedArributeId
  }),
  {
    deleteVar: id => ({ type: "slides/deleteVar", payload: { id } }),
    addVar: type => ({ type: "slides/addVar", payload: { type } }),
    selectVar: id => ({ type: "slides/selectVar", payload: { id } }),
    changeVar: (value, type) => ({
      type: "slides/changeVar",
      payload: { value, type }
    })
  }
)(function({
  height,
  variables,
  selectedArributeId,
  deleteVar,
  addVar,
  selectVar,
  changeVar
}) {
  const [edit, setEdit] = useState(-1);
  const icon = {
    color: "bg-colors",
    number: "number"
  };

  function handleDragStart(e, item) {
    selectVar(item.id);
    e.dataTransfer.setData("type", item.type);
    e.dataTransfer.setData("id", item.id);
  }

  const items = [
    { name: "颜色", value: "color", type: "bg-colors" },
    { name: "数值", value: "number", type: "number" }
  ];

  const content = (
    <ul className={classNames.list}>
      {items.map((item, index) => (
        <li
          key={index}
          onClick={() => addVar(item.value)}
          style={{ cursor: "pointer" }}
          className={classNames.item}
        >
          <Icon className={classNames.icon} type={item.type} />
          <span>{item.name}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <Box height={height} title="属性变量" iconType="shop" popover={content}>
      {variables.map(item => (
        <div
          key={item.id}
          className={classNames.node}
          onDragStart={e => handleDragStart(e, item)}
          draggable
          onClick={() => selectedArributeId !== item.id && selectVar(item.id)}
        >
          <Node
            height="2em"
            onDelete={() => deleteVar(item.id)}
            edit={item.id === edit}
            highlight={selectedArributeId === item.id}
            onEdit={() => {
              if (item.id === edit) {
                setEdit(-1);
              } else {
                setEdit(item.id);
                selectVar(item.id);
              }
            }}
          >
            <div className={classNames.wrapper}>
              <Icon type={icon[item.type]}></Icon>
              <div className={classNames.name}>
                {edit === item.id ? (
                  <input
                    value={item.name}
                    onChange={e => changeVar(e.target.value, "name")}
                  />
                ) : (
                  <div>{item.name}</div>
                )}
              </div>
              <Input
                type={item.type}
                value={item.value}
                onChange={value => changeVar(value, "value")}
                range={[0, 500]}
              />
            </div>
          </Node>
        </div>
      ))}
    </Box>
  );
});
