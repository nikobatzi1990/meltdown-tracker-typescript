interface InputProps {
  className: string,
  name: string,
  onChange: React.ChangeEventHandler,
  placeholder: string
  type: string,
  value: string
}

export default function Input({ 
  className, 
  name, 
  onChange,
  placeholder, 
  type, 
  value }: InputProps) {

  return (
    <input
      className={className}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      value={value}
    >
    </input>
  );
}