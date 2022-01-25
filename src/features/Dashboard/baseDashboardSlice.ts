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
export const initialState: BaseDashboardState = {
  data: {
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
    }
  },
  totalHeightUnit: DEFAULT_DASHBOARD_HEIGHT_UNIT,
  totalWidthUnit: DEFAULT_DASHBOARD_WIDTH_UNIT
};

export const baseDashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    loadMap: (state, action: PayloadAction<ChartMap>) => {
      state.data = action.payload;
    },
    }
  }
});

export const {
  loadMap,
} = baseDashboardSlice.actions;

export default baseDashboardSlice.reducer;