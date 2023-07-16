import { RatioDataType } from "@/types/ratio.type";
import {
  PercentPerValue,
  PercentValue,
  PieChartRatio,
} from "@/types/ratio.type";

/**
 * this function format arrays of original region data to pie ratio data that can use for viewing in pie chart
 * @param arr : array of original data
 * @returns pie char ratio data type
 */

function formatData(arr: PercentPerValue[]): RatioDataType[] {
  return arr.map(({ name, value }) => {
    const formatData: PieChartRatio[] = formatRawData(value);
    return {
      tabName: name,
      data: formatData,
    };
  });
}

function formatRawData(arr: PercentValue[]): PieChartRatio[] {
  return arr.map((val) => {
    const value = parseFloat(parseFloat(val.percentage).toFixed(1));

    return { name: val.name, value };
  });
}

export default formatData;
