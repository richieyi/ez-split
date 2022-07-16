import useDiners from '../../hooks/useDiners';

function NewDinersList(props: any) {
  const { diners, removeDiner } = useDiners();

  function renderDiners() {
    return diners.map((diner: any) => {
      return (
        <div key={diner.id}>
          <div>
            {diner.name} {diner.cost}
          </div>
          <button onClick={() => removeDiner(diner.id)}>
            Remove
          </button>
        </div>
      );
    });
  }

  return (
    <div>
      <h1>--Diners--</h1>
      <div>{renderDiners()}</div>
    </div>
  );
}

export default NewDinersList;
