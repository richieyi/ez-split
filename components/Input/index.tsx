interface Props {
  name: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

function Input(props: Props) {
  const { name, placeholder, onChange, value } = props;

  return (
    <input
      type="text"
      name={name}
      className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md p-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
}

export default Input;
