import React, { useState, useEffect } from "react";
import "./Complaint.css";
import { useDropzone } from "react-dropzone";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Complaint() {
  const cityAreas = {
    Delhi: ["Connaught Place", "Karol Bagh", "Lajpat Nagar"],
    Mumbai: ["Andheri", "Bandra", "Dadar"],
    Bangalore: ["Whitefield", "Electronic City", "Indiranagar"],
    Kolkata: ["Salt Lake", "Park Street", "Gariahat"],
    Chennai: ["T. Nagar", "Velachery", "Adyar"],
  };

  const complaintCategory = ["Waste", "Broken street light", "Open potholes", "Open electricity wire"];
  const urgency = ["High", "Medium", "Low"];

  const [selectedCity, setSelectedCity] = useState("Delhi");
  const [selectedArea, setSelectedArea] = useState(cityAreas["Delhi"][0]);
  const [selectedCategory, setSelectedCategory] = useState(complaintCategory[0]);
  const [selectedUrgency, setSelectedUrgency] = useState(urgency[0]);
  const [image, setImage] = useState(null);
  const [values, setValues] = useState({ address: "", description: "" });

  useEffect(() => {
    setSelectedArea(cityAreas[selectedCity][0]);
  }, [selectedCity]);

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) setImage(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: "image/*" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !selectedCity ||
      !selectedArea ||
      !selectedCategory ||
      !selectedUrgency ||
      !values.address.trim() ||
      !values.description.trim() ||
      !image
    ) {
      toast.error("Please fill all the fields and upload an image!", { position: "top-center" });
      return;
    }

    toast.success("Complaint submitted successfully!", { position: "top-center" });

    console.log({
      city: selectedCity,
      area: selectedArea,
      category: selectedCategory,
      urgency: selectedUrgency,
      address: values.address,
      description: values.description,
      image,
    });

    setValues({ address: "", description: "" });
    setImage(null);
  };

  return (
    <div className="complaint-page">
      <h2 className="complaint-title">Register a Complaint</h2>
      <form onSubmit={handleSubmit} className="complaint-form">
        <label>
          City <span className="required">*</span>
          <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
            {Object.keys(cityAreas).map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </label>

        <label>
          Area <span className="required">*</span>
          <select value={selectedArea} onChange={(e) => setSelectedArea(e.target.value)}>
            {cityAreas[selectedCity].map((area) => (
              <option key={area} value={area}>{area}</option>
            ))}
          </select>
        </label>

        <label>
          Category <span className="required">*</span>
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            {complaintCategory.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </label>

        <label>
          Address <span className="required">*</span>
          <input
            type="text"
            name="address"
            value={values.address}
            onChange={handleChange}
            placeholder="Enter your address"
          />
        </label>

        <label>
          Urgency <span className="required">*</span>
          <select value={selectedUrgency} onChange={(e) => setSelectedUrgency(e.target.value)}>
            {urgency.map((urg) => (
              <option key={urg} value={urg}>{urg}</option>
            ))}
          </select>
        </label>

        <label>
          Description <span className="required">*</span>
          <textarea
            name="description"
            value={values.description}
            onChange={handleChange}
            placeholder="Provide details"
          />
        </label>

        <div {...getRootProps()} className={`dropzone ${isDragActive ? "active" : ""}`}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the image here ...</p>
          ) : (
            <p>Drag & drop an image here, or click to select <span className="required">*</span></p>
          )}
        </div>

        {image && (
          <div className="image-preview">
            <p>Preview:</p>
            <img src={URL.createObjectURL(image)} alt="Preview" />
          </div>
        )}

        <button type="submit" className="submit-btn">Submit Complaint</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Complaint;
