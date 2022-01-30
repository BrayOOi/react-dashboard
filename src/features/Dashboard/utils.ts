import { DEFAULT_DASHBOARD_HEIGHT_UNIT, DEFAULT_DASHBOARD_WIDTH_UNIT } from "../../constants/constants";
import { ChartType } from "../../presentation/chart/Chart";

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
