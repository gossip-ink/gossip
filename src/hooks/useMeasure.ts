import { useMeasure as useContentMeasure } from "react-use";
import { useState, useEffect, useRef } from "react";

export type ClientRect = {
  clientLeft: number;
  clientRight: number;
  clientTop: number;
  clientBottom: number;
  clientWidth: number;
  clientHeight: number;
};

export type ContentRect = Pick<
  DOMRectReadOnly,
  "x" | "y" | "top" | "left" | "right" | "bottom" | "height" | "width"
>;

export type UseMeasureRect = ClientRect & ContentRect;

export type UseMeasureRef = (element: Element) => void;

export default function useMeasure(): [UseMeasureRef, UseMeasureRect] {
  const [ref, rect] = useContentMeasure();
  const elementRef = useRef<Element>();
  const [clientRect, setClientRect] = useState<ClientRect>({
    clientBottom: 0,
    clientRight: 0,
    clientLeft: 0,
    clientTop: 0,
    clientWidth: 0,
    clientHeight: 0,
  });

  const newRef = (element: Element) => {
    if (!element) return;
    elementRef.current = element;
    ref(element);
  };

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();

    setClientRect({
      clientLeft: rect.left,
      clientRight: rect.right,
      clientBottom: rect.bottom,
      clientTop: rect.top,
      clientWidth: rect.width,
      clientHeight: rect.height,
    });
  }, [rect]);

  return [newRef, { ...rect, ...clientRect }];
}
