import { useState, useEffect } from "react";
import {Link, useHistory} from 'react-router-dom';
import Cookies from 'js-cookie';
import {
  LogsContainer,
  LogoutBtnContainer,
  LogCard,
  Title,
  CreateLogBtnContainer,
  Buttons
} from "./StyledComponents";

const ListOfLogsPage = () => {
  const history = useHistory();
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState("");
  
  useEffect(() => {
    
    const fetchLogs = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const token = Cookies.get("jwt_token");
        const response = await fetch(`https://dev-daily-dairy-logs-server.onrender.com/logs/${userId}`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          }
        });

        const data = await response.json();
        
        if (response.ok) {
          
          setLogs(data.logs);
        } else {
          setError(data.message || "Error fetching logs");
        }
      } catch (error) {
        setError("Failed to load logs");
        console.error(error);
      }
    };

    fetchLogs();
  }, []);

  const onClickDelete = async (id) => {
    try {
       const response = await fetch(`http://localhost:5000/logs/delete/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Cookies.get("jwt_token")}`,
          }
      })
      
      const data = await response.json();
      
      if (response.ok) {
        
        alert("Log deleted Successfully.");
        setLogs((prev) => prev.filter((log) => log._id !== id));
      } else {
        alert(data.message || "Failed to delete log");
        
      }
    } catch (error) {
        console.error("Error:", error);
        alert("Server error while deleating.");
    }
  }

  return (
    <LogsContainer>
      <LogoutBtnContainer>
        <button type="button" onClick={() => {Cookies.remove("jwt_token"); history.replace("/login");}}>Logout</button>
      </LogoutBtnContainer>
      <Title>My Standup Logs</Title>
      <CreateLogBtnContainer>
      <Buttons type="button" onClick={() => {history.push('/standupform')}}>Create New Log</Buttons>
      </CreateLogBtnContainer>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {logs.length === 0 ? (
        <p>No logs yet</p>
      ) : (
        logs.map((log) => (
          <LogCard key={log._id}>
            <p><strong>Date:</strong> {log.date}</p>
            <p><strong>Yesterday:</strong> {log.yesterday}</p>
            <p><strong>Today:</strong> {log.today}</p>
            <p><strong>Blockers:</strong> {log.blockers || "None"}</p>
            <Link to={`/logs/edit/${log._id}`}><Buttons type="button">Edit</Buttons> </Link>
            <Buttons type="button" onClick={() => onClickDelete(log._id) }>Delete</Buttons>
          </LogCard>
        ))
      )}
    </LogsContainer>
  );
};

export default ListOfLogsPage;