import { ChangeEvent } from 'react';

interface InputProps {
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
  className?: string;
}

function Input(props: InputProps) {
  const { name, placeholder, value, onChange, autoFocus, className } =
    props;

  return (
    <input
      type="text"
      name={name}
      className={
        className ||
        'placeholder:italic placeholder:text-slate-400 block bg-white w-full border-2 border-slate-300 rounded-md p-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1'
      }
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      autoFocus={autoFocus}
    />
  );
}

export default Input;
