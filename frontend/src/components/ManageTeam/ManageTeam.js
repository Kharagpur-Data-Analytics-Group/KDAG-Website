import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ManageTeam.css";
import Particless from "../Common/Particles/Particless";
import { Copy, Check, Users, Calendar, Edit2, Trash2, X, Save } from "lucide-react";
import Footer from "../Common/Footer/Footer";

const ManageTeam = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedCode, setCopiedCode] = useState(null);
  const [editingTeamId, setEditingTeamId] = useState(null);
  const [editTeamName, setEditTeamName] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserTeams();
    } else {
      setLoading(false);
    }
  }, [isLoggedIn]);

  const handleEditClick = (team) => {
    setEditingTeamId(team._id);
    setEditTeamName(team.teamName);
  };

  const handleCancelEdit = () => {
    setEditingTeamId(null);
    setEditTeamName("");
  };

  const handleSaveTeamName = async (team) => {
    if (!editTeamName.trim()) {
      toast.error("Team name cannot be empty");
      return;
    }

    if (editTeamName.trim() === team.teamName) {
      handleCancelEdit();
      return;
    }

    try {
      const token = localStorage.getItem("access_token");
      const res = await fetch(
        `${process.env.REACT_APP_FETCH_URL}/kdsh/edit_team_details`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            teamCode: team.teamCode,
            teamName: editTeamName.trim(),
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to update team name");
      }

      toast.success("Team name updated successfully");
      
      // Update local state
      setTeams(teams.map(t => 
        t._id === team._id ? { ...t, teamName: editTeamName.trim() } : t
      ));
      
      handleCancelEdit();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteTeam = async (team) => {
    if (!window.confirm(`Are you sure you want to delete the team "${team.teamName}"? This action cannot be undone.`)) {
      return;
    }

    setIsDeleting(true);
    try {
      const token = localStorage.getItem("access_token");
      const res = await fetch(
        `${process.env.REACT_APP_FETCH_URL}/kdsh/delete_team`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            teamCode: team.teamCode,
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to delete team");
      }

      toast.success("Team deleted successfully");
      
      // Update local state
      setTeams(teams.filter(t => t._id !== team._id));
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const fetchUserTeams = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        toast.error("Please log in to view your teams");
        setLoading(false);
        return;
      }

      const res = await fetch(
        `${process.env.REACT_APP_FETCH_URL}/kdsh/get_user_teams`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch teams");
      }

      setTeams(data.teams || []);
    } catch (error) {
      toast.error(error.message || "Unable to load teams");
      console.error("Error fetching teams:", error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text, teamId) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(teamId);
      toast.success("Team code copied to clipboard!", {
        position: "bottom-right",
        autoClose: 2000,
      });
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (error) {
      toast.error("Failed to copy code");
      console.error("Copy error:", error);
    }
  };

  const removeMember = async (memberGithubId) => {
  if (!window.confirm("Are you sure you want to remove this member?")) return;

  try {
    const token = localStorage.getItem("access_token");
    if (!token) {
      toast.error("You must be logged in");
      return;
    }

    const team = teams[0]; // since only one team per leader

    const res = await fetch(
      `${process.env.REACT_APP_FETCH_URL}/kdsh/remove_member`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          GitHubID: memberGithubId,
          teamCode: team.teamCode,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Failed to remove member");

    toast.success("Member removed successfully");

    // Refresh UI
    fetchUserTeams();

  } catch (err) {
    toast.error(err.message || "Something went wrong");
  }
};


  const editLeader = () => {
    toast.info("Edit team leader details coming soon!", {
      position: "bottom-right",
    });
    // Implement edit leader functionality
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  if (!isLoggedIn) {
    return (
      <div className="mt-wrapper">
        <Particless />
        <div className="mt-center-box">
          <h2>Authentication Required</h2>
          <p className="mt-subtitle">
            Please log in to view and manage your team
          </p>
          <a href="/auth" className="mt-primary-btn">
            Login to Continue
          </a>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="mt-wrapper">
        <Particless />
        <div className="mt-center-box">
          <div className="mt-loader"></div>
          <h2>Loading Your Teams...</h2>
          <p className="mt-subtitle">Please wait while we fetch your data</p>
        </div>
      </div>
    );
  }

  if (teams.length === 0) {
    return (
      <div className="mt-wrapper">
        <Particless />
        <div className="mt-header">
          <h1>Manage Your Team</h1>
          <p>View and manage your hackathon registration</p>
        </div>
        <div className="mt-center-box">
          <h2>No Team Found</h2>
          <p className="mt-subtitle">
            Create your team and start your hackathon journey today!
          </p>
          <a href="/register-kdsh" className="mt-primary-btn">
            Register Your Team
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
    <div className="mt-wrapper">
      <Particless />

      <div className="mt-header">
        <h1>Manage Your Team</h1>
        <p>View and manage your hackathon registration</p>
      </div>

      {teams.map((team) => (
        <div className="mt-card" key={team._id}>
          {editingTeamId === team._id ? (
            <div className="mt-edit-container" style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '20px' }}>
              <input
                type="text"
                value={editTeamName}
                onChange={(e) => setEditTeamName(e.target.value)}
                className="mt-edit-input"
                style={{
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid #333',
                  background: '#1a1a1a',
                  color: '#fff',
                  fontSize: '1.2rem',
                  flex: 1
                }}
              />
              <button 
                onClick={() => handleSaveTeamName(team)}
                className="mt-action-btn save"
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#4ade80' }}
                title="Save"
              >
                <Save size={24} />
              </button>
              <button 
                onClick={handleCancelEdit}
                className="mt-action-btn cancel"
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#f87171' }}
                title="Cancel"
              >
                <X size={24} />
              </button>
            </div>
          ) : (
            <div className="mt-title-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="mt-title">{team.teamName}</div>
              <div className="mt-actions" style={{ display: 'flex', gap: '10px' }}>
                <button 
                  onClick={() => handleEditClick(team)}
                  className="mt-action-btn edit"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#60a5fa' }}
                  title="Edit Team Name"
                >
                  <Edit2 size={20} />
                </button>
                <button 
                  onClick={() => handleDeleteTeam(team)}
                  className="mt-action-btn delete"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#f87171' }}
                  title="Delete Team"
                  disabled={isDeleting}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          )}

          <div className="mt-code-section">
            <label className="mt-code-label">Team Code</label>
            <div className="mt-code-box">
              <div className="mt-code">{team.teamCode}</div>
              <button
                className={`mt-copy-btn ${
                  copiedCode === team._id ? "copied" : ""
                }`}
                onClick={() => copyToClipboard(team.teamCode, team._id)}
                aria-label="Copy team code"
              >
                {copiedCode === team._id ? (
                  <>
                    <Check size={16} />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="mt-stats">
            <div className="mt-stat-card">
              <Users size={24} className="mt-stat-icon" />
              <span className="mt-stat-label">Team Members</span>
              <span className="mt-stat-value">{team.numMembers} / 4</span>
            </div>

            <div className="mt-stat-card">
              <Calendar size={24} className="mt-stat-icon" />
              <span className="mt-stat-label">Created On</span>
              <span className="mt-stat-value">
                {formatDate(team.created_at)}
              </span>
            </div>
          </div>

          <div className="mt-section">
            <div className="mt-section-header">
              <span className="mt-section-title">Team Leader</span>
              <button className="mt-edit-btn" onClick={editLeader}>
                Edit Details
              </button>
            </div>

            <div className="mt-leader-block">
              <div className="mt-leader-head">
                <div className="mt-leader-name">
                  {team.leader?.firstname || ""}{" "}
                  {team.leader?.lastname || ""}
                </div>
                <div className="mt-leader-username">
                  @{team.leader?.GitHubID || team.teamleader_github}
                </div>
              </div>

              <div className="mt-leader-info">
                <div>
                  <strong>Email:</strong>
                  <span>{team.leader?.mail || team.teamleader_email}</span>
                </div>

                <div>
                  <strong>College:</strong>
                  <span>{team.leader?.college || "Not specified"}</span>
                </div>

                <div>
                  <strong>Degree:</strong>
                  <span>{team.leader?.degree || "Not specified"}</span>
                </div>

                <div>
                  <strong>Year:</strong>
                  <span>{team.leader?.YOS || "Not specified"}</span>
                </div>

                <div>
                  <strong>Phone:</strong>
                  <span>{team.leader?.mobile || "Not specified"}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-section">
            <div className="mt-section-header">
              <span className="mt-section-title">Team Members</span>
            </div>

            {team.members && team.members.length > 0 ? (
              team.members.map((member, idx) => (
                <div className="mt-member-card" key={idx}>
                  <div className="mt-member-head">
                    <div className="mt-member-name">
                      {member.firstname && member.lastname
                        ? `${member.firstname} ${member.lastname}`
                        : member.firstname ||
                          member.lastname ||
                          "Member"}
                    </div>
                    <div className="mt-member-username">
                      @{member.GitHubID || "username"}
                    </div>
                  </div>

                  <div className="mt-member-info">
					<div>
                      <strong>Email:</strong>
                      <span>{member.mail || "Not specified"}</span>
                    </div>
                    <div>
                      <strong>College:</strong>
                      <span>{member.college || "Not specified"}</span>
                    </div>
                    <div>
                      <strong>Degree:</strong>
                      <span>{member.degree || "Not specified"}</span>
                    </div>
                    <div>
                      <strong>Year:</strong>
                      <span>{member.YOS || "Not specified"}</span>
                    </div>
                    <div>
                      <strong>Phone:</strong>
                      <span>{member.mobile || "Not specified"}</span>
                    </div>
                  </div>

                  <button
                    className="mt-remove-btn"
                    onClick={() => removeMember(member.GitHubID)}
                    aria-label={`Remove ${member.firstname || "member"}`}
                  >
                    Remove Member
                  </button>
                </div>
              ))
            ) : (
              <div className="mt-empty">
                No team members yet. Share your team code to invite
                members!
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default ManageTeam;
