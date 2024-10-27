import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminHomePage.css';
import ImageSwitcher from './ImageSwitcher.jsx';

const AdminHomePage = () => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get('http://localhost:3000/report/getFlightReport');
        setFlights(response.data);
      } catch (error) {
        console.error("Error fetching flight data:", error);
      }
    };
    fetchFlights();
  }, []);

  return (
    <div className="homepage">
      <ImageSwitcher />

      <div className="hero-section">
        <h1>Welcome to Our Airline</h1>
      </div>

      <div className="flights-report-section">
        <h2>Flight Reports</h2>
        <table className="flights-report-table">
          <thead>
            <tr>
              <th>Flight Number</th>
              <th>Departure Time</th>
              <th>Arrival Time</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight) => (
              <tr key={flight.flight_number}>
                <td>{flight.flight_number}</td>
                <td>{new Date(flight.departure_time).toLocaleString()}</td>
                <td>{new Date(flight.arrival_time).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHomePage;
