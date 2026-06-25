"use client";

import OpportunityCard from "@/components/opportunities/OpportunityCard";
import { getOpportunityByFilters } from "@/lib/api/opportunities";
import React, { useState, useEffect } from "react";

const WORK_TYPES = ["remote", "hybrid", "onsite"];
const ITEMS_PER_PAGE = 9;

export default function Page() {
  const [allOpportunities, setAllOpportunities] = useState([]);

  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [selectedWorkTypes, setSelectedWorkTypes] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getOpportunityByFilters({ search: query, workTypes: selectedWorkTypes }).then(
      (data) => {
        setAllOpportunities(data || []);
        setCurrentPage(1);
      }
    );
  }, [query, selectedWorkTypes]);

  const handleSearch = () => {
    setQuery(search);
  };

  const toggleWorkType = (type) => {
    setSelectedWorkTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };


  const totalPages = Math.ceil(allOpportunities.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = allOpportunities.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="w-full min-h-screen bg-zinc-950 p-6 md:p-12 text-white">
      <div className="max-w-7xl mx-auto mb-10">
        <h1 className="text-4xl font-bold tracking-tight mb-6">Open Positions</h1>

        {/* Search Bar */}
        <div className="flex gap-3 mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search by role title..."
            className="flex-1 max-w-md px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-400 outline-none focus:border-blue-500"
          />
          <button
            onClick={handleSearch}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            Search
          </button>
        </div>

        {/* Work Type Filter */}
        <div className="flex flex-wrap gap-2">
          {WORK_TYPES.map((type) => {
            const isActive = selectedWorkTypes.includes(type);
            return (
              <button
                key={type}
                onClick={() => toggleWorkType(type)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border capitalize transition-colors ${
                  isActive
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "bg-zinc-800 border-zinc-700 text-zinc-300 hover:border-blue-500 hover:text-white"
                }`}
              >
                {type}
              </button>
            );
          })}
        </div>
      </div>

      {/* Cards for current page only */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {currentItems.map((opportunityItem) => (
          <OpportunityCard key={opportunityItem._id} opportunity={opportunityItem} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="max-w-7xl mx-auto mt-10 flex items-center justify-center gap-4">

          <button
            onClick={() => setCurrentPage((p) => p - 1)}
            disabled={currentPage === 1}
            className="px-5 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white font-medium hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Prev
          </button>


          <span className="text-zinc-400 text-sm">
            Page <span className="text-white font-semibold">{currentPage}</span> of{" "}
            <span className="text-white font-semibold">{totalPages}</span>
          </span>

          <button
            onClick={() => setCurrentPage((p) => p + 1)}
            disabled={currentPage === totalPages}
            className="px-5 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white font-medium hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Next 
          </button>
        </div>
      )}
    </div>
  );
}