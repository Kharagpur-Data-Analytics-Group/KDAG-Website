import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ManageTeam.css";
import Particless from "../Common/Particles/Particless";
import { Copy, Check, Users, Calendar } from "lucide-react";

const ManageTeam = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedCode, setCopiedCode] = useState(null);

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

  const removeMember = async (memberId) => {
    toast.info(`Remove member functionality: ${memberId}`, {
      position: "bottom-right",
    });
    // Implement actual remove logic here
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
    <div className="mt-wrapper">
      <Particless />

      <div className="mt-header">
        <h1>Manage Your Team</h1>
        <p>View and manage your hackathon registration</p>
      </div>

      {teams.map((team) => (
        <div className="mt-card" key={team._id}>
          <div className="mt-title">{team.teamName}</div>

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
  );
};

export default ManageTeam;
