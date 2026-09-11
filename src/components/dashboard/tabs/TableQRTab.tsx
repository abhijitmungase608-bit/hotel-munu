import React, { useState, useEffect } from 'react';
import { useApp } from '../../../context/AppContext';
import type { Table } from '../../../types';
import QRCode from 'qrcode';
import { Download, Printer, Plus, Trash2, ExternalLink, Sparkles, X, Users } from 'lucide-react';

export const TableQRTab: React.FC = () => {
  const { currentRestaurant, tables, addTable, deleteTable, setSelectedTableNumber, setCurrentView, setIsCustomerDiningMode } = useApp();

  const [selectedTable, setSelectedTable] = useState<Table | null>(tables[0] || null);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [isAddTableModalOpen, setIsAddTableModalOpen] = useState(false);
  const [newTableNum, setNewTableNum] = useState('');
  const [newCapacity, setNewCapacity] = useState(4);
  const [newArea, setNewArea] = useState<Table['area']>('Main Hall');
  const [showTentCardModal, setShowTentCardModal] = useState(false);

  // Generate QR Code whenever selectedTable changes
  useEffect(() => {
    if (!selectedTable) return;

    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://menucard.io';
    const targetUrl = `${origin}/?mode=dining&table=${selectedTable.tableNumber}&restaurant=${currentRestaurant.slug}`;

    QRCode.toDataURL(targetUrl, {
      width: 400,
      margin: 2,
      color: {
        dark: '#0f172a',
        light: '#ffffff',
      },
    })
      .then((url) => {
        setQrDataUrl(url);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [selectedTable, currentRestaurant.slug]);

  const handleDownloadQR = () => {
    if (!qrDataUrl || !selectedTable) return;
    const link = document.createElement('a');
    link.download = `${currentRestaurant.slug}-table-${selectedTable.tableNumber}-qr.png`;
    link.href = qrDataUrl;
    link.click();
  };

  const handleAddTableSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTableNum.trim()) return;
    addTable({
      restaurantId: currentRestaurant.id,
      tableNumber: newTableNum.trim(),
      capacity: newCapacity,
      area: newArea,
      status: 'available',
    });
    setNewTableNum('');
    setIsAddTableModalOpen(false);
  };

  const currentTableUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/?view=menu&restaurant=${currentRestaurant.slug}&table=${selectedTable?.tableNumber || '1'}`;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 rounded-3xl shadow-lg border border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4 no-print">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-orange-400 uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            Contactless Dining Technology
          </div>
          <h2 className="text-xl font-black">Smart Table QR Code System</h2>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Each table gets an individual QR code. When diners scan it, the system automatically detects their table number and routes orders directly to your kitchen!
          </p>
        </div>

        <button
          onClick={() => setIsAddTableModalOpen(true)}
          className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 transition shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Table</span>
        </button>
      </div>

      {/* Main Grid: Left Tables List, Right QR Studio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 no-print">
        {/* Left: Tables List (col-7) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900">
              Restaurant Tables ({tables.length})
            </h3>
            <span className="text-xs text-slate-500">Click a table to inspect QR</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {tables.map((table: Table) => {
              const isSelected = selectedTable?.id === table.id;
              return (
                <div
                  key={table.id}
                  onClick={() => setSelectedTable(table)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 relative ${
                    isSelected
                      ? 'border-orange-500 bg-orange-50/40 shadow-md ring-2 ring-orange-500/20'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-sm">
                      T-{table.tableNumber}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteTable(table.id);
                      }}
                      className="text-slate-300 hover:text-rose-600 p-1 rounded transition"
                      title="Delete Table"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="mt-3">
                    <div className="text-xs font-bold text-slate-800">
                      Table {table.tableNumber}
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                      <Users className="w-3 h-3" />
                      <span>{table.capacity} Seats</span>
                      <span>•</span>
                      <span className="truncate">{table.area}</span>
                    </div>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span
                      className={`inline-flex items-center gap-1 font-semibold ${
                        table.status === 'occupied' ? 'text-amber-600' : 'text-emerald-600'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          table.status === 'occupied' ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}
                      ></span>
                      {table.status === 'occupied' ? 'Occupied' : 'Free'}
                    </span>
                    <span className="text-orange-600 font-bold hover:underline">View QR →</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Table QR Code Display (col-5) */}
        <div className="lg:col-span-5">
          {selectedTable && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm text-center sticky top-20">
              <div className="inline-block px-3 py-1 bg-orange-50 text-orange-600 text-xs font-black rounded-full uppercase tracking-wider mb-2">
                Table {selectedTable.tableNumber} QR Code
              </div>

              <h3 className="text-lg font-black text-slate-900">{currentRestaurant.name}</h3>
              <p className="text-xs text-slate-500 mt-0.5">Scan to place order directly to Table {selectedTable.tableNumber}</p>

              {/* QR Code Canvas Output */}
              <div className="my-5 p-4 bg-slate-50 rounded-2xl border border-slate-200 inline-block shadow-inner">
                {qrDataUrl ? (
                  <img
                    src={qrDataUrl}
                    alt={`QR Table ${selectedTable.tableNumber}`}
                    className="w-48 h-48 mx-auto rounded-lg shadow-sm"
                  />
                ) : (
                  <div className="w-48 h-48 flex items-center justify-center text-slate-400">
                    Generating QR...
                  </div>
                )}
              </div>

              {/* URL Preview */}
              <div className="p-2.5 bg-slate-100 rounded-xl text-[11px] text-slate-600 font-mono break-all mb-4 text-left">
                {currentTableUrl}
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={handleDownloadQR}
                  className="py-2.5 px-3 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl shadow transition flex items-center justify-center gap-1.5"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PNG</span>
                </button>

                <button
                  onClick={() => setShowTentCardModal(true)}
                  className="py-2.5 px-3 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl shadow transition flex items-center justify-center gap-1.5"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Tent Card</span>
                </button>
              </div>

              {/* Test button: Open menu as this table */}
              <button
                onClick={() => {
                  setSelectedTableNumber(selectedTable.tableNumber);
                  setIsCustomerDiningMode(true);
                  setCurrentView('menu');
                }}
                className="w-full mt-2.5 py-2 text-xs font-semibold text-slate-600 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Test Customer QR Experience (Table {selectedTable.tableNumber})</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal / Print Preview for Table Tent Card */}
      {showTentCardModal && selectedTable && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setShowTentCardModal(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-full no-print"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Printable Tent Card Layout */}
            <div
              id="printable-tent-card"
              className="border-2 border-slate-900 rounded-2xl p-6 text-center bg-white"
            >
              {/* Restaurant Header */}
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="text-2xl">🍕</span>
                <h2 className="text-lg font-black tracking-tight text-slate-900 uppercase">
                  {currentRestaurant.name}
                </h2>
              </div>
              <p className="text-[10px] text-slate-500 font-medium tracking-wide">
                {currentRestaurant.tagline}
              </p>

              <div className="w-12 h-0.5 bg-orange-500 mx-auto my-3"></div>

              {/* Big Table Badge */}
              <div className="inline-block bg-slate-900 text-white font-black text-sm px-4 py-1 rounded-full tracking-wider uppercase mb-3 shadow">
                TABLE {selectedTable.tableNumber}
              </div>

              {/* QR Code */}
              <div className="p-2 border border-slate-300 rounded-xl inline-block bg-white shadow-sm mb-3">
                <img
                  src={qrDataUrl}
                  alt={`Table ${selectedTable.tableNumber} QR`}
                  className="w-44 h-44 mx-auto"
                />
              </div>

              {/* Instructions */}
              <div className="space-y-1">
                <div className="font-extrabold text-sm text-slate-900">
                  SCAN TO VIEW MENU & ORDER
                </div>
                <div className="text-[11px] text-slate-600">
                  Open phone camera ➔ Scan QR ➔ Order food
                </div>
                <div className="text-[9px] text-emerald-600 font-bold pt-1">
                  ⚡ No App Download Required
                </div>
              </div>
            </div>

            {/* Print trigger button inside modal */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex gap-2 no-print">
              <button
                onClick={() => setShowTentCardModal(false)}
                className="flex-1 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="flex-1 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow flex items-center justify-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Stand Card</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add New Table */}
      {isAddTableModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl">
            <h3 className="font-bold text-base text-slate-900 mb-3">Add Restaurant Table</h3>
            <form onSubmit={handleAddTableSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Table Number / Label
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 15, VIP-2, Terrace-1"
                  value={newTableNum}
                  onChange={(e) => setNewTableNum(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Capacity (Seats)
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={newCapacity}
                    onChange={(e) => setNewCapacity(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Dining Area
                  </label>
                  <select
                    value={newArea}
                    onChange={(e) => setNewArea(e.target.value as Table['area'])}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none"
                  >
                    <option value="Main Hall">Main Hall</option>
                    <option value="Outdoor Terrace">Outdoor Terrace</option>
                    <option value="Rooftop">Rooftop</option>
                    <option value="VIP Lounge">VIP Lounge</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddTableModalOpen(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-lg shadow"
                >
                  Save Table
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
