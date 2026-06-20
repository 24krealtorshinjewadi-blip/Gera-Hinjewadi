'use client';
/* eslint-disable react-hooks/set-state-in-effect */

import { useState, useEffect } from 'react';
import {
  ShieldAlert,
  Search,
  Calendar,
  Trash2,
  FileSpreadsheet,
  Edit,
  Filter,
  AlertCircle,
  LogOut
} from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  budget: string;
  configuration: string;
  message: string | null;
  project: string;
  source: string;
  status: 'New' | 'Contacted' | 'Site Visit' | 'Negotiation' | 'Booked' | 'Lost';
  notes: string | null;
  site_visit_date: string | null;
  created_at: string;
  assigned_agent_id?: string | null;
  agent_name?: string | null;
}

interface Agent {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  active: boolean;
  created_at: string;
}

interface FollowUpLog {
  id: string;
  lead_id: string;
  agent_id: string | null;
  agent_name?: string | null;
  status: string;
  notes: string;
  created_at: string;
}

export default function AdminDashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Tab/View state
  const [activeView, setActiveView] = useState<'leads' | 'agents'>('leads');

  // Agents registry states
  const [agents, setAgents] = useState<Agent[]>([]);
  const [agentName, setAgentName] = useState('');
  const [agentPhone, setAgentPhone] = useState('');
  const [agentEmail, setAgentEmail] = useState('');
  const [isAddingAgent, setIsAddingAgent] = useState(false);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [budgetFilter, setBudgetFilter] = useState('');
  const [projectFilter, setProjectFilter] = useState('');

  // Selected Lead state for Edit dialog
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [leadToDelete, setLeadToDelete] = useState<Lead | null>(null);

  // Edit form states
  const [editStatus, setEditStatus] = useState<string>('New');
  const [editNotes, setEditNotes] = useState<string>('');
  const [editVisitDate, setEditVisitDate] = useState<string>('');
  const [editAssignedAgentId, setEditAssignedAgentId] = useState<string>('');
  const [isUpdating, setIsUpdating] = useState(false);

  // Timeline comment states
  const [followUps, setFollowUps] = useState<FollowUpLog[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isAddingComment, setIsAddingComment] = useState(false);

  // Logout handler
  const handleLogout = async () => {
    try {
      const res = await fetch('/api/admin/logout', { method: 'POST' });
      if (res.ok) {
        window.location.href = '/admin/login';
      } else {
        alert('Failed to log out');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Load leads from API
  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/leads');
      const data = await res.json();
      setLeads(data.leads || []);
    } catch (error) {
      console.error('Failed to load leads:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load agents from API
  const fetchAgents = async () => {
    try {
      const res = await fetch('/api/agents');
      const data = await res.json();
      setAgents(data.agents || []);
    } catch (error) {
      console.error('Failed to load agents:', error);
    }
  };

  useEffect(() => {
    fetchLeads();
    fetchAgents();
  }, []);

  // Filter/Search processing
  useEffect(() => {
    let result = [...leads];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (l) =>
          l.name.toLowerCase().includes(query) ||
          l.phone.includes(query) ||
          (l.email && l.email.toLowerCase().includes(query))
      );
    }

    if (statusFilter) {
      result = result.filter((l) => l.status === statusFilter);
    }

    if (budgetFilter) {
      result = result.filter((l) => l.budget === budgetFilter);
    }

    if (projectFilter) {
      result = result.filter((l) => l.project === projectFilter);
    }

    setFilteredLeads(result);
  }, [leads, searchQuery, statusFilter, budgetFilter, projectFilter]);

  // Statistics Computations
  const totalLeads = leads.length;
  
  const todayLeads = leads.filter((l) => {
    const leadDate = new Date(l.created_at);
    const today = new Date();
    return (
      leadDate.getDate() === today.getDate() &&
      leadDate.getMonth() === today.getMonth() &&
      leadDate.getFullYear() === today.getFullYear()
    );
  }).length;

  const thisWeekLeads = leads.filter((l) => {
    const leadDate = new Date(l.created_at);
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return leadDate >= oneWeekAgo;
  }).length;

  const thisMonthLeads = leads.filter((l) => {
    const leadDate = new Date(l.created_at);
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    return leadDate >= oneMonthAgo;
  }).length;

  const siteVisitsCount = leads.filter((l) => l.status === 'Site Visit').length;
  const bookingsCount = leads.filter((l) => l.status === 'Booked').length;



  // Fetch lead follow-up history logs
  const fetchFollowUps = async (leadId: string) => {
    try {
      const res = await fetch(`/api/leads/${leadId}/follow-ups`);
      if (res.ok) {
        const data = await res.json();
        setFollowUps(data.logs || []);
      }
    } catch (error) {
      console.error('Failed to load followups timeline:', error);
    }
  };

  // Open Edit Modal Dialog
  const openEditModal = (lead: Lead) => {
    setSelectedLead(lead);
    setEditStatus(lead.status);
    setEditNotes(lead.notes || '');
    setEditAssignedAgentId(lead.assigned_agent_id || '');
    setNewComment('');
    setFollowUps([]);
    
    // Format timestamp back to local datetime picker input format (YYYY-MM-DDThh:mm)
    if (lead.site_visit_date) {
      const dt = new Date(lead.site_visit_date);
      const tzOffset = dt.getTimezoneOffset() * 60000;
      const localISOTime = new Date(dt.getTime() - tzOffset).toISOString().slice(0, 16);
      setEditVisitDate(localISOTime);
    } else {
      setEditVisitDate('');
    }
    
    // Fetch timeline asynchronously
    fetchFollowUps(lead.id);
    setIsEditModalOpen(true);
  };

  // Submit Lead Updates
  const handleUpdateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead) return;

    setIsUpdating(true);
    try {
      const response = await fetch(`/api/leads/${selectedLead.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: editStatus,
          notes: editNotes,
          site_visit_date: editVisitDate ? new Date(editVisitDate).toISOString() : null,
          assigned_agent_id: editAssignedAgentId || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update lead');
      }

      // Refresh data
      await fetchLeads();
      setIsEditModalOpen(false);
      setSelectedLead(null);
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : 'Error occurred while updating.';
      alert(errMsg);
    } finally {
      setIsUpdating(false);
    }
  };

  // Post a new timeline comment
  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead || !newComment.trim()) return;

    setIsAddingComment(true);
    try {
      const response = await fetch(`/api/leads/${selectedLead.id}/follow-ups`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: editStatus,
          notes: newComment.trim(),
          agent_id: editAssignedAgentId || null,
        }),
      });

      if (response.ok) {
        setNewComment('');
        // Refresh timeline
        await fetchFollowUps(selectedLead.id);
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to add comment');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setIsAddingComment(false);
    }
  };

  // Add a new agent to registry
  const handleAddAgent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agentName.trim() || !agentPhone.trim()) return;

    setIsAddingAgent(true);
    try {
      const response = await fetch('/api/agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: agentName.trim(),
          phone: agentPhone.trim(),
          email: agentEmail.trim() || null,
        }),
      });

      if (response.ok) {
        setAgentName('');
        setAgentPhone('');
        setAgentEmail('');
        await fetchAgents();
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to add agent');
      }
    } catch (error) {
      console.error('Error adding agent:', error);
    } finally {
      setIsAddingAgent(false);
    }
  };

  // Toggle active/inactive status for agent
  const handleToggleAgentActive = async (agent: Agent) => {
    try {
      const response = await fetch(`/api/agents/${agent.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !agent.active }),
      });
      if (response.ok) {
        await fetchAgents();
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to toggle status');
      }
    } catch (error) {
      console.error('Error toggling agent status:', error);
    }
  };

  // Delete agent
  const handleDeleteAgent = async (agentId: string) => {
    if (!confirm('Are you sure you want to delete this agent? Leads assigned to this agent will be unassigned.')) return;
    try {
      const response = await fetch(`/api/agents/${agentId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        await fetchAgents();
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to delete agent');
      }
    } catch (error) {
      console.error('Error deleting agent:', error);
    }
  };

  // Open Delete Confirmation
  const openDeleteModal = (lead: Lead) => {
    setLeadToDelete(lead);
    setIsDeleteModalOpen(true);
  };

  // Confirm Delete lead
  const handleDeleteLead = async () => {
    if (!leadToDelete) return;

    try {
      const response = await fetch(`/api/leads/${leadToDelete.id}`, {
        method: 'DELETE',
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete lead');
      }

      await fetchLeads();
      setIsDeleteModalOpen(false);
      setLeadToDelete(null);
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : 'Error occurred while deleting.';
      alert(errMsg);
    }
  };

  // Export Filtered Leads to CSV
  const handleExportCSV = () => {
    if (filteredLeads.length === 0) {
      alert('No leads available to export.');
      return;
    }

    // CSV header row
    const headers = [
      'Name',
      'Phone',
      'Email',
      'Budget',
      'Configuration',
      'Project',
      'Source',
      'Status',
      'Notes',
      'Site Visit Date',
      'Date Created',
    ];

    // CSV body rows
    const rows = filteredLeads.map((lead) => [
      `"${lead.name.replace(/"/g, '""')}"`,
      `"${lead.phone}"`,
      `"${lead.email || ''}"`,
      `"${lead.budget}"`,
      `"${lead.configuration}"`,
      `"${lead.project}"`,
      `"${lead.source}"`,
      `"${lead.status}"`,
      `"${(lead.notes || '').replace(/"/g, '""')}"`,
      `"${lead.site_visit_date ? new Date(lead.site_visit_date).toLocaleString() : 'N/A'}"`,
      `"${new Date(lead.created_at).toLocaleString()}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Gera_Leads_Export_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Helper styling for status badges
  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'New':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Contacted':
        return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      case 'Site Visit':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'Negotiation':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'Booked':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Lost':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <header className="border-b border-slate-900 bg-slate-950 py-4.5 px-6 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="bg-slate-900 border border-gold-500/30 p-2 rounded-lg text-gold-400">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-base font-extrabold uppercase tracking-wider text-white">
              Gera CRM <span className="gold-gradient-text">Dashboard</span>
            </h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
              Lead Management System
            </p>
          </div>
        </div>

        {/* Actions / Tabs & Logout */}
        <div className="flex items-center gap-3">
          {/* Desktop View Tab Switcher */}
          <div className="hidden sm:flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-lg p-1">
            <button
              onClick={() => setActiveView('leads')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeView === 'leads'
                  ? 'bg-gold-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Leads
            </button>
            <button
              onClick={() => setActiveView('agents')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeView === 'agents'
                  ? 'bg-gold-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sales Agents
            </button>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-2 border border-slate-800 rounded-lg bg-slate-900/60 hover:bg-red-950/20 hover:border-red-500/30 text-slate-400 hover:text-red-400 transition-all text-xs font-bold uppercase tracking-wider cursor-pointer"
            title="Log out of CRM"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>

      </header>

      {/* Main Container */}
      <main className="flex-grow p-6 max-w-7xl mx-auto w-full space-y-6">
        
        {/* Mobile View Tab Switcher */}
        <div className="flex sm:hidden w-full bg-slate-900 border border-slate-800 rounded-lg p-1 gap-1">
          <button
            onClick={() => setActiveView('leads')}
            className={`flex-1 text-center py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeView === 'leads'
                ? 'bg-gold-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Leads
          </button>
          <button
            onClick={() => setActiveView('agents')}
            className={`flex-1 text-center py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeView === 'agents'
                ? 'bg-gold-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sales Agents
          </button>
        </div>

        {activeView === 'leads' ? (
          <>
            {/* KPI Metrics row */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { label: 'Total Leads', count: totalLeads, color: 'text-white' },
                { label: "Today's Leads", count: todayLeads, color: 'text-blue-400' },
                { label: 'This Week', count: thisWeekLeads, color: 'text-gold-400' },
                { label: 'This Month', count: thisMonthLeads, color: 'text-purple-400' },
                { label: 'Site Visits', count: siteVisitsCount, color: 'text-orange-400' },
                { label: 'Bookings', count: bookingsCount, color: 'text-emerald-400' },
              ].map((stat, idx) => (
                <div key={idx} className="bg-slate-900/40 border border-slate-900 p-4 rounded-xl text-left">
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                    {stat.label}
                  </span>
                  <p className={`text-2xl font-extrabold mt-1.5 ${stat.color}`}>
                    {isLoading ? '...' : stat.count}
                  </p>
                </div>
              ))}
            </div>

            {/* Filters and Controls Area */}
            <div className="bg-slate-900/30 border border-slate-900 rounded-2xl p-5 space-y-4">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                {/* Search Bar */}
                <div className="relative w-full md:max-w-md">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search leads by name, phone or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-gold-500 rounded-lg pl-9 pr-4 py-2.5 text-white placeholder-slate-600 text-xs focus:outline-none transition-all"
                  />
                </div>

                {/* CSV export */}
                <button
                  onClick={handleExportCSV}
                  className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-gold-500 to-gold-600 text-slate-950 text-xs font-bold uppercase tracking-wider rounded-lg hover:opacity-90 active:scale-[0.98] transition-all shadow-md cursor-pointer"
                >
                  <FileSpreadsheet className="h-4 w-4" />
                  <span>Export CSV ({filteredLeads.length})</span>
                </button>
              </div>

              {/* Filters Select boxes */}
              <div className="flex flex-wrap gap-3 pt-2 border-t border-slate-900">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-bold uppercase tracking-wider">
                  <Filter className="h-3.5 w-3.5 text-gold-500" />
                  <span>Filters:</span>
                </div>

                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-lg px-3 py-1.5 focus:border-gold-500 focus:outline-none"
                >
                  <option value="">All Statuses</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Site Visit">Site Visit</option>
                  <option value="Negotiation">Negotiation</option>
                  <option value="Booked">Booked</option>
                  <option value="Lost">Lost</option>
                </select>

                {/* Project Filter */}
                <select
                  value={projectFilter}
                  onChange={(e) => setProjectFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-lg px-3 py-1.5 focus:border-gold-500 focus:outline-none"
                >
                  <option value="">All Projects</option>
                  <option value="Gera Winds of Joy">Gera Winds of Joy</option>
                  <option value="Gera Joy on the Treetops">Gera Joy on the Treetops</option>
                  <option value="Gera Developer Profile">Developer Profile</option>
                </select>

                {/* Budget Filter */}
                <select
                  value={budgetFilter}
                  onChange={(e) => setBudgetFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-lg px-3 py-1.5 focus:border-gold-500 focus:outline-none"
                >
                  <option value="">All Budgets</option>
                  <option value="₹75 Lakhs - ₹90 Lakhs">₹75 L - ₹90 L</option>
                  <option value="₹90 Lakhs - ₹1.2 Cr">₹90 L - ₹1.2 Cr</option>
                  <option value="₹1.2 Cr - ₹1.5 Cr">₹1.2 Cr - ₹1.5 Cr</option>
                  <option value="Above ₹1.5 Cr">Above ₹1.5 Cr</option>
                </select>

                {/* Clear filters button */}
                {(statusFilter || budgetFilter || projectFilter || searchQuery) && (
                  <button
                    onClick={() => {
                      setStatusFilter('');
                      setBudgetFilter('');
                      setProjectFilter('');
                      setSearchQuery('');
                    }}
                    className="text-gold-400 hover:text-white text-xs font-bold uppercase tracking-wider"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </div>

            {/* Lead Table card */}
            <div className="bg-slate-900/20 border border-slate-900 rounded-2xl overflow-hidden shadow-xl">
              {isLoading ? (
                <div className="py-24 text-center text-xs text-slate-500 space-y-2">
                  <div className="w-6 h-6 border-2 border-t-gold-500 border-slate-800 rounded-full animate-spin mx-auto" />
                  <span>Retrieving real estate records...</span>
                </div>
              ) : filteredLeads.length === 0 ? (
                <div className="py-24 text-center text-xs text-slate-500 space-y-2">
                  <AlertCircle className="h-6 w-6 text-slate-600 mx-auto" />
                  <span>No matching leads found matching criteria.</span>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-900 bg-slate-950 text-[10px] font-extrabold uppercase tracking-widest text-gold-400">
                        <th className="px-5 py-4">Lead Info</th>
                        <th className="px-5 py-4">Requirements</th>
                        <th className="px-5 py-4">Project & Source</th>
                        <th className="px-5 py-4">Status</th>
                        <th className="px-5 py-4">Site Visit</th>
                        <th className="px-5 py-4">Notes</th>
                        <th className="px-5 py-4">Enquiry Date</th>
                        <th className="px-5 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-900/60 text-xs">
                      {filteredLeads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-slate-900/30 transition-colors">
                          {/* Lead Info */}
                          <td className="px-5 py-4">
                            <div className="space-y-0.5 text-left">
                              <p className="font-bold text-white text-sm">{lead.name}</p>
                              <p className="text-slate-300 font-semibold">{lead.phone}</p>
                              {lead.email && <p className="text-slate-500">{lead.email}</p>}
                              
                              {/* Assigned agent badge */}
                              <div className="mt-1">
                                {lead.agent_name ? (
                                  <span className="inline-block text-[9px] px-1.5 py-0.5 border border-purple-500/20 bg-purple-500/10 text-purple-400 uppercase tracking-wider rounded font-bold">
                                    Agent: {lead.agent_name}
                                  </span>
                                ) : (
                                  <span className="inline-block text-[9px] px-1.5 py-0.5 border border-slate-800 bg-slate-900/60 text-slate-500 uppercase tracking-wider rounded font-semibold">
                                    Unassigned
                                  </span>
                                )}
                              </div>
                            </div>
                          </td>

                          {/* Requirements */}
                          <td className="px-5 py-4">
                            <div className="space-y-0.5 text-left">
                              <p className="font-semibold text-slate-200">{lead.configuration}</p>
                              <p className="text-gold-400 font-bold">{lead.budget}</p>
                            </div>
                          </td>

                          {/* Project & Source */}
                          <td className="px-5 py-4">
                            <div className="space-y-0.5 text-left">
                              <p className="font-semibold text-slate-300">{lead.project}</p>
                              <span className="text-[10px] px-1.5 py-0.5 border border-slate-800 rounded bg-slate-900/80 text-slate-400 uppercase tracking-wider">
                                {lead.source}
                              </span>
                            </div>
                          </td>

                          {/* Status */}
                          <td className="px-5 py-4">
                            <span className={`px-2 py-1 border text-[10px] font-extrabold uppercase tracking-wider rounded-full ${getStatusBadgeStyle(lead.status)}`}>
                              {lead.status}
                            </span>
                          </td>

                          {/* Site Visit */}
                          <td className="px-5 py-4">
                            {lead.site_visit_date ? (
                              <div className="flex items-center gap-1 text-purple-400 font-semibold">
                                <Calendar className="h-3.5 w-3.5" />
                                <span>{new Date(lead.site_visit_date).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</span>
                              </div>
                            ) : (
                              <span className="text-slate-600 font-medium">Not Scheduled</span>
                            )}
                          </td>

                          {/* Notes */}
                          <td className="px-5 py-4 max-w-[200px] truncate text-slate-400 text-left">
                            {lead.notes || <span className="text-slate-700 italic">None</span>}
                          </td>

                          {/* Enquiry Date */}
                          <td className="px-5 py-4 text-slate-500 font-semibold">
                            {new Date(lead.created_at).toLocaleDateString()}
                          </td>

                          {/* Actions */}
                          <td className="px-5 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => openEditModal(lead)}
                                className="p-2 border border-slate-800 hover:border-gold-500/50 bg-slate-900 text-slate-300 hover:text-white rounded-lg transition-colors cursor-pointer"
                                title="Edit Lead CRM"
                              >
                                <Edit className="h-3.5 w-3.5" />
                              </button>
                              <button
                                onClick={() => openDeleteModal(lead)}
                                className="p-2 border border-slate-800 hover:border-red-500/50 bg-slate-900 text-slate-400 hover:text-red-400 rounded-lg transition-colors cursor-pointer"
                                title="Delete Lead Record"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        ) : (
          /* AGENTS REGISTRY VIEW */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left panel: Add Agent Form */}
            <div className="bg-slate-900/30 border border-slate-900 rounded-2xl p-6 text-left space-y-4 h-fit">
              <h3 className="text-base font-extrabold uppercase tracking-wider text-white">
                Register New <span className="gold-gradient-text">Sales Agent</span>
              </h3>
              <form onSubmit={handleAddAgent} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gold-300 uppercase tracking-widest mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Verma"
                    value={agentName}
                    onChange={(e) => setAgentName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-gold-500 rounded-lg px-3 py-2.5 text-white text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gold-300 uppercase tracking-widest mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 9600000000"
                    value={agentPhone}
                    onChange={(e) => setAgentPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-gold-500 rounded-lg px-3 py-2.5 text-white text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gold-300 uppercase tracking-widest mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. rahul@example.com"
                    value={agentEmail}
                    onChange={(e) => setAgentEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-gold-500 rounded-lg px-3 py-2.5 text-white text-xs focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isAddingAgent}
                  className="w-full py-3 bg-gradient-to-r from-gold-500 to-gold-600 text-slate-950 text-xs font-bold uppercase tracking-wider rounded-lg hover:opacity-90 active:scale-[0.98] transition-all shadow-md cursor-pointer"
                >
                  {isAddingAgent ? 'Registering...' : 'Add Agent'}
                </button>
              </form>
            </div>

            {/* Right panel: Agents Table */}
            <div className="lg:col-span-2 bg-slate-900/20 border border-slate-900 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-900 bg-slate-950 text-[10px] font-extrabold uppercase tracking-widest text-gold-400">
                      <th className="px-5 py-4">Agent Name</th>
                      <th className="px-5 py-4">Contact Detail</th>
                      <th className="px-5 py-4">Status</th>
                      <th className="px-5 py-4">Date Joined</th>
                      <th className="px-5 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-900/60 text-xs">
                    {agents.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-24 text-center text-xs text-slate-500">
                          No sales agents registered yet.
                        </td>
                      </tr>
                    ) : (
                      agents.map((agent) => (
                        <tr key={agent.id} className="hover:bg-slate-900/30 transition-colors">
                          <td className="px-5 py-4 font-bold text-white text-sm">
                            {agent.name}
                          </td>
                          <td className="px-5 py-4">
                            <div className="space-y-0.5">
                              <p className="text-slate-300 font-semibold">{agent.phone}</p>
                              {agent.email && <p className="text-slate-500">{agent.email}</p>}
                            </div>
                          </td>
                          <td className="px-5 py-4">
                            <button
                              onClick={() => handleToggleAgentActive(agent)}
                              className={`px-2 py-1 border text-[10px] font-extrabold uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                                agent.active
                                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                  : 'bg-red-500/10 text-red-400 border-red-500/20'
                              }`}
                            >
                              {agent.active ? 'Active' : 'Inactive'}
                            </button>
                          </td>
                          <td className="px-5 py-4 text-slate-500 font-semibold">
                            {new Date(agent.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-5 py-4 text-right">
                            <button
                              onClick={() => handleDeleteAgent(agent.id)}
                              className="p-2 border border-slate-800 hover:border-red-500/50 bg-slate-900 text-slate-400 hover:text-red-400 rounded-lg transition-colors cursor-pointer"
                              title="Delete Agent"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* EDIT LEAD MODAL DIALOG */}
      {isEditModalOpen && selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="glassmorphism max-w-4xl w-full max-h-[calc(100vh-2rem)] overflow-y-auto border-gold-500/30 text-white rounded-xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-900 pb-3">
              <h3 className="text-base font-extrabold uppercase tracking-wider text-white">
                CRM Lead File & <span className="gold-gradient-text">Timeline Log</span>
              </h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-slate-400 hover:text-white font-bold"
              >
                ✕
              </button>
            </div>

            {/* Quick Summary */}
            <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-900 flex flex-wrap justify-between items-center gap-3">
              <div className="text-left">
                <p className="text-sm font-bold text-white uppercase">{selectedLead.name}</p>
                <p className="text-xs text-slate-400">Phone: {selectedLead.phone} | Email: {selectedLead.email || 'N/A'}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold text-slate-300">Config: {selectedLead.configuration} | Budget: <span className="text-gold-400 font-bold">{selectedLead.budget}</span></p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">Source: {selectedLead.source} | Project: {selectedLead.project}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column: Form Settings */}
              <form onSubmit={handleUpdateLead} className="space-y-4 text-left border-r-0 md:border-r border-slate-900 md:pr-6">
                <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-2">Lead Settings</h4>
                
                {/* Status Select */}
                <div>
                  <label className="block text-[10px] font-bold text-gold-300 uppercase tracking-widest mb-1.5">
                    Lead Sales Status
                  </label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-xs focus:border-gold-500 focus:outline-none"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Site Visit">Site Visit</option>
                    <option value="Negotiation">Negotiation</option>
                    <option value="Booked">Booked</option>
                    <option value="Lost">Lost</option>
                  </select>
                </div>

                {/* Agent Select */}
                <div>
                  <label className="block text-[10px] font-bold text-gold-300 uppercase tracking-widest mb-1.5">
                    Assign to Sales Agent
                  </label>
                  <select
                    value={editAssignedAgentId}
                    onChange={(e) => setEditAssignedAgentId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-white text-xs focus:border-gold-500 focus:outline-none"
                  >
                    <option value="">-- Unassigned --</option>
                    {agents.map(a => {
                      if (!a.active && a.id !== editAssignedAgentId) return null;
                      return (
                        <option key={a.id} value={a.id}>
                          {a.name} ({a.phone}){!a.active ? ' [Inactive]' : ''}
                        </option>
                      );
                    })}
                  </select>
                </div>

                {/* Site Visit Schedule */}
                <div>
                  <label className="block text-[10px] font-bold text-gold-300 uppercase tracking-widest mb-1.5">
                    Schedule Site Visit
                  </label>
                  <input
                    type="datetime-local"
                    value={editVisitDate}
                    onChange={(e) => setEditVisitDate(e.target.value)}
                    style={{ colorScheme: 'dark' }}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-xs focus:border-gold-500 focus:outline-none [color-scheme:dark]"
                  />
                </div>

                {/* Original Notes Area */}
                <div>
                  <label className="block text-[10px] font-bold text-gold-300 uppercase tracking-widest mb-1.5">
                    Permanent CRM Notes
                  </label>
                  <textarea
                    rows={2}
                    value={editNotes}
                    onChange={(e) => setEditNotes(e.target.value)}
                    placeholder="General lead notes..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-xs focus:border-gold-500 focus:outline-none resize-none"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="flex-1 py-2.5 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="flex-1 py-2.5 bg-gradient-to-r from-gold-500 to-gold-600 hover:opacity-95 text-slate-950 text-xs font-bold uppercase tracking-wider rounded-lg shadow-md transition-all cursor-pointer"
                  >
                    {isUpdating ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>

              {/* Right Column: Timeline & Comments */}
              <div className="flex flex-col h-[340px] md:h-auto space-y-3 justify-between">
                <div className="space-y-1">
                  <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 text-left">Follow-Up History</h4>
                  <p className="text-[10px] text-slate-600 text-left uppercase">Chronological conversation log</p>
                </div>

                {/* Timeline display */}
                <div className="flex-grow overflow-y-auto bg-slate-950/60 border border-slate-900 rounded-lg p-3 space-y-3 max-h-[220px] min-h-[160px] text-left">
                  {followUps.length === 0 ? (
                    <div className="text-center text-[11px] text-slate-600 py-12 italic">
                      No follow-up log recorded yet.
                    </div>
                  ) : (
                    followUps.map((log) => (
                      <div key={log.id} className="border-l border-gold-500/40 pl-3.5 py-0.5 relative space-y-1">
                        <div className="absolute -left-[4.5px] top-1.5 w-2 h-2 rounded-full bg-gold-500" />
                        <div className="flex justify-between items-center text-[10px]">
                          <span className="font-extrabold text-gold-400 uppercase">{log.status}</span>
                          <span className="text-slate-500">{new Date(log.created_at).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</span>
                        </div>
                        <p className="text-slate-300 text-[11px] leading-relaxed pr-2">{log.notes}</p>
                        {log.agent_name && (
                          <p className="text-[9px] text-slate-500 italic">Logged by Agent: {log.agent_name}</p>
                        )}
                      </div>
                    ))
                  )}
                </div>

                {/* Add comment Form */}
                <form onSubmit={handleAddComment} className="flex gap-2 items-end">
                  <div className="flex-grow text-left">
                    <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">
                      Log New Action / Comment
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Call connected, customer wants site visit next Saturday..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-gold-500 rounded-lg px-3 py-2 text-white text-xs focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isAddingComment || !newComment.trim()}
                    className="px-4 py-2 bg-slate-900 border border-slate-800 hover:border-gold-500/50 hover:bg-slate-950 text-gold-400 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer h-[34px]"
                  >
                    {isAddingComment ? 'Saving...' : 'Add Log'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM DIALOG */}
      {isDeleteModalOpen && leadToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="glassmorphism max-w-sm w-full border-red-500/20 text-white rounded-xl shadow-2xl p-6 space-y-4">
            <div className="text-center space-y-2">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-950/30 text-red-500 border border-red-500/20 mb-2">
                <Trash2 className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-white">
                Confirm Lead Deletion
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Are you sure you want to permanently delete lead record for <strong className="text-white">{leadToDelete.name}</strong>? This action cannot be undone.
              </p>
            </div>

            <div className="flex gap-2.5">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 py-2.5 border border-slate-800 hover:bg-slate-900 text-slate-300 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteLead}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-md transition-colors cursor-pointer"
              >
                Delete Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
