import React, { useState } from "react";
import Select from "react-select";

function Test() {
  const [selectedOption, setSelectedOption] = useState(null);
  const countriesLocal = [
    { label: "China", value: "china", population: 1402000 },
    { label: "India", value: "india", population: 1380000 },
    { label: "USA", value: "usa", population: 330000 },
  ];

  const handleChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="main-content">
      <div className="content-top-gap">
        <Select
          options={countriesLocal}
          isClearable={true}
          isSearchable={true}
          value={selectedOption}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default Test;
