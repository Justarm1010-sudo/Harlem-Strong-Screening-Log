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
    zip_code: '',
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
    hear_about_us : '',
    image_upload: null, 
    timestamp: '',
  });

  const [showOtherRaceInput, setShowOtherRaceInput] = useState(false);
  const [otherRace, setOtherRace] = useState('');

  const [showOtherOrganizationInput, setShowOtherOrganizationInput] = useState(false);
  const [otherOrganization, setOtherOrganization] = useState('');

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0], // Save the file object
      }));
    } else if (name === 'race') {
      if (value === 'Other') {
        setShowOtherRaceInput(true);
      } else {
        setShowOtherRaceInput(false);
        setOtherRace('');
      }
      setFormData((prevData) => ({
        ...prevData,
        race: value,
      }));
    } else if (name === 'organization') {
      if (value === 'Other') {
        setShowOtherOrganizationInput(true);
      } else {
        setShowOtherOrganizationInput(false);
        setOtherOrganization('');
      }
      setFormData((prevData) => ({
        ...prevData,
        organization: value,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleOtherRaceChange = (e) => {
    setOtherRace(e.target.value);
    setFormData((prevData) => ({
      ...prevData,
      race: e.target.value,
    }));
  };

  const handleOtherOrganizationChange = (e) => {
    setOtherOrganization(e.target.value);
    setFormData((prevData) => ({
      ...prevData,
      organization: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalFormData = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null) {
        finalFormData.append(key, formData[key]);
      }
    });


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
        <h2>Harlem Strong Screening Log</h2>
      </header>
      <div className="form-container">
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
          <select
            id="organization"
            name="organization"
            value={showOtherOrganizationInput ? 'Other' : formData.organization}
            onChange={handleChange}
          >
            <option value="" disabled>Select organization</option>
            <option value="HCCI">Harlem Congregations for Community Improvement, Inc. (HCCI)</option>
            <option value="Ryan Health">Ryan Health</option>
            <option value="Heritage Health and Housing">Heritage Health and Housing, Inc.</option>
            <option value="Center for Comprehensive Health">Center for Comprehensive Health (CCHP)</option>
            <option value="HOPE">Hope Community, Inc.</option>
            <option value="Community">Community-Based Organizations</option>
            <option value="Faith-Based Organizations (Churches, Temples, Mosques, etc.)">
              Faith-Based Organizations (Churches, Temples, Mosques, etc.)
            </option>
            <option value="Other">Other</option>
            <option value="None or not applicable">None or not applicable</option>
          </select>
          {showOtherOrganizationInput && (
            <input
              type="text"
              placeholder="Specify other organization"
              value={otherOrganization}
              onChange={handleOtherOrganizationChange}
            />
          )}
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
          <label>Zipcode:</label>
          <input
            type="text"
            name="zipcode"
            placeholder="Enter zipcode"
            value={formData.zipcode}
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
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label>DOB:</label>
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Race:</label>
          <select
            name="race"
            value={showOtherRaceInput ? 'Other' : formData.race}
            onChange={handleChange}
          >
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
          {showOtherRaceInput && (
            <input
              type="text"
              placeholder="Specify other race"
              value={otherRace}
              onChange={handleOtherRaceChange}
            />
          )}
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
          <div className="form-group">
          <label>How Did They Hear About Harlem Strong:</label>
          <select name="hear_about_us" value={formData.hear_about_us} onChange={handleChange}>
          <option value="Harlem Strong Navigator">Harlem Strong Navigator</option>
          <option value="Community Event">Community Event</option>
          <option value="Housing/Building Event">Housing/Building Event</option>
          <option value="Social Media">Social media</option>
          <option value="Word of Mouth">Word of Mouth</option>
          <option value="House of Worship">House of Worship</option>
          <option value="Walk-in, no referral">Walk-in, no referral</option>
          <option value="Promotion Materials">Promotion Materials</option>
          <option value="Other Community Congregation">Other Communtiy Congregation</option>
          <option value="School">School</option>
          </select>
        </div>
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
        <div className="form-group">
          <label>Image Upload:</label>
          <input
            type="file"
            name="image_upload"
            onChange={handleChange}
            accept="image/*"
          />
        </div>
        <button type="submit">Submit Screening</button>
      </div>
    </form>
  );
};

export default ScreeningForm;
