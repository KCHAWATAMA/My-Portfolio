/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { content } from '../content.ts';
import { ProjectCard } from '../components/ProjectCard.tsx';
import { Filter, RefreshCcw } from 'lucide-react';

export function ProjectsPage() {
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Extract all unique tags across all projects
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    content.projects.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
    return ['All', ...Array.from(tagSet)];
  }, []);

  // Filter projects by selected tag and search term
  const filteredProjects = useMemo(() => {
    return content.projects.filter((project) => {
      const matchesTag =
        selectedTag === 'All' || project.tags.includes(selectedTag);
      const matchesSearch =
        searchQuery.trim() === '' ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesTag && matchesSearch;
    });
  }, [selectedTag, searchQuery]);

  const handleReset = () => {
    setSelectedTag('All');
    setSearchQuery('');
  };

  return (
    <div className="space-y-12 sm:space-y-16">
      
      {/* Header */}
      <section className="space-y-4 border-b border-[#E4E2DC] dark:border-[#272B27] pb-8 pt-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-px bg-[#0E6B5C] dark:bg-[#3FB59B]" aria-hidden="true" />
          <p className="font-mono text-xs uppercase tracking-wider text-[#0E6B5C] dark:text-[#3FB59B] font-semibold">
            Catalog of Projects
          </p>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#1B1B1B] dark:text-[#ECEBE6]">
          Projects and Case Studies
        </h1>

        <p className="text-base text-[#5A5A55] dark:text-[#9E9D96] max-w-[68ch]">
          Machine learning systems, streaming data simulations, and enterprise rule architectures built from public benchmarks and commercial client initiatives.
        </p>
      </section>

      {/* Filter and Search Bar */}
      <section className="space-y-6" aria-label="Project filters">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Functional Tag Filter Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0" role="tablist" aria-label="Filter by tag">
            <span className="text-xs font-mono text-[#5A5A55] dark:text-[#9E9D96] shrink-0 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Filter:</span>
            </span>
            {allTags.map((tag) => {
              const isSelected = selectedTag === tag;
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedTag(tag)}
                  role="tab"
                  aria-selected={isSelected}
                  className={`px-3 py-1 text-xs font-medium whitespace-nowrap transition-colors cursor-pointer border ${
                    isSelected
                      ? 'bg-[#0E6B5C] text-[#FAFAF7] border-[#0E6B5C] dark:bg-[#3FB59B] dark:text-[#121412] dark:border-[#3FB59B]'
                      : 'bg-transparent text-[#5A5A55] dark:text-[#9E9D96] border-[#E4E2DC] dark:border-[#272B27] hover:border-[#1B1B1B] dark:hover:border-[#ECEBE6] hover:text-[#1B1B1B] dark:hover:text-[#ECEBE6]'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>

          {/* Search input with label */}
          <div className="w-full md:w-64">
            <label htmlFor="project-search" className="sr-only">
              Search projects by keyword
            </label>
            <input
              id="project-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keyword..."
              className="w-full px-3 py-1.5 text-xs bg-[#FFFFFF] dark:bg-[#181B18] border border-[#E4E2DC] dark:border-[#272B27] text-[#1B1B1B] dark:text-[#ECEBE6] placeholder-[#5A5A55] dark:placeholder-[#9E9D96] focus:border-[#0E6B5C] dark:focus:border-[#3FB59B]"
            />
          </div>
        </div>

        {/* Result Count and Active Filters */}
        <div className="flex items-center justify-between text-xs font-mono text-[#5A5A55] dark:text-[#9E9D96] border-y border-[#E4E2DC] dark:border-[#272B27] py-2.5">
          <span>
            Showing <strong className="text-[#1B1B1B] dark:text-[#ECEBE6] font-semibold">{filteredProjects.length}</strong> of{' '}
            <strong className="text-[#1B1B1B] dark:text-[#ECEBE6] font-semibold">{content.projects.length}</strong> projects
          </span>
          {(selectedTag !== 'All' || searchQuery !== '') && (
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1 text-[#0E6B5C] dark:text-[#3FB59B] hover:underline cursor-pointer"
            >
              <RefreshCcw className="w-3 h-3" aria-hidden="true" />
              <span>Reset filters</span>
            </button>
          )}
        </div>
      </section>

      {/* Projects Grid or Empty State */}
      <section aria-label="Projects list">
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        ) : (
          /* Proper Empty State */
          <div className="p-12 text-center bg-[#FFFFFF] dark:bg-[#181B18] border border-[#E4E2DC] dark:border-[#272B27] space-y-4">
            <span className="font-mono text-xs text-[#0E6B5C] dark:text-[#3FB59B] uppercase tracking-wider block">
              No matching records
            </span>
            <h2 className="font-serif text-xl font-semibold text-[#1B1B1B] dark:text-[#ECEBE6]">
              No projects found for current filter criteria
            </h2>
            <p className="text-sm text-[#5A5A55] dark:text-[#9E9D96] max-w-md mx-auto">
              There are no projects tagged with &ldquo;{selectedTag}&rdquo;
              {searchQuery && ` matching &ldquo;${searchQuery}&rdquo;`}. Try selecting &ldquo;All&rdquo; or clearing search.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 text-xs font-medium text-[#FAFAF7] bg-[#0E6B5C] dark:bg-[#3FB59B] dark:text-[#121412] hover:bg-[#0A4F44] dark:hover:bg-[#4FD3B6] transition-colors cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          </div>
        )}
      </section>

    </div>
  );
}
