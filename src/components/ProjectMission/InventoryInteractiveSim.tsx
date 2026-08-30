import React, { useState } from 'react';
import { Database, Plus, Minus, AlertCircle, CheckCircle2, ScanLine, ShoppingCart, RefreshCw } from 'lucide-react';
import { universeAudio } from '../../services/audio';

interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  stock: number;
  minThreshold: number;
  price: number;
  status: 'OPTIMAL' | 'LOW_STOCK' | 'REORDER_NOW';
}

const INITIAL_ITEMS: InventoryItem[] = [
  { id: '1', name: 'Quantum Processor X1', sku: 'NEX-7832', stock: 24, minThreshold: 10, price: 420, status: 'OPTIMAL' },
  { id: '2', name: 'Neural Sensor Array', sku: 'NEX-9011', stock: 6, minThreshold: 8, price: 180, status: 'LOW_STOCK' },
  { id: '3', name: 'Lithium Cryo Battery', sku: 'NEX-4420', stock: 3, minThreshold: 5, price: 95, status: 'REORDER_NOW' },
  { id: '4', name: 'Holographic Display 8K', sku: 'NEX-1205', stock: 15, minThreshold: 6, price: 650, status: 'OPTIMAL' }
];

export const InventoryInteractiveSim: React.FC = () => {
  const [items, setItems] = useState<InventoryItem[]>(INITIAL_ITEMS);
  const [cart, setCart] = useState<{ name: string; qty: number; total: number }[]>([]);
  const [syncNotice, setSyncNotice] = useState<string>('Firebase Firestore Real-Time: Synchronized');

  const updateStock = (id: string, delta: number) => {
    universeAudio.playHoverChirp();
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const newStock = Math.max(0, item.stock + delta);
        let newStatus: InventoryItem['status'] = 'OPTIMAL';
        if (newStock === 0 || newStock <= item.minThreshold / 2) {
          newStatus = 'REORDER_NOW';
        } else if (newStock <= item.minThreshold) {
          newStatus = 'LOW_STOCK';
        }
        return {
          ...item,
          stock: newStock,
          status: newStatus
        };
      })
    );

    setSyncNotice('Syncing mutation to Firestore cloud...');
    setTimeout(() => {
      setSyncNotice('Firebase Firestore: State Verified (24ms)');
    }, 400);
  };

  const handleScanBarcode = (item: InventoryItem) => {
    universeAudio.playHolographicChime();
    updateStock(item.id, -1);

    setCart((prev) => {
      const existing = prev.find((c) => c.name === item.name);
      if (existing) {
        return prev.map((c) =>
          c.name === item.name
            ? { ...c, qty: c.qty + 1, total: (c.qty + 1) * item.price }
            : c
        );
      }
      return [...prev, { name: item.name, qty: 1, total: item.price }];
    });
  };

  const resetInventory = () => {
    universeAudio.playHoverChirp();
    setItems(INITIAL_ITEMS);
    setCart([]);
  };

  const grandTotal = cart.reduce((acc, curr) => acc + curr.total, 0);

  return (
    <div className="p-5 rounded-2xl bg-slate-950/90 border border-cyan-500/30 text-left flex flex-col gap-4">
      {/* Header telemetry */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span className="text-xs font-orbitron font-bold text-white">
            FIREBASE REAL-TIME INVENTORY OS
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
            {syncNotice}
          </span>
          <button
            onClick={resetInventory}
            className="p-1 rounded bg-slate-900 border border-slate-700 text-slate-400 hover:text-white cursor-pointer"
            title="Reset simulation"
          >
            <RefreshCw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Inventory Stock Monitor Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 text-[10px] uppercase">
              <th className="pb-2">SKU / Item</th>
              <th className="pb-2 text-center">Unit Price</th>
              <th className="pb-2 text-center">Stock Level</th>
              <th className="pb-2 text-center">Status</th>
              <th className="pb-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {items.map((item) => {
              const isLow = item.status === 'LOW_STOCK';
              const isReorder = item.status === 'REORDER_NOW';
              return (
                <tr key={item.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-2.5">
                    <div className="font-space font-bold text-slate-100">{item.name}</div>
                    <div className="text-[10px] text-cyan-400 font-mono">#{item.sku}</div>
                  </td>

                  <td className="py-2.5 text-center text-slate-300">
                    ${item.price}
                  </td>

                  <td className="py-2.5 text-center">
                    <span className={`font-orbitron font-bold ${isReorder ? 'text-rose-400' : isLow ? 'text-amber-400' : 'text-emerald-400'}`}>
                      {item.stock} units
                    </span>
                  </td>

                  <td className="py-2.5 text-center">
                    {isReorder ? (
                      <span className="px-2 py-0.5 rounded bg-rose-950/80 border border-rose-500/40 text-[9px] text-rose-300 font-semibold inline-flex items-center gap-1">
                        <AlertCircle className="w-2.5 h-2.5 text-rose-400" />
                        CRITICAL
                      </span>
                    ) : isLow ? (
                      <span className="px-2 py-0.5 rounded bg-amber-950/80 border border-amber-500/40 text-[9px] text-amber-300 font-semibold inline-flex items-center gap-1">
                        <AlertCircle className="w-2.5 h-2.5 text-amber-400" />
                        LOW STOCK
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-[9px] text-emerald-300 font-semibold inline-flex items-center gap-1">
                        <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                        OPTIMAL
                      </span>
                    )}
                  </td>

                  <td className="py-2.5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => updateStock(item.id, -1)}
                        disabled={item.stock <= 0}
                        className="w-6 h-6 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 disabled:opacity-30 text-slate-200 flex items-center justify-center cursor-pointer"
                        title="Reduce stock"
                      >
                        <Minus className="w-3 h-3" />
                      </button>

                      <button
                        onClick={() => updateStock(item.id, 1)}
                        className="w-6 h-6 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 flex items-center justify-center cursor-pointer"
                        title="Add stock"
                      >
                        <Plus className="w-3 h-3" />
                      </button>

                      <button
                        onClick={() => handleScanBarcode(item)}
                        disabled={item.stock <= 0}
                        className="px-2 py-1 rounded bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/50 text-cyan-300 text-[10px] font-mono flex items-center gap-1 cursor-pointer disabled:opacity-30"
                        title="Scan barcode & add to cart"
                      >
                        <ScanLine className="w-3 h-3 text-cyan-400" />
                        <span>SCAN</span>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Barcode Checkout Receipt Telemetry */}
      {cart.length > 0 && (
        <div className="p-3 rounded-xl bg-slate-900/80 border border-cyan-500/20 flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-cyan-400 font-semibold flex items-center gap-1.5">
              <ShoppingCart className="w-3.5 h-3.5 text-cyan-400" />
              BARCODE BILLING CART ({cart.reduce((a, b) => a + b.qty, 0)} items)
            </span>
            <span className="font-orbitron font-extrabold text-white">
              Total: ${grandTotal}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 text-[10px] font-mono text-slate-300">
            {cart.map((c, i) => (
              <span key={i} className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
                {c.name} (x{c.qty}) = ${c.total}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
