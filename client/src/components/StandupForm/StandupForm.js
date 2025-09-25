import { useState } from "react";
import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie';

import {
  StandupContainer,
  FormContainer,
  FormContainer2,
  Title,
  Label,
  Input,
  ButtonContainer,
  Button,
} from "./StyledComponents";

const StandupForm = () => {
  const history = useHistory();

  const todayStr = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    userId: localStorage.getItem("userId"),
    date: todayStr,
    yesterday: "",
    today: "",
    blockers: "",
  });

  const [error, setError] = useState("");

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/logs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${Cookies.get("jwt_token")}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Standup log saved successfully!");
       
        const userId = localStorage.getItem('userId');
       
        setFormData({
          userId: userId,
          date: todayStr,
          yesterday: "",
          today: "",
          blockers: "",
        });
     
        history.push("/home");
      } else {
        setError(data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Server error, please try again later.");
    }
  };

  return (
    <StandupContainer>
      <FormContainer>
        <FormContainer2>
        <Title>Daily Standup Log</Title>
        <form onSubmit={handleSubmit}>
          <Label htmlFor="date">Date</Label>
          <Input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />

          <Label htmlFor="yesterday">What did you do yesterday?</Label>
          <Input
            as="textarea"
            id="yesterday"
            name="yesterday"
            value={formData.yesterday}
            onChange={handleChange}
            required
          />

          <Label htmlFor="today">What will you do today?</Label>
          <Input
            as="textarea"
            id="today"
            name="today"
            value={formData.today}
            onChange={handleChange}
            required
          />

          <Label htmlFor="blockers">Any blockers?</Label>
          <Input
            as="textarea"
            id="blockers"
            name="blockers"
            value={formData.blockers}
            onChange={handleChange}
          />
          
          {error && <p style={{ color: "red" }}>{error}</p>}

          <ButtonContainer>
          <Button type="submit" variant="primary" onClick={() => {history.push("/home")}}>Cancel</Button>
          <Button type="submit">Save Log</Button>
          </ButtonContainer>
        </form>
      </FormContainer2>
      </FormContainer>
    </StandupContainer>
  );
};

export default StandupForm;
