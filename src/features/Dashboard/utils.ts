import { DEFAULT_DASHBOARD_HEIGHT_UNIT, DEFAULT_DASHBOARD_WIDTH_UNIT } from "../../constants/constants";
import { ChartType } from "../../presentation/chart/Chart";
import { ChartMap } from "./baseDashboardSlice";

export const occupiedMapGen = (
  charts: ChartMap,
  totalWidth: number,
  totalHeight: number,
  ): Array<Array<boolean>> => {
  let dashboardMap = Array(totalHeight).fill(0).map(() => Array(totalWidth).fill(false));

  Object.values(charts).forEach((chart: ChartType) => {
    for (let chartColumn = chart.columns[0] - 1; chartColumn < chart.columns[1] - 1; chartColumn++) {
      for (let chartRow = chart.rows[0] - 1; chartRow < chart.rows[1] - 1; chartRow++) {
        dashboardMap[chartRow][chartColumn] = true;
      }
    }
  });

  return dashboardMap;
};

export const calculateNewCoords = (newCoord0: number, oldCoord: [number, number]): [number, number] => 
  ([newCoord0, newCoord0 + oldCoord[1] - oldCoord[0]]);

export const canDropChart = (newRow0: number, newColumn0: number, item: ChartType) => {
  // check if target will be out of dashboard
  const newRows = calculateNewCoords(newRow0, item.rows);
  const newColumns = calculateNewCoords(newColumn0, item.columns);

  if (newColumns[1] - 1 > DEFAULT_DASHBOARD_WIDTH_UNIT) {
    return false;
  }

  if (newRows[1] - 1 > DEFAULT_DASHBOARD_HEIGHT_UNIT) {
    return false;
  }

  return true;
};
