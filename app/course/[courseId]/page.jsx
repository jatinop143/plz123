'use client'
import React, { useState, useEffect } from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import Link from 'next/link';
import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale,
  LinearScale,
  BarElement,
  Title
} from 'chart.js';
import './style.css';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const QUESTIONS = [
  {
    id: 1,
    text: "How satisfied are you with your life overall?",
    options: [
      { value: 1, label: "Very dissatisfied" },
      { value: 2, label: "Dissatisfied" },
      { value: 3, label: "Neutral" },
      { value: 4, label: "Satisfied" },
      { value: 5, label: "Very satisfied" }
    ]
  },
  {
    id: 2,
    text: "How often do you feel positive emotions (joy, happiness, etc.)?",
    options: [
      { value: 1, label: "Rarely" },
      { value: 2, label: "Occasionally" },
      { value: 3, label: "Sometimes" },
      { value: 4, label: "Often" },
      { value: 5, label: "Almost always" }
    ]
  },
  {
    id: 3,
    text: "How would you rate your work-life balance?",
    options: [
      { value: 1, label: "Poor" },
      { value: 2, label: "Below average" },
      { value: 3, label: "Average" },
      { value: 4, label: "Good" },
      { value: 5, label: "Excellent" }
    ]
  },
  {
    id: 4,
    text: "How meaningful do you find your daily activities?",
    options: [
      { value: 1, label: "Not meaningful" },
      { value: 2, label: "Slightly meaningful" },
      { value: 3, label: "Moderately meaningful" },
      { value: 4, label: "Very meaningful" },
      { value: 5, label: "Extremely meaningful" }
    ]
  },
  {
    id: 5,
    text: "How optimistic are you about your future?",
    options: [
      { value: 1, label: "Very pessimistic" },
      { value: 2, label: "Somewhat pessimistic" },
      { value: 3, label: "Neutral" },
      { value: 4, label: "Somewhat optimistic" },
      { value: 5, label: "Very optimistic" }
    ]
  }
];

function HappyIndexAssessment() {
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(-1);
  const [showResult, setShowResult] = useState(false);
  const [happyIndex, setHappyIndex] = useState(0);
  const [previousResults, setPreviousResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState('landing');

  useEffect(() => {
    const savedResults = localStorage.getItem('happyIndexResults');
    if (savedResults) {
      setPreviousResults(JSON.parse(savedResults));
    }
    setIsLoading(false);
  }, []);

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const startAssessment = () => {
    setCurrentQuestion(0);
    setViewMode('assessment');
  };

  const nextQuestion = () => {
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateHappyIndex = () => {
    const answeredQuestions = Object.keys(answers).length;
    if (answeredQuestions < QUESTIONS.length) {
      alert("Please answer all questions before submitting.");
      return;
    }

    const totalScore = QUESTIONS.reduce((sum, question) => {
      return sum + (answers[question.id] || 0);
    }, 0);

    const maxPossibleScore = QUESTIONS.length * 5;
    const index = Math.round((totalScore / maxPossibleScore) * 100);
    setHappyIndex(index);

    const newResult = {
      score: index,
      date: new Date().toISOString()
    };

    const updatedResults = [...previousResults, newResult].slice(-5);
    setPreviousResults(updatedResults);
    localStorage.setItem('happyIndexResults', JSON.stringify(updatedResults));

    setShowResult(true);
    setViewMode('results');
  };

  const resetAssessment = () => {
    setAnswers({});
    setCurrentQuestion(-1);
    setShowResult(false);
    setHappyIndex(0);
    setViewMode('landing');
  };

  const clearHistory = () => {
    localStorage.removeItem('happyIndexResults');
    setPreviousResults([]);
  };

  const doughnutData = {
    labels: ['Happy Index', 'Remaining'],
    datasets: [{
      data: [happyIndex, 100 - happyIndex],
      backgroundColor: ['#4CAF50', '#E0E0E0'],
      borderColor: ['#4CAF50', '#E0E0E0'],
      borderWidth: 1,
    }],
  };

  const doughnutOptions = {
    cutout: '70%',
    plugins: {
      legend: { position: 'bottom' },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.raw}%`
        }
      }
    }
  };

  const historyData = {
    labels: previousResults.map((_, i) => `Attempt ${i + 1}`),
    datasets: [{
      label: 'Happy Index Score',
      data: previousResults.map(r => r.score),
      backgroundColor: '#4CAF50',
      borderColor: '#4CAF50',
      borderWidth: 1,
    }],
  };

  const barOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: { display: true, text: 'Score (%)' }
      },
      x: {
        title: { display: true, text: 'Attempt' }
      }
    },
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'Your Happy Index History'
      }
    }
  };

  if (isLoading) {
    return <div className="loading-screen">Loading...</div>;
  }

  if (viewMode === 'landing') {
    return (
      <div className="landing-screen">
        <div className="landing-content">
          <h1>Welcome to the Happy Index Assessment</h1>
          <p>
            This assessment will help you measure your current happiness level across
            different aspects of your life. It only takes about 2 minutes to complete.
          </p>
          
          <div className="landing-features">
            <h3>What you'll get:</h3>
            <ul>
              <li>Personalized happiness score (0-100%)</li>
              <li>Visual representation of your results</li>
              <li>Comparison with your previous attempts</li>
              <li>Customized recommendations</li>
            </ul>
          </div>
          
          <div className="instructions">
            <h3>How it works:</h3>
            <ol>
              <li>Answer all 5 questions honestly</li>
              <li>Each question has 5 response options</li>
              <li>There are no right or wrong answers</li>
              <li>View your results immediately</li>
            </ol>
          </div>
          
          <button 
            onClick={startAssessment}
            className="start-button"
            aria-label="Begin the happiness assessment"
          >
            Begin Assessment
          </button>
          
          {previousResults.length > 0 && (
            <button 
              onClick={() => {
                setViewMode('history');
                setShowResult(true);
              }}
              className="view-history-button"
            >
              View Previous Results
            </button>
          )}
        </div>
      </div>
    );
  }

  if (viewMode === 'history' && showResult && previousResults.length > 0) {
    return (
      <div className="happy-index-container">
        <h1>Your Previous Happy Index Results</h1>
        
        <div className="history-section">
          <div className="history-header">
            <h3>Your History</h3>
            <button 
              onClick={() => {
                setViewMode('landing');
                setShowResult(false);
              }} 
              className="back-button"
            >
              Back to Home
            </button>
          </div>
          
          <div className="history-chart">
            <Bar data={historyData} options={barOptions} />
          </div>
          
          <div className="history-dates">
            {previousResults.map((result, index) => (
              <div key={index} className="result-item">
                <span className="attempt-number">Attempt {index + 1}</span>
                <span className="attempt-date">
                  {new Date(result.date).toLocaleDateString()}
                </span>
                <span className="attempt-score">{result.score}%</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="action-buttons">
          <button 
            onClick={() => {
              setViewMode('assessment');
              setCurrentQuestion(0);
              setShowResult(false);
            }} 
            className="take-assessment-btn"
          >
            Take New Assessment
          </button>
        </div>
      </div>
    );
  }

  if (viewMode === 'results') {
    return (
      <div className="happy-index-container">
        <h1>Your Happy Index Results</h1>
        
        <div className="chart-container">
          <Doughnut data={doughnutData} options={doughnutOptions} />
          <div className="happy-score">
            {happyIndex}%
          </div>
        </div>
        
        <div className="interpretation">
          <h3>Interpretation:</h3>
          {happyIndex >= 80 && (
            <>
              <p>Excellent happiness level! Keep doing what you're doing.</p>
              <div className="dashboard-recommendation">
                <p>Want to maintain your happiness?</p>
                <Link href="/dashboard" className="dashboard-link">
                  Visit Dashboard for Tips
                </Link>
              </div>
            </>
          )}
          {happyIndex >= 60 && happyIndex < 80 && (
            <>
              <p>Doing well, but some areas could improve.</p>
              <div className="dashboard-recommendation">
                <p>Discover resources to boost your happiness further:</p>
                <Link href="/dashboard" className="dashboard-link">
                  Go to Happiness Resources
                </Link>
              </div>
            </>
          )}
          {happyIndex >= 40 && happyIndex < 60 && (
            <>
              <p>Moderate happiness. Consider ways to increase satisfaction.</p>
              <div className="dashboard-recommendation suggest">
                <p>We recommend checking out these resources:</p>
                <Link href="/dashboard" className="dashboard-link">
                  Visit Wellness Dashboard
                </Link>
              </div>
            </>
          )}
          {happyIndex < 40 && (
            <>
              <p>Below average happiness. We recommend exploring resources to improve wellbeing.</p>
              <div className="dashboard-recommendation urgent">
                <p>We strongly recommend these resources to help improve your happiness:</p>
                <Link href="/dashboard" className="dashboard-link">
                  Get Help Now
                </Link>
              </div>
            </>
          )}
        </div>

        {previousResults.length > 0 && (
          <div className="history-section">
            <div className="history-header">
              <h3>Your Previous Results</h3>
              <button onClick={clearHistory} className="clear-history-btn">
                Clear History
              </button>
            </div>
            <div className="history-chart">
              <Bar data={historyData} options={barOptions} />
            </div>
            <div className="history-dates">
              {previousResults.map((result, index) => (
                <p key={index}>
                  Attempt {index + 1}: {new Date(result.date).toLocaleDateString()} - {result.score}%
                </p>
              ))}
            </div>
          </div>
        )}
        
        <div className="action-buttons">
          <button onClick={resetAssessment} className="reset-btn">
            Take Assessment Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="happy-index-container">
      <h1>Happy Index Assessment</h1>
      
      <div className="progress-bar">
        <div 
          className="progress" 
          style={{ 
            width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%`,
          }}
        ></div>
        <p>Question {currentQuestion + 1} of {QUESTIONS.length}</p>
      </div>
      
      <form 
        className="question-card"
        onSubmit={(e) => {
          e.preventDefault();
          if (currentQuestion < QUESTIONS.length - 1) nextQuestion();
          else calculateHappyIndex();
        }}
      >
        <h2>{QUESTIONS[currentQuestion].text}</h2>
        <div className="options">
          {QUESTIONS[currentQuestion].options.map((option) => (
            <label
              key={option.value}
              className={`option ${
                answers[QUESTIONS[currentQuestion].id] === option.value ? 'selected' : ''
              }`}
            >
              <input
                type="radio"
                name={`question-${QUESTIONS[currentQuestion].id}`}
                value={option.value}
                checked={answers[QUESTIONS[currentQuestion].id] === option.value}
                onChange={() => handleAnswer(QUESTIONS[currentQuestion].id, option.value)}
                required
              />
              {option.label}
            </label>
          ))}
        </div>
        
        <div className="navigation">
          <button 
            type="button"
            onClick={prevQuestion} 
            disabled={currentQuestion === 0}
            className="nav-btn"
          >
            Previous
          </button>
          
          <button 
            type="submit"
            className={currentQuestion < QUESTIONS.length - 1 ? "nav-btn" : "submit-btn"}
          >
            {currentQuestion < QUESTIONS.length - 1 ? "Next" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default HappyIndexAssessment;