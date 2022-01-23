import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChartType } from "../../presentation/chart/Chart";

export interface BaseDashboardState {
  data: Array<ChartType>;
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
  ],
  totalHeightUnit: 4,
  totalWidthUnit: 8
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

export default baseDashboardSlice.reducer;