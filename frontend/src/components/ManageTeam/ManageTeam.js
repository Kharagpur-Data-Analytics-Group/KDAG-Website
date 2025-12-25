import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ManageTeam.css";
import Particless from "../Common/Particles/Particless";

const ManageTeam = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserTeams();
    } else {
      setLoading(false);
    }
  }, [isLoggedIn]);

  const fetchUserTeams = async () => {
    try {
      const token = localStorage.getItem("access_token");

      if (!token) {
        toast.error("Please log in to view your teams");
        setLoading(false);
        return;
      }

      const response = await fetch(
        `${process.env.REACT_APP_FETCH_URL}/kdsh/get_user_teams`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch teams");
      }

      setTeams(data.teams || []);
    } catch (error) {
      console.error("Error fetching teams:", error);
      toast.error(error.message || "Failed to load teams");
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="manage-team-container">
        <div className="manage-team-message">
          <h1>Please log in to manage your teams</h1>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="manage-team-container">
        <div className="manage-team-message">
          <h1>Loading your teams...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="manage-team-container">
      <div className="manage-team-header">
        <h1>Manage Your Teams</h1>
        <p>View and manage the teams you've created</p>
      </div>

      {teams.length === 0 ? (
        <div className="manage-team-message">
          <h2>No teams found</h2>
          <p>You haven't created any teams yet.</p>
          <a href="/register-kdsh" className="create-team-link">
            Create a Team
          </a>
        </div>
      ) : (
        <div className="teams-list">
          {teams.map((team) => (
            <div key={team._id} className="team-card">
              <div className="team-card-header">
                <h2>{team.teamName}</h2>
                <span
                  className={`team-status ${
                    team.is_active ? "active" : "inactive"
                  }`}
                >
                  {team.is_active ? "Active" : "Pending"}
                </span>
              </div>

              <div className="team-card-body">
                <div className="team-info-item">
                  <strong>Team Code:</strong>
                  <div className="team-code-display">{team.teamCode}</div>
                </div>

                <div className="team-info-item">
                  <strong>Members:</strong>
                  <span>{team.numMembers} / 4</span>
                </div>

                <div className="team-info-item">
                  <strong>Created:</strong>
                  <span>
                    {new Date(team.created_at).toLocaleDateString()}
                  </span>
                </div>

                {team.members_github && (
                  <div className="team-info-item">
                    <strong>Team Members:</strong>
                    <div className="members-list">
                      <div className="member-item">
                        <strong>Leader:</strong> {team.teamleader_github}
                      </div>
                      {team.members_github.map((member, idx) => (
                        <div key={idx} className="member-item">
                          {member}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>
      )}
	  <Particless/>
    </div>
  );
};

export default ManageTeam;
