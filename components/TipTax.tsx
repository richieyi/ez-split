import React, { useRef, useState } from 'react';
import { isValidAmount } from '../utils';
import SaveCancelButtons from './SaveCancelButtons';

interface Props {
  tip: string;
  tax: string;
  setTip: (tip: string) => void;
  setTax: (tax: string) => void;
  subtotal: number;
  finalTotal: number;
}

function TipTax(props: Props) {
  const { tip, tax, setTip, setTax, subtotal, finalTotal } = props;
  const inputElTip = useRef<any>(null);
  const inputElTax = useRef<any>(null);

  const [isEditing, setIsEditing] = useState<boolean>(false);

  function handleSave() {
    const newTip = inputElTip?.current?.value;
    const newTax = inputElTax?.current?.value;
    if (isValidAmount(newTip) && isValidAmount(newTax)) {
      setTip(newTip);
      setTax(newTax);
      setIsEditing(false);
    } else {
      // Probably not the best UX
      alert('Please enter valid tip & tax amounts (e.g. 3.50)');
    }
  }

  function renderForm() {
    return (
      <div className="border rounded p-2 bg-white">
        <form>
          <input
            placeholder="Tip"
            ref={inputElTip}
            defaultValue={tip}
            className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border-2 border-slate-300 rounded-md p-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
          />
          <input
            placeholder="Tax"
            ref={inputElTax}
            defaultValue={tax}
            className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border-2 border-slate-300 rounded-md p-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
          />
        </form>
        <SaveCancelButtons
          handleSave={handleSave}
          handleCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <div className="flex-1">
      <h1 className="text-2xl font-bold my-4 md:text-center text-left">
        Tip + Tax 💰
      </h1>
      <div className="border rounded my-2 p-2 bg-white flex justify-between">
        <span className="font-bold">Subtotal</span>
        <span>{`$${subtotal.toFixed(2)}`}</span>
      </div>
      {isEditing ? (
        renderForm()
      ) : (
        <>
          <div className="border rounded my-2 p-2 bg-white flex-col">
            <div className="flex justify-between">
              <span className="font-bold">Tip</span>
              <span>{`$${Number(tip).toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Tax</span>
              <span>{`$${Number(tax).toFixed(2)}`}</span>
            </div>
          </div>
          <div className="border rounded my-2 p-2 bg-white flex justify-between">
            <span className="font-bold">Total</span>
            <span>{`$${finalTotal.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-center">
            <button
              className="border rounded p-2 bg-white"
              onClick={() => setIsEditing(true)}
            >
              Edit Tip + Tax
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default TipTax;
