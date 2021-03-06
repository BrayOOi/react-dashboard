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

import {
  adjustCoords,
  calculateNewCoords,
  checkChartCollision
} from "./utils";

import { ChartType } from "../../presentation/chart/types";

export type ChartMap = Record<string, ChartType>;

export interface BaseDashboardState {
  data: ChartMap;
  totalHeightUnit: number;
  totalWidthUnit: number;
}

const initialData = [
  {
    columns: [1, 5],
    rows: [1, 5],
    type: 'scatter'
  },
  {
    columns: [5, 6],
    rows: [1, 2],
    type: 'pie'
  },
  {
    columns: [6, 7],
    rows: [1, 2],
    type: 'bar'
  },
  {
    columns: [7, 8],
    rows: [1, 2],
    type: 'pie'
  },
  {
    columns: [8, 9],
    rows: [1, 2],
    type: 'line'
  },
  {
    columns: [5, 7],
    rows: [2, 3],
    type: 'bar'
  },
  {
    columns: [7, 9],
    rows: [2, 3],
    type: 'area'
  },
  {
    columns: [5, 7],
    rows: [3, 5],
    type: 'line'
  },
];

const INITIAL_DATA: ChartMap = initialData.reduce((accumObj, chart) => {
  let id = uuidv4();

  return ({
    ...accumObj,
    [id]: {
      id,
      ...chart,
    }
  });
}, {});

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

    addChart: (state, action: PayloadAction<Omit<ChartType, 'id'>>) => {
      const newId = uuidv4();

      state.data[newId] = {
        id: newId,
        ...action.payload,
      };
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
        Object.values(state.data),
        targetChartId
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

  addChart,
  resizeChart,
  moveChart,
  discardChart,
} = baseDashboardSlice.actions;

export default baseDashboardSlice.reducer;