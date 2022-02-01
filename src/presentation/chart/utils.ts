import {
  DEFAULT_CHART_HEIGHT,
  DEFAULT_CHART_MARGIN,
  DEFAULT_CHART_PADDING,
  DEFAULT_CHART_WIDTH
} from "../../constants/constants";

const calculateChartHeight = (units: number) => 
  units * DEFAULT_CHART_HEIGHT - (2 * DEFAULT_CHART_PADDING);

const calculateChartWidth = (units: number) => 
  units * DEFAULT_CHART_WIDTH - (2 * 10);

const calculateContainerWidth = (units: number) => 
  (units - 1) * (DEFAULT_CHART_WIDTH + DEFAULT_CHART_MARGIN) + DEFAULT_CHART_WIDTH;

const calculateContainerHeight = (units: number) => 
  (units - 1) * (DEFAULT_CHART_HEIGHT + DEFAULT_CHART_MARGIN) + DEFAULT_CHART_HEIGHT;

export {
  calculateChartHeight,
  calculateChartWidth,
  calculateContainerWidth,
  calculateContainerHeight
};
