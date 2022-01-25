import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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

export const initialState: BaseDashboardState = {
  data: [
    {
      columns: [2, 5],
      rows: [1, 4],
      type: 'line'
    }
  totalHeightUnit: DEFAULT_DASHBOARD_HEIGHT_UNIT,
  totalWidthUnit: DEFAULT_DASHBOARD_WIDTH_UNIT
};

export const baseDashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    load: (state, action: PayloadAction<Array<ChartType>>) => {
      state.data = action.payload
    }
  }
});

export const {
  loadMap,
} = baseDashboardSlice.actions;

export default baseDashboardSlice.reducer;