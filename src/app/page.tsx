"use client";

import { useEffect, useState, useRef } from "react";

export default function Home() {
  const [advocates, setAdvocates] = useState([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const fetchAdvocates = async (searchTerm = "") => {
    setLoading(true);
    try {
      const url = searchTerm
        ? `/api/advocates?search=${encodeURIComponent(searchTerm)}`
        : "/api/advocates";

      const response = await fetch(url);
      const jsonResponse = await response.json();

      if (searchTerm) {
        setFilteredAdvocates(jsonResponse.data);
      } else {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      }
    } catch (error) {
      console.error("Error fetching advocates:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("fetching advocates...");
    fetchAdvocates();
  }, []);

  const onChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Set new timeout for search for 300 ms
    searchTimeoutRef.current = setTimeout(() => {
      if (!term.trim()) {
        setFilteredAdvocates(advocates);
        return;
      }
      console.log("searching advocates on server...");
      fetchAdvocates(term);
    }, 300);
  };

  const onClick = () => {
    console.log(advocates);
    setFilteredAdvocates(advocates);
    setSearchTerm("");
  };

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p>Search</p>
        <p>
          Searching for: <span id="search-term">{searchTerm}</span>
          {loading && <span style={{ color: "blue" }}> (loading...)</span>}
        </p>
        <input
          style={{ border: "1px solid black" }}
          value={searchTerm}
          onChange={onChange}
        />
        <button onClick={onClick} disabled={loading}>
          Reset Search
        </button>
      </div>
      <br />
      <br />
      <table>
        <thead>
          <th>First Name</th>
          <th>Last Name</th>
          <th>City</th>
          <th>Degree</th>
          <th>Specialties</th>
          <th>Years of Experience</th>
          <th>Phone Number</th>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate) => {
            return (
              <tr>
                <td>{advocate.firstName}</td>
                <td>{advocate.lastName}</td>
                <td>{advocate.city}</td>
                <td>{advocate.degree}</td>
                <td>
                  {advocate.specialties.map((s) => (
                    <div>{s}</div>
                  ))}
                </td>
                <td>{advocate.yearsOfExperience}</td>
                <td>{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
