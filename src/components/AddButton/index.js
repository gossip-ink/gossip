import { Popover, Button } from "antd";
export default function({ icon, onSelectValue, title }) {
  function handleClick(value) {
    onSelectValue && onSelectValue(value);
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        width: (screen.width * 0.8) / 6
      }}
    >
      <Button icon={icon} type="primary" />
      <div>{title}</div>
      <div>
        <Button
          icon="down"
          type="primary"
          onClick={() => handleClick("brother")}
        />
        <Button
          icon="right"
          type="primary"
          onClick={() => handleClick("children")}
        />
      </div>
    </div>
  );
}
