import IconButton from '../IconButton';

function SectionHeader(props: any) {
  const { headerTitle, isAdding, handleAddNew } = props;

  return (
    <div className="flex justify-between">
      <h1 className="font-bold text-2xl mb-2">{headerTitle}</h1>
      {!isAdding ? (
        <IconButton
          name="plus"
          color="green"
          onClick={handleAddNew}
        />
      ) : null}
    </div>
  );
}

export default SectionHeader;
