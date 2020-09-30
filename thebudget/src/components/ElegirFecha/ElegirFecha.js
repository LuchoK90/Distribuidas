import React, { useState } from "react";
import DatePicker from "react-native-datepicker";

const MyDatePicker = ({ disabled = false }) => {
  const [date, setDate] = useState("20-09-2020");

  return (
    <DatePicker
      style={{ width: 200 }}
      date={date}
      mode="date"
      disabled={disabled}
      placeholder="select date"
      format="DD-MM-YYYY"
      minDate="20-09-2020"
      maxDate="20-09-2021"
      confirmBtnText="Confirm"
      showIcon={false}
      cancelBtnText="Cancel"
      customStyles={{
        dateIcon: {
          position: "absolute",
          left: 0,
          top: 4,
          marginLeft: 0,
        },
        dateInput: {
          marginLeft: 36,
        },

        // ... You can check the source to find the other keys.
      }}
      onDateChange={(val) => setDate(val)}
    />
  );
};

export default MyDatePicker;
