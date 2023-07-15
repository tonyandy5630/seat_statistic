import { getRegionAPI } from "@/apis/ratio.api";
import { RatioType } from "@/types/ratio-layout.type";
import { useQuery } from "@tanstack/react-query";

const useRatio = (type: RatioType, queryKey: string) => {
  function getType(type: RatioType) {
    switch (type) {
      case "region":
        return getRegionAPI;
      default:
        return getRegionAPI;
    }
  }

  return useQuery([`${queryKey}`], getType(type));
};

export default useRatio;
