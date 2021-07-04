import React, { useEffect, useState } from "react";
import classNames from "classnames";
import styled from "styled-components";
import { useMeasure } from "../hooks";
import { tuple } from "../utils/type";
import Portal from "./Portal";

const TriggerActions = tuple("hover", "click", "focus");
export type TriggerAction = typeof TriggerActions[number];

const Placements = tuple("top", "left", "right", "bottom");
export type Placement = typeof Placements[number];

type Point = {
  pageX: number;
  pageY: number;
};

type TriggerEvent = React.FocusEvent<HTMLHRElement> | React.MouseEvent<HTMLHRElement>;

export type PopoverProps = React.PropsWithChildren<{
  content?: React.ReactNode;
  visible?: boolean;
  triggerAction?: TriggerAction;
  placement?: Placement;
  className?: String;
  full?: boolean;
}>;

const Popup = styled.div<{ x: number; y: number; width?: number }>`
  position: absolute;
  left: ${(props) => props.x}px;
  top: ${(props) => props.y}px;
  width: ${(props) => props.width}px;
  z-index: 999;
`;

const Popover: React.FC<PopoverProps> = ({
  content,
  children,
  visible,
  className,
  placement = "bottom",
  triggerAction = "hover",
  full = false,
}) => {
  const { ref, rect } = useMeasure();
  const [point, setPoint] = useState<Point>({ pageX: 0, pageY: 0 });
  const [popupVisible, setPopupVisible] = useState<boolean>(false);

  const newChildProps = getNewChildProps();
  const child = React.Children.only(children) as React.ReactElement;
  const trigger = React.cloneElement(child, newChildProps);
  const showPopup = visible === undefined ? popupVisible : visible;
  const portal = showPopup ? <Portal getContainer={getContainer}>{getContent()}</Portal> : null;

  useEffect(() => {
    const onclick = () => {
      if (triggerAction !== "click") return;
      if (popupVisible) setPopupVisible(false);
    };
    window.addEventListener("click", onclick);
    return () => window.removeEventListener("click", onclick);
  });

  function shouldShowWhen(action: TriggerAction) {
    if (visible !== undefined) return false;
    if (typeof triggerAction === "string" && triggerAction === action) return true;
  }

  function fireEvents(type: string, event: TriggerEvent) {
    const childCallback = (children as React.ReactElement).props[type];
    childCallback && childCallback(event);
  }

  function onPopupVisible(visible: boolean) {
    if (visible === popupVisible) return;
    setPopupVisible(visible);
    setPoint(calculatePoint());
  }

  function calculatePoint() {
    const { clientLeft, clientTop, clientHeight, clientWidth } = rect;
    let pageX = 0;
    let pageY = 0;
    if (placement === "bottom") {
      pageX = clientLeft;
      pageY = clientTop + clientHeight;
    } else if (placement === "right") {
      pageX = clientLeft + clientWidth;
      pageY = clientTop;
    } else {
      pageX = clientLeft;
      pageY = clientTop;
    }
    return { pageX, pageY };
  }

  function onFocus(event: React.FocusEvent<HTMLHRElement>) {
    fireEvents("onFocus", event);
    onPopupVisible(true);
  }

  function onBlur(event: React.FocusEvent<HTMLHRElement>) {
    fireEvents("onBlur", event);
    onPopupVisible(false);
  }

  function onMouseEnter(event: React.MouseEvent<HTMLHRElement>) {
    fireEvents("onMouseEnter", event);
    onPopupVisible(true);
  }

  function onMouseLeave(event: React.MouseEvent<HTMLHRElement>) {
    fireEvents("onMouseLeave", event);
    onPopupVisible(false);
  }

  function onClick(event: React.MouseEvent<HTMLHRElement>) {
    event.stopPropagation();
    fireEvents("onClick", event);
    onPopupVisible(!popupVisible);
  }

  function getNewChildProps() {
    const props: React.HTMLAttributes<HTMLElement> & { key: string; ref: typeof ref } = {
      key: "trigger",
      ref,
    };

    if (shouldShowWhen("focus")) {
      props.onFocus = onFocus;
      props.onBlur = onBlur;
    }

    if (shouldShowWhen("hover")) {
      props.onMouseEnter = onMouseEnter;
      props.onMouseLeave = onMouseLeave;
    }

    if (shouldShowWhen("click")) {
      props.onClick = onClick;
    }

    return props;
  }

  function getContent() {
    const classes = classNames(className, "bg-white shadow p-2", {
      "transform -translate-y-full": placement === "top",
      "transform -translate-x-full": placement === "left",
    });
    const { clientWidth } = rect;
    return (
      <Popup
        className={classes}
        x={point.pageX}
        y={point.pageY}
        width={full ? clientWidth : undefined}
        onMouseEnter={() => setPopupVisible(true)}
        onMouseLeave={() => triggerAction === "hover" && setPopupVisible(false)}
      >
        {content}
      </Popup>
    );
  }

  function getContainer() {
    const container = document.createElement("div");
    container.style.position = "absolute";
    container.style.left = "0";
    container.style.top = "0";
    container.style.width = "100%";
    attachParent(container);
    return container;
  }

  function attachParent(container: HTMLDivElement) {
    const mountNode = document.body;
    mountNode.appendChild(container);
  }

  return (
    <>
      {trigger}
      {portal}
    </>
  );
};

export default Popover;
