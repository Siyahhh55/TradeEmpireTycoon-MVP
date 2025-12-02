// src/services/voyageService.js
import { useGameStore } from '../store/useGameStore';

let interval = null;

export const startVoyage = (fromPort, toPort, cargo) => {
  const store = useGameStore.getState();

  const distance = haversineDistance(fromPort.coords, toPort.coords);
  const durationMs = Math.floor(distance * 8000 / store.ship.speed); // km başına 8 saniye
  const profit = calculateProfit(cargo, fromPort, toPort);

  const voyage = {
    id: Date.now(),
    from: fromPort,
    to: toPort,
    cargo,
    profit,
    duration: durationMs,
    remaining: durationMs,
    startedAt: Date.now(),
  };

  useGameStore.getState().startVoyage(voyage);

  // Timer
  if (interval) clearInterval(interval);
  interval = setInterval(() => {
    const state = useGameStore.getState();
    if (!state.activeVoyage) {
      clearInterval(interval);
      return;
    }

    const elapsed = Date.now() - state.activeVoyage.startedAt;
    const remaining = Math.max(0, state.activeVoyage.duration - elapsed);

    if (remaining <= 0) {
      state.completeVoyage();
      clearInterval(interval);
    } else {
      state.updateVoyageTime(remaining);
    }
  }, 1000);
};

const haversineDistance = (c1, c2) => {
  const toRad = (x) => x * Math.PI / 180;
  const R = 6371;
  const dLat = toRad(c2[0] - c1[0]);
  const dLon = toRad(c2[1] - c1[1]);
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(toRad(c1[0])) * Math.cos(toRad(c2[0])) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

const calculateProfit = (cargo, from, to) => {
  let profit = 0;
  Object.entries(cargo).forEach(([item, amount]) => {
    if (amount > 0) {
      const buy = from.basePrices[item] || 100;
      const sell = to.basePrices[item] || 150;
      profit += amount * (sell - buy) * 1.4;
    }
  });
  return Math.floor(profit);
};