import React, { useState, useEffect } from 'react';

const CompanyIntel = ({ companyName, skills }) => {
  const [intel, setIntel] = useState(null);

  useEffect(() => {
    if (!companyName) return;

    // --- 1. Heuristic Rules Engine ---
    const knownEnterprises = [
      'amazon', 'infosys', 'tcs', 'wipro', 'google', 'microsoft', 
      'meta', 'ibm', 'accenture', 'cognizant', 'deloitte', 'capgemini'
    ];
    
    const normalizedCompany = companyName.trim().toLowerCase();
    const isEnterprise = knownEnterprises.includes(normalizedCompany);
    
    // Determine Size & Focus
    const sizeCategory = isEnterprise ? 'Enterprise (2000+)' : 'Startup (<200)';
    const hiringFocus = isEnterprise 
      ? 'Structured DSA + core fundamentals' 
      : 'Practical problem solving + stack depth';

    // --- 2. Dynamic Round Mapping Engine ---
    const lowerSkills = (skills || '').toLowerCase();
    
    // Detect specific tech stacks
    const isDataScience = lowerSkills.includes('data') || lowerSkills.includes('machine learning') || lowerSkills.includes('python') || lowerSkills.includes('deep learning');
    const isFrontend = lowerSkills.includes('react') || lowerSkills.includes('html') || lowerSkills.includes('frontend') || lowerSkills.includes('ui');

    let rounds = [];

    if (isEnterprise) {
      rounds = [
        { step: 'Round 1', title: 'Online Test (Aptitude + Core)', desc: 'Filters candidates based on basic problem-solving and cognitive abilities.' },
        { 
          step: 'Round 2', 
          title: isDataScience ? 'Technical (Statistics & ML Models)' : isFrontend ? 'Technical (UI/UX & JS Frameworks)' : 'Technical (DSA + Core CS)', 
          desc: isDataScience ? 'Deep dive into Python, Pandas, and algorithm selection.' : isFrontend ? 'Deep dive into rendering, state management, and web vitals.' : 'Deep dive into data structures, algorithms, and subjects like OS, DBMS, and Networks.' 
        },
        { step: 'Round 3', title: 'Tech + Projects', desc: 'Evaluates your hands-on experience and architectural understanding.' },
        { step: 'Round 4', title: 'HR', desc: 'Assesses behavioral traits and cultural alignment.' }
      ];
    } else {
      rounds = [
        { 
          step: 'Round 1', 
          title: isDataScience ? 'Take-home Data Challenge' : 'Practical Coding Assignment', 
          desc: isDataScience ? 'Clean a dataset and build a baseline predictive model.' : 'Tests your ability to build real-world features and write production-ready code.' 
        },
        { step: 'Round 2', title: 'System & Architecture Discussion', desc: 'Focuses on your specific tech stack depth and scaling logic.' },
        { step: 'Round 3', title: 'Culture Fit & Founder Round', desc: 'Ensures you thrive in a fast-paced, ambiguous environment.' }
      ];
    }

    const generatedIntel = {
      id: Date.now(),
      companyName,
      industry: 'Technology Services',
      sizeCategory,
      hiringFocus,
      rounds,
      skillsDetected: skills || 'Not specified',
      timestamp: new Date().toISOString()
    };

    setIntel(generatedIntel);

    // --- 3. Persist intel inside history entry ---
    try {
      const existingHistory = JSON.parse(localStorage.getItem('placement_history') || '[]');
      const isDuplicate = existingHistory.some(entry => entry.companyName.toLowerCase() === normalizedCompany);
      
      if (!isDuplicate) {
        localStorage.setItem('placement_history', JSON.stringify([generatedIntel, ...existingHistory]));
      }
    } catch (error) {
      console.error("Failed to save to history:", error);
    }

  }, [companyName, skills]);

  if (!intel) return null;

  return (
    <div className="w-full mx-auto p-6 space-y-6 text-slate-800 dark:text-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* --- Block 1: Company Intel Card --- */}
        <div className="lg:col-span-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col h-full">
          <h2 className="text-2xl font-bold mb-1 tracking-tight">{intel.companyName}</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 font-medium">{intel.industry}</p>
          
          <div className="space-y-5 flex-grow">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Estimated Size</p>
              <span className={`inline-flex items-center px-3 py-1 text-sm rounded-full font-semibold ${
                intel.sizeCategory.includes('Enterprise') 
                  ? 'bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800/50' 
                  : 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800/50'
              }`}>
                {intel.sizeCategory}
              </span>
            </div>

            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Typical Hiring Focus</p>
              <p className="text-sm font-medium leading-relaxed text-slate-700 dark:text-slate-300">
                {intel.hiringFocus}
              </p>
            </div>

            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Detected Skills</p>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {intel.skillsDetected}
              </p>
            </div>
          </div>
        </div>

        {/* --- Block 2: Round Mapping Engine (Timeline) --- */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
            Dynamic Round Mapping
          </h3>
          
          <div className="relative border-l-2 border-slate-100 dark:border-slate-800 ml-3 md:ml-4 space-y-8">
            {intel.rounds.map((round, index) => (
              <div key={index} className="relative pl-6 md:pl-8">
                {/* Timeline Node */}
                <span className="absolute -left-[13px] top-1 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500 ring-4 ring-white dark:ring-slate-900">
                  <span className="text-[10px] font-bold text-white">{index + 1}</span>
                </span>
                
                {/* Round Content */}
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-indigo-500 uppercase tracking-wider mb-1">
                    {round.step}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    {round.title}
                  </h4>
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3 border border-slate-100 dark:border-slate-700/50">
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      <span className="font-semibold text-slate-900 dark:text-white mr-1">Why this matters:</span> 
                      {round.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- Demo Note --- */}
      <div className="text-center mt-4">
        <p className="text-xs text-slate-400 font-medium">
          Demo Mode: Company intel generated heuristically.
        </p>
      </div>

    </div>
  );
};

export default CompanyIntel;
