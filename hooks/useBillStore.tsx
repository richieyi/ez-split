import create from 'zustand';
import Diner from '../toolkit/Diner';
import { exampleDiners } from '../utils/examples';

interface DinerStore {
  diners: Diner[];
  setDiners: (diners: Diner[]) => void;
  removeDiner: (diner: Diner) => void;
}

export const useDinerStore = create<DinerStore>((set) => ({
  diners: exampleDiners,
  setDiners: (diners: Diner[]) => set(() => ({ diners })),
  removeDiner: (dinerToRemove: Diner) =>
    set((state) => ({
      diners: state.diners.filter((diner) => diner !== dinerToRemove),
    })),
}));
