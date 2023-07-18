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
  const data = arr.map(({ name, value }) => {
    const formatData: PieChartRatio[] = formatRawData(value);
    return {
      tabName: name,
      data: formatData,
    };
  });

  return data.filter((data) => data.data.length > 0);
}

function formatRawData(arr: PercentValue[]): PieChartRatio[] {
  const filterNoPercentVal = arr.filter(
    (val) => parseFloat(parseFloat(val.percentage).toFixed(1)) > 0
  );
  if (filterNoPercentVal.length === 0) return [];
  return filterNoPercentVal.map((val) => {
    const value = parseFloat(parseFloat(val.percentage).toFixed(1));

    return { name: val.name, value };
  });
}

export default formatData;
