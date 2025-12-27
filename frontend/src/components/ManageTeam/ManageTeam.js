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

  const [deleteTargetTeam, setDeleteTargetTeam] = useState(null);
  const [deleteConfirmationInput, setDeleteConfirmationInput] = useState("");
  const [deleteError, setDeleteError] = useState("");

  const [removeTargetMember, setRemoveTargetMember] = useState(null);
  const [removeConfirmationInput, setRemoveConfirmationInput] = useState("");
  const [removeError, setRemoveError] = useState("");
  const [isRemovingMember, setIsRemovingMember] = useState(false);

  const [leaveTargetTeam, setLeaveTargetTeam] = useState(null);
  const [leaveConfirmationInput, setLeaveConfirmationInput] = useState("");
  const [leaveError, setLeaveError] = useState("");
  const [isLeavingTeam, setIsLeavingTeam] = useState(false);

  const [confirmTargetTeam, setConfirmTargetTeam] = useState(null);

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

      setTeams(teams.map(t =>
        t._id === team._id ? { ...t, teamName: editTeamName.trim() } : t
      ));

      handleCancelEdit();
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Updated: instead of immediate window.confirm, open modal to require typing team name
  const handleDeleteTeam = (team) => {
    setDeleteTargetTeam(team);
    setDeleteConfirmationInput("");
    setDeleteError("");
  };

  // Actual delete action after confirming input matches team name
  const confirmDeleteTeam = async () => {
    if (!deleteTargetTeam) return;

    const expected = deleteTargetTeam.teamName;
    if (deleteConfirmationInput !== expected) {
      setDeleteError(`Type "${expected}" exactly to confirm deletion.`);
      toast.error("Team name did not match. Deletion aborted.");
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
            teamCode: deleteTargetTeam.teamCode,
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to delete team");
      }

      toast.success("Team deleted successfully");

      // Update local state
      setTeams(teams.filter(t => t._id !== deleteTargetTeam._id));
      // Close modal
      setDeleteTargetTeam(null);
      setDeleteConfirmationInput("");
      setDeleteError("");
    } catch (error) {
      toast.error(error.message || "Failed to delete team");
      console.error("Delete error:", error);
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
        position: "top-center",
        autoClose: 2000,
      });
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (error) {
      toast.error("Failed to copy code");
      console.error("Copy error:", error);
    }
  };

  const handleConfirmTeam = async (team) => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        toast.error("You must be logged in");
        return;
      }

      const res = await fetch(
        `${process.env.REACT_APP_FETCH_URL}/kdsh/finalize_team`,
        {
          method: "PATCH",
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
        throw new Error(data.error || "Failed to finalize team");
      }

      toast.success("Team finalized successfully");
      // Refetch teams to update the finalized status
      fetchUserTeams();
      // Close modal
      setConfirmTargetTeam(null);
    } catch (error) {
      toast.error(error.message || "Failed to finalize team");
      console.error("Finalize team error:", error);
    }
  };

  const openConfirmTeamModal = (team) => {
    setConfirmTargetTeam(team);
  };

  // open remove-member modal (replace previous immediate confirm)
  const openRemoveMemberModal = (member, team) => {
    setRemoveTargetMember({ member, team });
    setRemoveConfirmationInput("");
    setRemoveError("");
  };

  // actual remove action after typing member name exactly
  const confirmRemoveMember = async () => {
    if (!removeTargetMember) return;

    const { member, team } = removeTargetMember;
    const expectedName =
      member.firstname && member.lastname
        ? `${member.firstname} ${member.lastname}`
        : member.firstname || member.lastname || "Member";

    if (removeConfirmationInput !== expectedName) {
      setRemoveError(`Type "${expectedName}" exactly to confirm removal.`);
      toast.error("Member name did not match. Removal aborted.");
      return;
    }

    setIsRemovingMember(true);
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        toast.error("You must be logged in");
        return;
      }

      const res = await fetch(
        `${process.env.REACT_APP_FETCH_URL}/kdsh/remove_member`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            GitHubID: member.GitHubID,
            teamCode: team.teamCode,
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to remove member");

      toast.success("Member removed successfully");

      // update local state to reflect removal without full refetch
      setTeams((prev) =>
        prev.map((t) =>
          t._id === team._id
            ? {
              ...t,
              members: (t.members || []).filter(
                (m) => m.GitHubID !== member.GitHubID
              ),
              numMembers: Math.max(0, (t.numMembers || 1) - 1),
            }
            : t
        )
      );

      setRemoveTargetMember(null);
      setRemoveConfirmationInput("");
      setRemoveError("");
    } catch (err) {
      toast.error(err.message || "Something went wrong");
      console.error("Remove member error:", err);
    } finally {
      setIsRemovingMember(false);
    }
  };

  const editLeader = () => {
    toast.info("Edit team leader details coming soon!", {
      position: "top-center",
    });
    // Implement edit leader functionality
  };

  const handleLeaveTeam = (team) => {
    setLeaveTargetTeam(team);
    setLeaveConfirmationInput("");
    setLeaveError("");
  };

  const confirmLeaveTeam = async () => {
    if (!leaveTargetTeam) return;

    const expected = leaveTargetTeam.teamName;
    if (leaveConfirmationInput !== expected) {
      setLeaveError(`Type "${expected}" exactly to confirm leaving the team.`);
      toast.error("Team name did not match. Leaving team aborted.");
      return;
    }

    setIsLeavingTeam(true);
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        toast.error("You must be logged in");
        return;
      }

      const res = await fetch(
        `${process.env.REACT_APP_FETCH_URL}/kdsh/leave_team`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            teamCode: leaveTargetTeam.teamCode,
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to leave team");
      }

      toast.success(data.message || "You have successfully left the team");

      // Refresh teams list
      await fetchUserTeams();

      // Close modal
      setLeaveTargetTeam(null);
      setLeaveConfirmationInput("");
      setLeaveError("");
    } catch (error) {
      toast.error(error.message || "Failed to leave team");
      console.error("Leave team error:", error);
    } finally {
      setIsLeavingTeam(false);
    }
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
            Register for KDSH
          </a>
        </div>
      </div>
    );
  }

  // Check if user is a team leader for any team
  const isTeamLeader = teams.some(team => team.isLeader);

  return (
    <>
      <div className="mt-wrapper">
        <Particless />

        <div className="mt-header">
          <h1>{isTeamLeader ? "Manage Your Team" : "View Your Team"}</h1>
          <p>{isTeamLeader ? "View and manage your hackathon registration" : "View your hackathon registration"}</p>
        </div>

        {teams.map((team) => (
          <div className="mt-card" key={team._id}>
            <div className="important-note2">
              {team.is_team_finalized ? (
                <strong>Your team has been finalized and will reflect on Unstop within 24 hours.</strong>
              ) : (
                <><strong>Important:</strong> After all members have joined, Team Leader must finalize the team. Your team will only be registered on Unstop after finalization.</>
              )}
            </div>
            {editingTeamId === team._id ? (
              <div className="mt-edit-container" style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '20px' }}>
                <input
                  type="text"
                  value={editTeamName}
                  onChange={(e) => setEditTeamName(e.target.value)}
                  className="mt-edit-input"
                  style={{

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
              <div className="mt-title-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '50px' }}>
                <div className="mt-title">{team.teamName}</div>
                {team.isLeader && !team.is_team_finalized && (
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
                )}
              </div>
            )}

            <div className="mt-code-section">
              <label className="mt-code-label">Team Code</label>
              <div className="mt-code-box">
                <div className="mt-code">{team.teamCode}</div>
                <button
                  className={`mt-copy-btn ${copiedCode === team._id ? "copied" : ""
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
              {/* <div className="mt-section-header">
                <span className="mt-section-title">Team Leader</span>
                <button className="mt-edit-btn" onClick={editLeader}>
                  Edit Details
                </button>
              </div> */}

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

                    {team.isLeader && !team.is_team_finalized && (
                      <button
                        className="mt-remove-btn"
                        onClick={() => openRemoveMemberModal(member, team)}
                        aria-label={`Remove ${member.firstname || "member"}`}
                      >
                        Remove Member
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <div className="mt-empty">
                  No team members yet. Share your team code to invite
                  members!
                </div>
              )}
            </div>

            {!team.isLeader && (
              <div style={{ marginTop: "30px", display: "flex", justifyContent: "center" }}>
                <button
                  className="mt-leave-btn"
                  onClick={() => handleLeaveTeam(team)}
                  style={{
                    background: "rgba(239, 68, 68, 0.1)",
                    border: "1px solid rgba(239, 68, 68, 0.5)",
                    color: "#ef4444",
                    padding: "12px 24px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: "600",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "rgba(239, 68, 68, 0.2)";
                    e.target.style.borderColor = "rgba(239, 68, 68, 0.7)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "rgba(239, 68, 68, 0.1)";
                    e.target.style.borderColor = "rgba(239, 68, 68, 0.5)";
                  }}
                >
                  Leave Team
                </button>
              </div>
            )}

            {!team.is_team_finalized && team.isLeader && (
              <div style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
                <button
                  className="register-form-submit"
                  type="button"
                  style={{ minWidth: "", margin: "0 auto" }}
                  onClick={() => openConfirmTeamModal(team)}
                >
                  <p>Finalize Team</p>
                </button>
              </div>
            )}
          </div>
        ))}

        {/* Delete confirmation modal */}
        {deleteTargetTeam && (
          <div
            className="mt-modal-overlay"
            role="dialog"
            aria-modal="true"
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setDeleteTargetTeam(null);
                setDeleteConfirmationInput("");
                setDeleteError("");
              }
            }}
          >
            <div className="mt-modal" role="document" aria-labelledby="mt-modal-title">
              <h3 id="mt-modal-title">Confirm Team Deletion</h3>
              <p>
                This action cannot be undone. To confirm, type{" "}
                <strong>"{deleteTargetTeam.teamName}"</strong> in the box below
                and press Delete.
              </p>

              <input
                className="mt-modal-input"
                type="text"
                value={deleteConfirmationInput}
                onChange={(e) => {
                  setDeleteConfirmationInput(e.target.value);
                  if (deleteError) setDeleteError("");
                }}
                placeholder={`Write "${deleteTargetTeam.teamName}" to delete Team`}
                aria-label={`Type ${deleteTargetTeam.teamName} to confirm deletion`}
              />
              {deleteError && (
                <div className="mt-modal-error">
                  {deleteError}
                </div>
              )}

              <div className="mt-modal-actions">
                <button
                  type="button"
                  className="mt-modal-btn cancel"
                  onClick={() => {
                    setDeleteTargetTeam(null);
                    setDeleteConfirmationInput("");
                    setDeleteError("");
                  }}
                  disabled={isDeleting}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="mt-modal-btn delete"
                  onClick={confirmDeleteTeam}
                  disabled={isDeleting || deleteConfirmationInput !== deleteTargetTeam.teamName}
                  title={`Type "${deleteTargetTeam.teamName}" to enable deletion`}
                >
                  {isDeleting ? "Deleting..." : "Delete Team"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Remove member confirmation modal */}
        {removeTargetMember && (
          <div
            className="mt-modal-overlay"
            role="dialog"
            aria-modal="true"
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setRemoveTargetMember(null);
                setRemoveConfirmationInput("");
                setRemoveError("");
              }
            }}
          >
            <div className="mt-modal" role="document" aria-labelledby="mt-remove-modal-title">
              <h3 id="mt-remove-modal-title">Confirm Remove Member</h3>
              <p>
                This will remove the member from your team. To confirm, type{" "}
                <strong>
                  "{removeTargetMember.member.firstname && removeTargetMember.member.lastname
                    ? `${removeTargetMember.member.firstname} ${removeTargetMember.member.lastname}`
                    : removeTargetMember.member.firstname || removeTargetMember.member.lastname || "Member"}
                  "</strong>{" "}
                below and press Delete.
              </p>

              <input
                className="mt-modal-input"
                type="text"
                value={removeConfirmationInput}
                onChange={(e) => {
                  setRemoveConfirmationInput(e.target.value);
                  if (removeError) setRemoveError("");
                }}
                placeholder={`Write the member's name to confirm removal`}
                aria-label={`Type member name to confirm removal`}
              />
              {removeError && <div className="mt-modal-error">{removeError}</div>}

              <div className="mt-modal-actions">
                <button
                  type="button"
                  className="mt-modal-btn cancel"
                  onClick={() => {
                    setRemoveTargetMember(null);
                    setRemoveConfirmationInput("");
                    setRemoveError("");
                  }}
                  disabled={isRemovingMember}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="mt-modal-btn delete"
                  onClick={confirmRemoveMember}
                  disabled={
                    isRemovingMember ||
                    !removeTargetMember ||
                    removeConfirmationInput !==
                    (removeTargetMember.member.firstname && removeTargetMember.member.lastname
                      ? `${removeTargetMember.member.firstname} ${removeTargetMember.member.lastname}`
                      : removeTargetMember.member.firstname || removeTargetMember.member.lastname || "Member")
                  }
                  title={`Type member full name to enable deletion`}
                >
                  {isRemovingMember ? "Removing..." : "Delete Member"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Leave team confirmation modal */}
        {leaveTargetTeam && (
          <div
            className="mt-modal-overlay"
            role="dialog"
            aria-modal="true"
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setLeaveTargetTeam(null);
                setLeaveConfirmationInput("");
                setLeaveError("");
              }
            }}
          >
            <div className="mt-modal" role="document" aria-labelledby="mt-leave-modal-title">
              <h3 id="mt-leave-modal-title">Confirm Leave Team</h3>
              <p>
                This action cannot be undone. You will be removed from the team and will need to join another team to participate. To confirm, type{" "}
                <strong>"{leaveTargetTeam.teamName}"</strong> in the box below
                and press Leave Team.
              </p>

              <input
                className="mt-modal-input"
                type="text"
                value={leaveConfirmationInput}
                onChange={(e) => {
                  setLeaveConfirmationInput(e.target.value);
                  if (leaveError) setLeaveError("");
                }}
                placeholder={`Write "${leaveTargetTeam.teamName}" to leave team`}
                aria-label={`Type ${leaveTargetTeam.teamName} to confirm leaving team`}
              />
              {leaveError && (
                <div className="mt-modal-error">
                  {leaveError}
                </div>
              )}

              <div className="mt-modal-actions">
                <button
                  type="button"
                  className="mt-modal-btn cancel"
                  onClick={() => {
                    setLeaveTargetTeam(null);
                    setLeaveConfirmationInput("");
                    setLeaveError("");
                  }}
                  disabled={isLeavingTeam}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="mt-modal-btn delete"
                  onClick={confirmLeaveTeam}
                  disabled={isLeavingTeam || leaveConfirmationInput !== leaveTargetTeam.teamName}
                  title={`Type "${leaveTargetTeam.teamName}" to enable leaving team`}
                >
                  {isLeavingTeam ? "Leaving..." : "Leave Team"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Confirm team modal */}
        {confirmTargetTeam && (
          <div
            className="mt-modal-overlay"
            role="dialog"
            aria-modal="true"
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setConfirmTargetTeam(null);
              }
            }}
          >
            <div className="mt-modal" role="document" aria-labelledby="mt-confirm-modal-title">
              <h3 id="mt-confirm-modal-title">Confirm Team Finalization</h3>
              <p>
                <strong>Warning:</strong> This will LOCK your registration and this action can't be undone. You cannot Add/Delete any Team Members after confirming.
              </p>

              <div className="mt-modal-actions">
                <button
                  type="button"
                  className="mt-modal-btn cancel"
                  onClick={() => setConfirmTargetTeam(null)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="mt-modal-btn confirm"
                  onClick={() => handleConfirmTeam(confirmTargetTeam)}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ManageTeam;
