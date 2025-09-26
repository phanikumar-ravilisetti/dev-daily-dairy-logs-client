import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Cookies from 'js-cookie';

import {
  PageContainer,
  Card,
  FormContainer,
  Title,
  Field,
  Label,
  Input,
  Textarea,
  Row,
  Button,
  ErrorText,
} from "./StyledComponents";

const EditLogsPage = () => {
  const { id } = useParams();
  const history = useHistory();

  const [form, setForm] = useState({
    date: "",
    yesterday: "",
    today: "",
    blockers: "",
  });
  
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLog = async () => {
      try {
        const response = await fetch(`https://dev-daily-dairy-logs-server.onrender.com/logs/edit/${id}`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Cookies.get("jwt_token")}`,
          }
        });

        const data = await response.json();
        console.log(data[0].date);
        if (!response.ok) {
          setError(data.message || "Failed to load log");
          return;
        }
        setForm({
          date: data[0].date || "",
          yesterday: data[0].yesterday || "",
          today: data[0].today || "",
          blockers: data[0].blockers || "",
        });

      } catch (error) {
        setError("Failed to load log");
      }
    };

    fetchLog();
  }, [id]);

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await fetch(`https://dev-daily-dairy-logs-server.onrender.com/logs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${Cookies.get("jwt_token")}`,
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to update log");
        return;
      }

      alert("log updated");
      history.push("/home"); 
    } catch (error) {
      setError("Server error while updating");
    }
  };

  return (
    <PageContainer>
      <Card as="form" onSubmit={onSubmit}>
        <FormContainer>
        <Title>Edit Log</Title>
        {error && <ErrorText>{error}</ErrorText>}

        <Field>
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            name="date"
            type="date"
            value={form.date}
            onChange={onChange}
            required
          />
        </Field>

        <Field>
          <Label htmlFor="yesterday">Yesterday</Label>
          <Textarea
            id="yesterday"
            name="yesterday"
            rows="3"
            value={form.yesterday}
            onChange={onChange}
            required
            placeholder="What did you complete yesterday?"
          />
        </Field>

        <Field>
          <Label htmlFor="today">Today</Label>
          <Textarea
            id="today"
            name="today"
            rows="3"
            value={form.today}
            onChange={onChange}
            required
            placeholder="What will you do today?"
          />
        </Field>

        <Field>
          <Label htmlFor="blockers">Blockers</Label>
          <Textarea
            id="blockers"
            name="blockers"
            rows="2"
            value={form.blockers}
            onChange={onChange}
            placeholder="Any blockers?"
          />
        </Field>

        <Row>
          <Button type="button" onClick={() => history.goBack()} variant="secondary">
            Cancel
          </Button>
          <Button type="submit">
            Save
          </Button>
        </Row>
        </FormContainer>
      </Card>
    </PageContainer>
  );
};

export default EditLogsPage;
