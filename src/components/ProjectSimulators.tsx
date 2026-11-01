import React, { useState } from 'react';

// ========================================================================
// 1. LoomKV Engine Simulator
// ========================================================================
interface WalRecord {
  offset: number;
  op: 'PUT' | 'DEL';
  key: string;
  value: string;
  checksum: string;
  timestamp: string;
}

export const LoomKVSimulator: React.FC = () => {
  const [keyInput, setKeyInput] = useState('cache_epoch');
  const [valInput, setValInput] = useState('174390');
  const [wal, setWal] = useState<WalRecord[]>([
    { offset: 0, op: 'PUT', key: 'user_101', value: 'alice_session', checksum: '0x8f2a1', timestamp: '12:04:01.002' },
    { offset: 48, op: 'PUT', key: 'routing_table', value: 'node_b:8080', checksum: '0x3c7b9', timestamp: '12:04:01.045' },
  ]);
  const [memtable, setMemtable] = useState<Record<string, string>>({
    'user_101': 'alice_session',
    'routing_table': 'node_b:8080',
  });
  const [sstables, setSstables] = useState<string[]>(['sstable_001.sst (Level 0, 14 keys)']);
  const [queryResult, setQueryResult] = useState<string | null>(null);

  const handlePut = () => {
    if (!keyInput.trim()) return;
    const newOffset = wal.length * 48;
    const checksum = '0x' + Math.floor(Math.random() * 0xfffff).toString(16);
    const time = new Date().toTimeString().split(' ')[0] + '.' + String(Date.now() % 1000).padStart(3, '0');
    
    const record: WalRecord = {
      offset: newOffset,
      op: 'PUT',
      key: keyInput.trim(),
      value: valInput.trim(),
      checksum,
      timestamp: time,
    };

    setWal((prev) => [record, ...prev.slice(0, 5)]);
    setMemtable((prev) => ({ ...prev, [keyInput.trim()]: valInput.trim() }));
    setQueryResult(`Wrote [${keyInput}] => [${valInput}] with WAL sync at offset 0x${newOffset.toString(16)}`);
  };

  const handleGet = () => {
    if (memtable[keyInput]) {
      setQueryResult(`Hit in Memtable (O(1)): [${keyInput}] = "${memtable[keyInput]}"`);
    } else {
      setQueryResult(`Checking SSTables... Key [${keyInput}] not found in active segment.`);
    }
  };

  const handleFlush = () => {
    const keysCount = Object.keys(memtable).length;
    const sstableName = `sstable_${String(sstables.length + 1).padStart(3, '0')}.sst (Level 0, ${keysCount} keys)`;
    setSstables((prev) => [sstableName, ...prev]);
    setMemtable({});
    setQueryResult(`Flushed Memtable to ${sstableName} & truncated WAL.`);
  };

  return (
    <div className="simulator-box" style={{ background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)', padding: '1.25rem', border: '1px solid var(--border-medium)', marginTop: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.35rem 0.75rem', marginBottom: '0.85rem' }}>
        <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: 0 }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent-primary)', display: 'inline-block', flexShrink: 0 }}></span>
          Interactive Storage Engine Simulation
        </h4>
        <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
          Write-Ahead Log + Memtable
        </span>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
        <input
          type="text"
          value={keyInput}
          onChange={(e) => setKeyInput(e.target.value)}
          placeholder="Key (e.g. user_id)"
          style={{ flex: '1', minWidth: '110px', padding: '0.4rem 0.6rem', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-medium)', background: 'var(--bg-surface)', color: 'var(--text-primary)' }}
        />
        <input
          type="text"
          value={valInput}
          onChange={(e) => setValInput(e.target.value)}
          placeholder="Value"
          style={{ flex: '1.2', minWidth: '130px', padding: '0.4rem 0.6rem', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-medium)', background: 'var(--bg-surface)', color: 'var(--text-primary)' }}
        />
        <button
          type="button"
          onClick={handlePut}
          style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', fontWeight: 600, background: 'var(--accent-primary)', color: '#fff', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}
        >
          PUT (WAL + Mem)
        </button>
        <button
          type="button"
          onClick={handleGet}
          style={{ padding: '0.4rem 0.65rem', fontSize: '0.8rem', background: 'var(--bg-surface)', border: '1px solid var(--border-medium)', color: 'var(--text-primary)', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}
        >
          GET
        </button>
        <button
          type="button"
          onClick={handleFlush}
          style={{ padding: '0.4rem 0.65rem', fontSize: '0.8rem', background: 'var(--bg-hover)', color: 'var(--text-secondary)', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}
          title="Simulate flushing Memtable skiplist into immutable SSTable file on disk"
        >
          Flush to SSTable
        </button>
      </div>

      {queryResult && (
        <div style={{ padding: '0.4rem 0.65rem', fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-text)', background: 'var(--accent-soft)', borderRadius: '4px', marginBottom: '0.75rem', overflowWrap: 'anywhere' }}>
          {queryResult}
        </div>
      )}

      {/* Grid of WAL vs Memtable */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))', gap: '0.75rem' }}>
        <div style={{ background: 'var(--bg-surface)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
            Persistent WAL Log (Disk)
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', maxHeight: '110px', overflowY: 'auto' }}>
            {wal.map((w, idx) => (
              <div key={idx} style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0 0.5rem', borderBottom: '1px dashed var(--border-subtle)', paddingBottom: '2px' }}>
                <span style={{ overflowWrap: 'anywhere' }}>+{w.offset}B [{w.key}]</span>
                <span style={{ color: 'var(--text-muted)' }}>{w.checksum}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: 'var(--bg-surface)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
            In-Memory Skiplist ({Object.keys(memtable).length} items)
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', maxHeight: '110px', overflowY: 'auto' }}>
            {Object.keys(memtable).length === 0 ? (
              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>Memtable is empty (flushed).</span>
            ) : (
              Object.entries(memtable).map(([k, v]) => (
                <div key={k} style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', overflowWrap: 'anywhere' }}>
                  <strong style={{ color: 'var(--text-primary)' }}>{k}</strong>: "{v}"
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ========================================================================
// 2. SynapseVis Live Backpropagation Simulator
// ========================================================================
export const SynapseVisSimulator: React.FC = () => {
  const [weight1, setWeight1] = useState(0.8);
  const [weight2, setWeight2] = useState(-0.5);
  const [inputVal, setInputVal] = useState(1.0);
  const target = 1.0;

  // Simple forward pass: z = input * w1, a = max(0, z), output = a * w2
  const z = inputVal * weight1;
  const a = Math.max(0, z); // ReLU
  const output = a * weight2;
  const error = 0.5 * Math.pow(target - output, 2);
  const gradW2 = -(target - output) * a;
  const gradW1 = -(target - output) * weight2 * (z > 0 ? 1 : 0) * inputVal;

  const handleStepGradient = () => {
    const lr = 0.15;
    setWeight1((prev) => parseFloat((prev - lr * gradW1).toFixed(3)));
    setWeight2((prev) => parseFloat((prev - lr * gradW2).toFixed(3)));
  };

  return (
    <div className="simulator-box" style={{ background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)', padding: '1.25rem', border: '1px solid var(--border-medium)', marginTop: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.35rem 0.75rem', marginBottom: '0.85rem' }}>
        <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: 0 }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent-primary)', display: 'inline-block', flexShrink: 0 }}></span>
          Interactive Gradient Flow Visualizer
        </h4>
        <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
          Forward + Backward Calculus
        </span>
      </div>

      {/* SVG Diagram */}
      <div style={{ background: 'var(--bg-surface)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', marginBottom: '0.75rem', textAlign: 'center' }}>
        <svg viewBox="0 0 460 100" style={{ width: '100%', maxHeight: '110px' }}>
          {/* Node 1: Input */}
          <circle cx="50" cy="50" r="24" fill="var(--bg-subtle)" stroke="var(--border-medium)" strokeWidth="2" />
          <text x="50" y="47" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="var(--text-muted)">x</text>
          <text x="50" y="62" textAnchor="middle" fontSize="12" fontWeight="bold" fontFamily="monospace" fill="var(--text-primary)">{inputVal.toFixed(1)}</text>

          {/* Connection 1 */}
          <line x1="74" y1="50" x2="196" y2="50" stroke="var(--accent-primary)" strokeWidth="2" strokeDasharray="4 2" />
          <text x="135" y="42" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--accent-text)">w₁={weight1.toFixed(2)}</text>

          {/* Node 2: Hidden ReLU */}
          <circle cx="220" cy="50" r="24" fill="var(--bg-subtle)" stroke="var(--border-medium)" strokeWidth="2" />
          <text x="220" y="47" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--text-muted)">ReLU(z)</text>
          <text x="220" y="62" textAnchor="middle" fontSize="12" fontWeight="bold" fontFamily="monospace" fill="var(--text-primary)">{a.toFixed(2)}</text>

          {/* Connection 2 */}
          <line x1="244" y1="50" x2="366" y2="50" stroke="var(--accent-primary)" strokeWidth="2" strokeDasharray="4 2" />
          <text x="305" y="42" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--accent-text)">w₂={weight2.toFixed(2)}</text>

          {/* Node 3: Output */}
          <circle cx="390" cy="50" r="24" fill="var(--bg-subtle)" stroke="var(--border-medium)" strokeWidth="2" />
          <text x="390" y="47" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--text-muted)">ŷ</text>
          <text x="390" y="62" textAnchor="middle" fontSize="12" fontWeight="bold" fontFamily="monospace" fill="var(--text-primary)">{output.toFixed(2)}</text>
        </svg>

        <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '0.25rem 0.75rem', fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', marginTop: '0.4rem' }}>
          <span>Target y = <strong>{target.toFixed(1)}</strong></span>
          <span>Loss L = <strong>{error.toFixed(4)}</strong></span>
          <span style={{ color: 'var(--accent-text)' }}>∂L/∂w₁ = <strong>{gradW1.toFixed(3)}</strong></span>
          <span style={{ color: 'var(--accent-text)' }}>∂L/∂w₂ = <strong>{gradW2.toFixed(3)}</strong></span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.8rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-secondary)' }}>
            Input x:
            <input
              type="range"
              min="0.1"
              max="2.0"
              step="0.1"
              value={inputVal}
              onChange={(e) => setInputVal(parseFloat(e.target.value))}
              style={{ width: '70px' }}
            />
          </label>
        </div>

        <button
          type="button"
          onClick={handleStepGradient}
          style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem', fontWeight: 600, background: 'var(--text-primary)', color: 'var(--bg-primary)', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}
        >
          Step Gradient Descent (α = 0.15)
        </button>
      </div>
    </div>
  );
};
