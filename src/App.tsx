/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, Moon, Star, Sparkles, Lock, Unlock, Smile, MessageCircle, 
  Clock, Gift, ChevronDown, Crown, Send, Bookmark, Music, Volume2,
  Feather, Coffee, Flower2, Mail, ExternalLink, Check, Compass, Eye,
  Sparkle
} from 'lucide-react';
import confetti from 'canvas-confetti';

// --- Gentle Sound Effect ---
const playPopSound = () => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.2);
  } catch {
    // Silent fallback
  }
};

const triggerHeartShower = () => {
  confetti({
    particleCount: 45,
    spread: 80,
    origin: { y: 0.65 },
    colors: ['#f43f5e', '#fb7185', '#fda4af', '#fecdd3', '#ffe4e6', '#fbbf24'],
    shapes: ['circle']
  });
};

// --- Ambient Canvas Artwork Elements (Rendered directly into background foundation) ---
const CanvasBackgroundArtwork = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Subtle organic paper dots & lined guides */}
      <div 
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: 'radial-gradient(#262120 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* Gentle Watercolor Glow Fields drawn on the canvas */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-rose-200/35 blur-3xl" />
      <div className="absolute top-1/3 -left-20 w-80 h-80 rounded-full bg-amber-100/40 blur-3xl" />
      <div className="absolute top-2/3 -right-20 w-88 h-88 rounded-full bg-purple-100/35 blur-3xl" />
      <div className="absolute -bottom-20 left-1/4 w-96 h-96 rounded-full bg-pink-100/40 blur-3xl" />

      {/* Subtle Botanical / Doodled elements resting openly in the canvas margin */}
      <div className="absolute top-12 left-8 text-rose-300/40 animate-pulse">
        <Flower2 size={42} strokeWidth={1.2} />
      </div>
      <div className="absolute top-80 right-6 text-amber-300/40 hidden md:block">
        <Star size={36} strokeWidth={1.2} />
      </div>
      <div className="absolute top-[1200px] left-8 text-rose-300/30 hidden md:block">
        <Heart size={44} strokeWidth={1.2} />
      </div>
      <div className="absolute top-[1800px] right-8 text-purple-300/40 hidden md:block">
        <Moon size={40} strokeWidth={1.2} />
      </div>
    </div>
  );
};

// --- Password / Entrance Screen (Open Canvas Letterhead - No Opaque Card Box) ---
const PasswordPage = ({ onUnlock }: { onUnlock: () => void }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);

  const handleUnlock = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const digits = password.replace(/\D/g, '');
    if (digits === '2132012' || digits === '21032012') {
      setIsCorrect(true);
      setError('');
      playPopSound();
      triggerHeartShower();
      setTimeout(onUnlock, 1000);
    } else {
      setError('تاريخ ميلادك أنتي يا رورو.. ركزي شوية 🌸 (21 / 3 / 2012)');
      setIsCorrect(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-md text-center"
      >
        {/* Vintage Letterhead Seal */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-rose-100/80 border-1.5 border-[#262120] rounded-full shadow-[2px_2px_0px_#262120] mb-5">
          <span className="text-rose-600 font-bold text-xs">💌 خطاب خاص</span>
          <span className="text-stone-400">·</span>
          <span className="text-stone-800 font-bold text-xs">إلى رحمة سليمان (رورو)</span>
        </div>

        {/* Large Handwritten Calligraphic Title */}
        <h1 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight font-display mb-3">
          أهلاً بجميلة الجميلات 🌸
        </h1>

        {/* Open Quote drawn directly on the canvas */}
        <p className="text-stone-700 text-base sm:text-lg font-serif italic leading-relaxed max-w-sm mx-auto mb-8 ink-underline">
          "هذه المساحة خُلقت لأن في يومٍ ما، وُلدت <span className="font-bold text-rose-600 not-italic">رحمة</span>."
        </p>

        {/* Input Form without enclosing box */}
        <form onSubmit={handleUnlock} className="space-y-4 max-w-xs mx-auto">
          <div className="space-y-2 text-right">
            <label className="text-xs font-bold text-stone-600 block text-center">
              🔑 ادخلي مفتاح المرور (تاريخ ميلادك):
            </label>
            <input
              type="text"
              placeholder="21 / 3 / 2012"
              value={password}
              onChange={(e) => { setPassword(e.target.value); if (error) setError(''); }}
              className="w-full py-3 px-4 bg-transparent border-b-2 border-stone-800 focus:border-rose-500 focus:bg-rose-50/30 text-center text-xl sm:text-2xl font-bold tracking-widest text-stone-900 outline-none transition-all placeholder:text-stone-400"
            />
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -4 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -4 }} 
                className="text-rose-800 text-xs font-bold py-1.5 px-3 bg-rose-100/70 rounded-xl text-center"
              >
                {error}
              </motion.div>
            )}
            {isCorrect && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }} 
                className="text-emerald-800 font-bold text-xs py-1.5 px-3 bg-emerald-100/80 rounded-xl text-center flex items-center justify-center gap-1.5"
              >
                <Check size={16} className="text-emerald-600" />
                <span>أهلاً بقلب رورو! جاري فتح الرسالة... ✨</span>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={isCorrect}
            className="w-full mt-2 py-3 px-6 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-black text-sm border-2 border-[#262120] shadow-[2.5px_2.5px_0px_#262120] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#262120] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            {isCorrect ? (
              <span>مرحباً بكِ 💗</span>
            ) : (
              <>
                <span>افتحي الرسالة</span>
                <Sparkles size={16} />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-xs text-stone-400 font-serif">
          21 مارس · صُنعت بكل الحب لأجلكِ
        </div>
      </motion.div>
    </div>
  );
};

// --- Main Love Letter Canvas (Drawn directly on background - Zero rigid boxes) ---
const MainContent = () => {
  const [showSecrets, setShowSecrets] = useState<number[]>([]);
  const [activeReasonCategory, setActiveReasonCategory] = useState<string>('all');
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [heartCount, setHeartCount] = useState<number>(1);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const toggleSecret = (id: number) => {
    playPopSound();
    if (showSecrets.includes(id)) {
      setShowSecrets(showSecrets.filter(s => s !== id));
    } else {
      setShowSecrets([...showSecrets, id]);
    }
  };

  const handleSendLove = () => {
    playPopSound();
    triggerHeartShower();
    setIsLiked(true);
    setHeartCount(prev => prev + 1);
  };

  // Time calculation since April 2, 2026
  useEffect(() => {
    const timer = setInterval(() => {
      const startDate = new Date('2026-04-02T15:15:00');
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const today = new Date();
  const nextBirthday = new Date(today.getFullYear(), 2, 21); // March 21
  if (today > nextBirthday) nextBirthday.setFullYear(today.getFullYear() + 1);
  const timeToBday = nextBirthday.getTime() - today.getTime();
  const daysToBday = Math.ceil(timeToBday / (1000 * 60 * 60 * 24));

  const reasons = [
    { id: 1, tag: 'روحك', title: 'طيبة قلبك', desc: 'قلبك الأبيض اللي بيساع الكل وبيريح أي حد بيتعامل معاكي، وكأنك واحة سلام وسط زحام الدنيا.' },
    { id: 2, tag: 'بهجة', title: 'روحك الحلوة', desc: 'الروح الخفيفة اللي بتخلي أي مكان تدخلي فيه ينور ويبقى مبهج ومليان دفء حقيقي.' },
    { id: 3, tag: 'اهتمام', title: 'اهتمامك بالتفاصيل', desc: 'بتلاحظي حاجات صغيرة بتفرق جداً، وبتحسسي اللي قدامك بقد إيه هو غالي ومهم.' },
    { id: 4, tag: 'براءة', title: 'براءتك الصافية', desc: 'براءة طفلة لسه محتفظة بنقاء روحها وحلاوتها وصدقها من غير أي تصنع.' },
    { id: 5, tag: 'صوتك', title: 'طريقة كلامك', desc: 'الهدوء والرقة في صوتك بيخلوني أنسى أي تعب وأحس بالطمأنينة والسكينة.' },
    { id: 6, tag: 'عفوية', title: '"اومال"', desc: 'الكلمة اللي بتقوليها بعفوية غير عادية وبتخليني أبتسم من كل قلبي كل مرة أسمعها.' },
    { id: 7, tag: 'لطف', title: 'استغرابك العفوي', desc: 'لما بتستغربي من حاجة بسيطة بتباني فيها رقيقة جداً وعلى طبيعتك اللي بحبها.' },
    { id: 8, tag: 'وضوح', title: 'صدقك وصراحتك', desc: 'وضوحك اللي بيخليني أثق فيكي وأرتاح لكلامك من غير أي تردد أو حيرة.' },
    { id: 9, tag: 'سكينة', title: 'هدوءك المريح', desc: 'الهالة الهادية اللي حواليكي بتخلي الوقت معاكي يعدي كأنه دقيقة واحدة من حلاوته.' },
    { id: 10, tag: 'سحر', title: 'ابتسامتك الجميلة', desc: 'الضحكة اللي بتغير مودي للأحسن في ثانية واحدة وتمسح أي ضيق أو زعل.' },
    { id: 11, tag: 'وعي', title: 'ذكاؤك ونضجك', desc: 'نضجك العقلي وطريقة فهمك للأمور اللي بتسبق سنك بكتير وبتبهجني وتفرحني.' },
    { id: 12, tag: 'جمال', title: 'رقتك في التعامل', desc: 'الأسلوب اللطيف والناعم اللي بيعكس قد إيه أنتي إنسانة نادرة وأصيلة ومتربية.' },
    { id: 13, tag: 'طبيعية', title: 'عفويتك الحقيقية', desc: 'تصرفاتك الطبيعية البعيدة تماماً عن أي تمثيل أو تكلف.. أنتي زي ما أنتي.' },
    { id: 14, tag: 'نقاء', title: 'نقاء سريرتك', desc: 'قلبك اللي مبيعرفش يشيل ضغينة ولا حقد، ودايماً بيتمنى الخير والسلام لكل الناس.' },
    { id: 15, tag: 'استثناء', title: 'كونكِ أنتِ.. رحمة', desc: 'لأنك ببساطة "رورو" اللي مفيش زيها في الكون، وكل تفصيلة فيكي مميزة ولها مكانة خاصة.' }
  ];

  return (
    <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10 pb-16 text-[#262120]">
      
      {/* Floating Action Button (Love Shower Trigger) */}
      <div className="fixed bottom-5 left-4 sm:left-6 z-50">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          onClick={handleSendLove}
          className="px-3.5 py-2 bg-[#FAF6F0] border-2 border-[#262120] rounded-full shadow-[2px_2px_0px_#262120] flex items-center gap-1.5 text-xs font-black text-rose-600 hover:bg-rose-50 cursor-pointer"
        >
          <Heart size={16} className={`transition-transform ${isLiked ? 'fill-rose-500 text-rose-500 scale-110' : 'text-rose-500'}`} />
          <span>أحببتِ هذا؟ ({heartCount})</span>
        </motion.button>
      </div>

      {/* ============================================================ */}
      {/* HERO SECTION: Open Canvas Calligraphy & Romantic Letterhead  */}
      {/* ============================================================ */}
      <header className="pt-4 pb-12 flex flex-col items-center justify-center text-center relative">
        
        {/* Unboxed Header Metadata Ribbon (Always on top) */}
        <div className="mb-4 sm:mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 border border-stone-800/30 rounded-full bg-rose-50/50 text-xs font-bold text-stone-700">
            <Crown size={14} className="text-amber-600 fill-amber-400" />
            <span>إهداء خاص لـ رورو 🌸</span>
            <span className="text-stone-400">·</span>
            <span>21 مارس</span>
          </div>
        </div>

        {/* Master Calligraphic Name directly on canvas */}
        <div className="relative my-1">
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-stone-900 tracking-tight font-display">
            رحمة <span className="relative inline-block text-rose-600">
              سليمان
              <svg className="absolute -bottom-3 left-0 w-full h-3 text-rose-300" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M0,10 Q50,0 100,10" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
        </div>

        {/* Sweet Open Quote */}
        <div className="max-w-lg mx-auto mt-5 px-2">
          <p className="text-xl sm:text-2xl text-stone-800 font-serif italic leading-relaxed">
            "يا طيّبةً تمشي على الأرض وكأنها دعاءٌ مُستجاب."
          </p>
        </div>

        {/* Unboxed Metadata & Quick Anchor */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6 text-xs font-bold text-stone-600">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 border-b-2 border-stone-800">
            🎂 21 مارس (يوم ميلادك)
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 border-b-2 border-rose-400 text-rose-700">
            💖 بداية الحكاية: 02.04.2026
          </span>
          <a 
            href="#story" 
            className="inline-flex items-center gap-1 px-3 py-1 bg-stone-900 text-white rounded-full hover:bg-rose-600 transition-colors shadow-sm"
          >
            <span>اقرئي السطور</span>
            <ChevronDown size={13} />
          </a>
        </div>

        {/* Hand-drawn delicate separator */}
        <div className="flex items-center justify-center gap-3 my-10 opacity-30">
          <div className="h-px bg-stone-500 w-16 sm:w-32" />
          <Flower2 size={16} className="text-rose-500" />
          <div className="h-px bg-stone-500 w-16 sm:w-32" />
        </div>
      </header>

      {/* ============================================================ */}
      {/* SECTION 1: THE STORY (Open Journal Narrative on the Canvas)  */}
      {/* ============================================================ */}
      <section id="story" className="mb-16 scroll-mt-6">
        
        {/* Section Lead */}
        <div className="flex items-center justify-between border-b border-stone-800/20 pb-3 mb-6">
          <div className="flex items-center gap-2">
            <Feather size={20} className="text-rose-600" />
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 font-display">
              بداية الحكاية.. ✨
            </h2>
          </div>
          <span className="text-xs font-mono font-bold text-stone-500">
            02 / 04 / 2026
          </span>
        </div>

        {/* Narrative Prose written freely on canvas */}
        <div className="text-stone-800 text-lg sm:text-xl leading-loose font-serif space-y-5 text-right">
          <p className="first-letter:text-4xl first-letter:font-black first-letter:text-rose-600 first-letter:float-right first-letter:ml-3">
            ربما لا تعرفين هذا بالتفصيل… لكن منذ <span className="ink-underline font-bold text-rose-900 px-1">02 / 04 / 2026</span> تغيّر شيء دافئ جداً في أعماقي.
          </p>
          <p className="text-stone-700 italic">
            يومٌ دلّني فيه قلبي على رقمك دون أي ترتيب، وكأن خيوط القدر كانت تعرف تماماً أنكِ ستكونين شيئاً استثنائياً وعزيزاً يضيء كل ما حوله.
          </p>
        </div>

        {/* Open Timeline Note */}
        <div className="mt-8 pt-4 border-t border-dashed border-stone-400 flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-stone-600">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>أول تواصل: 2 أبريل 2026 (3:15 عصراً)</span>
          </div>
          <span className="text-rose-600 font-black">
            مستمرون بإذن الله 💖
          </span>
        </div>

        {/* Hand-drawn delicate separator */}
        <div className="flex items-center justify-center gap-3 my-12 opacity-30">
          <div className="h-px bg-stone-500 w-16 sm:w-32" />
          <Heart size={16} className="text-rose-500" />
          <div className="h-px bg-stone-500 w-16 sm:w-32" />
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2: 15 REASONS (Open Flowing Editorial Mosaic)        */}
      {/* ============================================================ */}
      <section className="mb-16">
        
        <div className="text-right mb-8">
          <span className="text-xs font-bold text-rose-600 uppercase tracking-wider block mb-1">
            دفتر الملاحظات الخاص 👑
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 font-display">
            15 سبباً يجعلونكِ مميزة في عيني..
          </h2>
          <p className="text-sm text-stone-600 font-serif italic mt-1">
            كل تفصيلة صغيرة فيكِ هي حكاية نقية بحد ذاتها..
          </p>
        </div>

        {/* Open List of Reasons - Seamless on canvas with subtle ink borders */}
        <div className="space-y-6">
          {reasons.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.3 }}
              className="group border-b border-stone-300/70 pb-5 text-right transition-colors"
            >
              <div className="flex items-baseline justify-between gap-3 mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-black text-rose-600 bg-rose-100/70 px-2 py-0.5 rounded">
                    {item.id.toString().padStart(2, '0')}
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-stone-900 group-hover:text-rose-600 transition-colors">
                    {item.title}
                  </h3>
                </div>
                <span className="text-[11px] font-bold text-stone-400 font-serif">
                  #{item.tag}
                </span>
              </div>

              <p className="text-stone-700 text-sm sm:text-base font-serif leading-relaxed pr-8">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Hand-drawn delicate separator */}
        <div className="flex items-center justify-center gap-3 my-12 opacity-30">
          <div className="h-px bg-stone-500 w-16 sm:w-32" />
          <Sparkles size={16} className="text-amber-500" />
          <div className="h-px bg-stone-500 w-16 sm:w-32" />
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 3: LETTER TO HER SMILE (Open Calligraphy Callout)    */}
      {/* ============================================================ */}
      <section className="mb-16 relative">
        <div className="border-r-4 border-amber-400 pr-5 sm:pr-7 py-2 text-right">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 mb-2">
            <Smile size={15} className="text-amber-600" />
            <span>رسالة إلى ابتسامتكِ</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 mb-3 font-display">
            ضحكتكِ بتنوّر كوني.. 😊
          </h2>

          <div className="space-y-3 font-serif text-base sm:text-lg text-stone-800 leading-relaxed">
            <p>
              ابتسامتك مش مجرد حركة عابرة، دي طاقة كاملة بتفرش المكان بالبهجة والسكينة.
            </p>
            <p className="text-stone-700 italic">
              لما بتضحكي، الدنيا بتبقى أهدى بكتير، والهموم بتصغر، واليوم بياخد طعم تاني. خليكي دايماً بتضحكي عشان ضحكتك دي هي سر جمال رورو اللي بنحبها.
            </p>
          </div>
        </div>

        {/* Hand-drawn delicate separator */}
        <div className="flex items-center justify-center gap-3 my-12 opacity-30">
          <div className="h-px bg-stone-500 w-16 sm:w-32" />
          <Star size={16} className="text-amber-500" />
          <div className="h-px bg-stone-500 w-16 sm:w-32" />
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 4: LITTLE DETAILS (Open Sketches on the Canvas)       */}
      {/* ============================================================ */}
      <section className="mb-16">
        <div className="text-right mb-6">
          <span className="text-xs font-bold text-rose-600 uppercase tracking-wider block mb-1">
            أشياء لا تُنسى
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 font-display">
            تفاصيل صغيرة بحبها فيكِ.. ✨
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-right">
          {[
            { icon: <MessageCircle size={20} className="text-rose-600" />, title: 'طريقة كلامك الرقيقة', desc: 'الهدوء في نبرة صوتك بيخليني أرتاح وأنسى أي دوشة في العالم.' },
            { icon: <Sparkles size={20} className="text-amber-600" />, title: 'عفويتك غير المصطنعة', desc: 'ردود أفعالك التلقائية هي من أجمل وأصدق ما فيكِ.' },
            { icon: <Heart size={20} className="text-rose-600 fill-rose-500" />, title: 'حنيتك وطيبة قلبك', desc: 'قلبك اللي بيشيل هم الناس وبيخاف على مشاعر أي حد حواليكي.' },
            { icon: <Star size={20} className="text-amber-600 fill-amber-400" />, title: 'ذكاؤك وحكمتك', desc: 'طريقة تفكيرك ونظرتك للأمور اللي بتفاجئني دايمًا بمدى نضجك.' }
          ].map((detail, idx) => (
            <div key={idx} className="flex items-start gap-3.5 border-b border-stone-200/80 pb-4">
              <div className="mt-1 flex-shrink-0">
                {detail.icon}
              </div>
              <div>
                <h3 className="font-black text-base sm:text-lg text-stone-900 mb-1">{detail.title}</h3>
                <p className="text-xs sm:text-sm text-stone-600 font-serif leading-relaxed">{detail.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Hand-drawn delicate separator */}
        <div className="flex items-center justify-center gap-3 my-12 opacity-30">
          <div className="h-px bg-stone-500 w-16 sm:w-32" />
          <Mail size={16} className="text-purple-500" />
          <div className="h-px bg-stone-500 w-16 sm:w-32" />
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 5: SECRETS (Expandable Wax Seals Open on Canvas)      */}
      {/* ============================================================ */}
      <section className="mb-16">
        <div className="text-right mb-6">
          <span className="text-xs font-bold text-purple-700 uppercase tracking-wider block mb-1">
            خاصة جداً 🤫
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 font-display">
            أسرار صغيرة لم أخبركِ بها.. 💌
          </h2>
          <p className="text-xs text-stone-500 mt-1 font-serif">انقري على أي سر لفتحه وقراءته</p>
        </div>

        <div className="space-y-3">
          {[
            { id: 1, title: 'السر الأول: عن كلمة "اومال"', content: 'أول مرة قولتي فيها "اومال" ضحكت من كل قلبي.. كانت طالعة منك ببراءة وخفة دم مش طبيعية 😌' },
            { id: 2, title: 'السر الثاني: عن دهشتك العفوية', content: 'أنا بحب استغرابك من الأشياء أكتر ما تتخيلي.. بحس إنك بتشوفي الدنيا بعيون طفلة نقية محتفظة بدهشتها الأولى.' },
            { id: 3, title: 'السر الثالث: عن أثرك اليومي', content: 'كل مرة بكلمك فيها أو بفتكر كلامك، يومي بيتحول للأحسن وتتبدل طاقتي تلقائياً.. وجودك بركة حقيقية ونعمة.' }
          ].map((secret) => {
            const isOpen = showSecrets.includes(secret.id);
            return (
              <div key={secret.id} className="border-b border-stone-300 pb-3">
                <button
                  onClick={() => toggleSecret(secret.id)}
                  className="w-full py-2.5 flex items-center justify-between text-right hover:text-purple-700 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-800 text-xs font-black flex items-center justify-center">
                      {secret.id}
                    </span>
                    <span className="font-bold text-base text-stone-800 group-hover:text-purple-700 transition-colors">
                      {secret.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-stone-400">
                      {isOpen ? 'إغلاق' : 'انقري للفتح'}
                    </span>
                    {isOpen ? (
                      <Unlock size={16} className="text-purple-600" />
                    ) : (
                      <Lock size={16} className="text-stone-400" />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="pr-7 pt-2 pb-3 text-stone-800 font-serif italic text-base leading-relaxed text-right ink-underline-purple"
                    >
                      {secret.content}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Hand-drawn delicate separator */}
        <div className="flex items-center justify-center gap-3 my-12 opacity-30">
          <div className="h-px bg-stone-500 w-16 sm:w-32" />
          <Clock size={16} className="text-rose-500" />
          <div className="h-px bg-stone-500 w-16 sm:w-32" />
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 6: TIME & COUNTDOWN (Open Postal Dials on Canvas)     */}
      {/* ============================================================ */}
      <section className="mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-right">
          
          {/* Journey Timer */}
          <div className="border-r-2 border-stone-800 pr-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-stone-500">رحلتنا بالثانية</span>
              <span className="text-xs font-mono font-bold text-rose-600">02.04.2026</span>
            </div>
            <h3 className="text-xl font-black text-stone-900 mb-3 font-display">
              الأيام الجميلة معاً ✨
            </h3>

            <div className="flex items-baseline gap-4 my-3 font-mono">
              <div>
                <span className="text-3xl sm:text-4xl font-black text-rose-600">{timeLeft.days}</span>
                <span className="text-[11px] font-bold text-stone-500 block">يوم</span>
              </div>
              <span className="text-stone-300 text-2xl">:</span>
              <div>
                <span className="text-3xl sm:text-4xl font-black text-stone-800">{timeLeft.hours}</span>
                <span className="text-[11px] font-bold text-stone-500 block">ساعة</span>
              </div>
              <span className="text-stone-300 text-2xl">:</span>
              <div>
                <span className="text-3xl sm:text-4xl font-black text-stone-800">{timeLeft.minutes}</span>
                <span className="text-[11px] font-bold text-stone-500 block">دقيقة</span>
              </div>
              <span className="text-stone-300 text-2xl">:</span>
              <div>
                <span className="text-3xl sm:text-4xl font-black text-stone-500">{timeLeft.seconds}</span>
                <span className="text-[11px] font-bold text-stone-500 block">ثانية</span>
              </div>
            </div>

            <p className="text-xs text-stone-500 font-serif italic mt-2">
              "منذ 2 أبريل 2026.. وكل لحظة بوجودك هي حياة جديدة."
            </p>
          </div>

          {/* Birthday Countdown */}
          <div className="border-r-2 border-rose-400 pr-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-rose-600">المناسبة الأغلى</span>
              <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">21 مارس 🎂</span>
            </div>
            <h3 className="text-xl font-black text-stone-900 mb-3 font-display">
              يوم ميلادك الأجمل.. 🌸
            </h3>

            <div className="my-2">
              <span className="text-5xl sm:text-6xl font-black text-rose-600 tracking-tight font-mono">
                {daysToBday}
              </span>
              <span className="text-sm font-bold text-stone-700 mr-2">يوماً متبقياً</span>
            </div>

            <p className="text-xs text-stone-500 font-serif italic mt-2">
              "21 مارس.. اليوم الذي أشرقت فيه الدنيا بقدوم أجمل رورو."
            </p>
          </div>

        </div>

        {/* Hand-drawn delicate separator */}
        <div className="flex items-center justify-center gap-3 my-12 opacity-30">
          <div className="h-px bg-stone-500 w-16 sm:w-32" />
          <Moon size={16} className="text-amber-500" />
          <div className="h-px bg-stone-500 w-16 sm:w-32" />
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 7: COMFORT LETTER ("لو في يوم زعلتي")                 */}
      {/* ============================================================ */}
      <section className="mb-16 text-right">
        <div className="flex items-center gap-2 mb-3">
          <Heart size={18} className="text-rose-500 fill-rose-400" />
          <h2 className="text-xl sm:text-2xl font-black text-stone-900 font-display">
            لو في يومٍ ما زعلتي.. 💌
          </h2>
        </div>

        <div className="space-y-3 font-serif text-lg sm:text-xl text-stone-800 leading-relaxed pr-6 border-r-2 border-rose-300">
          <p>مش لازم تكوني قوية طول الوقت،</p>
          <p>الطيبة والرقة اللي فيكِ تستاهل اللي يطبطب عليها ويشيل عنها أي حزن.</p>
          <p className="text-rose-700 font-bold">
            ربنا ما بيحط حد طيب في حياة حد… إلا لخير، وأنتي الخير والهدية اللي نورت حياتي.
          </p>
        </div>

        {/* Hand-drawn delicate separator */}
        <div className="flex items-center justify-center gap-3 my-12 opacity-30">
          <div className="h-px bg-stone-500 w-16 sm:w-32" />
          <Bookmark size={16} className="text-purple-500" />
          <div className="h-px bg-stone-500 w-16 sm:w-32" />
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 8: DREAMS & 2030 TIME CAPSULE (Open Canvas Notes)    */}
      {/* ============================================================ */}
      <section className="mb-16 space-y-10 text-right">
        
        {/* Dreams */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 mb-4 font-display">
            أحلامنا الجاية.. 🌙
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { emoji: '🌱', text: 'نكبر سوا ونحقق كل طموحاتنا وأمانينا خطوة بخطوة' },
              { emoji: '🎓', text: 'تفضلي دايماً متفوقة ومتميزة وناجحة في دراستك' },
              { emoji: '🤝', text: 'نفضل دايماً سند وخير وأمان لبعض في كل الأوقات' }
            ].map((dream, idx) => (
              <div key={idx} className="border-t-2 border-stone-800 pt-3">
                <span className="text-2xl block mb-1">{dream.emoji}</span>
                <p className="text-xs sm:text-sm font-bold text-stone-800 leading-relaxed">{dream.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Time Capsule 2030 */}
        <div className="border-r-2 border-purple-400 pr-5 pt-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-purple-700">رسالة إلى المستقبل</span>
            <span className="text-xs font-mono font-bold text-stone-500">To 2030 🕰</span>
          </div>
          <h3 className="text-xl font-black text-stone-900 mb-3 font-display">
            كبسولة 2030 لـ رورو
          </h3>

          <div className="font-serif italic text-stone-700 text-base sm:text-lg leading-relaxed space-y-2">
            <p>إلى رحمة في المستقبل…</p>
            <p>أتمنى تكوني حققتي كل اللي حلمتي بيه، ولسه محتفظة بنفس الروح النقية والضحكة الحلوة اللي عرفتها في 2026.</p>
            <p className="text-purple-900 font-bold not-italic">خليكي دايماً رورو صاحبة القلب الأبيض.. الدنيا محتاجة ناس طيبين زيك.</p>
          </div>
        </div>

      </section>

      {/* ============================================================ */}
      {/* FOOTER: Open, Compact, Poetic & Romantic Signature           */}
      {/* ============================================================ */}
      <footer className="pt-10 pb-4 border-t-2 border-dashed border-stone-300/80 text-center space-y-4">
        <div className="text-rose-500 animate-pulse inline-block">
          <Heart size={22} fill="currentColor" />
        </div>

        <div className="space-y-1.5 max-w-md mx-auto">
          <h3 className="text-lg sm:text-xl font-black text-stone-900 font-display">
            إن كان في حياتي شيءٌ جميل… فأنتِ أحد أجمل أسبابه.
          </h3>
          <p className="text-xs sm:text-sm text-rose-700 font-bold font-serif italic">
            اللهم احفظها لي، واكتب لنا الخير في كل خطوة.
          </p>
        </div>

        {/* Elegant Author Signature Lockup */}
        <div className="pt-3 flex flex-col items-center justify-center gap-2">
          <p className="text-xs font-serif text-stone-500 flex items-center justify-center gap-1.5">
            <span>صفحة خاصة ومهداة بكل الود إلى رحمة سليمان</span>
            <span>🌸</span>
          </p>

          <a 
            href="https://ais-pre-iafhb2mjobaf4oyptolbj4-123270283299.europe-west1.run.app/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-stone-800/20 bg-rose-50/60 hover:bg-rose-100/90 hover:border-rose-400 transition-all text-xs text-stone-800 shadow-sm"
          >
            <Feather size={14} className="text-rose-500 group-hover:-rotate-12 transition-transform" />
            <span className="font-serif">صُنع بكل حُب بواسطة</span>
            <span className="font-black text-rose-600 border-b border-rose-300 group-hover:border-rose-600 font-display text-xs sm:text-sm">
              أحمد عصام
            </span>
            <ExternalLink size={12} className="text-stone-400 group-hover:text-rose-600 transition-colors" />
          </a>
        </div>
      </footer>

    </div>
  );
};

// --- App Entry Point ---
export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  return (
    <main className="min-h-screen bg-[#FAF6F0] relative selection:bg-rose-200 selection:text-rose-900">
      {/* Living Background Artwork Canvas */}
      <CanvasBackgroundArtwork />

      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          <motion.div 
            key="password" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0, scale: 0.98 }} 
            transition={{ duration: 0.35 }}
          >
            <PasswordPage onUnlock={() => setIsUnlocked(true)} />
          </motion.div>
        ) : (
          <motion.div 
            key="content" 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <MainContent />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
