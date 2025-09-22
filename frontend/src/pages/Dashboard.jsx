import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import samsungLogo from "../assets/prism_logo.png";
import RequestUpdate from "../layouts/Requestupdates";
import SuggestionModal from "../layouts/SuggestionModal";
import InternReferralForm from "../layouts/Intern";
import FeedBack from "../layouts/FeedBack";
import ThemeToggleButton from '../components/ThemeToggleButton';
import Statistics from "../layouts/Statistics";
import EvaluateModal from "../components/EvaluateModal";

import {
  Home, BarChart, GraduationCap, MessageSquare, Bell, Calendar, Folder,
  MessageCircle, Zap, Rocket, Key, Crown, BookOpen, Users as UsersIcon,
  RefreshCcw, Lightbulb, Briefcase, PlusCircle, Bot, Users, LayoutGrid, Columns, X, ClipboardCheck
} from "lucide-react";

import SidebarItem from "../components/SidebarItem";
import LevelBadge from "../components/LevelBadge";
import StatCard from "../components/StatCard";
import ActivityButton from "../components/ActivityButton";

const LEVEL_COUNTS = { spark: 5, lead: 10, core: 15, master: 30 };
const STATS = { worklets: 7, mentees: 35, badges: 2 };

const levels = [
  { name: 'SPARK', Icon: Zap, color: 'text-yellow-600' },
  { name: 'LEAD', Icon: Rocket, color: 'text-blue-700' },
  { name: 'CORE', Icon: Key, color: 'text-green-700' },
  { name: 'MASTER', Icon: Crown, color: 'text-purple-700' },
];

// Helper functions for the initials-based avatar
const getInitials = (name) => {
  if (!name) return '';
  const nameParts = name.split(' ');
  if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();
  return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
};

const generateColorFromName = (name) => {
  const colors = ['#0077b6', '#0096c7', '#48cae4', '#90e0ef', '#ade8f4'];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash % colors.length)];
};

// ++ 1. Accept 'userData' as a prop
export default function Dashboard({ userData }) {
  const navigate = useNavigate();
  const [isRequestUpdateOpen, setIsRequestUpdateOpen] = useState(false);
  const [isSuggestionModalOpen, setIsSuggestionModalOpen] = useState(false);
  const [isInternModalOpen, setIsInternModalOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [currentUserLevel, setCurrentUserLevel] = useState(1);
  const [layout, setLayout] = useState('grid');
  const [isEvaluateModalOpen, setISEvaluateModalOpen] = useState(false);

  const workletsData = [
    {
      id: 1,
      title: "25TST04WT",
      status: "Ongoing",
      progress: 60,
      description: "AI-driven sentiment analysis for customer feedback.",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=400&auto=format&fit=crop",
      startDate: "Aug 1, 2025",
      endDate: "Dec 15, 2025",
      students: ["Alice Johnson", "Bob Williams", "Charlie Brown"],
      notificationCount: 3,
      quality: "Excellence",
    },
    {
      id: 2,
      title: "25TST05SRM",
      status: "Ongoing",
      progress: 70,
      description: "Cross-platform mobile app for internal comms.",
      imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=400&auto=format&fit=crop",
      startDate: "Sep 1, 2025",
      endDate: "Jan 30, 2026",
      students: ["Diana Prince", "Clark Kent"],
      notificationCount: 0,
      quality: "Good",
    },
    {
      id: 3,
      title: "24ARC01RV",
      status: "Ongoing",
      progress: 95,
      description: "Cloud infrastructure migration to AWS with CI/CD.",
      imageUrl: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=400&auto=format&fit=crop",
      startDate: "Jul 15, 2025",
      endDate: "Oct 20, 2025",
      students: ["Bruce Wayne", "Peter Parker", "Tony Stark", "Steve Rogers", "Natasha Romanoff", "Thor Odinson", "Wanda Maximoff"],
      notificationCount: 1,
      quality: "Excellence",
    },
    {
      id: 4,
      title: "25DES02XI",
      status: "Ongoing",
      progress: 25,
      description: "UI/UX redesign for the main customer portal.",
      imageUrl: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=400&auto=format&fit=crop",
      startDate: "Aug 20, 2025",
      endDate: "Nov 10, 2025",
      students: ["Carol Danvers", "Hope van Dyne"],
      notificationCount: 5,
      quality: "Needs Attention",
    },
    {
      id: 5,
      title: "25SEC03LP",
      status: "Ongoing",
      progress: 40,
      description: "End-to-end encryption for messaging service.",
      imageUrl: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=400&auto=format&fit=crop",
      startDate: "Sep 10, 2025",
      endDate: "Feb 1, 2026",
      students: ["Vision", "Scott Lang", "Sam Wilson"],
      notificationCount: 0,
      quality: "Good",
    },
    {
      id: 6,
      title: "25DAT06MU",
      status: "Ongoing",
      progress: 85,
      description: "Data warehousing solution for sales analytics.",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop",
      startDate: "Jun 5, 2025",
      endDate: "Sep 30, 2025",
      students: ["Loki Laufeyson", "Bucky Barnes"],
      notificationCount: 2,
      quality: "Good",
    },
  ];

  const handleNavigation = (path) => {
    if (path === "/request-update") {
      setIsRequestUpdateOpen(true);
    } else if (path === "/share-suggestion") {
      setIsSuggestionModalOpen(true);
    } else if (path === "/internship-referral") {
      setIsInternModalOpen(true);
    }
    else if (path === "/evaluate") {
      setISEvaluateModalOpen(true);
    }
    else {
      try {
        console.log('Navigating to:', path);
        navigate(path);
      } catch (error) {
        console.error('Navigation error:', error);
      }
    }
  };

  const handleSidebarNavigation = (path) => {
    handleNavigation(path);
  };

  const LevelMilestone = ({ level, index }) => {
    const levelsToGo = index - currentUserLevel;
    let tooltipText = '';

    if (levelsToGo > 0) {
      tooltipText = `${levelsToGo} level${levelsToGo > 1 ? 's' : ''} to reach ${level.name}`;
    } else if (levelsToGo === 0) {
      tooltipText = index === levels.length - 1 ? 'Highest level achieved! ✨' : 'You are here';
    } else {
      tooltipText = 'Milestone achieved ✔️';
    }

    return (
      <div className="relative group">
        <span className="flex items-center gap-1 cursor-pointer">
          <level.Icon className={`w-4 h-4 ${level.color}`} /> {level.name}
        </span>
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 text-xs bg-slate-800 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          {tooltipText}
        </span>
      </div>
    );
  };

  const progressPercentage = (currentUserLevel / (levels.length - 1)) * 100;

  return (
    <div className={`flex h-screen w-full bg-slate-50 text-gray-800 overflow-hidden dark:bg-slate-900 dark:text-slate-200 ${(isRequestUpdateOpen || isSuggestionModalOpen || isInternModalOpen || isFeedbackOpen) ? 'overflow-hidden' : ''}`}>
      {/* Left Sidebar */}
      <aside className="w-30 lg:w-30 bg-gradient-to-t from-purple-300 via-indigo-50 to-blue-100 dark:from-slate-800 dark:via-slate-900 dark:to-black flex flex-col py-2 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <nav className="flex flex-col gap-6 items-center lg:items-center">
          <SidebarItem icon={<Home className="w-5 h-5" />} label="Home" onClick={() => handleSidebarNavigation("/home")} />
          <SidebarItem icon={<BarChart className="w-5 h-5" />} label="Statistics" onClick={() => handleSidebarNavigation("/statistics")} />
          <SidebarItem icon={<GraduationCap className="w-5 h-5" />} label="Colleges" onClick={() => handleSidebarNavigation("/colleges")} />
          <SidebarItem icon={<MessageSquare className="w-5 h-5" />} label="Chats" onClick={() => handleSidebarNavigation("/chats")} />
          <SidebarItem icon={<Bell className="w-5 h-5" />} label="Updates" onClick={() => handleSidebarNavigation("/updates")} />
          <SidebarItem icon={<Calendar className="w-5 h-5" />} label="Meetings" onClick={() => handleSidebarNavigation("/meetings")} />
          <SidebarItem icon={<Folder className="w-5 h-5" />} label="Portfolio" onClick={() => handleSidebarNavigation("/portfolio")} />
          <SidebarItem icon={<MessageCircle className="w-5 h-5" />} label="Feedbacks" onClick={() => handleSidebarNavigation("/feedbacks")} />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-8 py-6 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold mb-4 text-blue-900 dark:text-white">
              {userData.name}
            </h1>
            <p className="text-sm text-gray-500 dark:text-slate-400">
              PRISM / {userData.qualification}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggleButton />
            <img src={samsungLogo} alt="PRISM" className="h-20 opacity-90" />
          </div>
        </div>

        {/* Profile box */}
        <div className="mt-4 bg-white border border-gray-200 rounded-2xl shadow-sm p-4 max-w-xl dark:bg-slate-800 dark:border-slate-700">
          <div className="flex items-center gap-4">
            {/* Add a wrapping div with the 'group' class */}
            <div className="relative group">
              <Link to="/profile">
                {userData.avatarUrl ? (
                  <img
                    src={userData.avatarUrl}
                    alt="Author"
                    className="w-24 h-24 rounded-xl object-cover transition-all duration-300 shadow-md cursor-pointer hover:scale-110 hover:shadow-2xl hover:ring-4 hover:ring-blue-400 dark:bg-slate-800 dark:border-slate-700"
                    tabIndex={0}
                  />
                ) : (
                  <div
                    className="w-24 h-24 rounded-xl flex items-center justify-center text-white font-bold text-4xl cursor-pointer transition-all duration-300 shadow-md hover:scale-110 hover:shadow-2xl hover:ring-4 hover:ring-blue-400"
                    style={{ backgroundColor: generateColorFromName(userData.name) }}
                  >
                    <span>{getInitials(userData.name)}</span>
                  </div>
                )}
              </Link>
              {/* This is the tooltip span that appears on hover */}
              <span className="absolute -top-10 left-1/2 -translate-x-1/2
                   bg-gray-700 text-gray-100 text-xs font-medium
                   rounded-md px-3 py-1.5 whitespace-nowrap
                   opacity-0 group-hover:opacity-100 transition-opacity duration-200
                   dark:bg-slate-600 dark:text-slate-50
                   border border-gray-600 dark:border-slate-500 shadow-md">
                Click to update profile
              </span>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {userData.qualification}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-slate-400">
                    {userData.bio}
                  </div>
                </div>
                <div className="hidden sm:block text-xs text-gray-500 dark:text-slate-400">
                  Author
                </div>
              </div>
              <div className="mt-3 grid grid-cols-4 gap-2">
                <LevelBadge
                  icon={<Rocket className="w-4 h-4 " />}
                  label="Lead"
                  value={LEVEL_COUNTS.lead}
                  color="text-purple-700 bg-purple-50 dark:bg-slate-900/30"
                />
              </div>
            </div>
          </div>
        </div>


        {/* Level Progress Bar */}
        <div className="relative mt-6 w-full max-w-2xl">
          <div className="h-2 w-full bg-gray-200 rounded-full shadow-inner dark:bg-slate-700">
            <div
              className="h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-[13px] mt-2 text-gray-600 font-medium dark:text-slate-400">
            {levels.map((level, index) => (
              <LevelMilestone key={level.name} level={level} index={index} />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 flex gap-4 flex-wrap">
          <div className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <div
              className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
              onClick={() => handleNavigation('/worklets')}>
              <StatCard
                value={STATS.worklets}
                label="Worklets"
                icon={<BookOpen className="w-5 h-5" />}
                accent="from-blue-50 to-white hover:from-blue-100 hover:to-blue-50 dark:from-gray-800 dark:to-gray-800/50 dark:hover:from-gray-700 dark:hover:to-gray-700/50 transition-transform duration-300 hover:scale-105 hover:shadow-lg"
              />
            </div>
          </div>
          <div className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <StatCard
              value={STATS.mentees}
              label="Mentees"
              icon={<UsersIcon className="w-5 h-5" />}
              accent="from-indigo-50 to-white hover:from-indigo-100 hover:to-indigo-50 dark:from-gray-800 dark:to-gray-800/50 dark:hover:from-gray-700 dark:hover:to-gray-700/50"
            />
          </div>
        </div>

        {/* My Worklets */}
        <div className="mt-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold bg-blue-900 animate-shimmer">Ongoing Worklets</h2>
            <div className="flex items-center gap-1 p-1 bg-gray-200 rounded-lg dark:bg-slate-900">
              <button
                onClick={() => setLayout('grid')}
                className={`p-1.5 rounded-md transition-colors ${layout === 'grid' ? ' text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-800'
                  }`}
                aria-label="Grid View">
                <LayoutGrid size={20} />
              </button>
              <button
                onClick={() => setLayout('horizontal')}
                className={`p-1.5 rounded-md transition-colors ${layout === 'horizontal' ? ' text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-800'
                  }`}
                aria-label="Horizontal View">
                <Columns size={20} />
              </button>
            </div>
          </div>

          <div
            className={
              layout === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                : 'flex overflow-x-auto gap-8 pb-4 overflow-y-hidden [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-blue-400/50 [&::-webkit-scrollbar-thumb]:rounded-full'
            }>
            {workletsData.map((worklet) => (
              <WorkletCard key={worklet.id} worklet={worklet} layout={layout} navigate={navigate} />
            ))}
          </div>
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className="w-64 bg-gradient-to-t from-purple-300 via-indigo-50 to-blue-100 dark:from-slate-800 dark:via-slate-900 dark:to-black shadow-lg px-4 py-6 flex flex-col justify-between overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div>
          <button
            className="w-full bg-blue-100 hover:bg-blue-200 text-blue-900 font-bold rounded-xl py-2 mb-4 flex items-center justify-center gap-2 text-xl dark:bg-blue-900/50 dark:hover:bg-blue-800/60 dark:text-blue-200"
            onClick={() => handleNavigation("/new-worklet")}
          >
            <PlusCircle className="w-5 h-10" /> <span className="text-2xl">New Worklet</span>
          </button>
          <h2 className="text-2xl font-bold mb-4 text-blue-900 dark:text-white">Activities</h2>
          <ActivityButton
            icon={<RefreshCcw className="w-5 h-10 text-blue-600" />}
            label={<span className="text-lg font-semibold">Request Update</span>}
            onClick={() => handleNavigation("/request-update")}
          />
          <ActivityButton
            icon={<Lightbulb className="w-5 h-10 text-sky-500" />}
            label={<span className="text-lg font-semibold">Share Suggestion</span>}
            onClick={() => handleNavigation("/share-suggestion")}
          />
        
          <ActivityButton
            icon={<Briefcase className="w-5 h-10 text-purple-600" />}
            label={<span className="text-lg font-semibold">Internship Referral</span>}
            onClick={() => handleNavigation("/internship-referral")}
          />
          <ActivityButton
            icon={<MessageSquare className="w-5 h-10 text-indigo-600" />}
            label={<span className="text-lg font-semibold">Submit Feedback</span>}
            onClick={() => setIsFeedbackOpen(true)}
          />
          {/* Added Evaluate button */}
          <ActivityButton
            icon={<ClipboardCheck className="w-5 h-10 text-green-600" />}
            label={<span className="text-lg font-semibold">Evaluate</span>}
            onClick={() => handleNavigation("/evaluate")}
          />
        </div>
        <div className="text-center">
          <button
            onClick={() => handleNavigation("/ray")}
            className="group relative mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-400 to-blue-400 
                               hover:from-purple-500 hover:to-blue-500 flex items-center justify-center 
                               text-lg font-bold text-white shadow transition-all duration-200 
                               hover:shadow-lg transform hover:scale-105 cursor-pointer overflow-hidden"
            aria-label="RAY Support Bot"
          >
            <span className="absolute transition-opacity duration-200 opacity-100 group-hover:opacity-0">
              <Bot className="w-8 h-8" />
            </span>
            <span className="absolute transition-opacity duration-500 opacity-0 group-hover:opacity-100">
              RAY
            </span>
          </button>
          <p className="text-sm text-gray-600 mt-1 dark:text-slate-400">Support</p>
        </div>
      </aside>

      {/* Modals */}
      <RequestUpdate
        isOpen={isRequestUpdateOpen}
        onClose={() => setIsRequestUpdateOpen(false)}
      />
      <SuggestionModal
        isOpen={isSuggestionModalOpen}
        onClose={() => setIsSuggestionModalOpen(false)}
      />
      {isFeedbackOpen && (
        <FeedBack onClose={() => setIsFeedbackOpen(false)} />
      )}
      {isInternModalOpen && (
        <div className="fixed inset-0 flex items-start justify-center bg-black bg-opacity-40 z-50 p-4 overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-white rounded-xl mt-10 mb-10 dark:bg-slate-900">
            <div className=" top-0 right-0 flex justify-end bg-white rounded-t-xl p-2 dark:bg-slate-900">
              <button
                onClick={() => setIsInternModalOpen(false)}
                className="text-3xl text-purple-700 hover:text-purple-900 font-bold z-10 w-10 h-10 flex items-center justify-center rounded-full hover:bg-purple-100 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-4">
              <InternReferralForm />
            </div>
          </div>
        </div>
      )}
      {/* Render the Evaluate */}
      <EvaluateModal
        isOpen={isEvaluateModalOpen}
        onClose={() => setISEvaluateModalOpen(false)}
        worklets={workletsData}
      />
    </div>
  );
}


// --- CORRECTED WORKLET CARD COMPONENT ---
function WorkletCard({ worklet, layout, navigate }) {
  const containerClasses = layout === 'grid'
    ? 'w-full'
    : 'w-80 flex-shrink-0';

  const calculateRemainingDays = (endDateStr) => {
    const endDate = new Date(endDateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    const diffTime = endDate - today;
    if (diffTime < 0) {
      return { days: 0, label: "Past Due" };
    }
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return { days: diffDays, label: `${diffDays} days left` };
  };

  const remaining = calculateRemainingDays(worklet.endDate);

  const qualityStyles = {
    Excellence: 'bg-green-500/80',
    Good: 'bg-blue-500/80',
    'Needs Attention': 'bg-red-500/80',
    Default: 'bg-gray-500/80',
  };

  const handleCardClick = () => {
    navigate(`/worklet/${worklet.id}`);
  };

  const handleNotificationClick = (event) => {
    event.stopPropagation();
    navigate(`/worklet/${worklet.id}/notifications`);
  };

  return (
    <div
      onClick={handleCardClick}
      className={`group relative aspect-video cursor-pointer overflow-hidden rounded-2xl shadow-lg transition-all duration-500 ease-in-out hover:scale-105 ${containerClasses}`}>

      <img
        src={worklet.imageUrl}
        alt={worklet.title}
        className="h-full w-full object-cover transition-all duration-500"
      />

      <div className="absolute inset-0 bg-black/50"></div>

      {worklet.notificationCount > 0 && (
        <div
          onClick={handleNotificationClick}
          className="absolute top-3 right-3 group/bell z-20"
        >
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
          <span className="relative flex items-center justify-center h-6 w-6 rounded-full bg-red-500 text-white">
            <Bell size={14} />
          </span>
          <div className="absolute top-full right-0 mt-1 w-max px-2 py-1 text-xs bg-slate-800 text-white rounded opacity-0 group-hover/bell:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            {worklet.notificationCount} new update{worklet.notificationCount > 1 ? 's' : ''}
          </div>
        </div>
      )}

      {/* Normal State Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-4 text-white transition-opacity duration-300 group-hover:opacity-0">
        <h3 className="text-lg font-bold">{worklet.title}</h3>
        <p className="text-sm text-gray-300 line-clamp-2">{worklet.description}</p>
        <div className="mt-4">
          <div className="flex justify-between text-xs font-medium text-cyan-200">
            <span>Progress</span>
            <span>{worklet.progress}%</span>
          </div>
          <div className="mt-1 h-2 w-full rounded-full bg-white/20">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
              style={{ width: `${worklet.progress}%` }}></div>
          </div>
        </div>
      </div>

      {/* Hover State Content */}
      <div className="absolute inset-0 flex text-white opacity-0 transition-opacity duration-300 delay-150 group-hover:opacity-100 pointer-events-none">

        {/* SCROLLABLE AREA - ADDED pointer-events-auto */}
        <div className="flex-grow p-4 overflow-y-auto pointer-events-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-cyan-400/50 [&::-webkit-scrollbar-thumb]:rounded-full">
          <h3 className="text-lg font-bold">{worklet.title}</h3>
          <div className="mt-2 flex items-center gap-2 text-xs text-gray-300">
            <Calendar size={14} />
            <span>
              {worklet.startDate} - {worklet.endDate}
            </span>
          </div>
          <div className="mt-4 flex-1">
            <div className="flex items-center gap-2 font-semibold text-sm">
              <Users size={16} />
              <h4>Assigned Students</h4>
            </div>
            <ul className="mt-1 list-disc list-inside text-xs text-gray-200 space-y-1">
              {worklet.students.map((student) => (
                <li key={student}>{student}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right side panel */}
        <div className="w-28 flex-shrink-0 bg-black/40 flex flex-col items-center justify-center text-center p-2 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out">
          <span className={`px-2 py-1 rounded-md text-xs font-bold text-white ${qualityStyles[worklet.quality] || qualityStyles.Default}`}>
            {worklet.quality}
          </span>
          <div className="mt-4">
            <p className="text-3xl font-bold">{remaining.days}</p>
            <p className="text-xs text-gray-300">{remaining.label}</p>
          </div>
        </div>
      </div>
    </div>
  );
}