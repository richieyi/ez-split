export function Emoji(props: any) {
  const { type } = props;

  if (type === 'diner') {
    return <span>🧑‍🍳</span>;
  }

  if (type === 'expense') {
    return <span>🍴</span>;
  }

  return null;
}

export default Emoji;
