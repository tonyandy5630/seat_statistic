import React from "react";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { RatioType } from "@/types/ratio-layout.type";

interface SearchInputProps {
  type: RatioType;
}

export default function SearchInput({ type }: SearchInputProps) {
  return (
    <TextField
      className='w-full h-1/2 md:w-1/2'
      size='small'
      placeholder={`Search any ${type}...`}
      sx={{
        "&.MuiTextField-root": {
          borderRadius: "inherit",
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <SearchIcon />
          </InputAdornment>
        ),
        sx: {
          "& input::placeholder": {
            fontSize: "13px",
          },
        },
      }}
    />
  );
}
