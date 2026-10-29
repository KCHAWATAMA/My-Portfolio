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
      <div className="p-6 bg-[#FFFFFF] dark:bg-[#181B18] border border-[#E4E2DC] dark:border-[#272B27]">
        <p className="text-sm text-[#5A5A55] dark:text-[#9E9D96]">
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
    <div className="bg-[#FFFFFF] dark:bg-[#181B18] border border-[#E4E2DC] dark:border-[#272B27] p-6 space-y-6">
      
      {/* Header with Title and View Mode Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E4E2DC] dark:border-[#272B27]">
        <div>
          <span className="text-xs uppercase tracking-wider font-mono text-[#0E6B5C] dark:text-[#3FB59B] block mb-1">
            Empirical Results
          </span>
          <h4 className="font-serif text-lg font-semibold text-[#1B1B1B] dark:text-[#ECEBE6]">
            {chart?.title || 'Prediction error by model (lower is better)'}
          </h4>
        </div>

        {/* View Mode controls */}
        <div className="flex items-center gap-1 self-start sm:self-auto p-1 bg-[#F4F3EE] dark:bg-[#121412] border border-[#E4E2DC] dark:border-[#272B27]">
          <button
            type="button"
            onClick={() => setViewMode('both')}
            className={`px-2.5 py-1 text-xs font-sans transition-colors cursor-pointer ${
              viewMode === 'both'
                ? 'bg-[#FFFFFF] dark:bg-[#181B18] text-[#1B1B1B] dark:text-[#ECEBE6] font-medium shadow-2xs'
                : 'text-[#5A5A55] dark:text-[#9E9D96] hover:text-[#1B1B1B] dark:hover:text-[#ECEBE6]'
            }`}
          >
            Combined View
          </button>
          <button
            type="button"
            onClick={() => setViewMode('chart')}
            className={`px-2.5 py-1 text-xs font-sans flex items-center gap-1.5 transition-colors cursor-pointer ${
              viewMode === 'chart'
                ? 'bg-[#FFFFFF] dark:bg-[#181B18] text-[#1B1B1B] dark:text-[#ECEBE6] font-medium shadow-2xs'
                : 'text-[#5A5A55] dark:text-[#9E9D96] hover:text-[#1B1B1B] dark:hover:text-[#ECEBE6]'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Chart</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('table')}
            className={`px-2.5 py-1 text-xs font-sans flex items-center gap-1.5 transition-colors cursor-pointer ${
              viewMode === 'table'
                ? 'bg-[#FFFFFF] dark:bg-[#181B18] text-[#1B1B1B] dark:text-[#ECEBE6] font-medium shadow-2xs'
                : 'text-[#5A5A55] dark:text-[#9E9D96] hover:text-[#1B1B1B] dark:hover:text-[#ECEBE6]'
            }`}
          >
            <TableIcon className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Table</span>
          </button>
        </div>
      </div>

      {/* Text Summary */}
      <div className="text-sm text-[#5A5A55] dark:text-[#9E9D96] leading-relaxed max-w-[68ch]">
        <p>{results.summary}</p>
        {results.metricDirection === 'lower-is-better' && (
          <p className="mt-2 text-xs font-mono text-[#0E6B5C] dark:text-[#3FB59B]">
            * Note: Lower numerical values indicate superior performance (less prediction error).
          </p>
        )}
      </div>

      {/* Interactive Bar Chart (F24 specifications) */}
      {chart && (viewMode === 'both' || viewMode === 'chart') && (
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between text-xs text-[#5A5A55] dark:text-[#9E9D96] font-mono border-b border-[#E4E2DC] dark:border-[#272B27] pb-2">
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
                  className="space-y-1 group"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="flex items-baseline justify-between text-xs">
                    <span className={`font-sans ${isTop ? 'font-semibold text-[#1B1B1B] dark:text-[#ECEBE6]' : 'text-[#5A5A55] dark:text-[#9E9D96]'}`}>
                      {item.label}
                      {item.secondaryMetric && (
                        <span className="ml-2 font-mono text-[11px] text-[#0E6B5C] dark:text-[#3FB59B]">
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
                    className="h-6 w-full bg-[#F4F3EE] dark:bg-[#121412] border border-[#E4E2DC] dark:border-[#272B27] p-0.5 flex items-center"
                    role="progressbar"
                    aria-valuenow={item.value}
                    aria-valuemin={0}
                    aria-valuemax={maxValue}
                    aria-label={`${item.label}: ${item.value} ${chart.metricLabel}`}
                  >
                    <div
                      className={`h-full motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none ${
                        isTop
                          ? 'bg-[#0E6B5C] dark:bg-[#3FB59B]'
                          : isHovered
                          ? 'bg-[#5A5A55] dark:bg-[#9E9D96]'
                          : 'bg-[#C5C3BC] dark:bg-[#404540]'
                      }`}
                      style={{ width: `${widthPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* F24: Explanatory text under chart */}
          <div className="space-y-1 text-[11px] font-mono text-[#5A5A55] dark:text-[#9E9D96] pt-2 border-t border-[#E4E2DC] dark:border-[#272B27]">
            <p>Each bar is the average error in predicting remaining engine life, in cycles. Shorter bar = more accurate.</p>
            {results.comparisonNote ? (
              <p className="text-[#0E6B5C] dark:text-[#3FB59B] font-semibold">{results.comparisonNote}</p>
            ) : (
              <p className="text-[#0E6B5C] dark:text-[#3FB59B] font-semibold">The hybrid model is 3% more accurate than XGBoost and 32% more accurate than the CNN.</p>
            )}
          </div>
        </div>
      )}

      {/* Accessible Data Table Alternative */}
      {results.table && (viewMode === 'both' || viewMode === 'table') && (
        <div className="pt-2">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono border border-[#E4E2DC] dark:border-[#272B27]">
              <caption className="sr-only">
                {chart?.title || 'Model Benchmark Data Table Alternative'}
              </caption>
              <thead className="bg-[#F4F3EE] dark:bg-[#121412] text-[#1B1B1B] dark:text-[#ECEBE6] border-b border-[#E4E2DC] dark:border-[#272B27]">
                <tr>
                  <th scope="col" className="px-4 py-2.5 font-medium">Model / Approach</th>
                  <th scope="col" className="px-4 py-2.5 font-medium tabular-nums">
                    {results.metricName || 'Primary Metric'}
                  </th>
                  <th scope="col" className="px-4 py-2.5 font-medium tabular-nums">Secondary Metric</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4E2DC] dark:divide-[#272B27]">
                {results.table.map((row) => (
                  <tr
                    key={row.name}
                    className={
                      row.isTop
                        ? 'bg-[#0E6B5C]/5 dark:bg-[#3FB59B]/10 font-semibold text-[#0E6B5C] dark:text-[#3FB59B]'
                        : 'text-[#1B1B1B] dark:text-[#ECEBE6]'
                    }
                  >
                    <td className="px-4 py-2.5 font-sans flex items-center gap-2">
                      {row.name}
                      {row.isTop && (
                        <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 bg-[#0E6B5C] text-white dark:bg-[#3FB59B] dark:text-[#121412]">
                          Top Model
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2.5 tabular-nums">{row.primaryScore}</td>
                    <td className="px-4 py-2.5 tabular-nums text-[#5A5A55] dark:text-[#9E9D96]">
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
