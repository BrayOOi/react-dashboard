import { DEFAULT_DASHBOARD_HEIGHT_UNIT, DEFAULT_DASHBOARD_WIDTH_UNIT } from "../../constants/constants";
import { ChartType } from "../../presentation/chart/types";

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
  chartArray: Array<ChartType>,
  item?: ChartType,
  ) => {
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

  if (checkChartCollision(
    newRows,
    newColumns,
    chartArray,
    item && item.id,
  )) {
    return false;
  }

  return true;
};

// check if target will collide with other charts
export const checkChartCollision = (
  rows: [number, number],
  columns: [number, number],
  chartArray: Array<ChartType>,
  targetChartId?: string
) => {
  for (let row = rows[0]; row < rows[1]; row++) {
    for (let column = columns[0]; column < columns[1]; column++) {
      for (const chart of chartArray) {
        if (
          chart.id !== targetChartId // only run collision test with charts other than dragged chart
          && row >= chart.rows[0]
          && row < chart.rows[1]
          && column >= chart.columns[0]
          && column < chart.columns[1]
        ) {
          return true;
        }
      }
    }
  }

  return false;
};
