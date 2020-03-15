export default function({
  children,
  x = 0,
  y = 0,
  z = 0,
  scale = 1,
  rotate = 0,
  id
}) {
  return (
    <div
      id={id && id}
      className="step"
      style={{
        position: "absolute",
        transfromOrigin: "left top",
        transform: `translate(-50%, -50%) translate3d(${x}px, ${y}px, ${z}px) scale(${scale}) rotate(${rotate}deg)`
      }}
    >
      {children}
    </div>
  );
}
