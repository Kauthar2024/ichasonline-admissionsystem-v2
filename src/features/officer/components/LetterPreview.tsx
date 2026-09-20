import { useProgrammes } from '@/features/programmes';
import type { Application } from '../types';

// Deterministic pseudo-QR from the token so each letter looks unique.
// Placeholder only: the real letter embeds an encrypted QR from the backend.
function QrPlaceholder({ token }: { token: string }) {
  const size = 21;
  let seed = 0;
  for (const ch of token) seed = (seed * 31 + ch.charCodeAt(0)) >>> 0;
  const cells: boolean[] = [];
  for (let i = 0; i < size * size; i++) {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    cells.push(seed >>> 24 > 120);
  }
  const finder = (x: number, y: number) => (x < 7 && y < 7) || (x >= size - 7 && y < 7) || (x < 7 && y >= size - 7);
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-28 h-28" role="img" aria-label="Verification QR code (placeholder)">
      <rect width={size} height={size} fill="white" />
      {cells.map((on, i) => {
        const x = i % size;
        const y = Math.floor(i / size);
        return (finder(x, y) ? (x % 6 === 0 || y % 6 === 0 || (x % 6 >= 2 && x % 6 <= 4 && y % 6 >= 2 && y % 6 <= 4)) : on) ? (
          <rect key={i} x={x} y={y} width={1} height={1} fill="black" />
        ) : null;
      })}
    </svg>
  );
}

export function LetterPreview({ app, onClose }: { app: Application; onClose: () => void }) {
  const { data: programmes = [] } = useProgrammes();
  const programme = programmes.find((p) => p.id === app.firstChoice)?.name ?? app.firstChoice;
  if (!app.letter) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Admission letter">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 space-y-4 text-xs">
        <div className="text-center border-b pb-3">
          <h2 className="text-lg font-bold">Imperial College of Health and Allied Science</h2>
          <p className="text-gray-500">Admission Letter</p>
        </div>
        <p>Date: {app.letter.generatedAt.slice(0, 10)}</p>
        <p>
          Dear <b>{app.firstName} {app.lastName}</b> ({app.nectaIndex}),
        </p>
        <p>
          We are pleased to offer you admission to the <b>{programme}</b> programme. Your application reference is <b>{app.ref}</b>.
        </p>
        <div>
          <b>Joining instructions</b>
          <ul className="list-disc pl-5 space-y-1 mt-1">
            <li>Report for physical registration with this letter and original certificates.</li>
            <li>Bring the completed Medical Fitness Form.</li>
            <li>Pay the fees listed in the institutional fee structure before registration.</li>
          </ul>
        </div>
        <div className="flex items-center gap-4 border-t pt-3">
          <QrPlaceholder token={app.letter.token} />
          <div>
            <p className="text-gray-500">Verification code</p>
            <p className="font-mono font-bold break-all">{app.letter.token}</p>
          </div>
        </div>
        <div className="flex justify-end gap-3 print:hidden">
          <button type="button" onClick={() => window.print()} className="px-4 py-2 border rounded-lg font-semibold hover:bg-gray-50">
            Print
          </button>
          <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-800 text-white rounded-lg font-semibold">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
