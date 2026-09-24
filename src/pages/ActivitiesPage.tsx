import React, { useState } from 'react';
import { 
  Sparkles, 
  Plus, 
  Search, 
  Palette, 
  Music, 
  Sun, 
  Brain, 
  CheckCircle2, 
  Clock, 
  Users, 
  ChevronRight
} from 'lucide-react';
import { ChildActivity, ActivityCategory, NavigationTab } from '../types';
import { DEMO_ACTIVITIES, DEMO_CLASSES } from '../data/demoData';
import { StatusBadge } from '../components/StatusBadge';
import { Modal } from '../components/Modal';

interface ActivitiesPageProps {
  onNavigate?: (tab: NavigationTab) => void;
}

export const ActivitiesPage: React.FC<ActivitiesPageProps> = () => {
  const [activities, setActivities] = useState<ChildActivity[]>(DEMO_ACTIVITIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [classFilter, setClassFilter] = useState('All');

  // Selected Modal
  const [selectedActivity, setSelectedActivity] = useState<ChildActivity | null>(null);

  // Add / Edit Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Creativity' as ActivityCategory,
    className: 'Toddlers (Explorers)',
    teacherName: 'Mrs. Folake Adeleke',
    date: '2026-08-19',
    time: '10:00 AM – 11:00 AM',
    learningObjective: 'Encouraging sensory fine motor grasp and color curiosity',
    materialsNeeded: 'Washable tempera paint, textured paper, aprons',
    notes: 'Guided early years exploration'
  });

  const filteredActivities = activities.filter((act) => {
    const matchSearch =
      act.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.learningObjective.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = categoryFilter === 'All' || act.category === categoryFilter;
    const matchCls = classFilter === 'All' || act.className.includes(classFilter);
    return matchSearch && matchCat && matchCls;
  });

  const handleSaveActivity = (e: React.FormEvent) => {
    e.preventDefault();
    const cls = DEMO_CLASSES.find(c => c.name === formData.className) || DEMO_CLASSES[0];
    const newAct: ChildActivity = {
      id: `act-0${activities.length + 1}`,
      title: formData.title,
      classId: cls.id,
      className: formData.className,
      teacherName: formData.teacherName,
      date: formData.date,
      time: formData.time,
      category: formData.category,
      learningObjective: formData.learningObjective,
      participantsCount: cls.enrolledCount,
      materialsNeeded: formData.materialsNeeded.split(',').map((s) => s.trim()),
      notes: formData.notes,
      status: 'Planned'
    };
    setActivities([newAct, ...activities]);
    setIsAddModalOpen(false);
  };

  const handleToggleComplete = (actId: string) => {
    setActivities((prev) =>
      prev.map((a) =>
        a.id === actId
          ? { ...a, status: a.status === 'Completed' ? 'Planned' : 'Completed' }
          : a
      )
    );
    if (selectedActivity?.id === actId) {
      setSelectedActivity((prev) =>
        prev ? { ...prev, status: prev.status === 'Completed' ? 'Planned' : 'Completed' } : null
      );
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Creativity': return <Palette className="w-4 h-4 text-purple-600" />;
      case 'Music': return <Music className="w-4 h-4 text-pink-600" />;
      case 'Outdoor Play': return <Sun className="w-4 h-4 text-amber-600" />;
      default: return <Brain className="w-4 h-4 text-teal-600" />;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 font-display">Activities & Early Learning Curriculum</h2>
            <span className="px-2 py-0.5 rounded-md bg-teal-50 text-teal-700 font-bold text-[10px] border border-teal-200">
              EYFS & Montessori Aligned
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Classroom developmental lesson plans, sensory projects, gross motor exercises & learning objectives
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Plan New Activity</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by activity title or objective..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-teal-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-hidden"
            >
              <option value="All">All Categories</option>
              <option value="Creativity">Creativity</option>
              <option value="Numeracy">Numeracy</option>
              <option value="Language">Language</option>
              <option value="Motor Skills">Motor Skills</option>
              <option value="Music">Music</option>
              <option value="Outdoor Play">Outdoor Play</option>
            </select>

            <select
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-hidden"
            >
              <option value="All">All Classes</option>
              <option value="Infants">Infants (Nestlings)</option>
              <option value="Toddlers">Toddlers (Explorers)</option>
              <option value="Preschool">Preschool (Pioneers)</option>
              <option value="Aftercare">Aftercare</option>
            </select>
          </div>
        </div>
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredActivities.map((act) => (
          <div
            key={act.id}
            onClick={() => setSelectedActivity(act)}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-teal-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-slate-100">
                    {getCategoryIcon(act.category)}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {act.category}
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm">{act.title}</h3>
                  </div>
                </div>
                <StatusBadge status={act.status} size="sm" />
              </div>

              <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                {act.learningObjective}
              </p>

              {/* Materials pills */}
              <div className="mt-3 space-y-1.5">
                <p className="text-[10px] font-bold uppercase text-slate-400">Materials Needed</p>
                <div className="flex flex-wrap gap-1">
                  {act.materialsNeeded.map((mat, i) => (
                    <span key={i} className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                      {mat}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-1.5 font-medium">
                <Clock className="w-3.5 h-3.5 text-teal-600" />
                <span>{act.time}</span>
              </div>
              <span className="font-semibold text-slate-700">{act.className}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Activity Detail Modal */}
      {selectedActivity && (
        <Modal
          isOpen={!!selectedActivity}
          onClose={() => setSelectedActivity(null)}
          title={selectedActivity.title}
          subtitle={`${selectedActivity.category} • ${selectedActivity.className} • Teacher ${selectedActivity.teacherName}`}
          maxWidth="2xl"
          actions={
            <div className="flex items-center justify-between w-full">
              <button
                onClick={() => handleToggleComplete(selectedActivity.id)}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 ${
                  selectedActivity.status === 'Completed'
                    ? 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                    : 'bg-emerald-700 text-white hover:bg-emerald-800'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{selectedActivity.status === 'Completed' ? 'Reopen Activity' : 'Mark Activity Completed'}</span>
              </button>
              <button
                onClick={() => setSelectedActivity(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl"
              >
                Close
              </button>
            </div>
          }
        >
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900 text-white flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold font-display">{selectedActivity.title}</h3>
                <p className="text-xs text-teal-300">
                  {selectedActivity.date} ({selectedActivity.time})
                </p>
              </div>
              <StatusBadge status={selectedActivity.status} />
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Learning Objective</span>
              <p className="text-slate-800 leading-relaxed font-medium">{selectedActivity.learningObjective}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Required Educational Materials</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedActivity.materialsNeeded.map((mat, i) => (
                  <span key={i} className="px-2 py-1 bg-white border border-slate-200 rounded-md font-medium text-slate-800">
                    {mat}
                  </span>
                ))}
              </div>
            </div>

            {selectedActivity.notes && (
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Teacher Lesson Notes</span>
                <p className="text-slate-700">{selectedActivity.notes}</p>
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* Plan New Activity Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Plan New Classroom Learning Activity"
        subtitle="Create lesson plans aligned with Nigerian EYFS & Montessori standards."
        maxWidth="2xl"
      >
        <form onSubmit={handleSaveActivity} className="space-y-3.5 text-xs">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">Activity Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Clay Sculpting & Sensory Shapes"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as ActivityCategory })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              >
                <option value="Creativity">Creativity</option>
                <option value="Numeracy">Numeracy</option>
                <option value="Language">Language</option>
                <option value="Motor Skills">Motor Skills</option>
                <option value="Music">Music</option>
                <option value="Outdoor Play">Outdoor Play</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Target Classroom</label>
              <select
                value={formData.className}
                onChange={(e) => setFormData({ ...formData, className: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              >
                {DEMO_CLASSES.map((c) => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Date</label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Time Schedule</label>
              <input
                type="text"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                placeholder="10:00 AM – 11:00 AM"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Learning Objective *</label>
            <textarea
              rows={2}
              required
              value={formData.learningObjective}
              onChange={(e) => setFormData({ ...formData, learningObjective: e.target.value })}
              placeholder="e.g. Tactile stimulation and hand-eye coordination..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Materials Needed (comma separated)</label>
            <input
              type="text"
              value={formData.materialsNeeded}
              onChange={(e) => setFormData({ ...formData, materialsNeeded: e.target.value })}
              placeholder="e.g. Non-toxic paint, Textured cardstock, Sponge stamps"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-xs"
            >
              Schedule Activity
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
