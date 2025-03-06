import "./styles.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: string; 
}

export const Input: React.FC<InputProps> = ({ label, icon, ...props }) => {
  return (
    <div className={`input-container ${icon ? "with-icon" : ""}`}>
      {label && <label htmlFor={props.id}>{label}</label>}
      {icon && <span className={`icon icon-${icon}`} />}
      <input {...props} />
    </div>
  );
};
