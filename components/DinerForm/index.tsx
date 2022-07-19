import Input from '../Input';
import SaveCancelButtons from '../SaveCancelButtons';

function DinerForm(props: any) {
  const {
    handleSaveDiner,
    diner,
    handleDinerNameChange,
    handleCancelDiner,
  } = props;

  function handleNameChange(e: any) {
    const val = e.target.value;
    if (val.length <= 10) {
      handleDinerNameChange(val);
    }
  }

  return (
    <>
      <form onSubmit={handleSaveDiner}>
        <Input
          name="dinerName"
          placeholder="Diner's nickname"
          value={diner}
          onChange={handleNameChange}
        />
        <button type="submit" className="hidden" />
      </form>
      <SaveCancelButtons
        handleSave={handleSaveDiner}
        handleCancel={handleCancelDiner}
      />
    </>
  );
}

export default DinerForm;
