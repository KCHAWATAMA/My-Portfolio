/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArchitectureNode } from '../content.ts';
import { ArrowRight, Database, Cpu, Layers, Server, Layout } from 'lucide-react';

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
    <div className="bg-[#FFFFFF] dark:bg-[#181B18] border border-[#E4E2DC] dark:border-[#272B27] p-6 space-y-4">
      <div className="border-b border-[#E4E2DC] dark:border-[#272B27] pb-3">
        <span className="text-xs uppercase tracking-wider font-mono text-[#0E6B5C] dark:text-[#3FB59B] block mb-1">
          System Architecture
        </span>
        <h4 className="font-serif text-lg font-semibold text-[#1B1B1B] dark:text-[#ECEBE6]">
          {title}
        </h4>
        <p className="text-xs text-[#5A5A55] dark:text-[#9E9D96] mt-1 font-sans">
          {description}
        </p>
      </div>

      {/* Nodes Flow Container */}
      <div className="pt-2">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative items-stretch">
          {nodes.map((node, index) => (
            <div key={node.id} className="flex flex-col md:flex-row items-center gap-3 w-full">
              
              {/* Node Card */}
              <div className="flex-1 w-full p-4 bg-[#F4F3EE] dark:bg-[#121412] border border-[#E4E2DC] dark:border-[#272B27] flex flex-col justify-between h-full">
                <div className="flex items-center justify-between text-xs font-mono text-[#5A5A55] dark:text-[#9E9D96] mb-2">
                  <span className="text-[#0E6B5C] dark:text-[#3FB59B] font-semibold">
                    Step {index + 1}
                  </span>
                  <span className="text-[#5A5A55] dark:text-[#9E9D96]">
                    {getIcon(node.category)}
                  </span>
                </div>

                <div className="space-y-1">
                  <p className="font-serif font-semibold text-sm text-[#1B1B1B] dark:text-[#ECEBE6] leading-snug">
                    {node.label}
                  </p>
                  {node.sublabel && (
                    <p className="text-[11px] font-sans text-[#5A5A55] dark:text-[#9E9D96] leading-relaxed">
                      {node.sublabel}
                    </p>
                  )}
                </div>
              </div>

              {/* Connector arrow between nodes */}
              {index < nodes.length - 1 && (
                <div className="hidden md:flex items-center text-[#5A5A55] dark:text-[#9E9D96] shrink-0" aria-hidden="true">
                  <ArrowRight className="w-4 h-4 text-[#0E6B5C] dark:text-[#3FB59B]" />
                </div>
              )}

              {/* Vertical connector arrow on mobile */}
              {index < nodes.length - 1 && (
                <div className="md:hidden flex justify-center py-1 text-[#0E6B5C] dark:text-[#3FB59B]" aria-hidden="true">
                  ↓
                </div>
              )}

            </div>
          ))}
        </div>
      </div>

      <div className="pt-2 text-[11px] font-mono text-[#5A5A55] dark:text-[#9E9D96]">
        Figure: End-to-end data transformation and request execution flow.
      </div>
    </div>
  );
}
