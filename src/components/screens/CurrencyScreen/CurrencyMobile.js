import React, { useEffect, useState } from "react";
import liff from "@line/liff";
import axios from "axios";
import { domain } from "../../../env";
import {
  ConditionBox,
  ConditionSmBox,
  CrawlSpinnerBox,
  CurrencyFiveDaysBox,
  CurrencyFiveDaysDate,
  CurrencyFiveDaysRate,
  CurrencyFiveDaysSmBox,
  PrevFiveDayBox,
  PrevFiveDayBtn,
  PrevFiveDayClose,
  SendBtnBox,
  StyleTextField,
  TextFieldBox,
  Title,
} from "../../../styles/CurrencyScreen/CurrencyMobile";
import CircularProgress from "@mui/material/CircularProgress";
import { Colors } from "../../../styles/theme";
import { Backdrop, Box, Button, Typography } from "@mui/material";
import { basicSwal } from "../../../swal";

function CurrencyMobile() {
  const qweqwe = [
    { time: "2023/10/8", rate: "50" },
    { time: "2023/10/8", rate: "50" },
    { time: "2023/10/8", rate: "50" },
    { time: "2023/10/8", rate: "50" },
    { time: "2023/10/8", rate: "50" },
  ];

  const [loading, setLoading] = useState(true);
  const [crawlLoading, setCrawlLoading] = useState(true);
  const [addFiveDaysLoading, setAddFiveDaysLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [currencyName, setCurrencyName] = useState(null);
  const [isSelect, setIsSelect] = useState(null);
  const [price, setPrice] = useState(null);
  const [currenctData, setCurrencyData] = useState(qweqwe);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    // liff.init({ liffId: "2002355355-qonodd6j" }).then(() => {
    //   if (liff.isLoggedIn) {
    //     const userId = liff.getContext().userId;
    //     setUser(userId);
    //     axios.post(`${domain}/get_currency_data/`, { userId }).then((res) => {
    //       setLoading(false);
    //       setCurrencyName(res.data.currency);
    //     });
    //   }
    // });
    // const userId = "Ud4ebcf29d07cc6c31e8de54042307138";
    // axios.post(`${domain}/get_currency_data/`, { userId }).then((res) => {
    //   setLoading(false);
    //   setCurrencyName(res.data.currency);
    // });
  }, [setLoading]);

  if (isSelect && price) {
    var cond = isSelect === "left" ? ">" : "<";
  }

  const text1 = `${cond}`;
  const text2 = `${price}`;

  const conditionHandler = (state) => {
    setIsSelect(state);
  };

  const priceHandler = (e) => {
    setPrice(e.target.value);
  };

  const btnHandler = () => {
    if (!isSelect && !price) {
      basicSwal("warning", "尚未選擇判斷條件和金額");
      return;
    } else if (!isSelect) {
      basicSwal("warning", "尚未選擇判斷條件");
      return;
    } else if (!price) {
      basicSwal("warning", "尚未選擇金額");
      return;
    }

    const condition = isSelect === "left" ? ">" : "<";
    // axios
    //   .post(`${domain}/store_currency/`, {
    //     user,
    //     currencyName,
    //     condition,
    //     price,
    //   })
    //   .then((res) => {
    //     setCurrencyData(res.data.datas);
    //   });
    basicSwal("success", "匯率儲存成功");
  };

  const fiveDayBtnHandler = () => {
    setAddFiveDaysLoading(true);
    setTimeout(() => {
      setAddFiveDaysLoading(false);
      const data = [...currenctData, ...qweqwe];
      setCurrencyData(data);
    }, 2000);
  };

  const closeFiveDayBtnHandler = () => {
    const data = currenctData.slice(0, 5);
    setCurrencyData(data);
  };

  return loading ? (
    <Backdrop open={loading} sx={{ backgroundColor: "#bcaaa45c" }}>
      <CircularProgress sx={{ color: Colors.brown }} />
    </Backdrop>
  ) : (
    <>
      {/* <Title>已選擇: {currencyName}</Title> */}
      <Title>已選擇: 英鎊</Title>
      <Box mt={2} pl={"50px"} color={Colors.greyTextBlood}>
        請選擇判斷條件:
      </Box>
      <ConditionBox>
        <ConditionSmBox
          data={[isSelect === "left", Colors.darkGreen]}
          onClick={() => conditionHandler("left")}
        >
          {">"}
        </ConditionSmBox>
        <ConditionSmBox
          data={[isSelect === "right", Colors.red]}
          onClick={() => conditionHandler("right")}
        >
          {"<"}
        </ConditionSmBox>
      </ConditionBox>

      <TextFieldBox>
        <StyleTextField
          label="請輸入金額"
          type="number"
          onChange={priceHandler}
        />
      </TextFieldBox>
      {isSelect && price ? (
        <Box sx={{ padding: "0px 50px" }}>
          <SendBtnBox>
            <>
              <Typography
                align="center"
                fontWeight={600}
                color={Colors.greyTextBlood}
              >
                條件:{" "}
                <span
                  style={{
                    display: "inline-block",
                    margin: "0px 3px",
                    width: "20px",
                    color: "#fff",
                    backgroundColor:
                      isSelect === "left" ? Colors.darkGreen : Colors.red800,
                  }}
                >
                  {text1}
                </span>{" "}
                金額:{" "}
                <span
                  style={{
                    color: Colors.yellow,
                  }}
                >
                  {text2}
                </span>
              </Typography>
              <Button
                variant="contained"
                onClick={btnHandler}
                sx={{
                  // width: "40%",
                  height: "60%",
                  backgroundColor: Colors.greyText,
                  "&:hover": {
                    backgroundColor: Colors.greyText,
                  },
                }}
              >
                送出
              </Button>
            </>
          </SendBtnBox>
        </Box>
      ) : null}

      {/* <Typography align="center" mt={"15px"}}>
        近五日{currencyName}即期賣出匯率
      </Typography> */}

      <Typography align="center" mt={"15px"}>
        近五日
        <span style={{ color: Colors.red800, margin: "0px 5px 6px" }}>123</span>
        即期賣出匯率
      </Typography>

      <Box sx={{ padding: "0px 50px" }}>
        <CurrencyFiveDaysBox>
          {!crawlLoading ? (
            <CrawlSpinnerBox>
              <CircularProgress sx={{ color: Colors.brown }} />
            </CrawlSpinnerBox>
          ) : (
            <>
              {currenctData.map((data) => (
                <CurrencyFiveDaysSmBox isFirst={true}>
                  <CurrencyFiveDaysDate>{data.time}</CurrencyFiveDaysDate>
                  <CurrencyFiveDaysRate>{data.rate}</CurrencyFiveDaysRate>
                </CurrencyFiveDaysSmBox>
              ))}
            </>
          )}

          {/* {currenctData.length !== 0
          ? currenctData.map((data, index) => (
              <CurrencyFiveDaysSmBox
                key={index}
              >{`${data.time} ${data.rate}`}</CurrencyFiveDaysSmBox>
            ))
          : null} */}
        </CurrencyFiveDaysBox>
      </Box>

      <PrevFiveDayBox
        sx={{ justifyContent: currenctData.length === 5 && "center" }}
      >
        {addFiveDaysLoading ? (
          <CrawlSpinnerBox>
            <CircularProgress sx={{ color: Colors.brown }} size={20} />
          </CrawlSpinnerBox>
        ) : (
          <>
            <PrevFiveDayBtn variant="outlined" onClick={fiveDayBtnHandler}>
              再五日
            </PrevFiveDayBtn>
            <PrevFiveDayClose
              variant="outlined"
              sx={{ display: currenctData.length === 5 && "none" }}
              onClick={closeFiveDayBtnHandler}
            >
              關閉
            </PrevFiveDayClose>
          </>
        )}
      </PrevFiveDayBox>
    </>
  );
}

export default CurrencyMobile;
