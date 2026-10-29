import { API_BASE_URL } from "../../config/api.js";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import Particless from "../Common/Particles/Particless";
import { Copy, Check, Users, Calendar, Edit2, Trash2, X, Save } from "lucide-react";
import Footer from "../Common/Footer/Footer";
const ManageTeam = () => {
  const {
    isLoggedIn
  } = useContext(AuthContext);
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
  const handleEditClick = team => {
    setEditingTeamId(team._id);
    setEditTeamName(team.teamName);
  };
  const handleCancelEdit = () => {
    setEditingTeamId(null);
    setEditTeamName("");
  };
  const handleSaveTeamName = async team => {
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
      const res = await fetch(`${API_BASE_URL}/kdsh/edit_team_details`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          teamCode: team.teamCode,
          teamName: editTeamName.trim()
        })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to update team name");
      }
      toast.success("Team name updated successfully");
      setTeams(teams.map(t => t._id === team._id ? {
        ...t,
        teamName: editTeamName.trim()
      } : t));
      handleCancelEdit();
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Updated: instead of immediate window.confirm, open modal to require typing team name
  const handleDeleteTeam = team => {
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
      const res = await fetch(`${API_BASE_URL}/kdsh/delete_team`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          teamCode: deleteTargetTeam.teamCode
        })
      });
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
      const res = await fetch(`${API_BASE_URL}/kdsh/get_user_teams`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
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
        autoClose: 2000
      });
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (error) {
      toast.error("Failed to copy code");
      console.error("Copy error:", error);
    }
  };
  const handleConfirmTeam = async team => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        toast.error("You must be logged in");
        return;
      }
      const res = await fetch(`${API_BASE_URL}/kdsh/finalize_team`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          teamCode: team.teamCode
        })
      });
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
  const openConfirmTeamModal = team => {
    setConfirmTargetTeam(team);
  };

  // open remove-member modal (replace previous immediate confirm)
  const openRemoveMemberModal = (member, team) => {
    setRemoveTargetMember({
      member,
      team
    });
    setRemoveConfirmationInput("");
    setRemoveError("");
  };

  // actual remove action after typing member name exactly
  const confirmRemoveMember = async () => {
    if (!removeTargetMember) return;
    const {
      member,
      team
    } = removeTargetMember;
    const expectedName = member.firstname && member.lastname ? `${member.firstname} ${member.lastname}` : member.firstname || member.lastname || "Member";
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
      const res = await fetch(`${API_BASE_URL}/kdsh/remove_member`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          GitHubID: member.GitHubID,
          teamCode: team.teamCode
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to remove member");
      toast.success("Member removed successfully");

      // update local state to reflect removal without full refetch
      setTeams(prev => prev.map(t => t._id === team._id ? {
        ...t,
        members: (t.members || []).filter(m => m.GitHubID !== member.GitHubID),
        numMembers: Math.max(0, (t.numMembers || 1) - 1)
      } : t));
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
      position: "top-center"
    });
    // Implement edit leader functionality
  };
  const handleLeaveTeam = team => {
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
      const res = await fetch(`${API_BASE_URL}/kdsh/leave_team`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          teamCode: leaveTargetTeam.teamCode
        })
      });
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
  const formatDate = dateString => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
  };
  if (!isLoggedIn) {
    return <div className="mt-wrapper [min-height:100vh]! [padding:140px_24px_80px]! [max-width:1100px]! [margin:0_auto]! [color:var(--text-primary)]! [position:relative]! max-[768.01px]:[padding:120px_16px_60px]!"><style>{"@keyframes spin {\n  to { transform: rotate(360deg); }\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@keyframes fadeInDown {\n  from {\n    opacity: 0;\n    transform: translateY(-20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n@keyframes fadeInUp {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n:root {\n  --bg-primary: #0a0a0f;\n  --bg-card: rgba(18, 18, 26, 0.9);\n  --bg-secondary: rgba(25, 25, 35, 0.6);\n  --bg-tertiary: rgba(35, 35, 50, 0.4);\n  --border-primary: rgba(59, 130, 246, 0.15);\n  --border-secondary: rgba(255, 255, 255, 0.06);\n  --accent-primary: #3b82f6;\n  --accent-secondary: #60a5fa;\n  --accent-success: #10b981;\n  --accent-danger: #ef4444;\n  --text-primary: #ffffff;\n  --text-secondary: rgba(255, 255, 255, 0.7);\n  --text-tertiary: rgba(255, 255, 255, 0.5);\n  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.3);\n  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.4);\n  --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.5);\n  --shadow-glow: 0 0 40px rgba(59, 130, 246, 0.15);\n}"}</style>
        <Particless />
        <div className="mt-center-box [background:var(--bg-card)]! [border:1px_solid_var(--border-primary)]! [border-radius:24px]! [padding:60px_40px]! [text-align:center]! [box-shadow:var(--shadow-glow)]! [animation:fadeIn_0.6s_ease-out]! [&_h2]:[font-size:1.8rem]! [&_h2]:[margin-bottom:12px]! [&_h2]:[font-weight:700]!">
          <h2>Authentication Required</h2>
          <p className="mt-subtitle [color:var(--text-secondary)]! [margin-bottom:32px]! [font-size:1.05rem]!">
            Please log in to view and manage your team
          </p>
          <a href="/auth" className="mt-primary-btn [display:inline-block]! [padding:14px_32px]! [background:linear-gradient(135deg,_var(--accent-primary),_var(--accent-secondary))]! [color:white]! [text-decoration:none]! [border-radius:12px]! [font-weight:600]! [font-size:1rem]! [transition:all_0.3s_ease]! [box-shadow:0_4px_20px_rgba(59,_130,_246,_0.3)]! [&:hover]:[transform:translateY(-2px)]! [&:hover]:[box-shadow:0_6px_28px_rgba(59,_130,_246,_0.4)]!">
            Login to Continue
          </a>
        </div>
      </div>;
  }
  if (loading) {
    return <div className="mt-wrapper [min-height:100vh]! [padding:140px_24px_80px]! [max-width:1100px]! [margin:0_auto]! [color:var(--text-primary)]! [position:relative]! max-[768.01px]:[padding:120px_16px_60px]!"><style>{"@keyframes spin {\n  to { transform: rotate(360deg); }\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@keyframes fadeInDown {\n  from {\n    opacity: 0;\n    transform: translateY(-20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n@keyframes fadeInUp {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n:root {\n  --bg-primary: #0a0a0f;\n  --bg-card: rgba(18, 18, 26, 0.9);\n  --bg-secondary: rgba(25, 25, 35, 0.6);\n  --bg-tertiary: rgba(35, 35, 50, 0.4);\n  --border-primary: rgba(59, 130, 246, 0.15);\n  --border-secondary: rgba(255, 255, 255, 0.06);\n  --accent-primary: #3b82f6;\n  --accent-secondary: #60a5fa;\n  --accent-success: #10b981;\n  --accent-danger: #ef4444;\n  --text-primary: #ffffff;\n  --text-secondary: rgba(255, 255, 255, 0.7);\n  --text-tertiary: rgba(255, 255, 255, 0.5);\n  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.3);\n  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.4);\n  --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.5);\n  --shadow-glow: 0 0 40px rgba(59, 130, 246, 0.15);\n}"}</style>
        <Particless />
        <div className="mt-center-box [background:var(--bg-card)]! [border:1px_solid_var(--border-primary)]! [border-radius:24px]! [padding:60px_40px]! [text-align:center]! [box-shadow:var(--shadow-glow)]! [animation:fadeIn_0.6s_ease-out]! [&_h2]:[font-size:1.8rem]! [&_h2]:[margin-bottom:12px]! [&_h2]:[font-weight:700]!">
          <div className="mt-loader [width:50px]! [height:50px]! [border:4px_solid_var(--border-secondary)]! [border-top-color:var(--accent-primary)]! [border-radius:50%]! [animation:spin_1s_linear_infinite]! [margin:0_auto_20px]!"></div>
          <h2>Loading Your Teams...</h2>
          <p className="mt-subtitle [color:var(--text-secondary)]! [margin-bottom:32px]! [font-size:1.05rem]!">Please wait while we fetch your data</p>
        </div>
      </div>;
  }
  if (teams.length === 0) {
    return <div className="mt-wrapper [min-height:100vh]! [padding:140px_24px_80px]! [max-width:1100px]! [margin:0_auto]! [color:var(--text-primary)]! [position:relative]! max-[768.01px]:[padding:120px_16px_60px]!"><style>{"@keyframes spin {\n  to { transform: rotate(360deg); }\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@keyframes fadeInDown {\n  from {\n    opacity: 0;\n    transform: translateY(-20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n@keyframes fadeInUp {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n:root {\n  --bg-primary: #0a0a0f;\n  --bg-card: rgba(18, 18, 26, 0.9);\n  --bg-secondary: rgba(25, 25, 35, 0.6);\n  --bg-tertiary: rgba(35, 35, 50, 0.4);\n  --border-primary: rgba(59, 130, 246, 0.15);\n  --border-secondary: rgba(255, 255, 255, 0.06);\n  --accent-primary: #3b82f6;\n  --accent-secondary: #60a5fa;\n  --accent-success: #10b981;\n  --accent-danger: #ef4444;\n  --text-primary: #ffffff;\n  --text-secondary: rgba(255, 255, 255, 0.7);\n  --text-tertiary: rgba(255, 255, 255, 0.5);\n  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.3);\n  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.4);\n  --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.5);\n  --shadow-glow: 0 0 40px rgba(59, 130, 246, 0.15);\n}"}</style>
        <Particless />
        <div className="mt-header [text-align:center]! [margin-bottom:60px]! [animation:fadeInDown_0.6s_ease-out]! [&_h1]:[font-size:clamp(2.2rem,_5vw,_3.5rem)]! [&_h1]:[font-weight:800]! [&_h1]:[background-image:linear-gradient(135deg,_#fff_0%,_var(--accent-primary)_100%)]! [&_h1]:[-webkit-background-clip:text]! [&_h1]:[-webkit-text-fill-color:transparent]! [&_h1]:[background-clip:text]! [&_h1]:[margin-bottom:12px]! [&_h1]:[letter-spacing:-0.02em]! [&_p]:[font-size:1.1rem]! [&_p]:[color:var(--text-secondary)]! [&_p]:[font-weight:400]! max-[768.01px]:[&_h1]:[font-size:2.2rem]! max-[480.01px]:[&_h1]:[font-size:1.8rem]!">
          <h1>Manage Your Team</h1>
          <p>View and manage your hackathon registration</p>
        </div>
        <div className="mt-center-box [background:var(--bg-card)]! [border:1px_solid_var(--border-primary)]! [border-radius:24px]! [padding:60px_40px]! [text-align:center]! [box-shadow:var(--shadow-glow)]! [animation:fadeIn_0.6s_ease-out]! [&_h2]:[font-size:1.8rem]! [&_h2]:[margin-bottom:12px]! [&_h2]:[font-weight:700]!">
          <h2>No Team Found</h2>
          <p className="mt-subtitle [color:var(--text-secondary)]! [margin-bottom:32px]! [font-size:1.05rem]!">
            Create your team and start your hackathon journey today!
          </p>
          <a href="/register-hackathon" className="mt-primary-btn [display:inline-block]! [padding:14px_32px]! [background:linear-gradient(135deg,_var(--accent-primary),_var(--accent-secondary))]! [color:white]! [text-decoration:none]! [border-radius:12px]! [font-weight:600]! [font-size:1rem]! [transition:all_0.3s_ease]! [box-shadow:0_4px_20px_rgba(59,_130,_246,_0.3)]! [&:hover]:[transform:translateY(-2px)]! [&:hover]:[box-shadow:0_6px_28px_rgba(59,_130,_246,_0.4)]!">
            Register for Hackathon
          </a>
        </div>
      </div>;
  }

  // Check if user is a team leader for any team
  const isTeamLeader = teams.some(team => team.isLeader);
  return <><style>{"@keyframes spin {\n  to { transform: rotate(360deg); }\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@keyframes fadeInDown {\n  from {\n    opacity: 0;\n    transform: translateY(-20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n@keyframes fadeInUp {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n:root {\n  --bg-primary: #0a0a0f;\n  --bg-card: rgba(18, 18, 26, 0.9);\n  --bg-secondary: rgba(25, 25, 35, 0.6);\n  --bg-tertiary: rgba(35, 35, 50, 0.4);\n  --border-primary: rgba(59, 130, 246, 0.15);\n  --border-secondary: rgba(255, 255, 255, 0.06);\n  --accent-primary: #3b82f6;\n  --accent-secondary: #60a5fa;\n  --accent-success: #10b981;\n  --accent-danger: #ef4444;\n  --text-primary: #ffffff;\n  --text-secondary: rgba(255, 255, 255, 0.7);\n  --text-tertiary: rgba(255, 255, 255, 0.5);\n  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.3);\n  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.4);\n  --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.5);\n  --shadow-glow: 0 0 40px rgba(59, 130, 246, 0.15);\n}"}</style>
      <div className="mt-wrapper [min-height:100vh]! [padding:140px_24px_80px]! [max-width:1100px]! [margin:0_auto]! [color:var(--text-primary)]! [position:relative]! max-[768.01px]:[padding:120px_16px_60px]!">
        <Particless />

        <div className="mt-header [text-align:center]! [margin-bottom:60px]! [animation:fadeInDown_0.6s_ease-out]! [&_h1]:[font-size:clamp(2.2rem,_5vw,_3.5rem)]! [&_h1]:[font-weight:800]! [&_h1]:[background-image:linear-gradient(135deg,_#fff_0%,_var(--accent-primary)_100%)]! [&_h1]:[-webkit-background-clip:text]! [&_h1]:[-webkit-text-fill-color:transparent]! [&_h1]:[background-clip:text]! [&_h1]:[margin-bottom:12px]! [&_h1]:[letter-spacing:-0.02em]! [&_p]:[font-size:1.1rem]! [&_p]:[color:var(--text-secondary)]! [&_p]:[font-weight:400]! max-[768.01px]:[&_h1]:[font-size:2.2rem]! max-[480.01px]:[&_h1]:[font-size:1.8rem]!">
          <h1>{isTeamLeader ? "Manage Your Team" : "View Your Team"}</h1>
          <p>{isTeamLeader ? "View and manage your hackathon registration" : "View your hackathon registration"}</p>
        </div>

        {teams.map(team => <div className="mt-card [background:var(--bg-card)]! [border:1px_solid_var(--border-primary)]! [border-radius:28px]! [padding:40px]! [padding-top:24px]! [margin-bottom:32px]! [box-shadow:var(--shadow-glow)]! [transition:all_0.4s_ease]! [animation:fadeInUp_0.5s_ease-out]! [position:relative]! [overflow:hidden]! [&::before]:[content:'']! [&::before]:[position:absolute]! [&::before]:[top:0]! [&::before]:[left:0]! [&::before]:[right:0]! [&::before]:[height:3px]! [&::before]:[background:linear-gradient(90deg,_var(--accent-primary),_var(--accent-secondary))]! [&::before]:[opacity:0.8]! [&:hover]:[box-shadow:0_12px_48px_rgba(59,_130,_246,_0.2)]! [&:hover]:[border-color:rgba(99,_102,_241,_0.25)]! max-[768.01px]:[padding:28px_20px]! max-[480.01px]:[padding:24px_16px]! max-[480.01px]:[border-radius:20px]!" key={team._id}>
            <div className="important-note2 [color:#8bb4ff]! [font-size:16px]! [max-width:820px]! [margin:0_auto_24px]! [text-align:center]! [line-height:1.5]! [padding:12px_20px]! [background:rgba(255,_255,_255,_0.05)]! [border-radius:8px]! [border:1px_solid_rgba(255,_255,_255,_0.1)]!">
              {team.is_team_finalized ? <strong>You are registered and your team has been finalized. It will be reflected on Unstop at the end of registrations.</strong> : <><strong>Important:</strong> After all members have joined, Team Leader must finalize the team. Your team will only be reflected on Unstop after finalization.</>}
            </div>
            {editingTeamId === team._id ? <div className="mt-edit-container" style={{
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
                <input type="text" value={editTeamName} onChange={e => setEditTeamName(e.target.value)} className="mt-edit-input [padding:8px_12px]! [border:1px_solid_#333]! [border-radius:6px]! [background:var(--bg-secondary)]! [color:#fff]! [font-size:1.2rem]! [flex:1]! [height:40px]!" style={{}} />
                <button onClick={() => handleSaveTeamName(team)} className="mt-action-btn save" style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#4ade80'
          }} title="Save">
                  <Save size={24} />
                </button>
                <button onClick={handleCancelEdit} className="mt-action-btn cancel" style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#f87171'
          }} title="Cancel">
                  <X size={24} />
                </button>
              </div> : <div className="mt-title-container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '50px'
        }}>
                <div className="mt-title [font-size:2.2rem]! [font-weight:800]! [margin-bottom:25px]! [letter-spacing:-0.01em]! [background-image:linear-gradient(135deg,_#fff_0%,_#a5b4fc_100%)]! [-webkit-background-clip:text]! [-webkit-text-fill-color:transparent]! [background-clip:text]! max-[768.01px]:[font-size:1.8rem]!">{team.teamName}</div>
                {team.isLeader && !team.is_team_finalized && <div className="mt-actions" style={{
            display: 'flex',
            gap: '10px'
          }}>
                    <button onClick={() => handleEditClick(team)} className="mt-action-btn edit" style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#60a5fa'
            }} title="Edit Team Name">
                      <Edit2 size={20} />
                    </button>
                    <button onClick={() => handleDeleteTeam(team)} className="mt-action-btn delete" style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#f87171'
            }} title="Delete Team" disabled={isDeleting}>
                      <Trash2 size={20} />
                    </button>
                  </div>}
              </div>}

            <div className="mt-code-section [background:var(--bg-secondary)]! [border:1px_solid_var(--border-secondary)]! [border-radius:18px]! [padding:24px]! [margin-bottom:28px]! [backdrop-filter:blur(10px)]! [transition:all_0.3s_ease]! [&:hover]:[background:rgba(25,_25,_35,_0.75)]! [&:hover]:[border-color:var(--border-primary)]!">
              <label className="mt-code-label [display:block]! [font-size:0.7rem]! [text-transform:uppercase]! [letter-spacing:2px]! [color:var(--text-tertiary)]! [font-weight:600]! [margin-bottom:12px]!">Team Code</label>
              <div className="mt-code-box [display:flex]! [justify-content:space-between]! [align-items:center]! [gap:16px]! max-[768.01px]:[flex-direction:column]! max-[768.01px]:[align-items:stretch]!">
                <div className="mt-code [font-size:1.6rem]! [font-weight:700]! [letter-spacing:4px]! [font-family:'Courier_New',_monospace]! [color:var(--accent-primary)]! [flex:1]! max-[768.01px]:[font-size:1.3rem]! max-[768.01px]:[letter-spacing:2px]!">{team.teamCode}</div>
                <button className={`mt-copy-btn [display:flex]! [align-items:center]! [gap:8px]! [padding:10px_18px]! [border-radius:12px]! [border:1px_solid_var(--border-primary)]! [background:var(--bg-tertiary)]! [color:var(--text-primary)]! [cursor:pointer]! [font-weight:600]! [font-size:0.9rem]! [transition:all_0.3s_ease]! [white-space:nowrap]! [&:hover]:[background:rgba(59,_130,_246,_0.15)]! [&:hover]:[border-color:var(--accent-primary)]! [&:hover]:[transform:translateY(-1px)]! [&.copied]:[background:rgba(16,_185,_129,_0.15)]! [&.copied]:[border-color:var(--accent-success)]! [&.copied]:[color:var(--accent-success)]! max-[768.01px]:[justify-content:center]! ${copiedCode === team._id ? "copied" : ""} `} onClick={() => copyToClipboard(team.teamCode, team._id)} aria-label="Copy team code">
                  {copiedCode === team._id ? <>
                      <Check size={16} />
                      <span>Copied</span>
                    </> : <>
                      <Copy size={16} />
                      <span>Copy</span>
                    </>}
                </button>
              </div>
            </div>

            <div className="mt-stats [display:grid]! [grid-template-columns:repeat(auto-fit,_minmax(240px,_1fr))]! [gap:20px]! [margin-bottom:32px]! max-[768.01px]:[grid-template-columns:1fr]!">
              <div className="mt-stat-card [background:var(--bg-secondary)]! [border:1px_solid_var(--border-secondary)]! [border-radius:18px]! [padding:24px]! [display:flex]! [flex-direction:column]! [gap:8px]! [transition:all_0.3s_ease]! [position:relative]! [overflow:hidden]! [&::before]:[content:'']! [&::before]:[position:absolute]! [&::before]:[top:0]! [&::before]:[left:0]! [&::before]:[width:4px]! [&::before]:[height:100%]! [&::before]:[background:linear-gradient(180deg,_var(--accent-primary),_var(--accent-secondary))]! [&::before]:[opacity:0]! [&::before]:[transition:opacity_0.3s_ease]! [&:hover]:[background:rgba(25,_25,_35,_0.8)]! [&:hover]:[border-color:var(--border-primary)]! [&:hover::before]:[opacity:1]!">
                <Users size={24} className="mt-stat-icon [color:var(--accent-primary)]! [margin-bottom:4px]!" />
                <span className="mt-stat-label [text-transform:uppercase]! [font-size:0.75rem]! [letter-spacing:1.5px]! [color:var(--text-tertiary)]! [font-weight:600]!">Team Members</span>
                <span className="mt-stat-value [font-size:1.8rem]! [font-weight:800]! [color:var(--text-primary)]! [letter-spacing:-0.01em]! max-[480.01px]:[font-size:1.5rem]!">{team.numMembers} / 4</span>
              </div>

              <div className="mt-stat-card [background:var(--bg-secondary)]! [border:1px_solid_var(--border-secondary)]! [border-radius:18px]! [padding:24px]! [display:flex]! [flex-direction:column]! [gap:8px]! [transition:all_0.3s_ease]! [position:relative]! [overflow:hidden]! [&::before]:[content:'']! [&::before]:[position:absolute]! [&::before]:[top:0]! [&::before]:[left:0]! [&::before]:[width:4px]! [&::before]:[height:100%]! [&::before]:[background:linear-gradient(180deg,_var(--accent-primary),_var(--accent-secondary))]! [&::before]:[opacity:0]! [&::before]:[transition:opacity_0.3s_ease]! [&:hover]:[background:rgba(25,_25,_35,_0.8)]! [&:hover]:[border-color:var(--border-primary)]! [&:hover::before]:[opacity:1]!">
                <Calendar size={24} className="mt-stat-icon [color:var(--accent-primary)]! [margin-bottom:4px]!" />
                <span className="mt-stat-label [text-transform:uppercase]! [font-size:0.75rem]! [letter-spacing:1.5px]! [color:var(--text-tertiary)]! [font-weight:600]!">Created On</span>
                <span className="mt-stat-value [font-size:1.8rem]! [font-weight:800]! [color:var(--text-primary)]! [letter-spacing:-0.01em]! max-[480.01px]:[font-size:1.5rem]!">
                  {formatDate(team.created_at)}
                </span>
              </div>
            </div>

            <div className="mt-section [margin-top:32px]!">
              {/* <div className="mt-section-header">
                <span className="mt-section-title">Team Leader</span>
                <button className="mt-edit-btn" onClick={editLeader}>
                  Edit Details
                </button>
               </div> */}

              <div className="mt-leader-block [background:var(--bg-secondary)]! [border:1px_solid_var(--border-secondary)]! [border-radius:16px]! [padding:22px]! [transition:all_0.3s_ease]! [&:hover]:[background:rgba(25,_25,_35,_0.8)]! [&:hover]:[border-color:var(--border-primary)]!">
                <div className="mt-leader-head [display:flex]! [justify-content:space-between]! [align-items:center]! [margin-bottom:14px]! [padding-bottom:12px]! [border-bottom:1px_solid_var(--border-secondary)]!">
                  <div className="mt-leader-name [font-size:1.2rem]! [font-weight:700]! [color:var(--text-primary)]!">
                    {team.leader?.firstname || ""}{" "}
                    {team.leader?.lastname || ""}
                  </div>
                  <div className="mt-leader-username [color:var(--accent-primary)]! [font-weight:600]! [font-size:0.9rem]!">
                    @{team.leader?.GitHubID || team.teamleader_github}
                  </div>
                </div>

                <div className="mt-leader-info [display:grid]! [grid-template-columns:1fr_1fr]! [gap:12px]! [font-size:0.95rem]! [color:var(--text-secondary)]! [&_div]:[display:flex]! [&_div]:[gap:6px]! [&_strong]:[color:var(--text-tertiary)]! [&_strong]:[font-weight:600]! [&_strong]:[min-width:70px]! max-[480.01px]:[grid-template-columns:1fr]! max-[480.01px]:[&_div]:[flex-direction:column]! max-[480.01px]:[&_div]:[align-items:flex-start]! max-[480.01px]:[&_div]:[gap:4px]!">
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

            <div className="mt-section [margin-top:32px]!">
              <div className="mt-section-header [display:flex]! [justify-content:space-between]! [align-items:center]! [margin-bottom:16px]! [padding-bottom:12px]! [border-bottom:1px_solid_var(--border-secondary)]! max-[768.01px]:[flex-direction:column]! max-[768.01px]:[align-items:flex-start]! max-[768.01px]:[gap:12px]!">
                <span className="mt-section-title [text-transform:uppercase]! [font-size:0.8rem]! [letter-spacing:2px]! [color:var(--text-secondary)]! [font-weight:700]!">Team Members</span>
              </div>

              {team.members && team.members.length > 0 ? team.members.map((member, idx) => <div className="mt-member-card [background:var(--bg-secondary)]! [border:1px_solid_var(--border-secondary)]! [border-radius:16px]! [padding:22px]! [margin-bottom:16px]! [transition:all_0.3s_ease]! [position:relative]! [&:hover]:[background:rgba(25,_25,_35,_0.8)]! [&:hover]:[border-color:var(--border-primary)]!" key={idx}>
                    <div className="mt-member-head [display:flex]! [justify-content:space-between]! [align-items:center]! [margin-bottom:14px]! [padding-bottom:12px]! [border-bottom:1px_solid_var(--border-secondary)]! max-[768.01px]:[flex-direction:column]! max-[768.01px]:[align-items:flex-start]! max-[768.01px]:[gap:6px]!">
                      <div className="mt-member-name [font-size:1.2rem]! [font-weight:700]! [color:var(--text-primary)]!">
                        {member.firstname && member.lastname ? `${member.firstname} ${member.lastname}` : member.firstname || member.lastname || "Member"}
                      </div>
                      <div className="mt-member-username [color:var(--accent-primary)]! [font-weight:600]! [font-size:0.9rem]!">
                        @{member.GitHubID || "username"}
                      </div>
                    </div>

                    <div className="mt-member-info [display:grid]! [grid-template-columns:1fr_1fr]! [gap:12px]! [font-size:0.95rem]! [color:var(--text-secondary)]! [margin-bottom:14px]! [&_div]:[display:flex]! [&_div]:[gap:6px]! [&_strong]:[color:var(--text-tertiary)]! [&_strong]:[font-weight:600]! [&_strong]:[min-width:70px]! max-[480.01px]:[&_div]:[flex-direction:column]! max-[480.01px]:[&_div]:[align-items:flex-start]! max-[480.01px]:[&_div]:[gap:4px]! max-[768.01px]:[grid-template-columns:1fr]!">
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

                    {team.isLeader && !team.is_team_finalized && <button className="mt-remove-btn [padding:8px_16px]! [border-radius:10px]! [border:1px_solid_rgba(239,_68,_68,_0.3)]! [color:var(--accent-danger)]! [background:rgba(239,_68,_68,_0.1)]! [cursor:pointer]! [font-weight:600]! [font-size:0.85rem]! [transition:all_0.3s_ease]! [&:hover]:[background:rgba(239,_68,_68,_0.2)]! [&:hover]:[border-color:var(--accent-danger)]! [&:hover]:[transform:translateY(-1px)]!" onClick={() => openRemoveMemberModal(member, team)} aria-label={`Remove ${member.firstname || "member"}`}>
                        Remove Member
                      </button>}
                  </div>) : <div className="mt-empty [color:var(--text-tertiary)]! [text-align:center]! [padding:32px]! [font-size:1rem]!">
                  No team members yet. Share your team code to invite
                  members!
                </div>}
            </div>

            {!team.isLeader && !team.is_team_finalized && <div style={{
          marginTop: "30px",
          display: "flex",
          justifyContent: "center"
        }}>
                <button className="mt-leave-btn" onClick={() => handleLeaveTeam(team)} style={{
            background: "rgba(239, 68, 68, 0.1)",
            border: "1px solid rgba(239, 68, 68, 0.5)",
            color: "#ef4444",
            padding: "12px 24px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "600",
            transition: "all 0.3s ease"
          }} onMouseEnter={e => {
            e.target.style.background = "rgba(239, 68, 68, 0.2)";
            e.target.style.borderColor = "rgba(239, 68, 68, 0.7)";
          }} onMouseLeave={e => {
            e.target.style.background = "rgba(239, 68, 68, 0.1)";
            e.target.style.borderColor = "rgba(239, 68, 68, 0.5)";
          }}>
                  Leave Team
                </button>
              </div>}

            {!team.is_team_finalized && team.isLeader && <div style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "center"
        }}>
                <button className="register-form-submit" type="button" style={{
            minWidth: "",
            margin: "0 auto"
          }} onClick={() => openConfirmTeamModal(team)}>
                  <p>Finalize Team</p>
                </button>
              </div>}
          </div>)}

        {/* Delete confirmation modal */}
        {deleteTargetTeam && <div className="mt-modal-overlay [position:fixed]! [inset:0]! [background:rgba(2,_6,_23,_0.6)]! [display:flex]! [align-items:center]! [justify-content:center]! [z-index:9999]! [padding:28px]!" role="dialog" aria-modal="true" onKeyDown={e => {
        if (e.key === "Escape") {
          setDeleteTargetTeam(null);
          setDeleteConfirmationInput("");
          setDeleteError("");
        }
      }}>
            <div className="mt-modal [width:min(560px,_100%)]! [background:linear-gradient(180deg,_rgba(11,11,11,0.68),_rgba(6,6,10,0.6))]! [border-radius:20px]! [padding:22px]! [color:var(--text-primary)]! [border:1px_solid_var(--border-primary)]! [box-shadow:var(--shadow-lg)]! [backdrop-filter:blur(10px)_saturate(120%)]! [position:relative]! [overflow:hidden]! [&::before]:[content:'']! [&::before]:[position:absolute]! [&::before]:[top:0]! [&::before]:[left:0]! [&::before]:[right:0]! [&::before]:[height:4px]! [&::before]:[background:linear-gradient(90deg,_var(--accent-primary),_var(--accent-secondary))]! [&::before]:[opacity:0.95]! [&_h3]:[margin:0_0_8px_0]! [&_h3]:[font-size:1.25rem]! [&_h3]:[font-weight:800]! [&_h3]:[color:var(--text-primary)]! [&_p]:[color:var(--text-secondary)]! [&_p]:[margin-bottom:12px]! [&_p]:[line-height:1.4]! max-[480.01px]:[padding:18px]! max-[480.01px]:[border-radius:14px]! max-[480.01px]:[&_h3]:[font-size:1.05rem]!" role="document" aria-labelledby="mt-modal-title">
              <h3 id="mt-modal-title">Confirm Team Deletion</h3>
              <p>
                This action cannot be undone. To confirm, type{" "}
                <strong>"{deleteTargetTeam.teamName}"</strong> in the box below
                and press Delete.
              </p>

              <input className="mt-modal-input [width:100%]! [padding:10px_12px]! [border-radius:8px]! [border:1px_solid_rgba(255,255,255,0.06)]! [background:rgba(15,15,15,0.45)]! [color:var(--text-primary)]! [outline:none]! [font-size:0.98rem]! [transition:box-shadow_0.15s_ease,_border-color_0.15s_ease]! [&::placeholder]:[color:rgba(255,255,255,0.35)]! [&:focus]:[border-color:rgba(59,130,246,0.22)]! [&:focus]:[box-shadow:0_6px_24px_rgba(59,130,246,0.06)]!" type="text" value={deleteConfirmationInput} onChange={e => {
            setDeleteConfirmationInput(e.target.value);
            if (deleteError) setDeleteError("");
          }} placeholder={`Write "${deleteTargetTeam.teamName}" to delete Team`} aria-label={`Type ${deleteTargetTeam.teamName} to confirm deletion`} />
              {deleteError && <div className="mt-modal-error [color:#fecaca]! [margin-top:8px]! [font-size:0.95rem]!">
                  {deleteError}
                </div>}

              <div className="mt-modal-actions [display:flex]! [gap:10px]! [justify-content:flex-end]! [margin-top:14px]!">
                <button type="button" className="mt-modal-btn [padding:9px_14px]! [border-radius:10px]! [font-weight:700]! [cursor:pointer]! [font-size:0.95rem]! [border:1px_solid_rgba(255,255,255,0.06)]! [transition:transform_0.12s_ease,_box-shadow_0.12s_ease]! [&:disabled]:[opacity:0.6]! [&:disabled]:[cursor:not-allowed]! [&:disabled]:[transform:none]! [&.cancel]:[background:transparent]! [&.cancel]:[color:var(--text-primary)]! [&.cancel]:[border-color:rgba(255,255,255,0.06)]! [&.cancel:hover:not(:disabled)]:[transform:translateY(-2px)]! [&.cancel:hover:not(:disabled)]:[box-shadow:0_6px_18px_rgba(0,0,0,0.45)]! [&.delete]:[background:linear-gradient(135deg,_var(--accent-danger),_rgba(239,68,68,0.9))]! [&.delete]:[color:#fff]! [&.delete]:[border:none]! [&.delete]:[box-shadow:0_6px_18px_rgba(239,68,68,0.12)]! [&.delete:hover:not(:disabled)]:[transform:translateY(-2px)]! [&.delete:hover:not(:disabled)]:[box-shadow:0_10px_28px_rgba(239,68,68,0.18)]! max-[480.01px]:[padding:8px_12px]! max-[480.01px]:[font-size:0.92rem]! cancel" onClick={() => {
              setDeleteTargetTeam(null);
              setDeleteConfirmationInput("");
              setDeleteError("");
            }} disabled={isDeleting}>
                  Cancel
                </button>
                <button type="button" className="mt-modal-btn [padding:9px_14px]! [border-radius:10px]! [font-weight:700]! [cursor:pointer]! [font-size:0.95rem]! [border:1px_solid_rgba(255,255,255,0.06)]! [transition:transform_0.12s_ease,_box-shadow_0.12s_ease]! [&:disabled]:[opacity:0.6]! [&:disabled]:[cursor:not-allowed]! [&:disabled]:[transform:none]! [&.cancel]:[background:transparent]! [&.cancel]:[color:var(--text-primary)]! [&.cancel]:[border-color:rgba(255,255,255,0.06)]! [&.cancel:hover:not(:disabled)]:[transform:translateY(-2px)]! [&.cancel:hover:not(:disabled)]:[box-shadow:0_6px_18px_rgba(0,0,0,0.45)]! [&.delete]:[background:linear-gradient(135deg,_var(--accent-danger),_rgba(239,68,68,0.9))]! [&.delete]:[color:#fff]! [&.delete]:[border:none]! [&.delete]:[box-shadow:0_6px_18px_rgba(239,68,68,0.12)]! [&.delete:hover:not(:disabled)]:[transform:translateY(-2px)]! [&.delete:hover:not(:disabled)]:[box-shadow:0_10px_28px_rgba(239,68,68,0.18)]! max-[480.01px]:[padding:8px_12px]! max-[480.01px]:[font-size:0.92rem]! delete" onClick={confirmDeleteTeam} disabled={isDeleting || deleteConfirmationInput !== deleteTargetTeam.teamName} title={`Type "${deleteTargetTeam.teamName}" to enable deletion`}>
                  {isDeleting ? "Deleting..." : "Delete Team"}
                </button>
              </div>
            </div>
          </div>}

        {/* Remove member confirmation modal */}
        {removeTargetMember && <div className="mt-modal-overlay [position:fixed]! [inset:0]! [background:rgba(2,_6,_23,_0.6)]! [display:flex]! [align-items:center]! [justify-content:center]! [z-index:9999]! [padding:28px]!" role="dialog" aria-modal="true" onKeyDown={e => {
        if (e.key === "Escape") {
          setRemoveTargetMember(null);
          setRemoveConfirmationInput("");
          setRemoveError("");
        }
      }}>
            <div className="mt-modal [width:min(560px,_100%)]! [background:linear-gradient(180deg,_rgba(11,11,11,0.68),_rgba(6,6,10,0.6))]! [border-radius:20px]! [padding:22px]! [color:var(--text-primary)]! [border:1px_solid_var(--border-primary)]! [box-shadow:var(--shadow-lg)]! [backdrop-filter:blur(10px)_saturate(120%)]! [position:relative]! [overflow:hidden]! [&::before]:[content:'']! [&::before]:[position:absolute]! [&::before]:[top:0]! [&::before]:[left:0]! [&::before]:[right:0]! [&::before]:[height:4px]! [&::before]:[background:linear-gradient(90deg,_var(--accent-primary),_var(--accent-secondary))]! [&::before]:[opacity:0.95]! [&_h3]:[margin:0_0_8px_0]! [&_h3]:[font-size:1.25rem]! [&_h3]:[font-weight:800]! [&_h3]:[color:var(--text-primary)]! [&_p]:[color:var(--text-secondary)]! [&_p]:[margin-bottom:12px]! [&_p]:[line-height:1.4]! max-[480.01px]:[padding:18px]! max-[480.01px]:[border-radius:14px]! max-[480.01px]:[&_h3]:[font-size:1.05rem]!" role="document" aria-labelledby="mt-remove-modal-title">
              <h3 id="mt-remove-modal-title">Confirm Remove Member</h3>
              <p>
                This will remove the member from your team. To confirm, type{" "}
                <strong>
                  "{removeTargetMember.member.firstname && removeTargetMember.member.lastname ? `${removeTargetMember.member.firstname} ${removeTargetMember.member.lastname}` : removeTargetMember.member.firstname || removeTargetMember.member.lastname || "Member"}
                  "</strong>{" "}
                below and press Delete.
              </p>

              <input className="mt-modal-input [width:100%]! [padding:10px_12px]! [border-radius:8px]! [border:1px_solid_rgba(255,255,255,0.06)]! [background:rgba(15,15,15,0.45)]! [color:var(--text-primary)]! [outline:none]! [font-size:0.98rem]! [transition:box-shadow_0.15s_ease,_border-color_0.15s_ease]! [&::placeholder]:[color:rgba(255,255,255,0.35)]! [&:focus]:[border-color:rgba(59,130,246,0.22)]! [&:focus]:[box-shadow:0_6px_24px_rgba(59,130,246,0.06)]!" type="text" value={removeConfirmationInput} onChange={e => {
            setRemoveConfirmationInput(e.target.value);
            if (removeError) setRemoveError("");
          }} placeholder={`Write the member's name to confirm removal`} aria-label={`Type member name to confirm removal`} />
              {removeError && <div className="mt-modal-error [color:#fecaca]! [margin-top:8px]! [font-size:0.95rem]!">{removeError}</div>}

              <div className="mt-modal-actions [display:flex]! [gap:10px]! [justify-content:flex-end]! [margin-top:14px]!">
                <button type="button" className="mt-modal-btn [padding:9px_14px]! [border-radius:10px]! [font-weight:700]! [cursor:pointer]! [font-size:0.95rem]! [border:1px_solid_rgba(255,255,255,0.06)]! [transition:transform_0.12s_ease,_box-shadow_0.12s_ease]! [&:disabled]:[opacity:0.6]! [&:disabled]:[cursor:not-allowed]! [&:disabled]:[transform:none]! [&.cancel]:[background:transparent]! [&.cancel]:[color:var(--text-primary)]! [&.cancel]:[border-color:rgba(255,255,255,0.06)]! [&.cancel:hover:not(:disabled)]:[transform:translateY(-2px)]! [&.cancel:hover:not(:disabled)]:[box-shadow:0_6px_18px_rgba(0,0,0,0.45)]! [&.delete]:[background:linear-gradient(135deg,_var(--accent-danger),_rgba(239,68,68,0.9))]! [&.delete]:[color:#fff]! [&.delete]:[border:none]! [&.delete]:[box-shadow:0_6px_18px_rgba(239,68,68,0.12)]! [&.delete:hover:not(:disabled)]:[transform:translateY(-2px)]! [&.delete:hover:not(:disabled)]:[box-shadow:0_10px_28px_rgba(239,68,68,0.18)]! max-[480.01px]:[padding:8px_12px]! max-[480.01px]:[font-size:0.92rem]! cancel" onClick={() => {
              setRemoveTargetMember(null);
              setRemoveConfirmationInput("");
              setRemoveError("");
            }} disabled={isRemovingMember}>
                  Cancel
                </button>
                <button type="button" className="mt-modal-btn [padding:9px_14px]! [border-radius:10px]! [font-weight:700]! [cursor:pointer]! [font-size:0.95rem]! [border:1px_solid_rgba(255,255,255,0.06)]! [transition:transform_0.12s_ease,_box-shadow_0.12s_ease]! [&:disabled]:[opacity:0.6]! [&:disabled]:[cursor:not-allowed]! [&:disabled]:[transform:none]! [&.cancel]:[background:transparent]! [&.cancel]:[color:var(--text-primary)]! [&.cancel]:[border-color:rgba(255,255,255,0.06)]! [&.cancel:hover:not(:disabled)]:[transform:translateY(-2px)]! [&.cancel:hover:not(:disabled)]:[box-shadow:0_6px_18px_rgba(0,0,0,0.45)]! [&.delete]:[background:linear-gradient(135deg,_var(--accent-danger),_rgba(239,68,68,0.9))]! [&.delete]:[color:#fff]! [&.delete]:[border:none]! [&.delete]:[box-shadow:0_6px_18px_rgba(239,68,68,0.12)]! [&.delete:hover:not(:disabled)]:[transform:translateY(-2px)]! [&.delete:hover:not(:disabled)]:[box-shadow:0_10px_28px_rgba(239,68,68,0.18)]! max-[480.01px]:[padding:8px_12px]! max-[480.01px]:[font-size:0.92rem]! delete" onClick={confirmRemoveMember} disabled={isRemovingMember || !removeTargetMember || removeConfirmationInput !== (removeTargetMember.member.firstname && removeTargetMember.member.lastname ? `${removeTargetMember.member.firstname} ${removeTargetMember.member.lastname}` : removeTargetMember.member.firstname || removeTargetMember.member.lastname || "Member")} title={`Type member full name to enable deletion`}>
                  {isRemovingMember ? "Removing..." : "Delete Member"}
                </button>
              </div>
            </div>
          </div>}

        {/* Leave team confirmation modal */}
        {leaveTargetTeam && <div className="mt-modal-overlay [position:fixed]! [inset:0]! [background:rgba(2,_6,_23,_0.6)]! [display:flex]! [align-items:center]! [justify-content:center]! [z-index:9999]! [padding:28px]!" role="dialog" aria-modal="true" onKeyDown={e => {
        if (e.key === "Escape") {
          setLeaveTargetTeam(null);
          setLeaveConfirmationInput("");
          setLeaveError("");
        }
      }}>
            <div className="mt-modal [width:min(560px,_100%)]! [background:linear-gradient(180deg,_rgba(11,11,11,0.68),_rgba(6,6,10,0.6))]! [border-radius:20px]! [padding:22px]! [color:var(--text-primary)]! [border:1px_solid_var(--border-primary)]! [box-shadow:var(--shadow-lg)]! [backdrop-filter:blur(10px)_saturate(120%)]! [position:relative]! [overflow:hidden]! [&::before]:[content:'']! [&::before]:[position:absolute]! [&::before]:[top:0]! [&::before]:[left:0]! [&::before]:[right:0]! [&::before]:[height:4px]! [&::before]:[background:linear-gradient(90deg,_var(--accent-primary),_var(--accent-secondary))]! [&::before]:[opacity:0.95]! [&_h3]:[margin:0_0_8px_0]! [&_h3]:[font-size:1.25rem]! [&_h3]:[font-weight:800]! [&_h3]:[color:var(--text-primary)]! [&_p]:[color:var(--text-secondary)]! [&_p]:[margin-bottom:12px]! [&_p]:[line-height:1.4]! max-[480.01px]:[padding:18px]! max-[480.01px]:[border-radius:14px]! max-[480.01px]:[&_h3]:[font-size:1.05rem]!" role="document" aria-labelledby="mt-leave-modal-title">
              <h3 id="mt-leave-modal-title">Confirm Leave Team</h3>
              <p>
                This action cannot be undone. You will be removed from the team and will need to join another team to participate. To confirm, type{" "}
                <strong>"{leaveTargetTeam.teamName}"</strong> in the box below
                and press Leave Team.
              </p>

              <input className="mt-modal-input [width:100%]! [padding:10px_12px]! [border-radius:8px]! [border:1px_solid_rgba(255,255,255,0.06)]! [background:rgba(15,15,15,0.45)]! [color:var(--text-primary)]! [outline:none]! [font-size:0.98rem]! [transition:box-shadow_0.15s_ease,_border-color_0.15s_ease]! [&::placeholder]:[color:rgba(255,255,255,0.35)]! [&:focus]:[border-color:rgba(59,130,246,0.22)]! [&:focus]:[box-shadow:0_6px_24px_rgba(59,130,246,0.06)]!" type="text" value={leaveConfirmationInput} onChange={e => {
            setLeaveConfirmationInput(e.target.value);
            if (leaveError) setLeaveError("");
          }} placeholder={`Write "${leaveTargetTeam.teamName}" to leave team`} aria-label={`Type ${leaveTargetTeam.teamName} to confirm leaving team`} />
              {leaveError && <div className="mt-modal-error [color:#fecaca]! [margin-top:8px]! [font-size:0.95rem]!">
                  {leaveError}
                </div>}

              <div className="mt-modal-actions [display:flex]! [gap:10px]! [justify-content:flex-end]! [margin-top:14px]!">
                <button type="button" className="mt-modal-btn [padding:9px_14px]! [border-radius:10px]! [font-weight:700]! [cursor:pointer]! [font-size:0.95rem]! [border:1px_solid_rgba(255,255,255,0.06)]! [transition:transform_0.12s_ease,_box-shadow_0.12s_ease]! [&:disabled]:[opacity:0.6]! [&:disabled]:[cursor:not-allowed]! [&:disabled]:[transform:none]! [&.cancel]:[background:transparent]! [&.cancel]:[color:var(--text-primary)]! [&.cancel]:[border-color:rgba(255,255,255,0.06)]! [&.cancel:hover:not(:disabled)]:[transform:translateY(-2px)]! [&.cancel:hover:not(:disabled)]:[box-shadow:0_6px_18px_rgba(0,0,0,0.45)]! [&.delete]:[background:linear-gradient(135deg,_var(--accent-danger),_rgba(239,68,68,0.9))]! [&.delete]:[color:#fff]! [&.delete]:[border:none]! [&.delete]:[box-shadow:0_6px_18px_rgba(239,68,68,0.12)]! [&.delete:hover:not(:disabled)]:[transform:translateY(-2px)]! [&.delete:hover:not(:disabled)]:[box-shadow:0_10px_28px_rgba(239,68,68,0.18)]! max-[480.01px]:[padding:8px_12px]! max-[480.01px]:[font-size:0.92rem]! cancel" onClick={() => {
              setLeaveTargetTeam(null);
              setLeaveConfirmationInput("");
              setLeaveError("");
            }} disabled={isLeavingTeam}>
                  Cancel
                </button>
                <button type="button" className="mt-modal-btn [padding:9px_14px]! [border-radius:10px]! [font-weight:700]! [cursor:pointer]! [font-size:0.95rem]! [border:1px_solid_rgba(255,255,255,0.06)]! [transition:transform_0.12s_ease,_box-shadow_0.12s_ease]! [&:disabled]:[opacity:0.6]! [&:disabled]:[cursor:not-allowed]! [&:disabled]:[transform:none]! [&.cancel]:[background:transparent]! [&.cancel]:[color:var(--text-primary)]! [&.cancel]:[border-color:rgba(255,255,255,0.06)]! [&.cancel:hover:not(:disabled)]:[transform:translateY(-2px)]! [&.cancel:hover:not(:disabled)]:[box-shadow:0_6px_18px_rgba(0,0,0,0.45)]! [&.delete]:[background:linear-gradient(135deg,_var(--accent-danger),_rgba(239,68,68,0.9))]! [&.delete]:[color:#fff]! [&.delete]:[border:none]! [&.delete]:[box-shadow:0_6px_18px_rgba(239,68,68,0.12)]! [&.delete:hover:not(:disabled)]:[transform:translateY(-2px)]! [&.delete:hover:not(:disabled)]:[box-shadow:0_10px_28px_rgba(239,68,68,0.18)]! max-[480.01px]:[padding:8px_12px]! max-[480.01px]:[font-size:0.92rem]! delete" onClick={confirmLeaveTeam} disabled={isLeavingTeam || leaveConfirmationInput !== leaveTargetTeam.teamName} title={`Type "${leaveTargetTeam.teamName}" to enable leaving team`}>
                  {isLeavingTeam ? "Leaving..." : "Leave Team"}
                </button>
              </div>
            </div>
          </div>}

        {/* Confirm team modal */}
        {confirmTargetTeam && <div className="mt-modal-overlay [position:fixed]! [inset:0]! [background:rgba(2,_6,_23,_0.6)]! [display:flex]! [align-items:center]! [justify-content:center]! [z-index:9999]! [padding:28px]!" role="dialog" aria-modal="true" onKeyDown={e => {
        if (e.key === "Escape") {
          setConfirmTargetTeam(null);
        }
      }}>
            <div className="mt-modal [width:min(560px,_100%)]! [background:linear-gradient(180deg,_rgba(11,11,11,0.68),_rgba(6,6,10,0.6))]! [border-radius:20px]! [padding:22px]! [color:var(--text-primary)]! [border:1px_solid_var(--border-primary)]! [box-shadow:var(--shadow-lg)]! [backdrop-filter:blur(10px)_saturate(120%)]! [position:relative]! [overflow:hidden]! [&::before]:[content:'']! [&::before]:[position:absolute]! [&::before]:[top:0]! [&::before]:[left:0]! [&::before]:[right:0]! [&::before]:[height:4px]! [&::before]:[background:linear-gradient(90deg,_var(--accent-primary),_var(--accent-secondary))]! [&::before]:[opacity:0.95]! [&_h3]:[margin:0_0_8px_0]! [&_h3]:[font-size:1.25rem]! [&_h3]:[font-weight:800]! [&_h3]:[color:var(--text-primary)]! [&_p]:[color:var(--text-secondary)]! [&_p]:[margin-bottom:12px]! [&_p]:[line-height:1.4]! max-[480.01px]:[padding:18px]! max-[480.01px]:[border-radius:14px]! max-[480.01px]:[&_h3]:[font-size:1.05rem]!" role="document" aria-labelledby="mt-confirm-modal-title">
              <h3 id="mt-confirm-modal-title">Confirm Team Finalization</h3>
              <p>
                <strong>Warning:</strong> This will LOCK your registration and this action can't be undone. You cannot Add/Delete any Team Members after confirming.
              </p>
              <p>
                Only press {" "}<strong>CONFIRM</strong> when you DO NOT want to Add/Remove any member from your team.
              </p>

              <div className="mt-modal-actions [display:flex]! [gap:10px]! [justify-content:flex-end]! [margin-top:14px]!">
                <button type="button" className="mt-modal-btn [padding:9px_14px]! [border-radius:10px]! [font-weight:700]! [cursor:pointer]! [font-size:0.95rem]! [border:1px_solid_rgba(255,255,255,0.06)]! [transition:transform_0.12s_ease,_box-shadow_0.12s_ease]! [&:disabled]:[opacity:0.6]! [&:disabled]:[cursor:not-allowed]! [&:disabled]:[transform:none]! [&.cancel]:[background:transparent]! [&.cancel]:[color:var(--text-primary)]! [&.cancel]:[border-color:rgba(255,255,255,0.06)]! [&.cancel:hover:not(:disabled)]:[transform:translateY(-2px)]! [&.cancel:hover:not(:disabled)]:[box-shadow:0_6px_18px_rgba(0,0,0,0.45)]! [&.delete]:[background:linear-gradient(135deg,_var(--accent-danger),_rgba(239,68,68,0.9))]! [&.delete]:[color:#fff]! [&.delete]:[border:none]! [&.delete]:[box-shadow:0_6px_18px_rgba(239,68,68,0.12)]! [&.delete:hover:not(:disabled)]:[transform:translateY(-2px)]! [&.delete:hover:not(:disabled)]:[box-shadow:0_10px_28px_rgba(239,68,68,0.18)]! max-[480.01px]:[padding:8px_12px]! max-[480.01px]:[font-size:0.92rem]! cancel" onClick={() => setConfirmTargetTeam(null)}>
                  Cancel
                </button>
                <button type="button" className="mt-modal-btn [padding:9px_14px]! [border-radius:10px]! [font-weight:700]! [cursor:pointer]! [font-size:0.95rem]! [border:1px_solid_rgba(255,255,255,0.06)]! [transition:transform_0.12s_ease,_box-shadow_0.12s_ease]! [&:disabled]:[opacity:0.6]! [&:disabled]:[cursor:not-allowed]! [&:disabled]:[transform:none]! [&.cancel]:[background:transparent]! [&.cancel]:[color:var(--text-primary)]! [&.cancel]:[border-color:rgba(255,255,255,0.06)]! [&.cancel:hover:not(:disabled)]:[transform:translateY(-2px)]! [&.cancel:hover:not(:disabled)]:[box-shadow:0_6px_18px_rgba(0,0,0,0.45)]! [&.delete]:[background:linear-gradient(135deg,_var(--accent-danger),_rgba(239,68,68,0.9))]! [&.delete]:[color:#fff]! [&.delete]:[border:none]! [&.delete]:[box-shadow:0_6px_18px_rgba(239,68,68,0.12)]! [&.delete:hover:not(:disabled)]:[transform:translateY(-2px)]! [&.delete:hover:not(:disabled)]:[box-shadow:0_10px_28px_rgba(239,68,68,0.18)]! max-[480.01px]:[padding:8px_12px]! max-[480.01px]:[font-size:0.92rem]! confirm" onClick={() => handleConfirmTeam(confirmTargetTeam)}>
                  Confirm
                </button>
              </div>
            </div>
          </div>}
      </div>
    </>;
};
export default ManageTeam;
