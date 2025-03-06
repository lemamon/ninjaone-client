import "./styles.css";

interface SelectProps {
  id?: string;
  name?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { key: string; value: string; text: string }[];
  className?: string;
  label?: string;
}

export const Select: React.FC<SelectProps> = ({
  id,
  name,
  value,
  onChange,
  options,
  className = "",
  label,
}) => {
  return (
    <div className={`select-container ${className}`}>
      {label && <label htmlFor={id}>{label}</label>}
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="select"
      >
        {options.map(({ key, value, text }) => (
          <option key={key} value={value}>
            {text}
          </option>
        ))}
      </select>
    </div>
  );
};
