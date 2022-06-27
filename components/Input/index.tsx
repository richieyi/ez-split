function Input(props) {
  return (
    <form>
      <label htmlFor="first">Item</label>
      <input
        type="text"
        name="first"
        className="border-2 border-black rounded-full p-2"
      />
      <label htmlFor="second">Price</label>
      <input
        type="text"
        name="second"
        className="border-2 border-black rounded-full p-2"
      />
    </form>
  );
}

export default Input;
