import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

import {
  DEFAULT_DASHBOARD_HEIGHT_UNIT,
  DEFAULT_DASHBOARD_WIDTH_UNIT
} from "../../constants/constants";

import { ChartType } from "../../presentation/chart/Chart";

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

    resizeChart: (state, action: PayloadAction<ChartType>) => {
      state.data[action.payload.id] = action.payload;
    },
    moveChart: (state, action: PayloadAction<{
      targetId: string;
      newCoords: {
        columns: [number, number];
        rows: [number, number];
      };
    }>) => {
      const { targetId, newCoords } = action.payload;

      state.data[targetId].rows = newCoords.rows;
      state.data[targetId].columns = newCoords.columns;
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