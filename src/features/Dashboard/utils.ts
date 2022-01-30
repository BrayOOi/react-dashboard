import { DEFAULT_DASHBOARD_HEIGHT_UNIT, DEFAULT_DASHBOARD_WIDTH_UNIT } from "../../constants/constants";
import { ChartType } from "../../presentation/chart/Chart";

// By default, the user is interacting with the point (0, 0) of the chart
// If not adjusted properly, the calculations made by Collectors will be based on (0, 0) wherever the user dragged the chart, thus making the results incorrect
// The Collectors will determine whether they are viable locations to receive item by adding an adjustment: the distance between (0, 0) of chart and Dragging Point
// This adjustment will align the calculations to the Dragging Point
export const adjustCoords = (coord: number, initialCoord: number, draggedCoord: number) => {
  const adjustment = initialCoord - draggedCoord;

  return coord + adjustment;
}

// This will produce the coords that will be understood by the Grid system
export const calculateNewCoords = (newCoord0: number, oldCoord: [number, number]): [number, number] => 
  ([newCoord0, newCoord0 + oldCoord[1] - oldCoord[0]]);

export const canDropChart = (
  newRows: [number, number],
  newColumns: [number, number],
  item: ChartType,
  chartArray: Array<ChartType>) => {
  // check if target will be out of dashboard
  if (newColumns[1] - 1 > DEFAULT_DASHBOARD_WIDTH_UNIT) {
    return false;
  }

  if (newRows[1] - 1 > DEFAULT_DASHBOARD_HEIGHT_UNIT) {
    return false;
  }

  if (newRows[0] - 1 < 0) {
    return false;
  }

  if (newColumns[0] - 1 < 0) {
    return false;
  }

  // check if target will collide with other charts
  for (let row = newRows[0]; row < newRows[1]; row++) {
    for (let column = newColumns[0]; column < newColumns[1]; column++) {
      for (const chart of chartArray) {
        if (
          chart.id !== item.id // only run collision test with charts other than dragged chart
          && row >= chart.rows[0]
          && row < chart.rows[1]
          && column >= chart.columns[0]
          && column < chart.columns[1]
        ) {
          return false;
        }
      }
    }
  }

  return true;
};
