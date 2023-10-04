import React, { useState } from "react";
import { COIN_VALUE_SWAP } from "./constants";
import { Input, InputNumber, Select } from "antd";
import "./styles.css";

const coinSwapList = COIN_VALUE_SWAP?.map((item) => ({
  value: item?.price,
  label: item?.currency,
}));

const SwapCoin = () => {
  const [coinValueSelected, setSelectedCoinValue] = useState(
    coinSwapList[0]?.value
  );
  const [coinValueTransformed, setCoinValueTransformed] = useState("");
  const [inputCoinSelect, setInputCoinSelect] = useState(Number);
  const [inputCointTransform, setInputCoinTransform] = useState(Number);

  const handleChangeCoinInput = (value) => {
    setInputCoinSelect(value);
  };

  const handleChangeSelectCoin = (valueSelected) => {
    setSelectedCoinValue(valueSelected);
  };

  const handleChangeSwapCoin = (valueTransformed) => {
    setCoinValueTransformed(valueTransformed);

    if (!inputCoinSelect || !coinValueSelected) {
      return;
    }
    const transformedValue =
      (Number(coinValueSelected) * inputCoinSelect) / Number(valueTransformed);
    setInputCoinTransform(transformedValue);
  };

  return (
    <div className="swap-coin">
      <div className="input-coin">
        <Select
          value={coinValueSelected}
          style={{ width: 120, margin: "20px" }}
          onChange={handleChangeSelectCoin}
          options={coinSwapList}
        />
        <InputNumber
          min={0}
          style={{ width: 250, margin: "20px" }}
          value={inputCoinSelect}
          onChange={(e) => handleChangeCoinInput(e)}
        />
      </div>
      <div className="input-coin">
        <Select
          value={coinValueTransformed}
          style={{ width: 120, margin: "20px" }}
          onChange={handleChangeSwapCoin}
          options={coinSwapList}
        />
        <Input
          style={{ width: 250, margin: "20px" }}
          value={inputCointTransform}
        />
      </div>
    </div>
  );
};

export default SwapCoin;
