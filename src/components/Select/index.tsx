import { useState } from "react";
import "./styles.css";

export interface SelectProps {
  id?: string;
  name?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: {
    key: string;
    value: string;
    text: string;
  }[];
  className?: string;
  label?: string;
  prefix?: string;
}

export const Select: React.FC<SelectProps> = ({
  id,
  name,
  value,
  onChange,
  options,
  className = "",
  label,
  prefix,
}) => {
  const [hidePrefix, setHidePrefix] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e);
    setHidePrefix(false);
  };

  return (
    <div className={`select-container ${className}`}>
      {label && <label htmlFor={id}>{label}</label>}
      <select
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        onClick={() => setHidePrefix(true)}
        className="select"
      >
        {options.map(({ key, value, text }) => (
          <option key={key} value={value}>
            {prefix && !hidePrefix ? `${prefix} ${text}` : text}
          </option>
        ))}
      </select>
    </div>
  );
};
