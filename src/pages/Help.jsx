import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Help.css";

const faqData = [
  {
    question: "How can I report a new complaint?",
    answer: (
      <>
        Click on <a href="/complaint">Report</a> in the top menu or use the{" "}
        <a href="/home">Report a New Complaint</a> button on the home page. Fill out
        the details and submit.
      </>
    ),
  },
  {
    question: "How can I check the status of my complaints?",
    answer: (
      <>
        Go to <a href="/my-complaints">My Complaints</a> page from the top menu. You
        can search, filter, and view details of each complaint.
      </>
    ),
  },
  {
    question: "How do I update my profile?",
    answer: (
      <>
        Navigate to <a href="/profile">Profile</a> and click "Edit Profile" to update
        your information or change your profile picture.
      </>
    ),
  },
  {
    question: "Who do I contact for urgent issues?",
    answer:
      "For urgent issues, you can call our support hotline: +91 1234567890 or email support@cleancity.com.",
  },
  {
    question: "Can I edit a complaint after submission?",
    answer:
      "Currently, complaints cannot be edited after submission. Please submit a new complaint if needed.",
  },
  {
    question: "How do I see insights and statistics?",
    answer: (
      <>
        Go to the <a href="/insights">Insights</a> page to see charts and statistics
        about your complaints and city cleanliness.
      </>
    ),
  },
  {
    question: "How do I provide feedback?",
    answer:
      "You can provide feedback after a complaint is resolved by clicking the 'Give Feedback' button in My Complaints.",
  },
  {
    question: "What if I forget my password?",
    answer:
      "Use the 'Forgot Password' link on the login page to reset your password via email.",
  },
];

const Help = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const navigate = useNavigate();

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="help-page">
      <div className="help-container">
        <h2>Help & Support</h2>
        <p className="help-description">
          Find answers to frequently asked questions or contact our support team.
        </p>

        <div className="faq-section">
          {faqData.map((faq, index) => (
            <div
              className={`faq-item ${activeIndex === index ? "active" : ""}`}
              key={index}
            >
              <div className="faq-question" onClick={() => toggleFaq(index)}>
                {faq.question}
                <span className="toggle-icon">
                  {activeIndex === index ? "−" : "+"}
                </span>
              </div>
              {activeIndex === index && (
                <div className="faq-answer">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>

        <div className="contact-section">
          <h3>Contact Us</h3>
          <p>
            Email:{" "}
            <a href="mailto:support@cleancity.com">support@cleancity.com</a>
          </p>
          <p>
            Phone: <a href="tel:+911234567890">+91 1234567890</a>
          </p>
          {/* <button className="contact-btn" onClick={() => navigate("/complaint")}>
            Submit a Complaint
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Help;
