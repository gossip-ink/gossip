import useWindowSize from "react-use/lib/useWindowSize";
import "./index.css";
import Intro from "../components/Intro";
export default function({ children }) {
  const { width, height } = useWindowSize();
  if (width > 700) return <div>{children}</div>;
  else return <Intro height={height} />;
}
