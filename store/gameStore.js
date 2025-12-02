// store/gameStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useGameStore = create(
  persist(
    (set) => ({
      money: 10000,
      ship: {
        capacity: 100,
        speed: 1,
        level: 1,
      },
      inventory: {
        petrol: 0,
        elektronik: 0,
        gida: 0,
        tekstil: 0,
        demir: 0,
      },
      ports: [
        { id: 1, name: "İstanbul", coords: [41.0082, 28.9784], basePrices: { petrol: 80, elektronik: 350, gida: 60, tekstil: 90, demir: 120 } },
        { id: 2, name: "Şanghay", coords: [31.2304, 121.4737], basePrices: { petrol: 110, elektronik: 180, gida: 85, tekstil: 70, demir: 95 } },
        { id: 3, name: "Rotterdam", coords: [51.9225, 4.4792], basePrices: { petrol: 95, elektronik: 320, gida: 75, tekstil: 110, demir: 140 } },
        { id: 4, name: "New York", coords: [40.7128, -74.0060], basePrices: { petrol: 130, elektronik: 400, gida: 110, tekstil: 150, demir: 160 } },
        { id: 5, name: "Dubai", coords: [25.2048, 55.2708], basePrices: { petrol: 60, elektronik: 300, gida: 90, tekstil: 100, demir: 130 } },
        { id: 6, name: "Singapur", coords: [1.3521, 103.8198], basePrices: { petrol: 100, elektronik: 250, gida: 70, tekstil: 80, demir: 110 } },
      ],
      currentPrices: {}, // dinamik fiyatlar burada olacak

      addMoney: (amount) => set((state) => ({ money: state.money + amount })),
      spendMoney: (amount) => set((state) => ({ money: Math.max(0, state.money - amount) })),
      updateInventory: (item, amount) => set((state) => ({
        inventory: { ...state.inventory, [item]: Math.max(0, state.inventory[item] + amount) }
      })),
    }),
    {
      name: "trade-empire-storage",
    }
  )
);