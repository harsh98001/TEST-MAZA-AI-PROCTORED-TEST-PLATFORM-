import { useMemo, useState } from 'react';
import {
  Award,
  BarChart3,
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Lock,
  LogOut,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Timer,
  UserRound,
  Users,
  X,
} from 'lucide-react';
import { questions } from './data/questions';

const roleConfig = {
  Student: {
    icon: GraduationCap,
    accent: '#00d4a8',
    blurb: 'Practice mode with instant answer feedback.',
  },
  Faculty: {
    icon: Users,
    accent: '#7c5cff',
    blurb: 'Monitor units, coverage, and class readiness.',
  },
  Administrator: {
    icon: ShieldCheck,
    accent: '#ffbd59',
    blurb: 'Full test control and imported PDF overview.',
  },
};

const units = ['All Units', ...Array.from(new Set(questions.map((question) => question.unit)))];

function App() {
  const [session, setSession] = useState(null);
  const [activeRole, setActiveRole] = useState('Student');
  const [name, setName] = useState('');
  const [unitFilter, setUnitFilter] = useState('All Units');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showReview, setShowReview] = useState(false);

  const filteredQuestions = useMemo(() => {
    if (unitFilter === 'All Units') return questions;
    return questions.filter((question) => question.unit === unitFilter);
  }, [unitFilter]);

  const currentQuestion = filteredQuestions[currentIndex] ?? filteredQuestions[0];
  const answeredInFilter = filteredQuestions.filter((question) => answers[question.id]).length;
  const correctInFilter = filteredQuestions.filter((question) => answers[question.id] === question.answer).length;
  const totalAnswered = Object.keys(answers).length;
  const totalCorrect = questions.filter((question) => answers[question.id] === question.answer).length;
  const completion = Math.round((totalAnswered / questions.length) * 100);
  const accuracy = totalAnswered ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

  const unitStats = useMemo(
    () =>
      units.slice(1).map((unit) => {
        const unitQuestions = questions.filter((question) => question.unit === unit);
        const answered = unitQuestions.filter((question) => answers[question.id]).length;
        const correct = unitQuestions.filter((question) => answers[question.id] === question.answer).length;
        return {
          unit,
          total: unitQuestions.length,
          answered,
          correct,
          percent: Math.round((answered / unitQuestions.length) * 100),
        };
      }),
    [answers],
  );

  function handleLogin(event) {
    event.preventDefault();
    setSession({
      name: name.trim() || activeRole,
      role: activeRole,
      loginTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });
  }

  function handleUnitChange(unit) {
    setUnitFilter(unit);
    setCurrentIndex(0);
    setShowReview(false);
  }

  function chooseAnswer(label) {
    if (!currentQuestion || answers[currentQuestion.id]) return;
    setAnswers((previous) => ({
      ...previous,
      [currentQuestion.id]: label,
    }));
  }

  function resetTest() {
    setAnswers({});
    setCurrentIndex(0);
    setShowReview(false);
    setUnitFilter('All Units');
  }

  if (!session) {
    return (
      <main className="login-shell">
        <div className="aurora aurora-one" />
        <div className="aurora aurora-two" />
        <section className="login-panel">
          <div className="brand-mark">
            <BookOpen size={30} />
            <span>PHP MCQ Arena</span>
          </div>
          <div className="login-copy">
            <p className="eyebrow">CAP777 exam preparation</p>
            <h1>Turn the PDF into a live test room.</h1>
            <p>
              Sign in as a student, faculty member, or administrator and run every imported PHP MCQ with instant visual feedback.
            </p>
          </div>
          <form className="login-card" onSubmit={handleLogin}>
            <label htmlFor="name">Display name</label>
            <div className="input-wrap">
              <UserRound size={18} />
              <input
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter your name"
              />
            </div>
            <div className="role-grid" aria-label="Choose role">
              {Object.entries(roleConfig).map(([role, config]) => {
                const Icon = config.icon;
                return (
                  <button
                    className={`role-card ${activeRole === role ? 'selected' : ''}`}
                    key={role}
                    onClick={() => setActiveRole(role)}
                    style={{ '--role-accent': config.accent }}
                    type="button"
                  >
                    <Icon size={22} />
                    <span>{role}</span>
                    <small>{config.blurb}</small>
                  </button>
                );
              })}
            </div>
            <button className="primary-action" type="submit">
              <Lock size={18} />
              Enter Test
            </button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand-mark compact">
          <BookOpen size={24} />
          <span>PHP MCQ Arena</span>
        </div>
        <div className="profile-card">
          <div className="avatar">{session.name.slice(0, 1).toUpperCase()}</div>
          <div>
            <strong>{session.name}</strong>
            <span>{session.role} session</span>
          </div>
        </div>
        <nav className="unit-list" aria-label="Question units">
          {units.map((unit) => (
            <button
              className={unitFilter === unit ? 'active' : ''}
              key={unit}
              onClick={() => handleUnitChange(unit)}
              type="button"
            >
              <span>{unit.replace('UNIT ', 'Unit ')}</span>
              <small>{unit === 'All Units' ? questions.length : questions.filter((question) => question.unit === unit).length}</small>
            </button>
          ))}
        </nav>
        <button className="ghost-action" onClick={() => setSession(null)} type="button">
          <LogOut size={17} />
          Switch User
        </button>
      </aside>

      <section className="content">
        <header className="topbar">
          <div>
            <p className="eyebrow">{session.role} dashboard</p>
            <h2>{unitFilter === 'All Units' ? 'Complete PHP MCQ Test' : unitFilter}</h2>
          </div>
          <div className="topbar-actions">
            <button className="ghost-action" onClick={() => setShowReview((value) => !value)} type="button">
              <BarChart3 size={17} />
              {showReview ? 'Back to Test' : 'Review'}
            </button>
            <button className="ghost-action" onClick={resetTest} type="button">
              <RotateCcw size={17} />
              Reset
            </button>
          </div>
        </header>

        <section className="stats-grid">
          <Metric icon={BookOpen} label="Imported MCQs" value={questions.length} />
          <Metric icon={Check} label="Answered" value={`${totalAnswered}/${questions.length}`} />
          <Metric icon={Award} label="Score" value={`${totalCorrect}/${questions.length}`} />
          <Metric icon={Sparkles} label="Accuracy" value={`${accuracy}%`} />
        </section>

        {showReview ? (
          <ReviewPanel
            answers={answers}
            completion={completion}
            totalCorrect={totalCorrect}
            unitStats={unitStats}
            role={session.role}
          />
        ) : (
          <QuizPanel
            answeredInFilter={answeredInFilter}
            answers={answers}
            correctInFilter={correctInFilter}
            currentIndex={currentIndex}
            currentQuestion={currentQuestion}
            filteredQuestions={filteredQuestions}
            onChoose={chooseAnswer}
            onNext={() => setCurrentIndex((index) => Math.min(index + 1, filteredQuestions.length - 1))}
            onPrevious={() => setCurrentIndex((index) => Math.max(index - 1, 0))}
            setCurrentIndex={setCurrentIndex}
          />
        )}
      </section>
    </main>
  );
}

function Metric({ icon: Icon, label, value }) {
  return (
    <article className="metric-card">
      <Icon size={20} />
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </article>
  );
}

function QuizPanel({
  answeredInFilter,
  answers,
  correctInFilter,
  currentIndex,
  currentQuestion,
  filteredQuestions,
  onChoose,
  onNext,
  onPrevious,
  setCurrentIndex,
}) {
  const selected = answers[currentQuestion.id];
  const progress = Math.round(((currentIndex + 1) / filteredQuestions.length) * 100);

  return (
    <section className="quiz-layout">
      <article className="question-card">
        <div className="question-meta">
          <span>{currentQuestion.unit}</span>
          <span>
            Question {currentIndex + 1} of {filteredQuestions.length}
          </span>
        </div>
        <div className="progress-track">
          <span style={{ width: `${progress}%` }} />
        </div>
        <h3>{currentQuestion.question}</h3>
        <div className="options-grid">
          {currentQuestion.options.map((option) => {
            const isSelected = selected === option.label;
            const isCorrect = currentQuestion.answer === option.label;
            const revealCorrect = selected && isCorrect;
            const revealWrong = isSelected && !isCorrect;
            return (
              <button
                className={`option-button ${revealCorrect ? 'correct' : ''} ${revealWrong ? 'wrong' : ''}`}
                disabled={Boolean(selected)}
                key={option.label}
                onClick={() => onChoose(option.label)}
                type="button"
              >
                <span className="option-label">{option.label}</span>
                <span>{option.text}</span>
                {revealCorrect && <Check className="result-icon" size={20} />}
                {revealWrong && <X className="result-icon" size={20} />}
              </button>
            );
          })}
        </div>
        {selected && (
          <div className={`answer-banner ${selected === currentQuestion.answer ? 'success' : 'danger'}`}>
            {selected === currentQuestion.answer ? (
              <>
                <Check size={20} /> Correct answer. Nice hit.
              </>
            ) : (
              <>
                <X size={20} /> Wrong answer. Correct option is {currentQuestion.answer}.
              </>
            )}
          </div>
        )}
        <div className="quiz-controls">
          <button onClick={onPrevious} disabled={currentIndex === 0} type="button">
            <ChevronLeft size={18} />
            Previous
          </button>
          <button onClick={onNext} disabled={currentIndex === filteredQuestions.length - 1} type="button">
            Next
            <ChevronRight size={18} />
          </button>
        </div>
      </article>

      <aside className="jump-card">
        <div className="mini-score">
          <Timer size={20} />
          <div>
            <span>This filter</span>
            <strong>
              {correctInFilter}/{answeredInFilter || 0}
            </strong>
          </div>
        </div>
        <div className="question-jump">
          {filteredQuestions.map((question, index) => {
            const answer = answers[question.id];
            const state = answer ? (answer === question.answer ? 'done-correct' : 'done-wrong') : '';
            return (
              <button
                className={`${currentIndex === index ? 'current' : ''} ${state}`}
                key={question.id}
                onClick={() => setCurrentIndex(index)}
                type="button"
              >
                {index + 1}
              </button>
            );
          })}
        </div>
      </aside>
    </section>
  );
}

function ReviewPanel({ answers, completion, totalCorrect, unitStats, role }) {
  return (
    <section className="review-layout">
      <article className="summary-card">
        <p className="eyebrow">Final overview</p>
        <h3>{totalCorrect} correct answers</h3>
        <div className="score-ring" style={{ '--score': `${completion}%` }}>
          <span>{completion}%</span>
          <small>complete</small>
        </div>
        <p>
          The PDF MCQ section supplied 155 usable questions. The written 10-mark section was intentionally left out.
        </p>
      </article>
      <article className="unit-report">
        <div className="report-heading">
          <h3>{role === 'Student' ? 'Your Unit Progress' : 'Coverage Report'}</h3>
          <span>{Object.keys(answers).length} attempted</span>
        </div>
        {unitStats.map((unit) => (
          <div className="unit-row" key={unit.unit}>
            <div>
              <strong>{unit.unit.replace('UNIT ', 'Unit ')}</strong>
              <span>
                {unit.correct}/{unit.total} correct
              </span>
            </div>
            <div className="unit-bar">
              <span style={{ width: `${unit.percent}%` }} />
            </div>
          </div>
        ))}
      </article>
    </section>
  );
}

export default App;
