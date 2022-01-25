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
