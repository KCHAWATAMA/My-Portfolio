/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArchitectureNode } from '../content.ts';
import { ArrowRight, ArrowDown, Database, Cpu, Layers, Server, Layout } from 'lucide-react';

interface ArchitectureDiagramProps {
  title: string;
  description: string;
  nodes: ArchitectureNode[];
}

export function ArchitectureDiagram({ title, description, nodes }: ArchitectureDiagramProps) {
  const getIcon = (category: ArchitectureNode['category']) => {
    switch (category) {
      case 'data':
        return <Database className="w-4 h-4" aria-hidden="true" />;
      case 'process':
        return <Layers className="w-4 h-4" aria-hidden="true" />;
      case 'model':
        return <Cpu className="w-4 h-4" aria-hidden="true" />;
      case 'api':
        return <Server className="w-4 h-4" aria-hidden="true" />;
      case 'ui':
        return <Layout className="w-4 h-4" aria-hidden="true" />;
    }
  };

  return (
    <div className="bg-[#FFFFFF] dark:bg-[#181B18] border border-[#E4E2DC] dark:border-[#2E332E] p-6 space-y-4">
      <div className="border-b border-[#E4E2DC] dark:border-[#2E332E] pb-3">
        <span className="text-[13px] uppercase tracking-[0.06em] font-mono text-[#0B5A4D] dark:text-[#3FB59B] font-semibold block mb-1">
          System Architecture
        </span>
        <h3 className="font-serif text-xl font-bold text-[#1B1B1B] dark:text-[#ECEBE6] leading-[1.2]">
          {title}
        </h3>
        <p className="text-[15px] text-[#4A4A45] dark:text-[#B4B3AC] mt-1 font-sans leading-relaxed">
          {description}
        </p>
      </div>

      {/* Nodes Flow Container: Stacked top-to-bottom below 700px, 5-column horizontal above 700px */}
      <div className="pt-2">
        <div className="grid grid-cols-1 min-[700px]:grid-cols-5 gap-3 relative items-stretch">
          {nodes.map((node, index) => (
            <div key={node.id} className="flex flex-col min-[700px]:flex-row items-center gap-3 w-full">
              
              {/* Node Card */}
              <div className="flex-1 w-full p-4 bg-[#F8F7F3] dark:bg-[#151815] border border-[#E4E2DC] dark:border-[#2E332E] flex flex-col justify-between h-full space-y-2">
                <div className="flex items-center justify-between text-[13px] font-mono text-[#4A4A45] dark:text-[#B4B3AC]">
                  <span className="text-[#0B5A4D] dark:text-[#3FB59B] font-semibold" style={{ letterSpacing: '0.06em' }}>
                    Step {index + 1}
                  </span>
                  <span className="text-[#0B5A4D] dark:text-[#3FB59B]">
                    {getIcon(node.category)}
                  </span>
                </div>

                <div className="space-y-1">
                  <p className="font-serif font-semibold text-[15px] text-[#1B1B1B] dark:text-[#ECEBE6] leading-snug">
                    {node.label}
                  </p>
                  {node.sublabel && (
                    <p className="text-[13px] font-sans text-[#4A4A45] dark:text-[#B4B3AC] leading-relaxed">
                      {node.sublabel}
                    </p>
                  )}
                </div>
              </div>

              {/* Horizontal arrow for min-[700px] */}
              {index < nodes.length - 1 && (
                <div className="hidden min-[700px]:flex items-center text-[#0B5A4D] dark:text-[#3FB59B] shrink-0" aria-hidden="true">
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}

              {/* Vertical connector arrow below 700px */}
              {index < nodes.length - 1 && (
                <div className="min-[700px]:hidden flex justify-center py-1 text-[#0B5A4D] dark:text-[#3FB59B]" aria-hidden="true">
                  <ArrowDown className="w-4 h-4" />
                </div>
              )}

            </div>
          ))}
        </div>
      </div>

      <div className="pt-2 text-[13px] font-mono text-[#4A4A45] dark:text-[#B4B3AC]">
        Figure: End-to-end data transformation and request execution flow.
      </div>
    </div>
  );
}
