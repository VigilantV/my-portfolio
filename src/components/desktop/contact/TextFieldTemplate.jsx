import TextField from "@mui/material/TextField";
import COLORS from "../../../styles/theme";

const TextFieldTemplate = ({ label, name, type }) => {
  return (
    <TextField
      label={label}
      name={name}
      type={type}
      variant="standard"
      required
      sx={{
        width: "22vw",
        input: { fontSize: "1.2vw", color: COLORS.whitish },
        "& .MuiInputLabel-root": {
          fontSize: "1.15vw",
          color: COLORS.whitish,
        },
        "& .MuiInputLabel-root.Mui-focused": {
          fontSize: "1vw",
          color: COLORS.paleBlue,
        },
        "& .MuiInput-underline:before": { borderBottomColor: COLORS.whitish },
        "& .MuiInput-underline:hover:before": {
          borderBottomColor: `${COLORS.whitish} !important`,
        },
        "& .MuiInput-underline.Mui-focused": {
          "&:after": {
            borderColor: COLORS.paleBlue,
          },
        },
      }}
    />
  );
};

export default TextFieldTemplate;
