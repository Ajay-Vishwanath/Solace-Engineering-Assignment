"use client";

import { useAdvocates } from "../hooks/useAdvocates";
import { SearchBar } from "../components/SearchBar";
import { AdvocatesTable } from "../components/AdvocatesTable";

export default function Home() {
  const { filteredAdvocates, loading, error, filterAdvocates, resetSearch } =
    useAdvocates();

  if (error) {
    return (
      <main style={{ margin: "24px" }}>
        <h1>Solace Advocates</h1>
        <div style={{ color: "red" }}>Error: {error}</div>
      </main>
    );
  }

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <SearchBar
        onSearch={filterAdvocates}
        onReset={resetSearch}
        loading={loading}
      />
      <br />
      <br />
      <AdvocatesTable advocates={filteredAdvocates} loading={loading} />
    </main>
  );
}
