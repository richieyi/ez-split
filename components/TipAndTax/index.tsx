import React, { ChangeEvent, useState } from 'react';
import { isValidAmount } from '@/utils/index';
import SaveCancelButtons from '@/components/SaveCancelButtons';
import Input from '../Input';

interface TipAndTaxProps {
  tipTax: any;
  setTipTax: any;
  subtotal: number;
  finalTotal: number;
}

function TipAndTax(props: TipAndTaxProps) {
  const {
    tipTax: { tip, tax },
    setTipTax,
    subtotal,
    finalTotal,
  } = props;

  const [newTip, setNewTip] = useState<string>(tip);
  const [newTax, setNewTax] = useState<string>(tax);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  function handleTipChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (
      value === '' ||
      (isValidAmount(value) && value.length <= 10)
    ) {
      setNewTip(value);
    }
  }

  function handleTaxChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (
      value === '' ||
      (isValidAmount(value) && value.length <= 10)
    ) {
      setNewTax(value);
    }
  }

  function handleSave(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    if (newTip !== '' && newTax !== '') {
      setTipTax({ tip: Number(newTip), tax: Number(newTax) });
      setIsEditing(false);
    }
  }

  function renderForm() {
    return (
      <div className="border rounded p-2 bg-white">
        <form onSubmit={handleSave}>
          <Input
            name="tip"
            placeholder="Tip"
            value={newTip}
            onChange={handleTipChange}
            className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border-2 border-slate-300 rounded-md p-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
            autoFocus
          />
          <Input
            name="tax"
            placeholder="Tax"
            value={newTax}
            onChange={handleTaxChange}
            className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border-2 border-slate-300 rounded-md p-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
          />
          <button type="submit" className="hidden" />
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
      <h1 className="text-2xl font-bold my-4 lg:text-center text-left">
        Tip + Tax 💰
      </h1>
      <div className="border rounded my-2 p-2 bg-white flex justify-between shadow-md">
        <span className="font-bold">Subtotal</span>
        <span>{`$${subtotal.toFixed(2)}`}</span>
      </div>
      {isEditing ? (
        renderForm()
      ) : (
        <>
          <div className="border rounded my-2 p-2 bg-white flex-col shadow-md">
            <div className="flex justify-between">
              <span className="font-bold">Tip</span>
              <span>{`$${tip.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Tax</span>
              <span>{`$${tax.toFixed(2)}`}</span>
            </div>
          </div>
          <div className="border rounded my-2 p-2 bg-white flex justify-between shadow-md">
            <span className="font-bold">Total</span>
            <span>{`$${finalTotal.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-center">
            <button
              className="border rounded p-2 bg-white hover:bg-slate-200 shadow-md"
              onClick={() => setIsEditing(true)}
              autoFocus={true}
            >
              Edit Tip + Tax
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default TipAndTax;
