import { useEffect, useRef, useState } from "react";
import {
  DEFAULT_CHART_HEIGHT,
  DEFAULT_CHART_MARGIN,
  DEFAULT_CHART_WIDTH
} from "../../constants/constants";

// return mouse position based on Dashboard Grid
const useMousePosition = (): [React.RefObject<HTMLDivElement>, [number, number]] => {
  const ref = useRef<HTMLDivElement>(null);

  const [mousePos, setMousePos] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    if (ref.current) {
      const { x, y } = ref.current.getBoundingClientRect();
      const onDragStart = (e: MouseEvent) => setMousePos([
        Math.floor((e.x - x) / (DEFAULT_CHART_WIDTH + DEFAULT_CHART_MARGIN)) + 1,
        Math.floor((e.y - y) / (DEFAULT_CHART_HEIGHT + DEFAULT_CHART_MARGIN)) + 1,
      ]);

      ref.current.addEventListener('mousedown', onDragStart, { capture: true });
  
      return ref.current.removeEventListener('mousedown', onDragStart);
    }
  }, []);

  return [ref, mousePos];
};

export default useMousePosition;
