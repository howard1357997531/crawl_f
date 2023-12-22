import { Box, Button, TextField, Typography, styled } from "@mui/material";
import { Colors } from "../theme";
import CircularProgress from "@mui/material/CircularProgress";

export const Title = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: 20,
  color: Colors.greyTextBlood,
  fontWeight: 600,
  fontSize: 26,
}));

export const ConditionBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-evenly",
  marginTop: 15,
  padding: "0px 50px",
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
  padding: "0px 50px",
}));

export const StyleTextField = styled(TextField)(({ theme }) => ({
  width: "100%",
}));

export const SendBtnBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: 20,
  height: "50px",
  padding: "0px 10px",
  backgroundColor: Colors.brown200,
}));

export const CurrencyFiveDaysBox = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  minHeight: "150px",
  border: `1px solid ${Colors.brown200}`,
}));

export const CrawlSpinnerBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
}));

export const CurrencyFiveDaysSmBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isFirst",
})(({ theme, isFirst }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "35px",
  borderTop: isFirst ? "none" : `1px solid ${Colors.brown200}`,
}));

export const CurrencyFiveDaysDate = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "50%",
  height: "100%",
  backgroundColor: Colors.greyHover,
  color: Colors.greyTextBlood,
}));

export const CurrencyFiveDaysRate = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "50%",
  height: "100%",
  color: Colors.greyTextBlood,
}));

export const PrevFiveDayBox = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: "30px",
  marginTop: "10px",
  marginBottom: "20px",
  padding: "0px 50px",
}));

export const PrevFiveDayBtn = styled(Button)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  width: "40%",
  height: "100%",
  color: Colors.brown,
  border: `1px solid ${Colors.brown}`,
  "&:hover": {
    border: `1px solid ${Colors.brown}`,
  },
}));

export const PrevFiveDayClose = styled(Button)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "40%",
  height: "100%",
  color: Colors.brown,
  border: `1px solid ${Colors.brown}`,
  "&:hover": {
    border: `1px solid ${Colors.brown}`,
  },
}));
