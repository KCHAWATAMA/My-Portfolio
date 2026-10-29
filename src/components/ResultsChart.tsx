/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ProjectResults } from '../content.ts';
import { BarChart3, Table as TableIcon } from 'lucide-react';

interface ResultsChartProps {
  results: ProjectResults;
}

export function ResultsChart({ results }: ResultsChartProps) {
  const [viewMode, setViewMode] = useState<'both' | 'chart' | 'table'>('both');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!results.chart && !results.table) {
    return (
      <div className="p-6 bg-[#FFFFFF] dark:bg-[#181B18] border border-[#E4E2DC] dark:border-[#2E332E]">
        <p className="text-[17px] text-[#4A4A45] dark:text-[#B4B3AC] leading-[1.6]">
          {results.summary}
        </p>
      </div>
    );
  }

  const chart = results.chart;
  // Sort data so best model is first
  const sortedChartData = chart?.data
    ? [...chart.data].sort((a, b) => {
        if (results.metricDirection === 'lower-is-better') {
          return a.value - b.value;
        }
        return b.value - a.value;
      })
    : [];

  const maxValue = sortedChartData.length > 0
    ? Math.max(...sortedChartData.map((d) => d.value)) * 1.15
    : 100;

  return (
    <div className="bg-[#FFFFFF] dark:bg-[#181B18] border border-[#E4E2DC] dark:border-[#2E332E] p-6 space-y-6">
      
      {/* Header with Title and View Mode Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E4E2DC] dark:border-[#2E332E]">
        <div>
          <span className="text-[13px] uppercase tracking-[0.06em] font-mono text-[#0B5A4D] dark:text-[#3FB59B] block mb-1 font-semibold">
            Empirical Results
          </span>
          <h3 className="font-serif text-xl font-bold text-[#1B1B1B] dark:text-[#ECEBE6] leading-[1.2]">
            {chart?.title || 'Prediction error by model (lower is better)'}
          </h3>
        </div>

        {/* View Mode controls: Min 44px height */}
        <div className="flex items-center gap-1 self-start sm:self-auto p-1 bg-[#F4F3EE] dark:bg-[#121412] border border-[#E4E2DC] dark:border-[#2E332E]">
          <button
            type="button"
            onClick={() => setViewMode('both')}
            className={`min-h-[44px] px-3.5 py-2 text-[13px] font-sans transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#0B5A4D] dark:focus-visible:ring-[#3FB59B] outline-none ${
              viewMode === 'both'
                ? 'bg-[#FFFFFF] dark:bg-[#181B18] text-[#1B1B1B] dark:text-[#ECEBE6] font-semibold border border-[#E4E2DC] dark:border-[#2E332E]'
                : 'text-[#4A4A45] dark:text-[#B4B3AC] hover:text-[#1B1B1B] dark:hover:text-[#ECEBE6]'
            }`}
          >
            Combined View
          </button>
          <button
            type="button"
            onClick={() => setViewMode('chart')}
            className={`min-h-[44px] px-3.5 py-2 text-[13px] font-sans flex items-center gap-1.5 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#0B5A4D] dark:focus-visible:ring-[#3FB59B] outline-none ${
              viewMode === 'chart'
                ? 'bg-[#FFFFFF] dark:bg-[#181B18] text-[#1B1B1B] dark:text-[#ECEBE6] font-semibold border border-[#E4E2DC] dark:border-[#2E332E]'
                : 'text-[#4A4A45] dark:text-[#B4B3AC] hover:text-[#1B1B1B] dark:hover:text-[#ECEBE6]'
            }`}
          >
            <BarChart3 className="w-4 h-4" aria-hidden="true" />
            <span>Chart</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('table')}
            className={`min-h-[44px] px-3.5 py-2 text-[13px] font-sans flex items-center gap-1.5 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#0B5A4D] dark:focus-visible:ring-[#3FB59B] outline-none ${
              viewMode === 'table'
                ? 'bg-[#FFFFFF] dark:bg-[#181B18] text-[#1B1B1B] dark:text-[#ECEBE6] font-semibold border border-[#E4E2DC] dark:border-[#2E332E]'
                : 'text-[#4A4A45] dark:text-[#B4B3AC] hover:text-[#1B1B1B] dark:hover:text-[#ECEBE6]'
            }`}
          >
            <TableIcon className="w-4 h-4" aria-hidden="true" />
            <span>Table</span>
          </button>
        </div>
      </div>

      {/* Text Summary */}
      <div className="text-[17px] text-[#4A4A45] dark:text-[#B4B3AC] leading-[1.6] max-w-[68ch]">
        <p>{results.summary}</p>
        {results.metricDirection === 'lower-is-better' && (
          <p className="mt-2 text-[13px] font-mono text-[#0B5A4D] dark:text-[#3FB59B]">
            * Note: Lower numerical values indicate superior performance (less prediction error).
          </p>
        )}
      </div>

      {/* Interactive Bar Chart (F24 specifications, grey bars >= 3:1 against track) */}
      {chart && (viewMode === 'both' || viewMode === 'chart') && (
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between text-[13px] text-[#4A4A45] dark:text-[#B4B3AC] font-mono border-b border-[#E4E2DC] dark:border-[#2E332E] pb-2">
            <span>Model Architecture</span>
            <span>{chart.metricLabel} (Test Set, scale from 0)</span>
          </div>

          <div className="space-y-3.5" role="region" aria-label={chart.title}>
            {sortedChartData.map((item, index) => {
              const widthPct = Math.round((item.value / maxValue) * 100);
              const isHovered = hoveredIndex === index;
              const isTop = item.highlight || index === 0;

              return (
                <div
                  key={item.label}
                  className="space-y-1.5 group"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="flex items-baseline justify-between text-[15px]">
                    <span className={`font-sans ${isTop ? 'font-semibold text-[#1B1B1B] dark:text-[#ECEBE6]' : 'text-[#4A4A45] dark:text-[#B4B3AC]'}`}>
                      {item.label}
                      {item.secondaryMetric && (
                        <span className="ml-2 font-mono text-[13px] text-[#0B5A4D] dark:text-[#3FB59B]">
                          ({item.secondaryMetric})
                        </span>
                      )}
                    </span>
                    <span className="font-mono tabular-nums font-semibold text-[#1B1B1B] dark:text-[#ECEBE6]">
                      {item.value.toFixed(2)}
                    </span>
                  </div>

                  {/* Accessible bar container starting from 0 */}
                  <div
                    className="h-7 w-full bg-[#E4E2DC] dark:bg-[#1E231E] p-0.5 flex items-center border border-[#E4E2DC] dark:border-[#2E332E]"
                    role="progressbar"
                    aria-valuenow={item.value}
                    aria-valuemin={0}
                    aria-valuemax={maxValue}
                    aria-label={`${item.label}: ${item.value} ${chart.metricLabel}`}
                  >
                    <div
                      className={`h-full motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none ${
                        isTop
                          ? 'bg-[#0B5A4D] dark:bg-[#3FB59B]'
                          : isHovered
                          ? 'bg-[#4A4A45] dark:bg-[#B4B3AC]'
                          : 'bg-[#8C897E] dark:bg-[#5A635A]'
                      }`}
                      style={{ width: `${widthPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Explanatory text under chart */}
          <div className="space-y-1 text-[13px] font-mono text-[#4A4A45] dark:text-[#B4B3AC] pt-2 border-t border-[#E4E2DC] dark:border-[#2E332E]">
            <p>Each bar is the average error in predicting remaining engine life, in cycles. Shorter bar = more accurate.</p>
            {results.comparisonNote ? (
              <p className="text-[#0B5A4D] dark:text-[#3FB59B] font-semibold">{results.comparisonNote}</p>
            ) : (
              <p className="text-[#0B5A4D] dark:text-[#3FB59B] font-semibold">The hybrid model is 3% more accurate than XGBoost and 32% more accurate than the CNN.</p>
            )}
          </div>
        </div>
      )}

      {/* Accessible Data Table Alternative */}
      {results.table && (viewMode === 'both' || viewMode === 'table') && (
        <div className="pt-2">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px] font-mono border border-[#E4E2DC] dark:border-[#2E332E]">
              <caption className="sr-only">
                {chart?.title || 'Model Benchmark Data Table Alternative'}
              </caption>
              <thead className="bg-[#F8F7F3] dark:bg-[#151815] text-[#1B1B1B] dark:text-[#ECEBE6] border-b border-[#E4E2DC] dark:border-[#2E332E]">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">Model / Approach</th>
                  <th scope="col" className="px-4 py-3 font-semibold tabular-nums">
                    {results.metricName || 'Primary Metric'}
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold tabular-nums">Secondary Metric</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4E2DC] dark:divide-[#2E332E]">
                {results.table.map((row) => (
                  <tr
                    key={row.name}
                    className={
                      row.isTop
                        ? 'bg-[#0B5A4D]/5 dark:bg-[#3FB59B]/10 font-semibold text-[#0B5A4D] dark:text-[#3FB59B]'
                        : 'text-[#1B1B1B] dark:text-[#ECEBE6]'
                    }
                  >
                    <td className="px-4 py-3 font-sans flex items-center gap-2">
                      <span>{row.name}</span>
                      {row.isTop && (
                        <span className="text-[12px] uppercase font-mono px-2 py-0.5 bg-[#0B5A4D] text-white dark:bg-[#3FB59B] dark:text-[#121412] font-semibold">
                          Top Model
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 tabular-nums">{row.primaryScore}</td>
                    <td className="px-4 py-3 tabular-nums text-[#4A4A45] dark:text-[#B4B3AC]">
                      {row.secondaryScore || '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
