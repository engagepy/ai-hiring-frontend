"use client";

import React from 'react';
import Link from 'next/link';
import HeaderComponent from '../components/header';

const InterviewApp = () => {
  const jobDescriptions = [
    {
      id: 1,
      title: 'Frontend Developer',
      candidates: [
        { 
          name: 'John Doe', 
          score: 85, 
          roleFit: 90, 
          testScore: 78, 
          confidence: 88 
        },
        { 
          name: 'Jane Smith', 
          score: 78, 
          roleFit: 85, 
          testScore: 80, 
          confidence: 84 
        },
      ],
    },
    {
      id: 2,
      title: 'Backend Developer',
      candidates: [
        { 
          name: 'Alex Johnson', 
          score: 92, 
          roleFit: 88, 
          testScore: 91, 
          confidence: 89 
        },
        { 
          name: 'Chris Lee', 
          score: 79, 
          roleFit: 81, 
          testScore: 76, 
          confidence: 80 
        },
      ],
    },
    {
      id: 3,
      title: 'Data Scientist',
      candidates: [
        { 
          name: 'Emily Davis', 
          score: 88, 
          roleFit: 91, 
          testScore: 85, 
          confidence: 87 
        },
        { 
          name: 'Michael Brown', 
          score: 83, 
          roleFit: 86, 
          testScore: 82, 
          confidence: 85 
        },
      ],
    },
  ];

  return (
    <div className="root">
      <div className="layout">
        <HeaderComponent />

        <main>
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
            Candidate Pool Overview
          </h1>

          <div className="interview-grid">
            {/* Job Descriptions */}
            <div className="main-panel">
              {jobDescriptions.map((job) => (
                <div key={job.id} className="panel">
                  <h2 className="text-xl font-semibold">{job.title}</h2>
                  <div className="mt-2 space-y-2">
                    {job.candidates.map((candidate) => (
                      <div key={candidate.name} className="flex items-center justify-between">
                        <span className="text-secondary">{candidate.name}</span>

                        {/* Candidate Metrics */}
                        <div className="flex items-center gap-6">
                          {/* Score */}
                          <div className="metric">
                            <span className="text-secondary text-sm">Score:</span>
                            <span className="font-medium text-blue-400 ml-2">{candidate.score}%</span>
                          </div>

                          {/* Role Fit */}
                          <div className="metric">
                            <span className="text-secondary text-sm">Role Fit:</span>
                            <span className="font-medium text-purple-400 ml-2">{candidate.roleFit}%</span>
                          </div>

                          {/* Test Score */}
                          <div className="metric">
                            <span className="text-secondary text-sm">Test Score:</span>
                            <span className="font-medium text-green-400 ml-2">{candidate.testScore}%</span>
                          </div>

                          {/* Confidence */}
                          <div className="metric">
                            <span className="text-secondary text-sm">Confidence:</span>
                            <span className="font-medium text-yellow-400 ml-2">{candidate.confidence}%</span>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-2">
                            <button className="control-button">View CV</button>
                            <button className="control-button">Schedule</button>
                            <button className="control-button">Join</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default InterviewApp;
