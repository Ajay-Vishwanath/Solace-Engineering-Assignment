"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [advocates, setAdvocates] = useState([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState([]);

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);

  const onChange = (e) => {
    const searchTerm = e.target.value;

    document.getElementById("search-term").innerHTML = searchTerm;

    console.log("filtering advocates...");
    const filteredAdvocates = advocates.filter((advocate) => {
      return (
        advocate.firstName.includes(searchTerm) ||
        advocate.lastName.includes(searchTerm) ||
        advocate.city.includes(searchTerm) ||
        advocate.degree.includes(searchTerm) ||
        advocate.specialties.includes(searchTerm) ||
        advocate.yearsOfExperience.includes(searchTerm)
      );
    });

    setFilteredAdvocates(filteredAdvocates);
  };

  const onClick = () => {
    console.log(advocates);
    setFilteredAdvocates(advocates);
  };

  return (
    <main className="main">
      <div className="container">
        <div className="header">
          <h1 className="header__title">Solace Advocates</h1>
          <p className="header__subtitle">
            Find the right advocate for your needs
          </p>
        </div>

        <div className="search">
          <label htmlFor="search" className="search__label">
            Search Advocates
          </label>
          <div className="search__controls">
            <input
              id="search"
              type="text"
              placeholder="Search by name, city, degree, specialty, or years of experience..."
              className="search__input"
              onChange={onChange}
            />
            <button onClick={onClick} className="search__button">
              Reset
            </button>
          </div>
          <p className="search__status">
            Searching for:{" "}
            <span id="search-term" className="search__status-term"></span>
          </p>
        </div>

        <div className="results">
          <div className="results__header">
            <h2 className="results__title">
              Results ({filteredAdvocates.length} advocates)
            </h2>
          </div>

          {/* Desktop Table View */}
          <table className="results__table">
            <thead className="results__thead">
              <tr>
                <th className="results__th">Name</th>
                <th className="results__th">City</th>
                <th className="results__th">Degree</th>
                <th className="results__th">Specialties</th>
                <th className="results__th">Experience</th>
                <th className="results__th">Phone</th>
              </tr>
            </thead>
            <tbody className="results__tbody">
              {filteredAdvocates.map((advocate, index) => (
                <tr key={index} className="results__tr">
                  <td className="results__td">
                    <div className="results__name">
                      {advocate.firstName} {advocate.lastName}
                    </div>
                  </td>
                  <td className="results__td">
                    <div className="results__city">{advocate.city}</div>
                  </td>
                  <td className="results__td">
                    <span className="results__degree">{advocate.degree}</span>
                  </td>
                  <td className="results__td">
                    <div className="results__specialties">
                      {advocate.specialties.map((specialty, specialtyIndex) => (
                        <span
                          key={specialtyIndex}
                          className="results__specialty"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="results__td">
                    <div className="results__experience">
                      {advocate.yearsOfExperience} years
                    </div>
                  </td>
                  <td className="results__td">
                    <div className="results__phone">{advocate.phoneNumber}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile Card View */}
          <div className="mobile-cards">
            {filteredAdvocates.map((advocate, index) => (
              <div key={index} className="mobile-cards__item">
                <div className="mobile-cards__header">
                  <div className="mobile-cards__info">
                    <h3 className="mobile-cards__name">
                      {advocate.firstName} {advocate.lastName}
                    </h3>
                    <p className="mobile-cards__city">{advocate.city}</p>
                  </div>
                  <span className="mobile-cards__degree">
                    {advocate.degree}
                  </span>
                </div>

                <div className="mobile-cards__details">
                  <div className="mobile-cards__detail">
                    <span className="mobile-cards__detail-label">
                      Experience:
                    </span>
                    {advocate.yearsOfExperience} years
                  </div>

                  <div className="mobile-cards__detail">
                    <span className="mobile-cards__detail-label">Phone:</span>
                    <a
                      href={`tel:${advocate.phoneNumber}`}
                      className="mobile-cards__phone"
                    >
                      {advocate.phoneNumber}
                    </a>
                  </div>

                  <div className="mobile-cards__specialties">
                    <span className="mobile-cards__specialties-label">
                      Specialties:
                    </span>
                    <div className="mobile-cards__specialties-list">
                      {advocate.specialties.map((specialty, specialtyIndex) => (
                        <span
                          key={specialtyIndex}
                          className="mobile-cards__specialties-item"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredAdvocates.length === 0 && (
            <div className="results__empty">
              <div className="results__empty-text">No advocates found</div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
