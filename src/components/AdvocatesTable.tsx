import { Advocate } from "../types/advocate";

interface AdvocatesTableProps {
  advocates: Advocate[];
  loading?: boolean;
}

export const AdvocatesTable = ({
  advocates,
  loading = false,
}: AdvocatesTableProps) => {
  if (loading) {
    return <div>Loading advocates...</div>;
  }

  if (advocates.length === 0) {
    return <div>No advocates found.</div>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>City</th>
          <th>Degree</th>
          <th>Specialties</th>
          <th>Years of Experience</th>
          <th>Phone Number</th>
        </tr>
      </thead>
      <tbody>
        {advocates.map((advocate, index) => (
          <tr key={`${advocate.firstName}-${advocate.lastName}-${index}`}>
            <td>{advocate.firstName}</td>
            <td>{advocate.lastName}</td>
            <td>{advocate.city}</td>
            <td>{advocate.degree}</td>
            <td>
              {advocate.specialties.map((specialty, specialtyIndex) => (
                <div key={specialtyIndex}>{specialty}</div>
              ))}
            </td>
            <td>{advocate.yearsOfExperience}</td>
            <td>{advocate.phoneNumber}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
