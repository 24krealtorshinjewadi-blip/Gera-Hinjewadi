'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ShieldAlert,
  Search,
  Download,
  Calendar,
  Trash2,
  FileSpreadsheet,
  LogOut,
  Edit,
  Clock,
  Filter,
  CheckCircle,
  AlertCircle,
  FileText,
  User,
  Plus
} from 'lucide-react';
import { useForm } from 'react-hook-form';

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
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
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
  const [isUpdating, setIsUpdating] = useState(false);

  // Load leads from API
  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/leads');
      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }
      const data = await res.json();
      setLeads(data.leads || []);
    } catch (error) {
      console.error('Failed to load leads:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
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

  // Logout action
  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Open Edit Modal Dialog
  const openEditModal = (lead: Lead) => {
    setSelectedLead(lead);
    setEditStatus(lead.status);
    setEditNotes(lead.notes || '');
    
    // Format timestamp back to local datetime picker input format (YYYY-MM-DDThh:mm)
    if (lead.site_visit_date) {
      const dt = new Date(lead.site_visit_date);
      const tzOffset = dt.getTimezoneOffset() * 60000;
      const localISOTime = new Date(dt.getTime() - tzOffset).toISOString().slice(0, 16);
      setEditVisitDate(localISOTime);
    } else {
      setEditVisitDate('');
    }
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
    } catch (error: any) {
      alert(error.message || 'Error occurred while updating.');
    } finally {
      setIsUpdating(false);
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
    } catch (error: any) {
      alert(error.message || 'Error occurred while deleting.');
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
              Authorized Agent Access Only
            </p>
          </div>
        </div>
        
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 px-4 py-2 border border-slate-800 rounded-lg hover:border-red-500/50 hover:bg-red-950/10 text-slate-400 hover:text-red-400 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </button>
      </header>

      {/* Main Container */}
      <main className="flex-grow p-6 max-w-7xl mx-auto w-full space-y-6">
        
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
                        <div className="space-y-0.5">
                          <p className="font-bold text-white text-sm">{lead.name}</p>
                          <p className="text-slate-300 font-semibold">{lead.phone}</p>
                          {lead.email && <p className="text-slate-500">{lead.email}</p>}
                        </div>
                      </td>

                      {/* Requirements */}
                      <td className="px-5 py-4">
                        <div className="space-y-0.5">
                          <p className="font-semibold text-slate-200">{lead.configuration}</p>
                          <p className="text-gold-400 font-bold">{lead.budget}</p>
                        </div>
                      </td>

                      {/* Project & Source */}
                      <td className="px-5 py-4">
                        <div className="space-y-0.5">
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
                      <td className="px-5 py-4 max-w-[200px] truncate text-slate-400">
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
      </main>

      {/* EDIT LEAD MODAL DIALOG */}
      {isEditModalOpen && selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="glassmorphism max-w-md w-full border-gold-500/30 text-white rounded-xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-900 pb-3">
              <h3 className="text-base font-extrabold uppercase tracking-wider text-white">
                Update CRM <span className="gold-gradient-text">Lead File</span>
              </h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-slate-400 hover:text-white font-bold"
              >
                ✕
              </button>
            </div>

            {/* Quick Summary */}
            <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-900 space-y-1">
              <p className="text-sm font-bold text-white uppercase">{selectedLead.name}</p>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Phone: {selectedLead.phone}</span>
                <span>Config: {selectedLead.configuration}</span>
              </div>
            </div>

            <form onSubmit={handleUpdateLead} className="space-y-4 text-left">
              {/* Status Select */}
              <div>
                <label className="block text-xs font-bold text-gold-300 uppercase tracking-widest mb-1.5">
                  Lead Sales Status
                </label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-white text-xs focus:border-gold-500 focus:outline-none"
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Site Visit">Site Visit</option>
                  <option value="Negotiation">Negotiation</option>
                  <option value="Booked">Booked</option>
                  <option value="Lost">Lost</option>
                </select>
              </div>

              {/* Site Visit Schedule */}
              <div>
                <label className="block text-xs font-bold text-gold-300 uppercase tracking-widest mb-1.5">
                  Schedule Site Visit
                </label>
                <input
                  type="datetime-local"
                  value={editVisitDate}
                  onChange={(e) => setEditVisitDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-xs focus:border-gold-500 focus:outline-none"
                />
              </div>

              {/* Notes Area */}
              <div>
                <label className="block text-xs font-bold text-gold-300 uppercase tracking-widest mb-1.5">
                  Agent CRM Comments
                </label>
                <textarea
                  rows={3}
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="Insert notes about discussions, preferences, or schedules..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-xs focus:border-gold-500 focus:outline-none resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 py-3 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="flex-1 py-3 bg-gradient-to-r from-gold-500 to-gold-600 hover:opacity-95 text-slate-950 text-xs font-bold uppercase tracking-wider rounded-lg shadow-md transition-all cursor-pointer"
                >
                  {isUpdating ? 'Saving File...' : 'Update Lead'}
                </button>
              </div>
            </form>
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
