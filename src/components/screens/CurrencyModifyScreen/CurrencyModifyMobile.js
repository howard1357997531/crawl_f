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
} from "../../../styles/CurrencyModifyScreen/CurrencyModifyMobile";
import CircularProgress from "@mui/material/CircularProgress";
import { Colors } from "../../../styles/theme";
import {
  Backdrop,
  Box,
  Button,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { basicSwal } from "../../../swal";

function CurrencyModifyMobile() {
  const [loading, setLoading] = useState(false);
  const [crawlLoading, setCrawlLoading] = useState(true);
  const [addFiveDaysLoading, setAddFiveDaysLoading] = useState(false);
  const [user, setUser] = useState(null);

  const [isSelect, setIsSelect] = useState(null);
  const [price, setPrice] = useState(null);
  const [currenctData, setCurrencyData] = useState([]);

  useEffect(() => {
    // liff.init({ liffId: "2002355355-qonodd6j" }).then(() => {
    //   if (liff.isLoggedIn) {
    //     const userId = liff.getContext().userId;
    //     setUser(userId);
    //     axios.post(`${domain}/get_currency_data/`, { userId }).then((res) => {
    //       setLoading(false);
    //       setCurrencyName(res.data.currency);
    //       setCurrencyData(res.data.crawls);
    //       if (res.data.store_data !== "no") {
    //         setIsSelect(res.data.store_data.condition);
    //         setPrice(res.data.store_data.price);
    //       }
    //     });
    //   }
    // });
    // const userId = "Ud4ebcf29d07cc6c31e8de54042307138";
    // setUser(userId);
    // axios.post(`${domain}/get_currency_data/`, { userId }).then((res) => {
    //   setLoading(false);
    //   setCurrencyName(res.data.currency);
    //   setCurrencyData(res.data.crawls);
    //   if (res.data.store_data !== "no") {
    //     setIsSelect(res.data.store_data.condition);
    //     setPrice(res.data.store_data.price);
    //   }
    // });
  }, [setLoading]);

  const conditionHandler = (state) => {
    setIsSelect(state);
  };

  const priceHandler = (e) => {
    setPrice(e.target.value);
  };

  const btnHandler = () => {
    const condition = isSelect;
    axios
      .post(`${domain}/store_currency/`, {
        user,
        currencyName,
        condition,
        price,
      })
      .then((res) => {
        basicSwal("success", "匯率儲存成功").then((result) => {
          if (result.isConfirmed) {
            // liff
            //   .sendMessages([
            //     {
            //       type: "text",
            //       text: `已儲存${currencyName}至資料庫`,
            //     },
            //   ])
            //   .then(() => {
            //     liff.closeWindow();
            //   })
            //   .catch((err) => {
            //     console.log("error", err);
            //   });
            liff.closeWindow();
          }
        });
      });
  };

  const fiveDayBtnHandler = () => {
    setAddFiveDaysLoading(true);
    const crawl_num = currenctData.length;
    axios
      .post(`${domain}/get_next_five_day_currency/`, {
        currencyName,
        crawl_num,
      })
      .then((res) => {
        setAddFiveDaysLoading(false);
        const data = [...currenctData, ...res.data.crawls];
        setCurrencyData(data);
      });
  };

  const closeFiveDayBtnHandler = () => {
    const data = currenctData.slice(0, 5);
    setCurrencyData(data);
  };

  const qwe = ["usd", "jpy", "qwe"];
  const [currencyName, setCurrencyName] = useState(qwe[0]);

  const handleChange = (event) => {
    setCurrencyName(event.target.value);
  };

  return loading ? (
    <Backdrop open={loading} sx={{ backgroundColor: "#bcaaa45c" }}>
      <CircularProgress sx={{ color: Colors.brown }} />
    </Backdrop>
  ) : (
    <>
      <Title>
        修改:{" "}
        <Select
          value={currencyName}
          onChange={handleChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          sx={{ marginLeft: 1, width: "80px", height: "35px" }}
        >
          {qwe.map((cur, index) => (
            <MenuItem key={index} value={cur}>
              {cur}
            </MenuItem>
          ))}
        </Select>
      </Title>
      {/* <Title>已選擇: 英鎊</Title> */}
      <Box mt={2} pl={"50px"} color={Colors.greyTextBlood}>
        請選擇判斷條件:
      </Box>
      <ConditionBox>
        <ConditionSmBox
          data={[isSelect === ">", Colors.darkGreen]}
          onClick={() => conditionHandler(">")}
        >
          {">"}
        </ConditionSmBox>
        <ConditionSmBox
          data={[isSelect === "<", Colors.red]}
          onClick={() => conditionHandler("<")}
        >
          {"<"}
        </ConditionSmBox>
      </ConditionBox>

      <TextFieldBox>
        <StyleTextField
          label="請輸入金額"
          type="number"
          defaultValue={price ? price : null}
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
                      isSelect === ">" ? Colors.darkGreen : Colors.red800,
                  }}
                >
                  {isSelect}
                </span>{" "}
                金額:{" "}
                <span
                  style={{
                    color: Colors.yellow,
                  }}
                >
                  {price}
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

      <Typography align="center" mt={"15px"}>
        近五日
        <span style={{ color: Colors.red800, margin: "0px 5px 6px" }}>
          {currencyName}
        </span>
        即期賣出匯率
      </Typography>

      <Box sx={{ padding: "0px 50px" }} mt={"2px"}>
        <CurrencyFiveDaysBox>
          {!crawlLoading ? (
            <CrawlSpinnerBox>
              <CircularProgress sx={{ color: Colors.brown }} />
            </CrawlSpinnerBox>
          ) : (
            <>
              {currenctData.map((data, index) => (
                <CurrencyFiveDaysSmBox key={index} isFirst={index === 0}>
                  <CurrencyFiveDaysDate>{data.time}</CurrencyFiveDaysDate>
                  <CurrencyFiveDaysRate>{data.rate}</CurrencyFiveDaysRate>
                </CurrencyFiveDaysSmBox>
              ))}
            </>
          )}
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

export default CurrencyModifyMobile;
