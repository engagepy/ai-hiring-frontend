"use client"

// pages/interview.tsx
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import HeaderComponent from './components/header';

interface FacialData {
  emotion: string;
  attentiveness: number;
  eyeContact: number;
  microExpressions: string[];
}

interface Analytics {
  confidence: number;
  authenticity: number;
  relevance: number;
  clarity: number;
  knowledgeDepth: number;
}

export default function InterviewApp() {
  const [interviewStarted, setInterviewStarted] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);
  const [transcription, setTranscription] = useState<string[]>([]);
  const [analytics, setAnalytics] = useState<Analytics>({
    confidence: 0,
    authenticity: 0,
    relevance: 0,
    clarity: 0,
    knowledgeDepth: 0,
  });
  const [facialData, setFacialData] = useState<FacialData>({
    emotion: 'neutral',
    attentiveness: 100,
    eyeContact: 90,
    microExpressions: [],
  });


  const fetchNextQuestion = () => {
    const mockQuestions = [
      "Describe a challenging project you've worked on and how you overcame obstacles.",
      "How do you approach learning new technologies in a fast-paced environment?",
      "Tell me about a time when you had to adapt to unexpected changes in requirements.",
      "What methods do you use to ensure code quality and maintainability?",
      "How would you design a system that needs to scale to millions of users?"
    ];
    
    const randomIndex = Math.floor(Math.random() * mockQuestions.length);
    setCurrentQuestion(mockQuestions[randomIndex]);
    
    // Reset analysis for new question
    resetAnalytics();
  };

  const resetAnalytics = () => {
    setTranscription([]);
    setAnalytics({
      confidence: 0,
      authenticity: 0,
      relevance: 0,
      clarity: 0,
      knowledgeDepth: 0,
    });
  };

  // Simulate real-time transcription and analysis
  useEffect(() => {
    if (!interviewStarted || !currentQuestion) return;
    
    let transcriptTimeout: NodeJS.Timeout;
    let analyticsInterval: NodeJS.Timeout;
    
    // Simulate incoming transcription
    const simulateTranscription = () => {
      const mockResponses = [
        "Well, in my previous role at Tech Solutions,",
        "I led a project to redesign our authentication system.",
        "We faced significant challenges with the legacy codebase,",
        "but I organized a series of code refactoring sessions,",
        "and implemented a new microservices architecture.",
        "This reduced system latency by 40% and improved security measures."
      ];
      
      let currentIndex = 0;
      
      transcriptTimeout = setInterval(() => {
        if (currentIndex < mockResponses.length) {
          setTranscription(prev => [...prev, mockResponses[currentIndex]]);
          currentIndex++;
        } else {
          clearInterval(transcriptTimeout);
        }
      }, 2000);
    };
    
    // Simulate real-time analytics updates
    const simulateAnalytics = () => {
      analyticsInterval = setInterval(() => {
        setAnalytics(prev => ({
          confidence: Math.min(100, prev.confidence + Math.random() * 5),
          authenticity: Math.min(100, prev.authenticity + Math.random() * 4),
          relevance: Math.min(100, prev.relevance + Math.random() * 6),
          clarity: Math.min(100, prev.clarity + Math.random() * 5),
          knowledgeDepth: Math.min(100, prev.knowledgeDepth + Math.random() * 3),
        }));
        
        // Simulate facial expressions data
        setFacialData(prev => ({
          ...prev,
          emotion: ['neutral', 'confident', 'thoughtful', 'focused'][Math.floor(Math.random() * 4)],
          attentiveness: Math.min(100, 85 + Math.random() * 15),
          eyeContact: Math.min(100, 80 + Math.random() * 20),
          microExpressions: ['blink', 'smile', 'contemplation'].filter(() => Math.random() > 0.5),
        }));
      }, 1000);
    };
    
    simulateTranscription();
    simulateAnalytics();
    
    return () => {
      clearInterval(transcriptTimeout);
      clearInterval(analyticsInterval);
    };
  }, [interviewStarted, currentQuestion]);

  // Component for displaying the candidate video
  const CandidateVideo = ({ facialData }: { facialData: FacialData }) => (
    <div className="panel video-panel">
      <div className="video-container">
        <div className="video-placeholder">
          <div className="camera-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M23 7L16 12L23 17V7Z" stroke="#00c8ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="1" y="5" width="15" height="14" rx="2" stroke="#00c8ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <p>Camera feed will appear here</p>
        </div>
        <div className="status-indicator">
          <span className="status-dot"></span>
          <span>LIVE</span>
        </div>
        <div className="facial-indicators">
          <div className="facial-indicator">
            <span className="indicator-label">Emotion:</span>
            <span className="indicator-value">{facialData.emotion}</span>
          </div>
          <div className="facial-indicator">
            <span className="indicator-label">Eye Contact:</span>
            <span className="indicator-value">{facialData.eyeContact}%</span>
          </div>
        </div>
        <div className="video-controls">
          <button className="video-control mic" title="Mute/Unmute">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 1C10.9 1 10 1.9 10 3V11C10 12.1 10.9 13 12 13C13.1 13 14 12.1 14 11V3C14 1.9 13.1 1 12 1Z" fill="#ffffff"/>
              <path d="M19 10V12C19 15.87 15.87 19 12 19C8.13 19 5 15.87 5 12V10H3V12C3 16.97 7.03 21 12 21C16.97 21 21 16.97 21 12V10H19Z" fill="#ffffff"/>
            </svg>
          </button>
          <button className="video-control camera" title="Enable/Disable Camera">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 10.5V7C17 6.45 16.55 6 16 6H4C3.45 6 3 6.45 3 7V17C3 17.55 3.45 18 4 18H16C16.55 18 17 17.55 17 17V13.5L21 17.5V6.5L17 10.5Z" fill="#ffffff"/>
            </svg>
          </button>
          <button className="video-control settings" title="Settings">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.14 12.94C19.18 12.64 19.2 12.33 19.2 12C19.2 11.68 19.18 11.36 19.14 11.06L21.16 9.48C21.34 9.34 21.39 9.07 21.28 8.87L19.36 5.55C19.24 5.33 18.99 5.26 18.77 5.33L16.38 6.29C15.88 5.91 15.35 5.59 14.76 5.35L14.4 2.81C14.36 2.57 14.16 2.4 13.92 2.4H10.08C9.84 2.4 9.65 2.57 9.61 2.81L9.25 5.35C8.66 5.59 8.12 5.91 7.63 6.29L5.24 5.33C5.02 5.26 4.77 5.33 4.65 5.55L2.74 8.87C2.62 9.07 2.66 9.34 2.86 9.48L4.88 11.06C4.84 11.36 4.8 11.69 4.8 12C4.8 12.31 4.82 12.64 4.86 12.94L2.84 14.52C2.66 14.66 2.61 14.93 2.72 15.13L4.64 18.45C4.76 18.67 5.01 18.74 5.23 18.67L7.62 17.71C8.12 18.09 8.65 18.41 9.24 18.65L9.6 21.19C9.65 21.43 9.84 21.6 10.08 21.6H13.92C14.16 21.6 14.36 21.43 14.39 21.19L14.75 18.65C15.34 18.41 15.88 18.09 16.37 17.71L18.76 18.67C18.98 18.74 19.23 18.67 19.35 18.45L21.27 15.13C21.39 14.91 21.34 14.66 21.14 14.52L19.14 12.94ZM12 15.6C10.02 15.6 8.4 13.98 8.4 12C8.4 10.02 10.02 8.4 12 8.4C13.98 8.4 15.6 10.02 15.6 12C15.6 13.98 13.98 15.6 12 15.6Z" fill="#ffffff"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );

  // Component for displaying the current interview question
  const InterviewPanel = ({ currentQuestion, onNextQuestion }: { currentQuestion: string | null, onNextQuestion: () => void }) => (
    <div className="panel interview-panel">
      <h2>Current Question</h2>
      <div className="question-display">
        <p>{currentQuestion}</p>
      </div>
      <div className="controls">
        <button className="control-button" onClick={onNextQuestion}>Next Question</button>
        <button className="control-button">End Interview</button>
      </div>
    </div>
  );

  // Component for displaying the live transcription
  const TranscriptionPanel = ({ transcription }: { transcription: string[] }) => (
    <div className="panel transcription-panel">
      <h2>Live Transcription</h2>
      <div className="transcription-container">
        {transcription.length === 0 ? (
          <div className="empty-state">
            <p>Waiting for candidate response...</p>
          </div>
        ) : (
          <div className="transcription-text">
            {transcription.map((line, index) => (
              <p key={index} className="transcript-line">
                {line}
              </p>
            ))}
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Component for displaying the analytics
  const AnalyticsPanel = ({ analytics }: { analytics: Analytics }) => {
    const metrics = [
      { name: 'Confidence', value: analytics.confidence, color: '#00c8ff' },
      { name: 'Authenticity', value: analytics.authenticity, color: '#9d00ff' },
      { name: 'Relevance', value: analytics.relevance, color: '#00ffe5' },
      { name: 'Clarity', value: analytics.clarity, color: '#ff00c8' },
      { name: 'Knowledge', value: analytics.knowledgeDepth, color: '#ffae00' },
    ];

    return (
      <div className="panel analytics-panel">
        <h2>Response Analytics</h2>
        <div className="metrics-container">
          {metrics.map((metric) => (
            <div key={metric.name} className="metric">
              <div className="metric-header">
                <span className="metric-name">{metric.name}</span>
                <span className="metric-value">{Math.round(metric.value)}%</span>
              </div>
              <div className="progress-track">
                <div 
                  className="progress-fill" 
                  style={{ 
                    width: `${metric.value}%`, 
                    backgroundColor: metric.color,
                    boxShadow: `0 0 5px ${metric.color}`
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Component for displaying facial analysis
  const FacialAnalysis = ({ facialData }: { facialData: FacialData }) => (
    <div className="panel facial-panel">
      <h2>Facial Analysis</h2>
      <div className="facial-metrics">
        <div className="facial-metric">
          <div className="metric-header">
            <span>Attentiveness</span>
            <span>{Math.round(facialData.attentiveness)}%</span>
          </div>
          <div className="progress-track">
            <div 
              className="progress-fill" 
              style={{ 
                width: `${facialData.attentiveness}%`,
                background: 'linear-gradient(to right, #00ffe5, #00c8ff)',
                boxShadow: '0 0 5px #00c8ff'
              }}
            ></div>
          </div>
        </div>
        <div className="facial-metric">
          <div className="metric-header">
            <span>Eye Contact</span>
            <span>{Math.round(facialData.eyeContact)}%</span>
          </div>
          <div className="progress-track">
            <div 
              className="progress-fill" 
              style={{ 
                width: `${facialData.eyeContact}%`,
                background: 'linear-gradient(to right, #9d00ff, #ff00c8)',
                boxShadow: '0 0 5px #ff00c8'
              }}
            ></div>
          </div>
        </div>
      </div>
      
      <div className="emotion-analysis">
        <div className="emotion-header">
          <span>Detected Emotion</span>
          <span className="emotion-value">{facialData.emotion}</span>
        </div>
        <div className="emotion-icons">
          <div className={`emotion-icon ${facialData.emotion === 'neutral' ? 'active' : ''}`}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <line x1="8" y1="15" x2="16" y2="15" stroke="currentColor" strokeWidth="2"/>
              <circle cx="9" cy="9" r="1" fill="currentColor"/>
              <circle cx="15" cy="9" r="1" fill="currentColor"/>
            </svg>
          </div>
          <div className={`emotion-icon ${facialData.emotion === 'confident' ? 'active' : ''}`}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <path d="M8 14C8 14 10 16 12 16C14 16 16 14 16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="9" cy="9" r="1" fill="currentColor"/>
              <circle cx="15" cy="9" r="1" fill="currentColor"/>
            </svg>
          </div>
          <div className={`emotion-icon ${facialData.emotion === 'thoughtful' ? 'active' : ''}`}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <path d="M8 15L16 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="9" cy="9" r="1" fill="currentColor"/>
              <circle cx="15" cy="9" r="1" fill="currentColor"/>
              <path d="M17 6L19 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <div className={`emotion-icon ${facialData.emotion === 'focused' ? 'active' : ''}`}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <line x1="8" y1="15" x2="16" y2="15" stroke="currentColor" strokeWidth="2"/>
              <path d="M9 8L9 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M15 8L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
      </div>
      
      <div className="micro-expressions">
        <div className="micro-header">Micro-Expressions</div>
        <div className="expressions-list">
          {facialData.microExpressions.length === 0 ? (
            <span className="no-expressions">No micro-expressions detected</span>
          ) : (
            facialData.microExpressions.map((expr, index) => (
              <div key={index} className="expression-tag">
                {expr}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
    <div className="root">
      <Head>
        <title>AI Interview Assistant</title>
        <meta name="description" content="Next-gen AI-powered interview platform" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="layout">
       <HeaderComponent />
        <main>
          {!interviewStarted ? (
            <div className="start-screen">
              <h1>AI Interview Assistant</h1>
              <p>Intelligent interview system with real-time analysis and feedback</p>
            </div>
          ) : (
            <div className="interview-grid">
              <div className="main-panel">
                <CandidateVideo facialData={facialData} />
                <InterviewPanel 
                  currentQuestion={currentQuestion} 
                  onNextQuestion={fetchNextQuestion} 
                />
              </div>
              <div className="side-panel">
                <TranscriptionPanel transcription={transcription} />
                <AnalyticsPanel analytics={analytics} />
                <FacialAnalysis facialData={facialData} />
              </div>
            </div>
          )}
        </main>
      </div>
  </div>
  </>
  )}