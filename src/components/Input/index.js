import classNames from "./index.css";
import ColorPicker from "coloreact";
import { Popover, Slider, Button, Switch } from "antd";
import { scaleLinear, pairs } from "d3";
import { useRef, useEffect } from "react";

function Number({ value, onChange, range = [0, 100] }) {
  const styles = {
    container: {
      width: 200
    }
  };

  const step = ((range[1] - range[0]) / 5) | 0;
  const marks = {};
  let i = 0;
  do {
    marks[i] = i;
    i += step;
  } while (i <= range[1]);

  return (
    <div style={styles.container}>
      <Slider
        defaultValue={0}
        min={range[0]}
        max={range[1]}
        value={value}
        onChange={onChange}
        marks={marks}
      />
    </div>
  );
}

function MultipleSlider({ value, onChange }) {
  const width = 200;
  const dots = [];
  const total = value.reduce((sum, n) => {
    dots.push(sum);
    sum += n;
    return sum;
  });
  const ref = useRef(null);
  const move = useRef(-1);
  const scale = scaleLinear()
    .domain([0, total])
    .range([0, width]);

  const styles = {
    slider: {
      width
    },
    container: {
      width
    }
  };

  function handleMove(e) {
    const index = move.current;
    if (index === -1) return;
    const { left } = ref.current.getBoundingClientRect();
    const { clientX } = e;
    const mouseX = clientX - left;
    const v = scale.invert(mouseX);
    const all = [0, ...dots, total];
    if (v >= all[index + 2] || v <= all[index]) return;
    all.splice(index + 1, 1, v); // 替换新的值
    const newValue = pairs(all).map(([a, b]) => b - a);
    onChange(newValue);
  }

  function handlerUp() {
    move.current = -1;
  }

  useEffect(() => {
    window.addEventListener("mouseup", handlerUp);
    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mouseup", handlerUp);
      window.removeEventListener("mousemove", handleMove);
    };
  });

  return (
    <div className={classNames.sliderContainer} style={styles.container}>
      <div className={classNames.slider} style={styles.slider} ref={ref}>
        {dots.map((dot, index) => (
          <div
            key={index}
            className={classNames.dot}
            style={{
              left: scale(dot) - 7
            }}
            onMouseDown={() => (move.current = index)}
          ></div>
        ))}
      </div>
    </div>
  );
}

function Color({ value, onChange }) {
  const styles = {
    container: {
      width: 200,
      height: 200
    },
    color: {
      width: 200,
      height: 200
    }
  };
  return (
    <div style={styles.container}>
      <ColorPicker
        color={value}
        onChange={color => onChange(color.hexString)}
        style={styles.color}
      />
    </div>
  );
}

function MyRadio({ value, onChange, list, hasIcon = true }) {
  const styles = {
    button: {
      margin: "0.25em"
    }
  };
  return (
    <div>
      {list.map(item => (
        <Button
          style={styles.button}
          icon={hasIcon ? item.icon : ""}
          key={item.value}
          type={value === item.value ? "primary" : "default"}
          onClick={() => {
            if (value === item.value) return;
            onChange(item.value);
          }}
          size="small"
        >
          {!hasIcon && item.name}
        </Button>
      ))}
    </div>
  );
}

export default function({ type, value, onChange, range, list, yes, hasIcon }) {
  const styles = {
    color: {
      background: value
    }
  };

  const nameByValue = value =>
    list && list.find(item => item.value === value).name;

  const contentByType = {
    color: <Color value={value} onChange={onChange}></Color>,
    number: <Number range={range} value={value} onChange={onChange}></Number>,
    array: <MultipleSlider value={value} onChange={onChange} />,
    radio: (
      <MyRadio
        value={value}
        onChange={onChange}
        list={list}
        hasIcon={hasIcon}
      ></MyRadio>
    )
  };
  const boxByType = {
    color: <div className={classNames.inputBox} style={styles.color}></div>,
    radio: <div className={classNames.inputBox}>{nameByValue(value)}</div>,
    switch: (
      <Switch
        checked={value === yes}
        onChange={v => (value === yes ? onChange("") : onChange(yes))}
      ></Switch>
    ),
    array: (
      <div className={classNames.inputBox}>
        {value instanceof Array &&
          value.map(d => parseFloat(d.toFixed(2))).join(":")}
      </div>
    ),
    number: (
      <input
        type="number"
        className={classNames.inputBox}
        style={styles.number}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    )
  };
  return (
    <>
      {type === "switch" ? (
        boxByType[type]
      ) : type === "radio" ? (
        contentByType[type]
      ) : (
        <Popover content={contentByType[type]} trigger="click">
          {boxByType[type]}
        </Popover>
      )}
    </>
  );
}
