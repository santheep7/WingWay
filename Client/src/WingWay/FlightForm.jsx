import React, { useState } from "react";

export default function FlightList() {
  const [flights, setFlights] = useState([
    {
      airlineName: "IndiGo",
      airlineLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQFz6C1AVchHSN_IpAzeVSSJL32vHron9aBw&s",
      fromLocation: "Cochin International Airport (COK)",
      toLocation: "Kempegowda International Airport (BLR)",
      price: 3200,
      duration: "1h 10m",
      departureTime: "06:30",
      arrivalTime: "07:40",
    },
    {
      airlineName: "Air India",
      airlineLogo: "https://c.ndtvimg.com/2023-08/l3bbbmao_air-india-logo-_625x300_10_August_23.jpg",
      fromLocation: "Indira Gandhi International Airport (DEL)",
      toLocation: "Chhatrapati Shivaji Maharaj International Airport (BOM)",
      price: 4500,
      duration: "2h 5m",
      departureTime: "09:00",
      arrivalTime: "11:05",
    },
    {
      airlineName: "SpiceJet",
      airlineLogo: "https://brandeps.com/logo-download/S/SpiceJet-logo-01.png",
      fromLocation: "Rajiv Gandhi International Airport (HYD)",
      toLocation: "Netaji Subhas Chandra Bose International Airport (CCU)",
      price: 3800,
      duration: "2h 15m",
      departureTime: "14:20",
      arrivalTime: "16:35",
    },
    {
      airlineName: "Vistara",
      airlineLogo: "https://thehardcopy.co/wp-content/uploads/Vistara-Images-7-1200x805.png",
      fromLocation: "Chhatrapati Shivaji Maharaj International Airport (BOM)",
      toLocation: "Cochin International Airport (COK)",
      price: 5200,
      duration: "2h 0m",
      departureTime: "18:15",
      arrivalTime: "20:15",
    },
    {
      airlineName: "GoAir",
      airlineLogo: "https://www.zapbooking.com/public/img/cmspage/goair-logo_IYByVsXrNy.png",
      fromLocation: "Kempegowda International Airport (BLR)",
      toLocation: "Indira Gandhi International Airport (DEL)",
      price: 4100,
      duration: "2h 30m",
      departureTime: "21:00",
      arrivalTime: "23:30",
    },
  ]);

  const [filterAirline, setFilterAirline] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  
  const filteredFlights = flights.filter(flight => {
    
    const matchesAirline = filterAirline 
      ? flight.airlineName.toLowerCase().includes(filterAirline.toLowerCase())
      : true;
    
  
    const matchesMinPrice = minPrice 
      ? flight.price >= parseInt(minPrice) 
      : true;
    
    const matchesMaxPrice = maxPrice 
      ? flight.price <= parseInt(maxPrice) 
      : true;
    
  
    const matchesDepartureTime = departureTime 
      ? filterByDepartureTime(flight.departureTime, departureTime)
      : true;
    
    return matchesAirline && matchesMinPrice && matchesMaxPrice && matchesDepartureTime;
  });

  
  function filterByDepartureTime(time, timeOfDay) {
    const hour = parseInt(time.split(':')[0]);
    
    switch(timeOfDay) {
      case "morning":
        return hour >= 6 && hour < 12;
      case "afternoon":
        return hour >= 12 && hour < 18;
      case "evening":
        return hour >= 18 || hour < 6;
      default:
        return true;
    }
  }

  const sortedFlights = [...filteredFlights].sort((a, b) => {
    if (!sortField) return 0;
    
    let aValue, bValue;
    
    switch(sortField) {
      case "price":
        aValue = a.price;
        bValue = b.price;
        break;
      case "duration":
        
        aValue = convertDurationToMinutes(a.duration);
        bValue = convertDurationToMinutes(b.duration);
        break;
      case "departureTime":
        
        aValue = convertTimeToMinutes(a.departureTime);
        bValue = convertTimeToMinutes(b.departureTime);
        break;
      case "airlineName":
        aValue = a.airlineName.toLowerCase();
        bValue = b.airlineName.toLowerCase();
        break;
      default:
        return 0;
    }
    
    if (sortOrder === "asc") {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  
  function convertDurationToMinutes(duration) {
    const [hours, minutes] = duration.split('h ');
    return parseInt(hours) * 60 + parseInt(minutes.replace('m', ''));
  }

  function convertTimeToMinutes(time) {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  const resetFilters = () => {
    setFilterAirline("");
    setMinPrice("");
    setMaxPrice("");
    setDepartureTime("");
    setSortField("");
    setSortOrder("asc");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ color: "#1a237e", marginBottom: "20px" }}>Available Flights</h1>

      <div style={{ 
        backgroundColor: "#f5f5f5", 
        padding: "15px", 
        borderRadius: "8px", 
        marginBottom: "20px",
        display: "flex",
        flexWrap: "wrap",
        gap: "15px",
        alignItems: "center"
      }}>
        <h3 style={{ margin: "0", width: "100%" }}>Filters</h3>
        
        <div>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Airline:
          </label>
          <input
            type="text"
            placeholder="Filter by airline"
            value={filterAirline}
            onChange={(e) => setFilterAirline(e.target.value)}
            style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>
        
        <div>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Price Range:
          </label>
          <div style={{ display: "flex", gap: "5px" }}>
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              style={{ width: "80px", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
            />
            <span>-</span>
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              style={{ width: "80px", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
            />
          </div>
        </div>
        
        <div>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Departure Time:
          </label>
          <select
            value={departureTime}
            onChange={(e) => setDepartureTime(e.target.value)}
            style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          >
            <option value="">Any Time</option>
            <option value="morning">Morning (6AM - 12PM)</option>
            <option value="afternoon">Afternoon (12PM - 6PM)</option>
            <option value="evening">Evening (6PM - 6AM)</option>
          </select>
        </div>
        
        <div style={{ alignSelf: "flex-end" }}>
          <button 
            onClick={resetFilters}
            style={{ 
              padding: "8px 15px", 
              backgroundColor: "#ff5252", 
              color: "white", 
              border: "none", 
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Reset Filters
          </button>
        </div>
      </div>

      <div style={{ 
        display: "flex", 
        gap: "15px", 
        alignItems: "center", 
        marginBottom: "20px",
        flexWrap: "wrap"
      }}>
        <h3 style={{ margin: "0" }}>Sort by:</h3>
        
        <select
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
          style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
        >
          <option value="">Select Field</option>
          <option value="price">Price</option>
          <option value="duration">Duration</option>
          <option value="departureTime">Departure Time</option>
          <option value="airlineName">Airline Name</option>
        </select>
        
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          disabled={!sortField}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <p style={{ marginBottom: "15px" }}>
        Showing {sortedFlights.length} of {flights.length} flights
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {sortedFlights.length > 0 ? (
          sortedFlights.map((flight, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #e0e0e0",
                borderRadius: "10px",
                padding: "15px",
                width: "280px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                backgroundColor: "white",
                transition: "transform 0.2s",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
              }}
            >
              <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                <img
                  src={flight.airlineLogo}
                  alt={flight.airlineName}
                  style={{ width: "40px", height: "40px", objectFit: "contain", marginRight: "10px" }}
                />
                <h3 style={{ margin: "0", color: "#1a237e" }}>{flight.airlineName}</h3>
              </div>
              
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <div>
                  <p style={{ margin: "0", fontWeight: "bold", fontSize: "18px" }}>
                    {flight.fromLocation.split('(')[1].replace(')', '')}
                  </p>
                  <p style={{ margin: "0", fontSize: "12px", color: "#666" }}>
                    {flight.fromLocation.split('(')[0].trim()}
                  </p>
                </div>
                
                <div style={{ textAlign: "center" }}>
                  <p style={{ margin: "0", fontSize: "12px", color: "#666" }}>
                    {flight.duration}
                  </p>
                  <div style={{ height: "1px", backgroundColor: "#ccc", width: "50px", margin: "5px auto" }}></div>
                  <p style={{ margin: "0", fontSize: "12px", color: "#666" }}>
                    Direct
                  </p>
                </div>
                
                <div style={{ textAlign: "right" }}>
                  <p style={{ margin: "0", fontWeight: "bold", fontSize: "18px" }}>
                    {flight.toLocation.split('(')[1].replace(')', '')}
                  </p>
                  <p style={{ margin: "0", fontSize: "12px", color: "#666" }}>
                    {flight.toLocation.split('(')[0].trim()}
                  </p>
                </div>
              </div>
              
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <div>
                  <p style={{ margin: "0", fontSize: "14px" }}>
                    <strong>Depart:</strong> {flight.departureTime}
                  </p>
                  <p style={{ margin: "0", fontSize: "14px" }}>
                    <strong>Arrive:</strong> {flight.arrivalTime}
                  </p>
                </div>
              </div>
              
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <p style={{ margin: "0", fontSize: "14px" }}>
                  <strong>Price:</strong>
                </p>
                <p style={{ margin: "0", fontSize: "20px", fontWeight: "bold", color: "#1a237e" }}>
                  ₹{flight.price}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div style={{ 
            textAlign: "center", 
            width: "100%", 
            padding: "40px", 
            backgroundColor: "#f9f9f9", 
            borderRadius: "8px",
            border: "1px dashed #ccc"
          }}>
            <h3 style={{ color: "#666" }}>No flights match your filters</h3>
            <p>Try adjusting your filters to see more results</p>
            <button 
              onClick={resetFilters}
              style={{ 
                padding: "10px 20px", 
                backgroundColor: "#1a237e", 
                color: "white", 
                border: "none", 
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}