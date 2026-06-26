import { Link } from 'react-router-dom';
import { Crown, Zap, Target, Trophy, Users, BookOpen, ChevronDown } from 'lucide-react';

const features = [
  { icon: Zap, title: 'Live Interactive Classes', desc: 'Join real-time sessions with expert tutors via Google Meet.' },
  { icon: Target, title: 'Structured Curriculum', desc: 'From opening principles to advanced endgame techniques.' },
  { icon: Trophy, title: 'Track Your Progress', desc: 'Monitor your growth with session history and milestones.' },
  { icon: Users, title: 'Small Group Sessions', desc: 'Personalized attention in intimate learning environments.' },
  { icon: BookOpen, title: 'Tactical Puzzles', desc: 'Sharpen your calculation with curated puzzle sets.' },
  { icon: Crown, title: 'Expert Guidance', desc: 'Learn from titled players and certified chess coaches.' },
];

const faqs = [
  { q: 'Who are the classes for?', a: 'All skill levels — from absolute beginners to club players looking to improve their game.' },
  { q: 'How do I join a session?', a: 'Register, log in, and click the Join Live Session button on your dashboard. Sessions run via Google Meet.' },
  { q: 'Can I access past sessions?', a: 'We\'re adding session recordings in a future update. For now, live attendance is recommended.' },
  { q: 'Is there a fee?', a: 'Contact us to learn about our current plans and pricing.' },
];

const testimonials = [
  { name: 'Aryan S.', text: 'My rating jumped 200 points in two months. The live format makes all the difference.', emoji: '♟' },
  { name: 'Priya M.', text: 'Finally understood the endgame thanks to the dedicated sessions. Highly recommend!', emoji: '♚' },
  { name: 'Rohan K.', text: 'The tutors explain concepts so clearly. I love the small group setting.', emoji: '♛' },
];

export default function Landing() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="chess-pattern relative min-h-screen flex items-center justify-center text-center px-4 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-600/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Chess board illustration */}
          <div className="mb-8 flex justify-center">
            <div className="grid grid-cols-8 gap-0 rounded-2xl overflow-hidden shadow-2xl border border-gray-700 w-48 h-48 md:w-64 md:h-64">
              {Array.from({ length: 64 }).map((_, i) => {
                const row = Math.floor(i / 8);
                const col = i % 8;
                const isLight = (row + col) % 2 === 0;
                const pieces = { 0: '♜', 7: '♜', 1: '♞', 6: '♞', 3: '♛', 4: '♚' };
                return (
                  <div
                    key={i}
                    className={`flex items-center justify-center text-xs md:text-sm ${
                      isLight ? 'bg-gray-200' : 'bg-gray-800'
                    }`}
                  >
                    {row === 0 && pieces[col] ? (
                      <span className="text-gray-900">{pieces[col]}</span>
                    ) : row === 1 ? (
                      <span className="text-gray-900">♟</span>
                    ) : row === 6 ? (
                      <span className="text-white">♙</span>
                    ) : row === 7 && pieces[col] ? (
                      <span className="text-white">{pieces[col]?.replace(/[♜♞♛♚]/g, (m) => ({ '♜': '♖', '♞': '♘', '♛': '♕', '♚': '♔' }[m]))}</span>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="inline-flex items-center gap-2 bg-gold-600/10 border border-gold-700/40 rounded-full px-4 py-2 text-gold-400 text-sm mb-6">
            <Crown size={14} />
            Live Interactive Chess Coaching
          </div>

          <h1 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight mb-6">
            Master Chess Through<br />
            <span className="gold-gradient">Live Interactive Classes</span>
          </h1>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
            Join our expert-led live sessions and transform your chess game. From openings to endgames, we've got every phase covered.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="btn-gold text-lg px-8 py-4">
              Register Now →
            </Link>
            <Link to="/login" className="btn-outline text-lg px-8 py-4">
              Login
            </Link>
          </div>

          <div className="mt-16 animate-bounce">
            <ChevronDown className="mx-auto text-gray-600" />
          </div>
        </div>
      </section>

      {/* Why Chess */}
      <section className="py-20 px-4 bg-gray-900/50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Why Learn <span className="gold-gradient">Chess?</span>
          </h2>
          <p className="text-gray-400 mb-12 max-w-xl mx-auto">Chess sharpens thinking that extends far beyond the 64 squares.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Critical Thinking', 'Patience & Focus', 'Memory Boost', 'Problem Solving'].map((item) => (
              <div key={item} className="card p-6 text-center">
                <div className="text-3xl mb-3">♟</div>
                <p className="text-sm font-medium text-gray-300">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4">
            What We <span className="gold-gradient">Offer</span>
          </h2>
          <p className="text-gray-400 text-center mb-12">Everything you need to grow as a chess player.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card p-6 hover:border-gold-700/50 transition-colors group">
                <div className="w-11 h-11 rounded-xl bg-gold-600/10 border border-gold-700/30 flex items-center justify-center mb-4 group-hover:bg-gold-600/20 transition-colors">
                  <Icon className="text-gold-500" size={20} />
                </div>
                <h3 className="font-semibold text-white mb-2">{title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gray-900/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
            What Students <span className="gold-gradient">Say</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map(({ name, text, emoji }) => (
              <div key={name} className="card p-6">
                <div className="text-3xl mb-4">{emoji}</div>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">"{text}"</p>
                <p className="text-gold-400 font-semibold text-sm">— {name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
            <span className="gold-gradient">FAQ</span>
          </h2>
          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
              <div key={q} className="card p-5">
                <h3 className="font-semibold text-white mb-2">{q}</h3>
                <p className="text-sm text-gray-400">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 px-4 bg-gray-900/50">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-display font-bold mb-4">Get In <span className="gold-gradient">Touch</span></h2>
          <p className="text-gray-400 mb-6">Have questions? We'd love to hear from you.</p>
          <a
            href="mailto:xyz73502@gmail.com"
            className="btn-gold inline-flex items-center gap-2"
          >
            Contact Us
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 text-center text-sm text-gray-500">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Crown className="text-gold-600" size={16} />
          <span className="font-semibold text-gray-300">ChessAcademy</span>
        </div>
        <p>© {new Date().getFullYear()} Chess Academy. All rights reserved.</p>
      </footer>
    </div>
  );
}
