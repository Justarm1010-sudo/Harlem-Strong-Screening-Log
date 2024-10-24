import React, { useState } from 'react';
import './ScreeningForm.css';

const ScreeningForm = () => {
  const [formData, setFormData] = useState({
    participant_id: '',
    phq4_complete: 'Yes',
    organization: '',
    mcc: '',
    cluster: '',
    address: '',
    provider_name: '',
    screen_date: '',
    screening_id: '',
    consumer_name: '',
    gender: '',
    dob: '',
    race: '',
    ethnicity: '',
    email: '',
    contact_info: '',
    preferred_contact_method_time: 'Email',
    phq_4_score: '',
    suicide_self_harm: 'No',
    smi_risk: 'No',
    eligible_for_study: 'No',
    interest_in_study: 'No',
    date_of_1st_contact: '',
    date_of_2nd_contact: '',
    date_of_3rd_contact: '',
    survey_follow_up_notes: '',
    timestamp: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.timestamp = new Date().toISOString();

    try {
      const response = await fetch('https://p65odeqbesg3vu2c33onkoziye0ebrxb.lambda-url.us-east-2.on.aws/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'log_screening',
          ...formData,
        }),
      });

      if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(errorResult.body || 'Unknown error occurred');
      }

      alert('Screening data logged!');
    } catch (error) {
      alert(`Error submitting form: ${error.message}`);
    }
  };

  return (
    <form className="screening-form" onSubmit={handleSubmit}>
      <header>
        <h2>Harlem Strong Screening Form</h2>
      </header>
      <div className="form-container">
        <div className="form-group">
          <label>Participant ID:</label>
          <input
            type="text"
            name="participant_id"
            placeholder="Enter participant ID"
            value={formData.participant_id}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Provider Name:</label>
          <input
            type="text"
            name="provider_name"
            placeholder="Enter provider name (Data Collector)"
            value={formData.provider_name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Consumer Name:</label>
          <input
            type="text"
            name="consumer_name"
            placeholder="Enter consumer name"
            value={formData.consumer_name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>PHQ-4 Complete:</label>
          <select name="phq4_complete" value={formData.phq4_complete} onChange={handleChange}>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="organization">Organization:</label>
          <select id="organization" name="organization" value={formData.organization} onChange={handleChange}>
            <option value="" disabled>Select organization</option>
            <option value="HCCI">Harlem Congregations for Community Improvement, Inc. (HCCI)</option>
            <option value="Ryan Health">Ryan Health</option>
            <option value="Heritage Health and Housing">Heritage Health and Housing, Inc.</option>
            <option value="Center for Comprehensive Health">Center for Comprehensive Health (CCHP)</option>
            <option value="HOPE">Hope Community, Inc.</option>
            <option value="Community">Community-Based Organizations</option>
            <option value="Other">Other</option>
            <option value="None or not applicable">None or not applicable</option>
          </select>
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            name="address"
            placeholder="Enter address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Screen Date:</label>
          <input type="date" name="screen_date" value={formData.screen_date} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Screening ID:</label>
          <input
            type="text"
            name="screening_id"
            placeholder="Enter screening ID"
            value={formData.screening_id}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <select id="gender" name="gender" value={formData.gender} onChange={handleChange}>
            <option value="" disabled>Select your gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="nonbinary">Nonbinary</option>
            <option value="genderfluid">Genderfluid</option>
            <option value="intersex">Intersex</option>
            <option value="prefer_not_to_say">Prefer not to say</option>
          </select>
        </div>
        <div className="form-group">
          <label>DOB:</label>
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Race:</label>
          <select name="race" value={formData.race} onChange={handleChange}>
            <option value="" disabled>Select Race</option>
            <option value="American Indian/ Alaska Native">American Indian/Alaska Native</option>
            <option value="Asian">Asian</option>
            <option value="Hawaiian or Pacific Islander">Hawaiian or Pacific Islander</option>
            <option value="Black or African American">Black or African American</option>
            <option value="White">White</option>
            <option value="More than one race">More than one race</option>
            <option value="Unknown">Unknown</option>
            <option value="Other non-white">Other non-white</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label>Ethnicity:</label>
          <select name="ethnicity" value={formData.ethnicity} onChange={handleChange}>
            <option value="">Select ethnicity</option>
            <option value="Not Hispanic or Latino">Not Hispanic or Latino</option>
            <option value="Hispanic or Latino">Hispanic or Latino</option>
          </select>
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="text"
            name="contact_info"
            placeholder="Enter contact info"
            value={formData.contact_info}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Preferred Contact Method:</label>
          <select name="preferred_contact_method_time" value={formData.preferred_contact_method_time} onChange={handleChange}>
            <option value="Email">Email</option>
            <option value="SMS">SMS</option>
            <option value="Phone Number">Phone Number</option>
          </select>
        </div>
        <div className="form-group">
          <label>PHQ-4 Score:</label>
          <input
            type="number"
            name="phq_4_score"
            placeholder="Enter score"
            min="0"
            max="12"
            value={formData.phq_4_score}
            onChange={handleChange}
            className="large-input"
          />
        </div>
        <div className="form-group">
          <label>Suicide/Self Harm:</label>
          <select name="suicide_self_harm" value={formData.suicide_self_harm} onChange={handleChange}>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="form-group">
          <label>SMI Risk:</label>
          <select name="smi_risk" value={formData.smi_risk} onChange={handleChange}>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="form-group">
          <label>Eligible for Study:</label>
          <select name="eligible_for_study" value={formData.eligible_for_study} onChange={handleChange}>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="form-group">
          <label>Interest in Study:</label>
          <select name="interest_in_study" value={formData.interest_in_study} onChange={handleChange}>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="form-group">
          <label>Survey Follow-up Notes:</label>
          <textarea
            name="survey_follow_up_notes"
            placeholder="Enter follow-up notes"
            value={formData.survey_follow_up_notes}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit">Submit Screening</button>
      </div>
    </form>
  );
};

export default ScreeningForm;
