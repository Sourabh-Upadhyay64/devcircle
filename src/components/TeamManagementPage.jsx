import React, { useState, useEffect } from 'react';
import { Users, Plus, Settings, Copy, Mail, Crown, Trash2, UserPlus, X } from 'lucide-react';
import './TeamManagementPage.css';

// A simple Notification component to replace alerts
const Notification = ({ message, type, onDismiss }) => {
  if (!message) return null;
  const baseClasses = "notification";
  const typeClasses = type === 'error' ? 'notification-error' : 'notification-success';

  return (
    <div className={`${baseClasses} ${typeClasses}`}>
      <p>{message}</p>
      <button onClick={onDismiss} className="notification-dismiss">
        <X size={18} />
      </button>
    </div>
  );
};

// A simple Confirmation Modal to replace window.confirm
const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
    if (!message) return null;
    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <p className="modal-message">{message}</p>
                <div className="modal-actions">
                    <button onClick={onCancel} className="btn btn-secondary">Cancel</button>
                    <button onClick={onConfirm} className="btn btn-danger">Confirm</button>
                </div>
            </div>
        </div>
    );
};


// Main App Component to render the page
export default function App() {
  return <TeamManagementPage />;
}


const TeamManagementPage = () => {
  // Mock data - in a real app, this would come from an API
  const [currentUser] = useState({
    id: 'user1',
    name: 'Alex Johnson',
    email: 'alex@example.com'
  });

  // Team state
  const [userTeam, setUserTeam] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreatingTeam, setIsCreatingTeam] = useState(false);
  const [isJoiningTeam, setIsJoiningTeam] = useState(false);
  const [isEditingTeam, setIsEditingTeam] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);

  // Form states
  const [teamForm, setTeamForm] = useState({ name: '', description: '', maxMembers: 4 });
  const [joinCode, setJoinCode] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');

  // Notification and Confirmation State
  const [notification, setNotification] = useState({ message: '', type: 'success' });
  const [confirmation, setConfirmation] = useState({ message: '', onConfirm: null });

  // Mock API call to fetch initial team data
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      // To test the "no team" view, set the initial team to null
      // setUserTeam(null);
      setUserTeam({
        id: 'team1',
        name: 'Code Crushers',
        description: 'Building the next generation of sustainable tech solutions',
        maxMembers: 4,
        inviteCode: 'CC2024XYZ',
        members: [
          { id: 'user1', name: 'Alex Johnson', email: 'alex@example.com', role: 'Leader' },
          { id: 'user2', name: 'Sarah Chen', email: 'sarah@example.com', role: 'Member' },
          { id: 'user3', name: 'Mike Rodriguez', email: 'mike@example.com', role: 'Member' }
        ]
      });
      setIsLoading(false);
    }, 1000);
  }, []);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: '', type: 'success' }), 4000);
  };

  const handleCreateTeam = () => {
    if (!teamForm.name.trim()) {
      showNotification('Please enter a team name', 'error');
      return;
    }
    const newTeam = {
      id: 'team_' + Date.now(),
      ...teamForm,
      inviteCode: Math.random().toString(36).substring(2, 10).toUpperCase(),
      members: [{ ...currentUser, role: 'Leader' }]
    };
    setUserTeam(newTeam);
    setIsCreatingTeam(false);
    setTeamForm({ name: '', description: '', maxMembers: 4 });
    showNotification('Team created successfully!', 'success');
  };

  const handleJoinTeam = (e) => {
    e.preventDefault();
    if (!joinCode.trim()) {
      showNotification('Please enter an invite code', 'error');
      return;
    }
    showNotification(`Joining team with code: ${joinCode}`, 'success');
    // In a real app, you'd make an API call here and update the team state
    setIsJoiningTeam(false);
    setJoinCode('');
  };

  const handleUpdateTeam = () => {
    if (!teamForm.name.trim()) {
      showNotification('Team name cannot be empty', 'error');
      return;
    }
    setUserTeam(prev => ({ ...prev, ...teamForm }));
    setIsEditingTeam(false);
    showNotification('Team settings updated!', 'success');
  };

  const copyToClipboard = (text) => {
    // Using the 'execCommand' for broader iframe compatibility
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        document.execCommand('copy');
        showNotification('Invite link copied to clipboard!', 'success');
    } catch (err) {
        showNotification('Failed to copy link.', 'error');
    }
    document.body.removeChild(textArea);
  };

  const sendEmailInvite = () => {
    if (!inviteEmail) return;
    showNotification(`Invite sent to ${inviteEmail}`, 'success');
    setInviteEmail('');
    setShowInviteModal(false);
  };

  const removeMember = (memberId) => {
    const action = () => {
        setUserTeam(prev => ({
            ...prev,
            members: prev.members.filter(m => m.id !== memberId)
        }));
        setConfirmation({ message: '', onConfirm: null });
        showNotification('Member removed from the team.', 'success');
    };
    setConfirmation({
        message: 'Are you sure you want to remove this member?',
        onConfirm: action
    });
  };

  const changeRole = (memberId, newRole) => {
    setUserTeam(prev => ({
      ...prev,
      members: prev.members.map(m =>
        m.id === memberId ? { ...m, role: newRole } : m
      )
    }));
    showNotification('Member role updated.', 'success');
  };

  const startEditing = () => {
    setTeamForm({
      name: userTeam.name,
      description: userTeam.description,
      maxMembers: userTeam.maxMembers
    });
    setIsEditingTeam(true);
  };
  
  const inviteLink = userTeam ? `${window.location.origin}/join/${userTeam.inviteCode}` : '';
  const isTeamLeader = userTeam?.members.find(m => m.id === currentUser.id)?.role === 'Leader';

  // --- Render Logic ---

  if (isLoading) {
    return <div className="page-container"><div className="loader"></div></div>;
  }

  // View when user has NO team
  if (!userTeam && !isCreatingTeam && !isJoiningTeam) {
    return (
      <div className="page-container">
        <div className="container-centered">
          <div className="card text-center">
            <div className="icon-wrapper-lg bg-blue">
              <Users size={40} className="icon-blue" />
            </div>
            <h1 className="heading-xl">Join the Adventure</h1>
            <p className="text-secondary">
              Great ideas come from great teams. Create your own team or join an existing one to start building something amazing.
            </p>
            <div className="grid-2-col">
              <button onClick={() => setIsCreatingTeam(true)} className="card-button bg-blue">
                <Plus size={32} className="card-button-icon" />
                <h3 className="heading-md">Create New Team</h3>
                <p className="card-button-text text-blue">Start fresh with your own team</p>
              </button>
              <button onClick={() => setIsJoiningTeam(true)} className="card-button bg-green">
                <UserPlus size={32} className="card-button-icon" />
                <h3 className="heading-md">Join Existing Team</h3>
                <p className="card-button-text text-green">Have an invite code? Join now</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // View for CREATING a team
  if (isCreatingTeam) {
    return (
      <div className="page-container">
        <div className="container-form">
          <div className="card">
            <h1 className="heading-lg"><Plus className="icon-blue" /> Create Your Team</h1>
            <div className="form-body">
              <div className="form-group">
                <label className="form-label">Team Name *</label>
                <input type="text" required value={teamForm.name} onChange={(e) => setTeamForm({...teamForm, name: e.target.value})} className="form-input" placeholder="Enter your team name" />
              </div>
              <div className="form-group">
                <label className="form-label">Team Description</label>
                <textarea value={teamForm.description} onChange={(e) => setTeamForm({...teamForm, description: e.target.value})} rows={4} className="form-textarea" placeholder="Describe your team's vision and goals..." />
              </div>
              <div className="form-group">
                <label className="form-label">Maximum Members</label>
                <select value={teamForm.maxMembers} onChange={(e) => setTeamForm({...teamForm, maxMembers: parseInt(e.target.value)})} className="form-select">
                  {[2, 3, 4, 5].map(n => <option key={n} value={n}>{n} Members</option>)}
                </select>
              </div>
              <div className="form-actions">
                <button onClick={handleCreateTeam} className="btn btn-primary">Create Team</button>
                <button onClick={() => setIsCreatingTeam(false)} className="btn btn-secondary">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // View for JOINING a team
  if (isJoiningTeam) {
    return (
      <div className="page-container">
        <div className="container-form">
          <div className="card">
            <h1 className="heading-lg"><UserPlus className="icon-green" /> Join a Team</h1>
            <form onSubmit={handleJoinTeam} className="form-body">
              <div className="form-group">
                <label className="form-label">Team Invite Code *</label>
                <input type="text" required value={joinCode} onChange={(e) => setJoinCode(e.target.value.toUpperCase())} className="form-input-code" placeholder="ENTER INVITE CODE" />
                <p className="form-help-text">Ask your team leader for the invite code.</p>
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary-green">Join Team</button>
                <button type="button" onClick={() => setIsJoiningTeam(false)} className="btn btn-secondary">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Main view when user HAS a team
  return (
    <div className="page-container">
      <div className="container-main">
        {/* Notification Area */}
        <Notification 
            message={notification.message} 
            type={notification.type} 
            onDismiss={() => setNotification({ message: '', type: 'success' })} 
        />
        {/* Confirmation Modal */}
        <ConfirmationModal 
            message={confirmation.message}
            onConfirm={confirmation.onConfirm}
            onCancel={() => setConfirmation({ message: '', onConfirm: null })}
        />

        {/* Header Card */}
        <div className="card">
          <div className="team-header">
            <div>
              <h1 className="heading-xl">{userTeam.name}</h1>
              <p className="text-secondary">{userTeam.description}</p>
            </div>
            {isTeamLeader && (
              <div className="header-actions">
                <button onClick={() => setShowInviteModal(true)} className="btn btn-primary"><UserPlus size={16} /> Invite Members</button>
                <button onClick={startEditing} className="btn btn-secondary"><Settings size={16} /> Settings</button>
              </div>
            )}
          </div>
          <div className="team-tags">
            <div className="tag tag-blue">{userTeam.members.length}/{userTeam.maxMembers} Members</div>
            <div className="tag tag-green">Code: {userTeam.inviteCode}</div>
          </div>
        </div>

        {/* Team Members Card */}
        <div className="card">
          <h2 className="heading-lg"><Users className="icon-blue" /> Team Members</h2>
          <div className="member-list">
            {userTeam.members.map((member) => (
              <div key={member.id} className="member-item">
                <div className="member-info">
                  <div className="avatar">{member.name.charAt(0)}</div>
                  <div>
                    <h3 className="member-name">{member.name}</h3>
                    <p className="member-email">{member.email}</p>
                  </div>
                </div>
                <div className="member-controls">
                  <div className={`role-tag ${member.role === 'Leader' ? 'role-leader' : 'role-member'}`}>
                    {member.role === 'Leader' && <Crown size={14} />}
                    <span>{member.role}</span>
                  </div>
                  {isTeamLeader && member.id !== currentUser.id && (
                    <div className="leader-actions">
                      <select value={member.role} onChange={(e) => changeRole(member.id, e.target.value)} className="role-select">
                        <option value="Member">Member</option>
                        <option value="Leader">Leader</option>
                      </select>
                      <button onClick={() => removeMember(member.id)} className="btn-icon-danger" title="Remove member">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h3 className="modal-title">Invite Team Members</h3>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Share Invite Link</label>
                <div className="input-group">
                  <input type="text" readOnly value={inviteLink} className="form-input-readonly" />
                  <button onClick={() => copyToClipboard(inviteLink)} className="btn-icon-primary" title="Copy link"><Copy size={16} /></button>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Send Email Invite</label>
                <div className="input-group">
                  <input type="email" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} placeholder="teammate@example.com" className="form-input" />
                  <button onClick={sendEmailInvite} className="btn-icon-green" title="Send invite"><Mail size={16} /></button>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={() => setShowInviteModal(false)} className="btn btn-secondary">Done</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Team Modal */}
      {isEditingTeam && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h3 className="modal-title">Edit Team Settings</h3>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Team Name</label>
                <input type="text" required value={teamForm.name} onChange={(e) => setTeamForm({...teamForm, name: e.target.value})} className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea value={teamForm.description} onChange={(e) => setTeamForm({...teamForm, description: e.target.value})} rows={3} className="form-textarea" />
              </div>
              <div className="form-group">
                <label className="form-label">Maximum Members</label>
                <select value={teamForm.maxMembers} onChange={(e) => setTeamForm({...teamForm, maxMembers: parseInt(e.target.value)})} className="form-select">
                    {[2, 3, 4, 5].map(n => <option key={n} value={n}>{n} Members</option>)}
                </select>
              </div>
            </div>
            <div className="modal-footer-alt">
              <button onClick={() => setIsEditingTeam(false)} className="btn btn-secondary">Cancel</button>
              <button onClick={handleUpdateTeam} className="btn btn-primary">Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
