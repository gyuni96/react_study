import React, { useState, useRef } from "react";

const useDebounce = (callback, delay) => {
  const debounceTimer = useRef(null);

  return (...args) => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      callback.apply(this, args);
    }, delay);
  };
};

export default useDebounce;
