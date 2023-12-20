import React, { useEffect, useState } from "react";
import liff from "@line/liff";
import axios from "axios";
import { domain } from "../../../env";
import {
  ConditionBox,
  ConditionSmBox,
  CurrencyFiveDaysBox,
  CurrencyFiveDaysSmBox,
  StyleTextField,
  TextFieldBox,
  Title,
} from "../../../styles/CurrencyScreen/CurrencyMobile";
import CircularProgress from "@mui/material/CircularProgress";
import { Colors } from "../../../styles/theme";
import { Button, Typography } from "@mui/material";
import { basicSwal } from "../../../swal";

function CurrencyMobile() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [currencyName, setCurrencyName] = useState(null);
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
    //     });
    //   }
    // });
    const userId = "Ud4ebcf29d07cc6c31e8de54042307138";
    axios.post(`${domain}/get_currency_data/`, { userId }).then((res) => {
      setLoading(false);
      setCurrencyName(res.data.currency);
    });
  }, []);

  if (isSelect && price) {
    var cond = isSelect === "left" ? ">" : "<";
  }

  const text = `已選擇 ${cond} 金額: ${price}`;

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
    axios
      .post(`${domain}/store_currency/`, {
        user,
        currencyName,
        condition,
        price,
      })
      .then((res) => {
        setCurrencyData(res.data.datas);
      });
  };
  console.log(currenctData);
  return loading ? (
    <CircularProgress />
  ) : (
    <>
      <Title>已選擇: {currencyName}</Title>
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
        <Button variant="contained" onClick={btnHandler}>
          送出
        </Button>
      </TextFieldBox>

      {isSelect && price ? (
        <Typography align="center">{text}</Typography>
      ) : null}

      <Typography align="center" m={3}>
        近五日{currencyName}匯率
      </Typography>

      <CurrencyFiveDaysBox>
        {/* <CurrencyFiveDaysSmBox>2023/12/21 035</CurrencyFiveDaysSmBox>
        <CurrencyFiveDaysSmBox>123</CurrencyFiveDaysSmBox>
        <CurrencyFiveDaysSmBox>123</CurrencyFiveDaysSmBox> */}
        {currenctData.length !== 0
          ? currenctData.map((data, index) => (
              <CurrencyFiveDaysSmBox
                key={index}
              >{`${data.time} ${data.rate}`}</CurrencyFiveDaysSmBox>
            ))
          : null}
      </CurrencyFiveDaysBox>
    </>
  );
}

export default CurrencyMobile;
