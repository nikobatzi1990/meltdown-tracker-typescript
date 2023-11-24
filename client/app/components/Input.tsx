interface InputProps {
  className?: string,
  id?: string,
  name?: string,
  onChange?: React.ChangeEventHandler,
  placeholder?: string,
  text?: string,
  type: string,
  value?: string
}

export default function Input({ 
  className, 
  id,
  name, 
  onChange,
  placeholder, 
  text,
  type, 
  value }: InputProps) {

  return (
    <>
      <label htmlFor={id}>{text}</label>
      <input
        className={className}
        id={id}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        value={value}
      />
    </>
  );
}