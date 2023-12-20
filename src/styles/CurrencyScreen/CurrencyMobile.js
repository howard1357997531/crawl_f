import { Box, TextField, Typography, styled } from "@mui/material";
import { Colors } from "../theme";

export const Title = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  marginTop: 20,
  color: Colors.greyTextBlood,
  fontSize: 26,
}));

export const ConditionBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-evenly",
  marginTop: 20,
}));

export const ConditionSmBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "data",
})(({ theme, data }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "25%",
  height: "70px",
  color: data[0] ? "#fff" : data[1],
  backgroundColor: data[0] ? data[1] : "transparent",
  border: `1px solid ${data[1]}`,
  fontSize: 26,
  transition: "all .1s ease-in-out",
  "&:hover": {
    cursor: "pointer",
  },
}));

export const TextFieldBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-evenly",
  marginTop: 20,
}));

export const StyleTextField = styled(TextField)(({ theme }) => ({}));

export const CurrencyFiveDaysBox = styled(Box)(({ theme }) => ({
  width: "80%",
  margin: "0 auto",
  border: `1px solid ${Colors.greyTextBlood}`,
}));

export const CurrencyFiveDaysSmBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "70px",
  borderBottom: `1px solid ${Colors.greyTextBlood}`,
}));
