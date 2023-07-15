import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import SearchInput from "../SearchInput";
import { RatioType } from "@/types/ratio-layout.type";
import { get } from "http";

interface AutoCompleteProps {
  type: RatioType;
}

export default function AutoCompleteInput({ type }: AutoCompleteProps) {
  const getOptions = {};
  return (
    <Autocomplete
      options={getOptions}
      id='find-input'
      renderInput={(params) => <SearchInput type={type} {...params} />}
    ></Autocomplete>
  );
}
