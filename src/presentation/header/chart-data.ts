import { ChartType } from "../chart/types";

const CHART_TEMPLATES: {
  [key in ChartType["type"]]: {
    size: {
      [key in '1x1' | '2x2' | '3x3' | '4x4']?: [number, number];
    }
  }
} = {
  'area': {
    size: {
      '2x2': [2, 2],
      '3x3': [3, 3],
      '4x4': [4, 4],
    }
  },
  'bar': {
    size: {
      '2x2': [2, 2],
      '3x3': [3, 3],
      '4x4': [4, 4],
    }
  },
  'line': {
    size: {
      '2x2': [2, 2],
      '3x3': [3, 3],
      '4x4': [4, 4],
    }
  },
  'pie': {
    size: {
      '1x1': [1, 1],
      '2x2': [2, 2],
      '3x3': [3, 3],
      '4x4': [4, 4],
    }
  },
  'scatter': {
    size: {
      '2x2': [2, 2],
      '3x3': [3, 3],
      '4x4': [4, 4],
    }
  }
};

export default CHART_TEMPLATES;
