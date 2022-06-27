export interface Props {
  title: string;
}

function Button(props: Props) {
  const { title } = props;

  return (
    <button
      type="button"
      className="border-2 border-black rounded-full p-2"
    >
      {title}
    </button>
  );
}

export default Button;
