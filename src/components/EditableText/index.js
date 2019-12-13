export default function({
  attrs,
  value,
  width,
  height,
  edit,
  onValueChange
}) {
  function handleChange(e) {
    const value = e.target.value;
    onValueChange && onValueChange(value);
  }
  return (
    <div
      style={{
        ...attrs,
        width,
        height,
      }}
    >
      {edit ? (
        <textarea
          value={value}
          onChange={handleChange}
          style={{
            height,
            width,
            backgroundColor: "transparent",
            border: 0,
            resize: "none",
            outline: "none"
          }}
        />
      ) : (
        value.split("\n").map((line, index) => <p key={index}>{line}</p>)
      )}
    </div>
  );
}
