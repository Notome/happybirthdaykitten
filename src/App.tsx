import { useState, useRef, useCallback } from 'react';

const BIRTHDAY_NAME = 'Полиночкаааа';

const photos = Array.from({ length: 23 }, (_, i) => i + 1);

const wishes = [
  { name: 'Арина Б', text: 'Здесь будет тёплое поздравление от мамы — впиши свои слова!' },
  { name: 'Арина С', text: 'Полиночка, любимая, с днём рождения!🤍🤍🤍 Желаю тебе сегодня самых тёплых поздравлений и искренних слов . И, конечно, хочу пожелать тебе сохранить в себе то добро и то тепло, которыми ты обладаешь и которыми согреваешь нас. Спасибо тебе за это!🥹🫶🏻 Пусть в твоей жизни будет еще больше любви, путешествий и отдыха!! И пусть рядом будут люди, которые любят тебя так же сильно, как любишь ты. Люблю, целую и поздравляю с твоим днём!❤️❤️💋💋💋' },
  { name: 'Мама', text: 'Полина, с днем рождения тебя! Желаю счастья, твоего личного. Здоровья, оно важно всегда. Удача чтобы всегда была с тобой. Любви, искренней и взаимной. Чтобы тебя окружали твои люди.  Еще много приятных моментов и впечатлений, эмоций и ощущений. И пусть все, к чему стремишься- исполнится ⚡️💫' },
];

const COLORS = ['#FF6FA0', '#E0457C', '#FFC857', '#D9C2FF', '#FFFBF6', '#FF9EC4'];
const rotations = ['-rotate-3', 'rotate-2', '-rotate-1', 'rotate-3', '-rotate-2', 'rotate-1'];
const tapes = ['#FFC857', '#D9C2FF', '#FF9EC4', '#FFC857', '#D9C2FF', '#FF9EC4'];
const noteColors = ['#FFE9F0', '#FFFBF6', '#F3E8FF'];
const noteRotations = ['-rotate-2', 'rotate-1', 'rotate-2', '-rotate-1'];

const decorEmojis = ['🎈', '✨', '💕', '🎀', '🌟', '💫', '🎉', '💖', '🎊', '🌸', '🧁', '🥳', '💝', '⭐'];
const decorSizes = ['text-3xl', 'text-4xl', 'text-5xl', 'text-6xl'];

const bgDecor = Array.from({ length: 36 }, (_, i) => {
  const top = (i * 97) / 36 + (i % 5) * 1.3;
  const side = i % 3;
  const style =
    side === 0
      ? { top: `${top}%`, left: `${4 + (i % 7) * 6}%` }
      : side === 1
      ? { top: `${top}%`, right: `${4 + (i % 7) * 6}%` }
      : { top: `${top}%`, left: `${40 + (i % 5) * 4}%` };
  return {
    emoji: decorEmojis[i % decorEmojis.length],
    size: decorSizes[i % decorSizes.length],
    style,
    delay: `${(i % 6) * 0.3}s`,
  };
});

function App() {
  const [confetti, setConfetti] = useState([]);
  const idRef = useRef(0);

  const handleClick = useCallback((e) => {
    const burst = Array.from({ length: 28 }).map(() => {
      const angle = Math.random() * Math.PI * 2;
      const distance = 70 + Math.random() * 150;
      idRef.current += 1;
      return {
        id: idRef.current,
        x: e.clientX,
        y: e.clientY,
        tx: Math.cos(angle) * distance,
        ty: Math.sin(angle) * distance + 110,
        rot: Math.random() * 720 - 360,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        shape: Math.random() > 0.5 ? 'circle' : 'square',
      };
    });

    setConfetti((prev) => [...prev, ...burst]);
    setTimeout(() => {
      setConfetti((prev) => prev.filter((p) => !burst.includes(p)));
    }, 950);
  }, []);

  return (
    <div
      onClick={handleClick}
      className="relative min-h-screen w-full overflow-x-hidden cursor-pointer select-none bg-gradient-to-b from-pink-50 via-rose-50 to-pink-100 font-body"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Quicksand:wght@400;500;600&display=swap');
        .font-display { font-family: 'Fredoka', sans-serif; }
        .font-body { font-family: 'Quicksand', sans-serif; }

        @keyframes confetti-pop {
          0% { transform: translate(0,0) rotate(0deg) scale(1); opacity: 1; }
          100% { transform: translate(var(--tx), var(--ty)) rotate(var(--rot)); opacity: 0; }
        }
        @keyframes balloon-float {
          0%, 100% { transform: translateY(0) rotate(-3deg); }
          50% { transform: translateY(-16px) rotate(3deg); }
        }
        .balloon-decor { animation: balloon-float 4.5s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .balloon-decor { animation: none; }
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        {bgDecor.map((d, i) => (
          <span
            key={i}
            className={`balloon-decor absolute ${d.size} opacity-80`}
            style={{ ...d.style, animationDelay: d.delay }}
          >
            {d.emoji}
          </span>
        ))}
      </div>

      {confetti.map((p) => (
        <span
          key={p.id}
          className="fixed pointer-events-none z-50"
          style={{
            left: p.x,
            top: p.y,
            width: p.shape === 'circle' ? 12 : 10,
            height: p.shape === 'circle' ? 12 : 10,
            backgroundColor: p.color,
            borderRadius: p.shape === 'circle' ? '50%' : '2px',
            '--tx': `${p.tx}px`,
            '--ty': `${p.ty}px`,
            '--rot': `${p.rot}deg`,
            animation: 'confetti-pop 0.9s ease-out forwards',
          }}
        />
      ))}

      <div className="relative z-10">
        <header className="px-4 sm:px-6 pt-12 sm:pt-20 pb-16 flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-10">
          <div className="bg-white/70 border-4 border-pink-200 rounded-3xl p-3 shadow-lg shadow-pink-200 -rotate-3 shrink-0">
            <img
              src="/1.gif"
              alt="Гифка 1"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const placeholder = e.currentTarget.nextElementSibling;
                if (placeholder) placeholder.style.display = 'flex';
              }}
              className="w-36 h-36 sm:w-44 sm:h-44 lg:w-56 lg:h-56 object-cover rounded-2xl"
            />
            <div className="hidden w-36 h-36 sm:w-44 sm:h-44 lg:w-56 lg:h-56 rounded-2xl bg-pink-50 flex-col items-center justify-center text-rose-300 text-center p-3 font-body text-sm">
              1.gif
            </div>
          </div>

          <div className="relative w-full max-w-2xl sm:max-w-3xl bg-[#FFFBF6] rounded-2xl border border-rose-200 shadow-[0_20px_60px_-20px_rgba(224,69,124,0.35)] px-8 sm:px-16 py-12 sm:py-20 -rotate-1">
            <div className="absolute -top-5 -right-4 sm:-right-6 w-20 h-24 sm:w-24 sm:h-28 bg-pink-50 border-2 border-dashed border-rose-300 rounded-sm rotate-6 flex items-center justify-center text-3xl sm:text-4xl shadow-sm">
              🎀
            </div>
            <div className="absolute top-8 right-20 sm:right-32 -rotate-12 text-xs sm:text-sm tracking-widest uppercase text-rose-300 border-2 border-rose-200 rounded-full px-4 py-2.5">
              Открытка
            </div>

            <p className="font-display text-sm sm:text-base uppercase tracking-[0.2em] text-rose-400 mb-3">
              Кому:
            </p>
            <h1 className="font-display text-5xl sm:text-7xl font-semibold text-[#E0457C] leading-tight mb-6">
              {BIRTHDAY_NAME}
            </h1>
            <p className="font-display text-3xl sm:text-5xl text-[#FF6FA0] mb-6">
              С днём рождения! 🎂
            </p>
            <p className="text-rose-400/90 text-lg sm:text-2xl leading-relaxed">
              Милая Полина! Внизу я собрал поздравления близких тебе людей. Я наверное когда покажу этот сайт, уже поздравлю, но напишу все равно тут! Я очень благодарен судьбе и тебе что 21 год назад родилась именно ты, ты самый дорогой человек в моей жизни, я очень сильно люблю тебя, почти весь твой 20 год мы провели вместе, я надеюсь ты была счастлива и я планирую делать тебя только счастливее с каждым днем, я тебя целую и сильно люблю! Желаю тебе тотенька чтобы каждый день тебя окружали только люди которые боготоворят тебя как я тебя боготворю. Ты самый самый самый лучший человек на свете, лучше тебя совсем никого нет, мой дорогой малыш, я тебя обнимаю, целую и люблю очень очень сильно. Муа тебя!
            </p>

            <p className="mt-10 text-sm sm:text-lg text-rose-300">
              ✨ нажми в любом месте экрана — будет салют ✨
            </p>

            <span className="balloon-decor absolute -top-12 left-8 text-4xl sm:text-5xl">🎈</span>
            <span
              className="balloon-decor absolute -top-8 left-24 text-3xl sm:text-4xl"
              style={{ animationDelay: '1s' }}
            >
              🎈
            </span>
          </div>

          <div className="bg-white/70 border-4 border-pink-200 rounded-3xl p-3 shadow-lg shadow-pink-200 rotate-3 shrink-0">
            <img
              src="/2.gif"
              alt="Гифка 2"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const placeholder = e.currentTarget.nextElementSibling;
                if (placeholder) placeholder.style.display = 'flex';
              }}
              className="w-36 h-36 sm:w-44 sm:h-44 lg:w-56 lg:h-56 object-cover rounded-2xl"
            />
            <div className="hidden w-36 h-36 sm:w-44 sm:h-44 lg:w-56 lg:h-56 rounded-2xl bg-pink-50 flex-col items-center justify-center text-rose-300 text-center p-3 font-body text-sm">
              2.gif
            </div>
          </div>
        </header>

        <section className="flex flex-col sm:flex-row items-center justify-center gap-8 px-6 sm:px-10 pb-20">
          <div className="bg-white/70 border-4 border-pink-200 rounded-3xl p-4 shadow-lg shadow-pink-200 rotate-1">
            <img
              src="/cats-dance.gif"
              alt="Танцующие коты"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const placeholder = e.currentTarget.nextElementSibling;
                if (placeholder) placeholder.style.display = 'flex';
              }}
              className="w-72 h-72 sm:w-[26rem] sm:h-[26rem] object-cover rounded-2xl"
            />
            <div className="hidden w-72 h-72 sm:w-[26rem] sm:h-[26rem] rounded-2xl bg-pink-50 flex-col items-center justify-center text-rose-300 text-center p-4 font-body">
              <span className="text-5xl mb-2">🐱</span>
              Тут будет гифка с танцующими котами
              <span className="text-sm mt-2 opacity-70">(добавь cats-dance.gif в /public)</span>
            </div>
          </div>

          <div className="bg-white/70 border-4 border-pink-200 rounded-3xl p-4 shadow-lg shadow-pink-200 -rotate-1">
            <video
              src="/video1.MP4"
              controls
              autoPlay
              loop
              muted
              playsInline
              className="w-72 h-72 sm:w-[26rem] sm:h-[26rem] object-cover rounded-2xl"
            />
          </div>
        </section>

        <section className="px-6 sm:px-10 pb-20">
          <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[#E0457C] mb-10 text-center">
            Провожаем год, милыми фотографиями!!
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {photos.map((n, i) => (
              <div
                key={n}
                className={`relative aspect-square ${rotations[i % rotations.length]} transition-transform hover:scale-105 hover:rotate-0`}
              >
                <span
                  className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-5 rounded-sm shadow-sm opacity-85"
                  style={{ backgroundColor: tapes[i % tapes.length] }}
                />
                <img
                  src={`/photo${n}.jpg`}
                  className="w-full h-full object-cover rounded-md shadow-md"
                />
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 sm:px-10 pb-24">
          <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[#E0457C] mb-10 text-center">
            Поздравления от близких 💌
          </h2>
          <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {wishes.map((w, i) => (
              <div
                key={i}
                className={`relative rounded-lg p-7 sm:p-8 shadow-md ${noteRotations[i % noteRotations.length]} transition-transform hover:rotate-0 hover:scale-105`}
                style={{ backgroundColor: noteColors[i % noteColors.length] }}
              >
                <span className="absolute -top-3 left-6 text-2xl">📌</span>
                <p className="font-display text-[#E0457C] font-semibold text-lg sm:text-xl mb-3">
                  {w.name}
                </p>
                <p className="text-rose-400/90 text-base sm:text-lg leading-relaxed font-body">
                  {w.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        <footer className="text-center pb-16 pt-2 text-rose-300 text-base sm:text-lg font-body">
          сделано с любовью 💗
        </footer>
      </div>
    </div>
  );
}

export default App;