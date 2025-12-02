// src/store/useGameStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PORTS } from '../constants';

const initialPrices = {};
PORTS.forEach(port => {
  initialPrices[port.id] = { ...port.basePrices };
});

export const useGameStore = create(
  persist(
    (set, get) => ({
      money: 10000,
      ship: { capacity: 100, speed: 1, level: 1 },
      inventory: { petrol: 0, elektronik: 0, gida: 0, tekstil: 0, demir: 0 },
      currentPrices: initialPrices,
      currentPort: null,

      addMoney: (amount) => set((state) => ({ money: state.money + amount })),
      spendMoney: (amount) => set((state) => ({ money: Math.max(0, state.money - amount) })),
      updateInventory: (item, amount) => set((state) => ({
        inventory: { ...state.inventory, [item]: Math.max(0, state.inventory[item] + amount) }
      })),
      setCurrentPort: (portId) => set({ currentPort: portId }),
    }),
    { name: "trade-empire-storage" }
  )
);