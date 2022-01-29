import { DEFAULT_DASHBOARD_HEIGHT_UNIT, DEFAULT_DASHBOARD_WIDTH_UNIT } from "../../constants/constants";
import { ChartType } from "../../presentation/chart/Chart";
import { ChartMap } from "./baseDashboardSlice";

export function setOccupiedMap(
  map: Array<Array<boolean>>,
  newColumns: [number, number],
  newRows: [number, number],
  value = true,
  ) {
  for (let chartColumn = newColumns[0] - 1; chartColumn < newColumns[1] - 1; chartColumn++) {
    for (let chartRow = newRows[0] - 1; chartRow < newRows[1] - 1; chartRow++) {
      map[chartRow][chartColumn] = value;
    }
  }
}

export const occupiedMapGen = (
  charts: ChartMap,
  totalWidth: number,
  totalHeight: number,
  ): Array<Array<boolean>> => {
  let dashboardMap = Array(totalHeight).fill(0).map(() => Array(totalWidth).fill(false));

  Object.values(charts).forEach((chart: ChartType) => {
    setOccupiedMap(
      dashboardMap,
      chart.columns,
      chart.rows,
    )
  });

  return dashboardMap;
};

export const calculateNewCoords = (newCoord0: number, oldCoord: [number, number]): [number, number] => 
  ([newCoord0, newCoord0 + oldCoord[1] - oldCoord[0]]);

export const canDropChart = (
  newRow0: number,
  newColumn0: number,
  item: ChartType,
  chartArray: Array<ChartType>) => {
  const newRows = calculateNewCoords(newRow0, item.rows);
  const newColumns = calculateNewCoords(newColumn0, item.columns);

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
