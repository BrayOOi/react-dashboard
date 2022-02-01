import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';
import { ResizeHandle } from 'react-resizable';

import {
  DEFAULT_CHART_HEIGHT,
  DEFAULT_CHART_MARGIN,
  DEFAULT_CHART_WIDTH,
  DEFAULT_DASHBOARD_HEIGHT_UNIT,
  DEFAULT_DASHBOARD_WIDTH_UNIT
} from "../../constants/constants";

import { ChartType } from "../../presentation/chart/Chart";
import {
  adjustCoords,
  calculateNewCoords,
  checkChartCollision
} from "./utils";

export type ChartMap = Record<string, ChartType>;

export interface BaseDashboardState {
  data: ChartMap;
  totalHeightUnit: number;
  totalWidthUnit: number;
}

const newId = uuidv4();
const newId2 = uuidv4();
const newId3 = uuidv4();
const INITIAL_DATA: ChartMap = {
  [newId]: {
    id: newId,
    columns: [2, 5],
    rows: [1, 4],
    type: 'line'
  },
  [newId2]: {
    id: newId2,
    columns: [5, 6],
    rows: [1, 2],
    type: 'line'
  },
  [newId3]: {
    id: newId3,
    columns: [5, 7],
    rows: [2, 3],
    type: 'line'
  }
};
export const initialState: BaseDashboardState = {
  data: INITIAL_DATA,
  totalHeightUnit: DEFAULT_DASHBOARD_HEIGHT_UNIT,
  totalWidthUnit: DEFAULT_DASHBOARD_WIDTH_UNIT,
};

export const baseDashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    loadMap: (state, action: PayloadAction<ChartMap>) => {
      state.data = action.payload;
    },

    resizeChart: (state, action: PayloadAction<{
      delta: {
        width: number;
        height: number;
      };
      targetChartId: string;
      handle: ResizeHandle;
    }>) => {
      const { delta, targetChartId, handle } = action.payload;
      const chart = state.data[targetChartId];

      const heightDeltaUnit = delta.height / (DEFAULT_CHART_HEIGHT + DEFAULT_CHART_MARGIN);
      const widthDeltaUnit = delta.width / (DEFAULT_CHART_WIDTH + DEFAULT_CHART_MARGIN);

      const nextChartCoords = ((): { [key in 'rows' | 'columns']: [number, number] } => {
        switch (handle) {
          case 'n':
            return {
              rows: [chart.rows[0] - heightDeltaUnit, chart.rows[1]],
              columns: chart.columns
            };
          case 'ne':
            return {
              rows: [chart.rows[0] - heightDeltaUnit, chart.rows[1]],
              columns: [chart.columns[0], chart.columns[1] + widthDeltaUnit]
            };
          case 'e':
            return {
              rows: chart.rows,
              columns: [chart.columns[0], chart.columns[1] + widthDeltaUnit]
            };
          case 'se':
            return {
              rows: [chart.rows[0], chart.rows[1] + heightDeltaUnit],
              columns: [chart.columns[0], chart.columns[1] + widthDeltaUnit]
            };
          case 's':
            return {
              rows: [chart.rows[0], chart.rows[1] + heightDeltaUnit],
              columns: chart.columns
            };
          case 'sw':
            return {
              rows: [chart.rows[0], chart.rows[1] + heightDeltaUnit],
              columns: [chart.columns[0] - widthDeltaUnit, chart.columns[1]]
            }
          case 'w':
            return {
              rows: chart.rows,
              columns: [chart.columns[0] - widthDeltaUnit, chart.columns[1]]
            };
          case 'nw':
            return {
              rows: [chart.rows[0] - heightDeltaUnit, chart.rows[1]],
              columns: [chart.columns[0] - widthDeltaUnit, chart.columns[1]]
            }
          }
      })();

      if (!checkChartCollision(
        nextChartCoords.rows,
        nextChartCoords.columns,
        targetChartId,
        Object.values(state.data)
      )) {
        state.data[targetChartId] = {
          ...state.data[targetChartId],
          ...nextChartCoords,
        };
      }
    },
    moveChart: (state, action: PayloadAction<{
      targetId: string;
      effectiveCoords: [number, number];
      interactedCoords: [number, number];
    }>) => {
      const { targetId, effectiveCoords, interactedCoords } = action.payload;

      const chart = state.data[targetId];

      state.data[targetId].rows = calculateNewCoords(adjustCoords(interactedCoords[0], chart.rows[0], effectiveCoords[0]), chart.rows);
      state.data[targetId].columns = calculateNewCoords(adjustCoords(interactedCoords[1], chart.columns[0], effectiveCoords[1]), chart.columns);
    },
    discardChart: (state, action: PayloadAction<string>) => {
      delete state.data[action.payload];
    }
  }
});

export const {
  loadMap,

  resizeChart,
  moveChart,
  discardChart,
} = baseDashboardSlice.actions;

export default baseDashboardSlice.reducer;