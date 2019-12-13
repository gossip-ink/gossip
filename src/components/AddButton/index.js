import { Popover, Button } from "antd";
export default function({ icon, onSelectValue }) {
  function handleClick(value) {
    onSelectValue && onSelectValue(value);
  }
  return (
    <Popover
      content={[
        { name: "兄弟", value: "brother" },
        { name: "孩子", value: "children" }
      ].map((item, index) => (
        <div
          key={index}
          onClick={() => handleClick(item.value)}
          style={{ cursor: "pointer" }}
        >
          {item.name}
        </div>
      ))}
    >
      <Button icon={icon} type="primary" />
    </Popover>
  );
}
