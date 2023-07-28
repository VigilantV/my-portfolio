import TextField from "@mui/material/TextField";

const TextFieldTemplate = ({ label, name, type }) => {
  return (
    <TextField
      label={label}
      name={name}
      type={type}
      variant="standard"
      required
      sx={{
        width: "20vw",
        input: { fontSize: "1.1vw", color: window.whitish },
        "& .MuiInputLabel-root": {
          fontSize: "1.1vw",
          color: window.whitish,
        },
        "& .MuiInputLabel-root.Mui-focused": {
          fontSize: "0.9vw",
          color: window.paleBlue,
        },
        "& .MuiInput-underline:before": { borderBottomColor: window.whitish },
        "& .MuiInput-underline:hover:before": {
          borderBottomColor: `${window.whitish} !important`,
        },
        "& .MuiInput-underline.Mui-focused": {
          "&:after": {
            borderColor: window.paleBlue,
          },
        },
      }}
    />
  );
};

export default TextFieldTemplate;
