import React, { useState, useEffect } from "react";

const ProductVariantSlider = ({
  defaultValue,
  options,
  onVariantChange,
  className = "",
  handleSetValue = null,
}: {
  options: Array<{ text: string; description: string }>;
  onVariantChange: (value: { text: string; description: string }) => void;
  className?: string;
  defaultValue?: number;
  handleSetValue?: (value: number) => void;
}) => {
  const [value, setValue] = useState<number>(defaultValue || 0);
  const [forbiddenRanges, setForbiddenRange] = useState([]);

  useEffect(() => {
    const variantLength = options?.length;
    const averageValue = 100 / variantLength;
    let initalValue = 0;
    const forbiddenValues = Array.from(
      { length: variantLength - 1 },
      (_, index) => index
    )?.map(item => {
      initalValue += averageValue;
      return { min: initalValue - 0.5, max: initalValue + 0.5 };
    });
    if (defaultValue) {
      forgetForbidden(defaultValue, forbiddenValues);
    } else {
      onVariantChange(options[0]);
    }
    setForbiddenRange(forbiddenValues);
  }, []);

  useEffect(() => {
    // This logic occurs to fix the raised condition in the skin quiz, where this component is being used. In the skin quiz, condition rendering occurs every time the state changes. We will fix this in the future.
    if (handleSetValue && typeof handleSetValue == "function") {
      var timeoutId: any;

      timeoutId = setTimeout(() => {
        handleSetValue(value);
      }, 500);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [value]);

  const isForbidden = (newValue: number) => {
    return forbiddenRanges.some(
      range => newValue >= range.min && newValue <= range.max
    );
  };

  const forgetForbidden = (value, customRange?: any) => {
    const findRangeIndex = customRange
      ? customRange?.findIndex(range => value < range.max)
      : forbiddenRanges.findIndex(range => value < range.max);

    if (findRangeIndex === -1) {
      onVariantChange(options[options.length - 1]);
    } else {
      onVariantChange(options[findRangeIndex]);
    }
  };

  const handleChange = event => {
    const newValue = parseInt(event.target.value, 10);
    if (!isForbidden(newValue)) {
      setValue(newValue);
      forgetForbidden(newValue);
    }
  };

  return (
    <div className={`productVariantslider ${className}`}>
      <input
        id="weight-loss-slider"
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={handleChange}
        className="productVariantslider_input"
      />
      <div className="productVariantslider_labels">
        {options?.map(item => (
          <span>{item?.text}</span>
        ))}
      </div>
    </div>
  );
};

export default ProductVariantSlider;
