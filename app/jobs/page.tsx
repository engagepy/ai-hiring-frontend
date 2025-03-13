"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import HeaderComponent from '../components/header';

const JobsApp = () => {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: 'Frontend Developer',
      description: 'Responsible for developing responsive user interfaces using React and Tailwind CSS.',
      minExperience: 2,
      cultureFitScore: 85,
      salaryRange: '₹10L - ₹15L',
    },
    {
      id: 2,
      title: 'Backend Developer',
      description: 'Responsible for building scalable REST APIs and handling database architecture.',
      minExperience: 3,
      cultureFitScore: 78,
      salaryRange: '₹12L - ₹18L',
    },
    {
      id: 3,
      title: 'Data Scientist',
      description: 'Analyze large datasets and build predictive models using machine learning.',
      minExperience: 4,
      cultureFitScore: 90,
      salaryRange: '₹15L - ₹22L',
    },
  ]);

  const [newJob, setNewJob] = useState({
    title: '',
    description: '',
    minExperience: '',
    cultureFitScore: '',
    salaryRange: '',
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewJob((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      console.log(`Uploaded file: ${file.name}`);
    }
  };

  // Add new job
  const addJob = () => {
    if (
      newJob.title.trim() &&
      newJob.description.trim() &&
      newJob.minExperience.trim() &&
      newJob.cultureFitScore.trim() &&
      newJob.salaryRange.trim()
    ) {
      setJobs((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          ...newJob,
        },
      ]);
      setNewJob({
        title: '',
        description: '',
        minExperience: '',
        cultureFitScore: '',
        salaryRange: '',
      });
      setSelectedFile(null);
    }
  };

  return (
    <div className="root">
      <div className="layout">
        {/* Header */}
        <HeaderComponent />
        

        {/* Main Content */}
        <main>
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
            Jobs Overview
          </h1>

          <div className="interview-grid">
            {/* Job List */}
            <div className="main-panel">
              {jobs.map((job) => (
                <div key={job.id} className="panel">
                  <h2 className="text-xl font-semibold">{job.title}</h2>
                  <p className="text-secondary mt-2">{job.description}</p>

                  {/* Additional Job Details */}
                  <div className="flex gap-6 mt-4 text-sm text-gray-400">
                    <div>
                      <span className="font-medium text-blue-400">Experience:</span> {job.minExperience} years
                    </div>
                    <div>
                      <span className="font-medium text-purple-400">Culture Fit:</span> {job.cultureFitScore}%
                    </div>
                    <div>
                      <span className="font-medium text-green-400">Salary:</span> {job.salaryRange}
                    </div>
                  </div>

                  {/* Upload Button */}
                  <div className="mt-6">
                    <input 
                      type="file" 
                      className="hidden" 
                      id={`upload-${job.id}`} 
                      onChange={handleFileUpload}
                    />
                    <label
                      htmlFor={`upload-${job.id}`}
                      className="control-button block w-full max-w-[200px] text-center"
                    >
                      Upload Description
                    </label>

                    {selectedFile && (
                      <span className="text-sm text-gray-400 mt-2 block">
                        {selectedFile.name}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Add New Job Form */}
            <div className="side-panel">
              <div className="panel">
                <h2 className="text-lg font-semibold">Add New Job</h2>
                <div className="space-y-4 mt-4">
                  {/* Job Title */}
                  <input
                    type="text"
                    name="title"
                    value={newJob.title}
                    onChange={handleInputChange}
                    placeholder="Job Title"
                    className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />

                  {/* Job Description */}
                  <textarea
                    name="description"
                    value={newJob.description}
                    onChange={handleInputChange}
                    placeholder="Job Description"
                    rows={3}
                    className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />

                  {/* Minimum Experience */}
                  <input
                    type="number"
                    name="minExperience"
                    value={newJob.minExperience}
                    onChange={handleInputChange}
                    placeholder="Minimum Experience (in years)"
                    className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />

                  {/* Culture Fit Score */}
                  <input
                    type="number"
                    name="cultureFitScore"
                    value={newJob.cultureFitScore}
                    onChange={handleInputChange}
                    placeholder="Culture Fit Score (%)"
                    className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />

                  {/* Salary Range */}
                  <input
                    type="text"
                    name="salaryRange"
                    value={newJob.salaryRange}
                    onChange={handleInputChange}
                    placeholder="Salary Range (e.g. ₹10L - ₹15L)"
                    className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                  />

                  {/* Upload Button */}
                  <div className="mt-4">
                    <input
                      type="file"
                      id="upload-new"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                    <label
                      htmlFor="upload-new"
                      className="control-button w-full text-center"
                    >
                      Upload Job Description
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button 
                    onClick={addJob} 
                    className={`control-button w-full mt-2 ${
                      !newJob.title || !newJob.description || !newJob.minExperience || !newJob.cultureFitScore || !newJob.salaryRange
                        ? 'opacity-50 cursor-not-allowed'
                        : ''
                    }`}
                    disabled={
                      !newJob.title || !newJob.description || !newJob.minExperience || !newJob.cultureFitScore || !newJob.salaryRange
                    }
                  >
                    Add Job
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default JobsApp;
