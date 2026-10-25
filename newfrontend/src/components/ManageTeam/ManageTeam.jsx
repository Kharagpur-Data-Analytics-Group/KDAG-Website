import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
        `${process.env.VITE_FETCH_URL}/kdsh/edit_team_details`,
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
        `${process.env.VITE_FETCH_URL}/kdsh/delete_team`,
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
        `${process.env.VITE_FETCH_URL}/kdsh/get_user_teams`,
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
        `${process.env.VITE_FETCH_URL}/kdsh/finalize_team`,
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
        `${process.env.VITE_FETCH_URL}/kdsh/remove_member`,
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
        `${process.env.VITE_FETCH_URL}/kdsh/leave_team`,
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
      <div className="min-h-screen px-6 pt-[140px] pb-20 max-w-[1100px] mx-auto text-white relative">
        <style>{mtStyles}</style>
        <Particless />
        <div className="mt-center-box bg-[rgba(18,18,26,0.9)] border border-[rgba(59,130,246,0.15)] rounded-3xl px-10 py-[60px] text-center shadow-[0_0_40px_rgba(59,130,246,0.15)]">
          <h2 className="text-[1.8rem] mb-3 font-bold">Authentication Required</h2>
          <p className="text-white/70 mb-8 text-[1.05rem]">
            Please log in to view and manage your team
          </p>
          <a href="/auth" className="mt-primary-btn inline-block px-8 py-3.5 text-white no-underline rounded-xl font-semibold text-base shadow-[0_4px_20px_rgba(59,130,246,0.3)]">
            Login to Continue
          </a>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen px-6 pt-[140px] pb-20 max-w-[1100px] mx-auto text-white relative">
        <style>{mtStyles}</style>
        <Particless />
        <div className="mt-center-box bg-[rgba(18,18,26,0.9)] border border-[rgba(59,130,246,0.15)] rounded-3xl px-10 py-[60px] text-center shadow-[0_0_40px_rgba(59,130,246,0.15)]">
          <div className="mt-loader w-[50px] h-[50px] border-4 border-white/[0.06] rounded-full mx-auto mb-5"></div>
          <h2 className="text-[1.8rem] mb-3 font-bold">Loading Your Teams...</h2>
          <p className="text-white/70 mb-8 text-[1.05rem]">Please wait while we fetch your data</p>
        </div>
      </div>
    );
  }

  if (teams.length === 0) {
    return (
      <div className="min-h-screen px-6 pt-[140px] pb-20 max-w-[1100px] mx-auto text-white relative">
        <style>{mtStyles}</style>
        <Particless />
        <div className="mt-header text-center mb-[60px]">
          <h1 className="text-[clamp(2.2rem,5vw,3.5rem)] font-extrabold mb-3 tracking-[-0.02em] bg-gradient-to-br from-white to-[#3b82f6] bg-clip-text text-transparent">Manage Your Team</h1>
          <p className="text-[1.1rem] text-white/70 font-normal">View and manage your hackathon registration</p>
        </div>
        <div className="mt-center-box bg-[rgba(18,18,26,0.9)] border border-[rgba(59,130,246,0.15)] rounded-3xl px-10 py-[60px] text-center shadow-[0_0_40px_rgba(59,130,246,0.15)]">
          <h2 className="text-[1.8rem] mb-3 font-bold">No Team Found</h2>
          <p className="text-white/70 mb-8 text-[1.05rem]">
            Create your team and start your hackathon journey today!
          </p>
          <a href="/register-kdsh" className="mt-primary-btn inline-block px-8 py-3.5 text-white no-underline rounded-xl font-semibold text-base shadow-[0_4px_20px_rgba(59,130,246,0.3)]">
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
      <div className="mt-wrapper min-h-screen px-6 pt-[140px] pb-20 max-w-[1100px] mx-auto text-white relative">
        <style>{mtStyles}</style>
        <Particless />

        <div className="mt-header text-center mb-[60px]">
          <h1 className="text-[clamp(2.2rem,5vw,3.5rem)] font-extrabold mb-3 tracking-[-0.02em] bg-gradient-to-br from-white to-[#3b82f6] bg-clip-text text-transparent">{isTeamLeader ? "Manage Your Team" : "View Your Team"}</h1>
          <p className="text-[1.1rem] text-white/70 font-normal">{isTeamLeader ? "View and manage your hackathon registration" : "View your hackathon registration"}</p>
        </div>

        {teams.map((team) => (
          <div className="mt-card bg-[rgba(18,18,26,0.9)] border border-[rgba(59,130,246,0.15)] rounded-[28px] px-10 pb-10 pt-0 mb-8 shadow-[0_0_40px_rgba(59,130,246,0.15)] transition-all duration-[400ms] relative overflow-hidden" key={team._id}>
            <div className="important-note2 text-white text-sm mb-[30px] text-center leading-[1.5] p-2.5 bg-white/5 rounded-lg border border-white/10">
              {team.is_team_finalized ? (
                <strong>Your team has been finalized and will reflect on Unstop within 24 hours.</strong>
              ) : (
                <><strong>Important:</strong> After all members have joined, Team Leader must finalize the team. Your team will only be registered on Unstop after finalization.</>
              )}
            </div>
            {editingTeamId === team._id ? (
              <div className="mt-edit-container flex gap-2.5 items-center mb-5">
                <input
                  type="text"
                  value={editTeamName}
                  onChange={(e) => setEditTeamName(e.target.value)}
                  className="mt-edit-input px-3 py-2 border border-[#333] rounded-md bg-[rgba(25,25,35,0.6)] text-white text-lg flex-1 h-10"
                />
                <button
                  onClick={() => handleSaveTeamName(team)}
                  className="mt-action-btn save bg-transparent border-none cursor-pointer text-[#4ade80]"
                  title="Save"
                >
                  <Save size={24} />
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="mt-action-btn cancel bg-transparent border-none cursor-pointer text-[#f87171]"
                  title="Cancel"
                >
                  <X size={24} />
                </button>
              </div>
            ) : (
              <div className="mt-title-container flex justify-between items-center h-[50px]">
                <div className="mt-title text-[2.2rem] font-extrabold mb-[25px] tracking-[-0.01em] bg-gradient-to-br from-white to-[#a5b4fc] bg-clip-text text-transparent">{team.teamName}</div>
                {team.isLeader && !team.is_team_finalized && (
                  <div className="mt-actions flex gap-2.5">
                    <button
                      onClick={() => handleEditClick(team)}
                      className="mt-action-btn edit bg-transparent border-none cursor-pointer text-[#60a5fa]"
                      title="Edit Team Name"
                    >
                      <Edit2 size={20} />
                    </button>
                    <button
                      onClick={() => handleDeleteTeam(team)}
                      className="mt-action-btn delete bg-transparent border-none cursor-pointer text-[#f87171]"
                      title="Delete Team"
                      disabled={isDeleting}
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                )}
              </div>
            )}

            <div className="mt-code-section bg-[rgba(25,25,35,0.6)] border border-white/[0.06] rounded-[18px] p-6 mb-7 backdrop-blur-[10px] transition-all duration-300 hover:bg-[rgba(25,25,35,0.75)] hover:border-[rgba(59,130,246,0.15)]">
              <label className="mt-code-label block text-[0.7rem] uppercase tracking-[2px] text-white/50 font-semibold mb-3">Team Code</label>
              <div className="mt-code-box flex justify-between items-center gap-4">
                <div className="mt-code text-[1.6rem] font-bold tracking-[4px] font-['Courier_New',monospace] text-[#3b82f6] flex-1">{team.teamCode}</div>
                <button
                  className={`mt-copy-btn flex items-center gap-2 px-[18px] py-2.5 rounded-xl border whitespace-nowrap font-semibold text-[0.9rem] transition-all duration-300 ${
                    copiedCode === team._id
                      ? "bg-[rgba(16,185,129,0.15)] border-[#10b981] text-[#10b981]"
                      : "bg-[rgba(35,35,50,0.4)] border-[rgba(59,130,246,0.15)] text-white hover:bg-[rgba(59,130,246,0.15)] hover:border-[#3b82f6] hover:-translate-y-px"
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

            <div className="mt-stats grid gap-5 mb-8" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
              <div className="mt-stat-card bg-[rgba(25,25,35,0.6)] border border-white/[0.06] rounded-[18px] p-6 flex flex-col gap-2 transition-all duration-300 relative overflow-hidden hover:bg-[rgba(25,25,35,0.8)] hover:border-[rgba(59,130,246,0.15)]">
                <Users size={24} className="mt-stat-icon text-[#3b82f6] mb-1" />
                <span className="mt-stat-label uppercase text-xs tracking-[1.5px] text-white/50 font-semibold">Team Members</span>
                <span className="mt-stat-value text-[1.8rem] font-extrabold text-white tracking-[-0.01em]">{team.numMembers} / 4</span>
              </div>

              <div className="mt-stat-card bg-[rgba(25,25,35,0.6)] border border-white/[0.06] rounded-[18px] p-6 flex flex-col gap-2 transition-all duration-300 relative overflow-hidden hover:bg-[rgba(25,25,35,0.8)] hover:border-[rgba(59,130,246,0.15)]">
                <Calendar size={24} className="mt-stat-icon text-[#3b82f6] mb-1" />
                <span className="mt-stat-label uppercase text-xs tracking-[1.5px] text-white/50 font-semibold">Created On</span>
                <span className="mt-stat-value text-[1.8rem] font-extrabold text-white tracking-[-0.01em]">
                  {formatDate(team.created_at)}
                </span>
              </div>
            </div>

            <div className="mt-section mt-8">
              <div className="mt-leader-block bg-[rgba(25,25,35,0.6)] border border-white/[0.06] rounded-2xl p-[22px] transition-all duration-300 hover:bg-[rgba(25,25,35,0.8)] hover:border-[rgba(59,130,246,0.15)]">
                <div className="mt-leader-head flex justify-between items-center mb-[14px] pb-3 border-b border-white/[0.06]">
                  <div className="mt-leader-name text-[1.2rem] font-bold text-white">
                    {team.leader?.firstname || ""}{" "}
                    {team.leader?.lastname || ""}
                  </div>
                  <div className="mt-leader-username text-[#3b82f6] font-semibold text-[0.9rem]">
                    @{team.leader?.GitHubID || team.teamleader_github}
                  </div>
                </div>

                <div className="mt-leader-info grid grid-cols-2 gap-3 text-[0.95rem] text-white/70 max-[480px]:grid-cols-1">
                  <div className="flex gap-1.5 max-[480px]:flex-col max-[480px]:items-start max-[480px]:gap-1">
                    <strong className="text-white/50 font-semibold min-w-[70px]">Email:</strong>
                    <span>{team.leader?.mail || team.teamleader_email}</span>
                  </div>

                  <div className="flex gap-1.5 max-[480px]:flex-col max-[480px]:items-start max-[480px]:gap-1">
                    <strong className="text-white/50 font-semibold min-w-[70px]">College:</strong>
                    <span>{team.leader?.college || "Not specified"}</span>
                  </div>

                  <div className="flex gap-1.5 max-[480px]:flex-col max-[480px]:items-start max-[480px]:gap-1">
                    <strong className="text-white/50 font-semibold min-w-[70px]">Degree:</strong>
                    <span>{team.leader?.degree || "Not specified"}</span>
                  </div>

                  <div className="flex gap-1.5 max-[480px]:flex-col max-[480px]:items-start max-[480px]:gap-1">
                    <strong className="text-white/50 font-semibold min-w-[70px]">Year:</strong>
                    <span>{team.leader?.YOS || "Not specified"}</span>
                  </div>

                  <div className="flex gap-1.5 max-[480px]:flex-col max-[480px]:items-start max-[480px]:gap-1">
                    <strong className="text-white/50 font-semibold min-w-[70px]">Phone:</strong>
                    <span>{team.leader?.mobile || "Not specified"}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-section mt-8">
              <div className="mt-section-header flex justify-between items-center mb-4 pb-3 border-b border-white/[0.06] max-[768px]:flex-col max-[768px]:items-start max-[768px]:gap-3">
                <span className="mt-section-title uppercase text-[0.8rem] tracking-[2px] text-white/70 font-bold">Team Members</span>
              </div>

              {team.members && team.members.length > 0 ? (
                team.members.map((member, idx) => (
                  <div className="mt-member-card bg-[rgba(25,25,35,0.6)] border border-white/[0.06] rounded-2xl p-[22px] mb-4 transition-all duration-300 relative hover:bg-[rgba(25,25,35,0.8)] hover:border-[rgba(59,130,246,0.15)]" key={idx}>
                    <div className="mt-member-head flex justify-between items-center mb-[14px] pb-3 border-b border-white/[0.06] max-[768px]:flex-col max-[768px]:items-start max-[768px]:gap-1.5">
                      <div className="mt-member-name text-[1.2rem] font-bold text-white">
                        {member.firstname && member.lastname
                          ? `${member.firstname} ${member.lastname}`
                          : member.firstname ||
                          member.lastname ||
                          "Member"}
                      </div>
                      <div className="mt-member-username text-[#3b82f6] font-semibold text-[0.9rem]">
                        @{member.GitHubID || "username"}
                      </div>
                    </div>

                    <div className="mt-member-info grid grid-cols-2 gap-3 text-[0.95rem] text-white/70 mb-[14px] max-[768px]:grid-cols-1">
                      <div className="flex gap-1.5 max-[480px]:flex-col max-[480px]:items-start max-[480px]:gap-1">
                        <strong className="text-white/50 font-semibold min-w-[70px]">Email:</strong>
                        <span>{member.mail || "Not specified"}</span>
                      </div>
                      <div className="flex gap-1.5 max-[480px]:flex-col max-[480px]:items-start max-[480px]:gap-1">
                        <strong className="text-white/50 font-semibold min-w-[70px]">College:</strong>
                        <span>{member.college || "Not specified"}</span>
                      </div>
                      <div className="flex gap-1.5 max-[480px]:flex-col max-[480px]:items-start max-[480px]:gap-1">
                        <strong className="text-white/50 font-semibold min-w-[70px]">Degree:</strong>
                        <span>{member.degree || "Not specified"}</span>
                      </div>
                      <div className="flex gap-1.5 max-[480px]:flex-col max-[480px]:items-start max-[480px]:gap-1">
                        <strong className="text-white/50 font-semibold min-w-[70px]">Year:</strong>
                        <span>{member.YOS || "Not specified"}</span>
                      </div>
                      <div className="flex gap-1.5 max-[480px]:flex-col max-[480px]:items-start max-[480px]:gap-1">
                        <strong className="text-white/50 font-semibold min-w-[70px]">Phone:</strong>
                        <span>{member.mobile || "Not specified"}</span>
                      </div>
                    </div>

                    {team.isLeader && !team.is_team_finalized && (
                      <button
                        className="mt-remove-btn px-4 py-2 rounded-[10px] border border-[rgba(239,68,68,0.3)] text-[#ef4444] bg-[rgba(239,68,68,0.1)] cursor-pointer font-semibold text-[0.85rem] transition-all duration-300 hover:bg-[rgba(239,68,68,0.2)] hover:border-[#ef4444] hover:-translate-y-px"
                        onClick={() => openRemoveMemberModal(member, team)}
                        aria-label={`Remove ${member.firstname || "member"}`}
                      >
                        Remove Member
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <div className="mt-empty text-white/50 text-center p-8 text-base">
                  No team members yet. Share your team code to invite
                  members!
                </div>
              )}
            </div>

            {!team.isLeader && !team.is_team_finalized && (
              <div className="mt-[30px] flex justify-center">
                <button
                  className="mt-leave-btn font-semibold text-base rounded-lg px-6 py-3 cursor-pointer transition-all duration-300"
                  onClick={() => handleLeaveTeam(team)}
                  style={{
                    background: "rgba(239, 68, 68, 0.1)",
                    border: "1px solid rgba(239, 68, 68, 0.5)",
                    color: "#ef4444",
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
              <div className="mt-5 flex justify-center">
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
            className="mt-modal-overlay fixed inset-0 bg-[rgba(2,6,23,0.6)] flex items-center justify-center z-[9999] p-7"
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
            <div className="mt-modal w-[min(560px,100%)] rounded-[20px] p-[22px] text-white border border-[rgba(59,130,246,0.15)] shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-[10px] relative overflow-hidden" role="document" aria-labelledby="mt-modal-title">
              <h3 id="mt-modal-title" className="m-0 mb-2 text-[1.25rem] font-extrabold text-white">Confirm Team Deletion</h3>
              <p className="text-white/70 mb-3 leading-[1.4]">
                This action cannot be undone. To confirm, type{" "}
                <strong>"{deleteTargetTeam.teamName}"</strong> in the box below
                and press Delete.
              </p>

              <input
                className="mt-modal-input w-full px-3 py-2.5 rounded-lg border border-white/[0.06] bg-[rgba(15,15,15,0.45)] text-white outline-none text-[0.98rem] placeholder:text-white/35 focus:border-[rgba(59,130,246,0.22)] focus:shadow-[0_6px_24px_rgba(59,130,246,0.06)]"
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
                <div className="mt-modal-error text-[#fecaca] mt-2 text-[0.95rem]">
                  {deleteError}
                </div>
              )}

              <div className="mt-modal-actions flex gap-2.5 justify-end mt-[14px]">
                <button
                  type="button"
                  className="mt-modal-btn cancel px-[14px] py-[9px] rounded-[10px] font-bold cursor-pointer text-[0.95rem] border border-white/[0.06] bg-transparent text-white transition-transform duration-[120ms] disabled:opacity-60 disabled:cursor-not-allowed hover:enabled:-translate-y-0.5 hover:enabled:shadow-[0_6px_18px_rgba(0,0,0,0.45)]"
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
                  className="mt-modal-btn delete px-[14px] py-[9px] rounded-[10px] font-bold cursor-pointer text-[0.95rem] border-none text-white bg-gradient-to-br from-[#ef4444] to-[rgba(239,68,68,0.9)] shadow-[0_6px_18px_rgba(239,68,68,0.12)] transition-transform duration-[120ms] disabled:opacity-60 disabled:cursor-not-allowed hover:enabled:-translate-y-0.5 hover:enabled:shadow-[0_10px_28px_rgba(239,68,68,0.18)]"
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
            className="mt-modal-overlay fixed inset-0 bg-[rgba(2,6,23,0.6)] flex items-center justify-center z-[9999] p-7"
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
            <div className="mt-modal w-[min(560px,100%)] rounded-[20px] p-[22px] text-white border border-[rgba(59,130,246,0.15)] shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-[10px] relative overflow-hidden" role="document" aria-labelledby="mt-remove-modal-title">
              <h3 id="mt-remove-modal-title" className="m-0 mb-2 text-[1.25rem] font-extrabold text-white">Confirm Remove Member</h3>
              <p className="text-white/70 mb-3 leading-[1.4]">
                This will remove the member from your team. To confirm, type{" "}
                <strong>
                  "{removeTargetMember.member.firstname && removeTargetMember.member.lastname
                    ? `${removeTargetMember.member.firstname} ${removeTargetMember.member.lastname}`
                    : removeTargetMember.member.firstname || removeTargetMember.member.lastname || "Member"}
                  "</strong>{" "}
                below and press Delete.
              </p>

              <input
                className="mt-modal-input w-full px-3 py-2.5 rounded-lg border border-white/[0.06] bg-[rgba(15,15,15,0.45)] text-white outline-none text-[0.98rem] placeholder:text-white/35 focus:border-[rgba(59,130,246,0.22)] focus:shadow-[0_6px_24px_rgba(59,130,246,0.06)]"
                type="text"
                value={removeConfirmationInput}
                onChange={(e) => {
                  setRemoveConfirmationInput(e.target.value);
                  if (removeError) setRemoveError("");
                }}
                placeholder={`Write the member's name to confirm removal`}
                aria-label={`Type member name to confirm removal`}
              />
              {removeError && <div className="mt-modal-error text-[#fecaca] mt-2 text-[0.95rem]">{removeError}</div>}

              <div className="mt-modal-actions flex gap-2.5 justify-end mt-[14px]">
                <button
                  type="button"
                  className="mt-modal-btn cancel px-[14px] py-[9px] rounded-[10px] font-bold cursor-pointer text-[0.95rem] border border-white/[0.06] bg-transparent text-white transition-transform duration-[120ms] disabled:opacity-60 disabled:cursor-not-allowed hover:enabled:-translate-y-0.5 hover:enabled:shadow-[0_6px_18px_rgba(0,0,0,0.45)]"
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
                  className="mt-modal-btn delete px-[14px] py-[9px] rounded-[10px] font-bold cursor-pointer text-[0.95rem] border-none text-white bg-gradient-to-br from-[#ef4444] to-[rgba(239,68,68,0.9)] shadow-[0_6px_18px_rgba(239,68,68,0.12)] transition-transform duration-[120ms] disabled:opacity-60 disabled:cursor-not-allowed hover:enabled:-translate-y-0.5 hover:enabled:shadow-[0_10px_28px_rgba(239,68,68,0.18)]"
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
            className="mt-modal-overlay fixed inset-0 bg-[rgba(2,6,23,0.6)] flex items-center justify-center z-[9999] p-7"
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
            <div className="mt-modal w-[min(560px,100%)] rounded-[20px] p-[22px] text-white border border-[rgba(59,130,246,0.15)] shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-[10px] relative overflow-hidden" role="document" aria-labelledby="mt-leave-modal-title">
              <h3 id="mt-leave-modal-title" className="m-0 mb-2 text-[1.25rem] font-extrabold text-white">Confirm Leave Team</h3>
              <p className="text-white/70 mb-3 leading-[1.4]">
                This action cannot be undone. You will be removed from the team and will need to join another team to participate. To confirm, type{" "}
                <strong>"{leaveTargetTeam.teamName}"</strong> in the box below
                and press Leave Team.
              </p>

              <input
                className="mt-modal-input w-full px-3 py-2.5 rounded-lg border border-white/[0.06] bg-[rgba(15,15,15,0.45)] text-white outline-none text-[0.98rem] placeholder:text-white/35 focus:border-[rgba(59,130,246,0.22)] focus:shadow-[0_6px_24px_rgba(59,130,246,0.06)]"
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
                <div className="mt-modal-error text-[#fecaca] mt-2 text-[0.95rem]">
                  {leaveError}
                </div>
              )}

              <div className="mt-modal-actions flex gap-2.5 justify-end mt-[14px]">
                <button
                  type="button"
                  className="mt-modal-btn cancel px-[14px] py-[9px] rounded-[10px] font-bold cursor-pointer text-[0.95rem] border border-white/[0.06] bg-transparent text-white transition-transform duration-[120ms] disabled:opacity-60 disabled:cursor-not-allowed hover:enabled:-translate-y-0.5 hover:enabled:shadow-[0_6px_18px_rgba(0,0,0,0.45)]"
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
                  className="mt-modal-btn delete px-[14px] py-[9px] rounded-[10px] font-bold cursor-pointer text-[0.95rem] border-none text-white bg-gradient-to-br from-[#ef4444] to-[rgba(239,68,68,0.9)] shadow-[0_6px_18px_rgba(239,68,68,0.12)] transition-transform duration-[120ms] disabled:opacity-60 disabled:cursor-not-allowed hover:enabled:-translate-y-0.5 hover:enabled:shadow-[0_10px_28px_rgba(239,68,68,0.18)]"
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
            className="mt-modal-overlay fixed inset-0 bg-[rgba(2,6,23,0.6)] flex items-center justify-center z-[9999] p-7"
            role="dialog"
            aria-modal="true"
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setConfirmTargetTeam(null);
              }
            }}
          >
            <div className="mt-modal w-[min(560px,100%)] rounded-[20px] p-[22px] text-white border border-[rgba(59,130,246,0.15)] shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-[10px] relative overflow-hidden" role="document" aria-labelledby="mt-confirm-modal-title">
              <h3 id="mt-confirm-modal-title" className="m-0 mb-2 text-[1.25rem] font-extrabold text-white">Confirm Team Finalization</h3>
              <p className="text-white/70 mb-3 leading-[1.4]">
                <strong>Warning:</strong> This will LOCK your registration and this action can't be undone. You cannot Add/Delete any Team Members after confirming.
              </p>

              <div className="mt-modal-actions flex gap-2.5 justify-end mt-[14px]">
                <button
                  type="button"
                  className="mt-modal-btn cancel px-[14px] py-[9px] rounded-[10px] font-bold cursor-pointer text-[0.95rem] border border-white/[0.06] bg-transparent text-white transition-transform duration-[120ms] hover:-translate-y-0.5 hover:shadow-[0_6px_18px_rgba(0,0,0,0.45)]"
                  onClick={() => setConfirmTargetTeam(null)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="mt-modal-btn confirm px-[14px] py-[9px] rounded-[10px] font-bold cursor-pointer text-[0.95rem] border border-white/[0.06] text-white"
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


const mtStyles = `
  :root {
    --bg-primary: #0a0a0f;
    --bg-card: rgba(18, 18, 26, 0.9);
    --bg-secondary: rgba(25, 25, 35, 0.6);
    --bg-tertiary: rgba(35, 35, 50, 0.4);
    --border-primary: rgba(59, 130, 246, 0.15);
    --border-secondary: rgba(255, 255, 255, 0.06);
    --accent-primary: #3b82f6;
    --accent-secondary: #60a5fa;
    --accent-success: #10b981;
    --accent-danger: #ef4444;
    --text-primary: #ffffff;
    --text-secondary: rgba(255, 255, 255, 0.7);
    --text-tertiary: rgba(255, 255, 255, 0.5);
    --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.3);
    --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.4);
    --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.5);
    --shadow-glow: 0 0 40px rgba(59, 130, 246, 0.15);
  }

  html {
    scroll-behavior: smooth;
  }

  .mt-header {
    animation: fadeInDown 0.6s ease-out;
  }

  .mt-center-box {
    animation: fadeIn 0.6s ease-out;
  }

  .mt-primary-btn {
    background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
    transition: all 0.3s ease;
  }

  .mt-primary-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 28px rgba(59, 130, 246, 0.4);
  }

  .mt-loader {
    border-top-color: var(--accent-primary);
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .mt-card {
    animation: fadeInUp 0.5s ease-out;
  }

  .mt-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
    opacity: 0.8;
  }

  .mt-card:hover {
    box-shadow: 0 12px 48px rgba(59, 130, 246, 0.2);
    border-color: rgba(99, 102, 241, 0.25);
  }

  .mt-stat-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: linear-gradient(180deg, var(--accent-primary), var(--accent-secondary));
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .mt-stat-card:hover::before {
    opacity: 1;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .mt-modal {
    background: linear-gradient(180deg, rgba(11,11,11,0.68), rgba(6,6,10,0.6));
    backdrop-filter: blur(10px) saturate(120%);
  }

  .mt-modal::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
    opacity: 0.95;
  }

  .mt-modal-btn.confirm {
    background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  }

  .mt-modal-btn.confirm:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 28px rgba(59,130,246,0.18);
  }

  @media (max-width: 480px) {
    .mt-modal {
      padding: 18px;
      border-radius: 14px;
    }

    .mt-modal h3 {
      font-size: 1.05rem;
    }

    .mt-modal-btn {
      padding: 8px 12px;
      font-size: 0.92rem;
    }
  }

  @media (max-width: 768px) {
    .mt-wrapper {
      padding-left: 16px;
      padding-right: 16px;
      padding-top: 120px;
      padding-bottom: 60px;
    }

    .mt-card {
      padding-left: 20px;
      padding-right: 20px;
      padding-bottom: 28px;
    }

    .mt-header h1 {
      font-size: 2.2rem;
    }

    .mt-title {
      font-size: 1.8rem;
    }

    .mt-code {
      font-size: 1.3rem;
      letter-spacing: 2px;
    }

    .mt-stats {
      grid-template-columns: 1fr;
    }

    .mt-code-box {
      flex-direction: column;
      align-items: stretch;
    }

    .mt-copy-btn {
      justify-content: center;
    }
  }

  @media (max-width: 480px) {
    .mt-header h1 {
      font-size: 1.8rem;
    }

    .mt-card {
      padding-left: 16px;
      padding-right: 16px;
      padding-bottom: 24px;
      border-radius: 20px;
    }

    .mt-stat-value {
      font-size: 1.5rem;
    }
  }
`;

export default ManageTeam;
