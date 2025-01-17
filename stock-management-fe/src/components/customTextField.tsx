"use client";
import React from "react";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

interface CommonTextFieldProps {
  label?: string;
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  type?: string;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  customStyle?: React.CSSProperties;
  name?: string;
  id?: string;
}

const StyledTextField = styled(TextField)(({ theme }) => ({
  height: "40px",
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    height: "100%",
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.dark,
    },
  },
}));

const CommonTextField: React.FC<CommonTextFieldProps> = ({
  label,
  value,
  onChange,
  onBlur,
  type = "text",
  placeholder = "",
  error = false,
  helperText = "",
  disabled = false,
  fullWidth = true,
  startIcon,
  endIcon,
  customStyle = {},
  name,
  id,
}) => {
  return (
    <StyledTextField
      label={label}
      value={value}
      onChange={onChange}
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      error={error}
      helperText={helperText}
      onBlur={onBlur}
      disabled={disabled}
      fullWidth={fullWidth}
      variant="outlined"
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">{startIcon}</InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">{endIcon}</InputAdornment>
          ),
        },
      }}
      style={customStyle}
    />
  );
};

export default CommonTextField;
