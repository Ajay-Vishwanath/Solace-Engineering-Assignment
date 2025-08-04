import { useState, useEffect } from "react";
import { Advocate } from "../types/advocate";

export const useAdvocates = () => {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAdvocates = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/advocates");
      if (!response.ok) {
        throw new Error("Failed to fetch advocates");
      }

      const jsonResponse = await response.json();
      setAdvocates(jsonResponse.data);
      setFilteredAdvocates(jsonResponse.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const filterAdvocates = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setFilteredAdvocates(advocates);
      return;
    }

    const filtered = advocates.filter((advocate) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        advocate.firstName.toLowerCase().includes(searchLower) ||
        advocate.lastName.toLowerCase().includes(searchLower) ||
        advocate.city.toLowerCase().includes(searchLower) ||
        advocate.degree.toLowerCase().includes(searchLower) ||
        advocate.specialties.some((specialty) =>
          specialty.toLowerCase().includes(searchLower)
        ) ||
        advocate.yearsOfExperience.toString().includes(searchTerm)
      );
    });

    setFilteredAdvocates(filtered);
  };

  const resetSearch = () => {
    setFilteredAdvocates(advocates);
  };

  useEffect(() => {
    fetchAdvocates();
  }, []);

  return {
    advocates,
    filteredAdvocates,
    loading,
    error,
    filterAdvocates,
    resetSearch,
  };
};
