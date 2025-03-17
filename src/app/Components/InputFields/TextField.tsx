import TextField from "@mui/material/TextField";

interface CustomTextFieldProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fullWidth?: boolean;
  required?: boolean;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  label,
  placeholder,
  value,
  onChange,
  fullWidth = true,
  required = false,
}) => {
  return (
    <TextField
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      fullWidth={fullWidth}
      required={required}
      sx={{
        mb: 2,
        "& .MuiOutlinedInput-root": {
          borderRadius: "8px",
          "& fieldset": { borderColor: "#eeeeee" },
          "&:hover fieldset": { borderColor: "#800020" },
          "&.Mui-focused fieldset": { borderColor: "#800020" },
        },
      }}
    />
  );
};

export default CustomTextField;
