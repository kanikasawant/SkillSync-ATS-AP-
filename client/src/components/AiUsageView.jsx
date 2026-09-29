import React, { useState } from 'react';
import { Sparkles, Cpu, DollarSign, Zap, BarChart3, TrendingUp, Calendar, Layers, Activity } from 'lucide-react';

export default function AiUsageView() {
  const [chartType, setChartType] = useState('bar'); // 'bar' | 'area' | 'breakdown'
  const [hoveredBarIndex, setHoveredBarIndex] = useState(null);

  const tenantData = [
    { name: 'Acme Corporation', tokens: 8.2, formattedTokens: '8.2M', cost: '$24.60', percent: 82, color: 'from-blue-600 to-indigo-600', textCol: 'text-blue-600' },
    { name: 'Apex Health Group', tokens: 6.4, formattedTokens: '6.4M', cost: '$19.20', percent: 64, color: 'from-emerald-500 to-teal-600', textCol: 'text-emerald-600' },
    { name: 'Nexus AI', tokens: 5.8, formattedTokens: '5.8M', cost: '$17.40', percent: 58, color: 'from-purple-600 to-indigo-600', textCol: 'text-purple-600' },
    { name: 'Global Tech', tokens: 3.1, formattedTokens: '3.1M', cost: '$9.30', percent: 31, color: 'from-amber-500 to-orange-600', textCol: 'text-amber-600' },
    { name: 'Startup Inc', tokens: 0.42, formattedTokens: '420K', cost: '$1.26', percent: 8, color: 'from-slate-500 to-slate-700', textCol: 'text-slate-600' }
  ];

  // Daily trend curve points (14 Days)
  const dailyTrend = [
    { day: 'Sep 01', val: 1.8 },
    { day: 'Sep 02', val: 2.3 },
    { day: 'Sep 03', val: 2.1 },
    { day: 'Sep 04', val: 3.4 },
    { day: 'Sep 05', val: 2.9 },
    { day: 'Sep 06', val: 4.1 },
    { day: 'Sep 07', val: 3.8 },
    { day: 'Sep 08', val: 4.8 },
    { day: 'Sep 09', val: 5.2 },
    { day: 'Sep 10', val: 4.5 },
    { day: 'Sep 11', val: 5.9 },
    { day: 'Sep 12', val: 6.2 },
  ];

  const maxVal = Math.max(...dailyTrend.map(d => d.val));
  const svgWidth = 700;
  const svgHeight = 180;

  const points = dailyTrend
    .map((d, i) => {
      const x = (i / (dailyTrend.length - 1)) * svgWidth;
      const y = svgHeight - (d.val / maxVal) * (svgHeight - 30) - 15;
      return `${x},${y}`;
    })
    .join(' ');

  const areaPoints = `0,${svgHeight} ${points} ${svgWidth},${svgHeight}`;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold font-serif text-slate-900 tracking-tight">
          AI Usage & Token Analytics
        </h1>
        <p className="text-sm font-medium text-slate-500 mt-1">
          Monitor Gemini Model API consumption, token quotas, and estimated infrastructure costs across all tenants.
        </p>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-300 shadow-xs relative overflow-hidden">
          <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Total Tokens (30D)</span>
          </div>
          <div className="text-3xl font-bold font-serif text-slate-900 mt-2">42.8M</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-300 shadow-xs relative overflow-hidden">
          <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold uppercase tracking-wider">
            <DollarSign className="w-4 h-4" />
            <span>Est. Infrastructure Cost</span>
          </div>
          <div className="text-3xl font-bold font-serif text-slate-900 mt-2">$128.40</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs relative overflow-hidden">
          <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider">
            <Cpu className="w-4 h-4" />
            <span>Active Model</span>
          </div>
          <div className="text-2xl font-bold font-serif text-slate-900 mt-2">Gemini 1.5 Pro</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs relative overflow-hidden">
          <div className="flex items-center gap-2 text-amber-600 text-xs font-bold uppercase tracking-wider">
            <Zap className="w-4 h-4" />
            <span>Avg Response Latency</span>
          </div>
          <div className="text-3xl font-bold font-serif text-slate-900 mt-2">340ms</div>
        </div>
      </div>

      {/* Main Interactive Graph Card */}
      <div className="bg-white rounded-2xl border border-slate-300 shadow-sm p-6 space-y-6">
        {/* Card Header & Chart Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
          <div>
            <h2 className="text-lg font-bold font-serif text-slate-900 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <span>Token Consumption Breakdown & Usage Graph</span>
            </h2>
            <p className="text-xs font-medium text-slate-500 mt-0.5">
              Comparative tenant token consumption and daily request volume.
            </p>
          </div>

          {/* View Switcher Buttons */}
          <div className="flex items-center gap-1.5 bg-slate-100/80 p-1 rounded-xl border border-slate-200/80 shrink-0">
            <button
              onClick={() => setChartType('bar')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                chartType === 'bar'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Bar Graph</span>
            </button>

            <button
              onClick={() => setChartType('area')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                chartType === 'area'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>30D Trend Curve</span>
            </button>
          </div>
        </div>

        {/* CHART 1: BAR GRAPH VIEW */}
        {chartType === 'bar' && (
          <div className="space-y-6 pt-2">
            {/* Vertical Bar Graph Visual */}
            <div className="h-64 flex items-end justify-between gap-6 px-4 pb-2 border-b border-slate-200">
              {tenantData.map((item, index) => {
                const isHovered = hoveredBarIndex === index;
                return (
                  <div 
                    key={item.name}
                    onMouseEnter={() => setHoveredBarIndex(index)}
                    onMouseLeave={() => setHoveredBarIndex(null)}
                    className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
                  >
                    {/* Tooltip on hover */}
                    <div className={`mb-2 px-2.5 py-1 bg-slate-900 text-white rounded-lg text-[11px] font-mono font-bold shadow-lg transition-all duration-200 ${
                      isHovered ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95 pointer-events-none'
                    }`}>
                      {item.formattedTokens} ({item.cost})
                    </div>

                    {/* Bar */}
                    <div className="w-full max-w-[56px] bg-slate-100 rounded-t-xl overflow-hidden relative shadow-2xs">
                      <div 
                        className={`w-full bg-gradient-to-t ${item.color} transition-all duration-500 rounded-t-xl group-hover:brightness-110`}
                        style={{ height: `${(item.tokens / 8.2) * 180}px` }}
                      />
                    </div>

                    {/* Bar Label */}
                    <div className="mt-3 text-center">
                      <div className="text-xs font-bold text-slate-800 truncate max-w-[100px]">
                        {item.name}
                      </div>
                      <div className={`text-[11px] font-mono font-bold ${item.textCol} mt-0.5`}>
                        {item.formattedTokens}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Horizontal Detail Breakdown List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {tenantData.map((item) => (
                <div key={item.name} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${item.color}`} />
                    <div>
                      <span className="text-xs font-bold text-slate-900">{item.name}</span>
                      <div className="text-[11px] text-slate-500 font-medium">Gemini 1.5 Pro API calls</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-slate-900">{item.formattedTokens}</span>
                    <div className="text-[11px] font-mono font-bold text-slate-500">{item.cost} est.</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CHART 2: 30-DAY AREA TREND GRAPH VIEW */}
        {chartType === 'area' && (
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-600">
              <span>Daily Request Volume (Millions of Tokens)</span>
              <span className="font-mono text-emerald-600">Peak: 6.2M tokens / day</span>
            </div>

            {/* SVG Area Chart */}
            <div className="relative overflow-x-auto border border-slate-200 rounded-xl p-4 bg-slate-50/50">
              <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-48 overflow-visible">
                <defs>
                  <linearGradient id="area-gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563EB" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Gridlines */}
                <line x1="0" y1="30" x2={svgWidth} y2="30" stroke="#E2E8F0" strokeDasharray="4 4" />
                <line x1="0" y1="80" x2={svgWidth} y2="80" stroke="#E2E8F0" strokeDasharray="4 4" />
                <line x1="0" y1="130" x2={svgWidth} y2="130" stroke="#E2E8F0" strokeDasharray="4 4" />

                {/* Filled Gradient Area */}
                <polygon points={areaPoints} fill="url(#area-gradient)" />

                {/* Curve Line */}
                <polyline
                  fill="none"
                  stroke="#2563EB"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={points}
                />

                {/* Data Points */}
                {dailyTrend.map((d, i) => {
                  const x = (i / (dailyTrend.length - 1)) * svgWidth;
                  const y = svgHeight - (d.val / maxVal) * (svgHeight - 30) - 15;
                  return (
                    <g key={i} className="group cursor-pointer">
                      <circle
                        cx={x}
                        cy={y}
                        r="5"
                        className="fill-blue-600 stroke-white stroke-2 group-hover:r-7 transition-all"
                      />
                    </g>
                  );
                })}
              </svg>

              {/* X Axis Labels */}
              <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-2 px-1">
                {dailyTrend.map(d => (
                  <span key={d.day}>{d.day}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
