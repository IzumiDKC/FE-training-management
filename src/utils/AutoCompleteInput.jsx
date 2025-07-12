// File: src/utils/AutoCompleteInput.jsx
import React, { useState } from "react";
import Autosuggest from "react-autosuggest";
import hocHamHocViList from "../utils/hocHamHocViList"; 

const AutoCompleteInput = ({ value, onChange }) => {
  const [suggestions, setSuggestions] = useState([]);

  const getSuggestions = (inputValue) => {
    const lower = inputValue.trim().toLowerCase();
    if (lower.length === 0) return [];
    return hocHamHocViList.filter(item =>
      item.toLowerCase().includes(lower)
    );
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = (suggestion) => suggestion;

  const renderSuggestion = (suggestion) => <div>{suggestion}</div>;

  const inputProps = {
    placeholder: "VD: Bác sĩ Chuyên khoa II, Thạc sĩ...",
    value,
    onChange: (e, { newValue }) => onChange(newValue),
    className: "form-control"
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
    />
  );
};

export default AutoCompleteInput;
