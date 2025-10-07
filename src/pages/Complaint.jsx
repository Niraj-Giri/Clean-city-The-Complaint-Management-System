import React, { useState, useEffect } from "react";
import axios from "axios"; // add at top of file

function Complaint() {
  const cityAreas = {
    Delhi: ["Connaught Place", "Karol Bagh", "Lajpat Nagar"],
    Noida: ["Sector 18", "Sector 62", "Atta Market"],
    Gurugram: ["Sohna Road", "Cyber City", "MG Road"]
  };
  const complaintCategory = [
    "Waste",
    "Broken street light",
    "Open pathholes",
    "Open electricity wire"
  ];

  const urgency=["High","Medium","Low"];


  const [selectedCity, setSelectedCity] = useState("Delhi"); // Default city
  const [selectedArea, setSelectedArea] = useState(cityAreas["Delhi"][0]); // Default area
  const [selectedCategory, setSelectedCategory] = useState(complaintCategory[0]);
  const [selectedUrgency,setSelectedUrgency]=useState(urgency[0]);
  const [image, setImage] = useState(null); // <-- separate state for image

  const [values, setValues] = useState({
    address:"",
    description:""
  });

  

  // Update area when city changes
  useEffect(() => {
    setSelectedArea(cityAreas[selectedCity][0]);
  }, [selectedCity]);

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleAreaChange = (e) => {
    setSelectedArea(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  // handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleUrgencyChange=(e)=>{
    setSelectedUrgency(e.target.value);
  }


const handleSubmit = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token"); 
  try {
    const formData = new FormData(); // use FormData for multipart/form-data
    formData.append("city", selectedCity);
    formData.append("area", selectedArea);
    formData.append("category", selectedCategory);
    formData.append("urgency", selectedUrgency);
    formData.append("address", values.address);
    formData.append("description", values.description);
    formData.append("status","pending");

    if (image) {
      formData.append("image", image); // optional image
    }

    // send POST request to backend
    const response = await axios.post(
      "http://localhost:8081/cleancity/complaints",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}` // uncomment if JWT is used
        },
      }
    );

    alert(response.data); // success message
    setValues({ address: "", description: "" }); // reset form
    setImage(null);

  } catch (error) {
    console.error(error);
    alert("Failed to submit complaint");
  }
};

  return (
    <form  onSubmit={handleSubmit}>
      {/* City Dropdown */}
      <label>
        City:
        <select value={selectedCity} onChange={handleCityChange}>
          {Object.keys(cityAreas).map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </label>

      <br />

      {/* Area Dropdown */}
      <label>
        Area:
        <select value={selectedArea} onChange={handleAreaChange}>
          {cityAreas[selectedCity].map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>
      </label>

      <br />

      {/* Category Dropdown */}
      <label>
        Category:
        <select value={selectedCategory} onChange={handleCategoryChange}>
          {complaintCategory.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>

      <br />

      {/* Address input */}
      <label>
        Address:
        <input
          type="text"
          placeholder="Enter your address"
          name="address"
          value={values.address}
          onChange={handleChange}
        />
      </label>

      <br />

      {/* Image upload */}
      <label>
        Upload Image:
        <input 
          type="file" 
          name="image"
          accept="image/*"
          onChange={handleFileChange} 
        />
      </label>

      {/* Preview image */}
      {image && (
        <div>
          <p>Preview:</p>
          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            width="150"
          />
        </div>
      )}
      
      <br />
      <label>
        Urgency:
         <select value={selectedUrgency} onChange={handleUrgencyChange}>
          {urgency.map((urgent)=>(
           <option key={urgent} value={urgent}>
            {urgent}
            </option>
          ))}
          
         </select>
      </label>
       <br />
      <label >
        Description:
      <input
      type="text"
      name="description"
      placeholder="Provide description"
      value={values.description}
       onChange={handleChange}
      />

      </label>
      <br />

      <button type="submit">Submit Complain</button>
    </form>
  );
}

export default Complaint;
