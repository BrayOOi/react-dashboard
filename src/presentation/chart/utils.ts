import {
  DEFAULT_CHART_HEIGHT,
  DEFAULT_CHART_PADDING,
  DEFAULT_CHART_WIDTH
} from "../../constants/constants";

const calculateHeight = (units: number) => 
  units * DEFAULT_CHART_HEIGHT - (2 * DEFAULT_CHART_PADDING);

const calculateWidth = (units: number) => 
  units * DEFAULT_CHART_WIDTH - (2 * DEFAULT_CHART_PADDING);

export {
  calculateHeight,
  calculateWidth
};
