import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {
  FaBalanceScale,
  FaChevronLeft,
  FaChevronRight,
  FaFireAlt,
  FaLeaf,
  FaMoneyBillWave,
  FaRobot,
  FaTimes,
  FaUtensils,
} from 'react-icons/fa';
import ChatWithAI from './ChatWithAI';

const getCurrencySymbol = (currency) => {
  if (currency === 'USD') return '$';
  if (currency === 'EUR') return 'EUR ';
  if (currency === 'GBP') return 'GBP ';
  return 'Rs. ';
};

const getMacroTotals = (meals = []) => meals.reduce(
  (totals, meal) => ({
    protein: totals.protein + (Number(meal.macros?.protein) || 0),
    carbs: totals.carbs + (Number(meal.macros?.carbs) || 0),
    fat: totals.fat + (Number(meal.macros?.fat) || 0),
  }),
  { protein: 0, carbs: 0, fat: 0 },
);

const Diet = () => {
  const [dietPlan, setDietPlan] = useState(null);
  const [healthInfo, setHealthInfo] = useState(null);
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [chatOpen, setChatOpen] = useState(false);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    let cancelled = false;

    const loadDashboard = async () => {
      setLoading(true);
      setError('');

      try {
        const [planResponse, healthResponse] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/api/v2/diet/generate`, {
            withCredentials: true,
          }),
          axios.get(`${import.meta.env.VITE_API_URL}/api/v2/users/userHealth`, {
            withCredentials: true,
          }),
        ]);

        if (cancelled) return;
        setDietPlan(planResponse.data.data.newPlan);
        setHealthInfo(healthResponse.data.data.healthUser?.[0] || null);
        setActiveDayIndex(0);
      } catch (requestError) {
        if (cancelled) return;
        setError(requestError.response?.data?.error || 'We could not load your weekly diet plan.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadDashboard();
    document.title = 'Weekly Diet Plan';

    return () => {
      cancelled = true;
    };
  }, []);

  const handlePlanUpdate = (updatedPlan) => {
    setDietPlan(updatedPlan);
    setActiveDayIndex(0);
  };

  const days = dietPlan?.days || [];
  const activeDay = days[activeDayIndex];
  const macros = getMacroTotals(activeDay?.meals);
  const currency = dietPlan?.currency || userData?.currency || 'INR';
  const currencySymbol = getCurrencySymbol(currency);

  const selectPreviousDay = () => {
    setActiveDayIndex((current) => Math.max(0, current - 1));
  };

  const selectNextDay = () => {
    setActiveDayIndex((current) => Math.min(days.length - 1, current + 1));
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-lime-50 px-4 pb-16 pt-28 dark:from-gray-950 dark:via-gray-900 dark:to-emerald-950/30 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 overflow-hidden rounded-3xl border border-emerald-100 bg-white/90 p-6 shadow-xl shadow-emerald-100/50 backdrop-blur dark:border-gray-800 dark:bg-gray-900/90 dark:shadow-none sm:p-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">
                <FaLeaf aria-hidden="true" /> AI-powered weekly nutrition
              </span>
              <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Your 7-Day Diet Plan
              </h1>
              <p className="mt-2 max-w-2xl text-gray-600 dark:text-gray-300">
                A complete week of meals shaped around your goals, preferences, and budget.
              </p>
            </div>

            {dietPlan && (
              <div className="grid grid-cols-2 gap-3 sm:min-w-80">
                <div className="rounded-2xl bg-orange-50 p-4 dark:bg-orange-950/30">
                  <p className="text-xs font-bold uppercase tracking-wide text-orange-600 dark:text-orange-300">Daily average</p>
                  <p className="mt-1 text-2xl font-black text-gray-900 dark:text-white">
                    {dietPlan.averageDailyCalories || Math.round(dietPlan.totalCalories / 7)}
                    <span className="ml-1 text-sm font-semibold text-gray-500">kcal</span>
                  </p>
                </div>
                <div className="rounded-2xl bg-emerald-50 p-4 dark:bg-emerald-950/30">
                  <p className="text-xs font-bold uppercase tracking-wide text-emerald-600 dark:text-emerald-300">Currency</p>
                  <p className="mt-1 text-2xl font-black text-gray-900 dark:text-white">{currency}</p>
                </div>
              </div>
            )}
          </div>
        </header>

        {loading && (
          <div className="rounded-3xl border border-emerald-100 bg-white p-10 text-center shadow-lg dark:border-gray-800 dark:bg-gray-900" role="status">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-emerald-100 border-t-emerald-500" />
            <p className="font-semibold text-gray-700 dark:text-gray-200">Preparing your full week of meals...</p>
            <p className="mt-1 text-sm text-gray-500">The first weekly plan may take a little longer to generate.</p>
          </div>
        )}

        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300" role="alert">
            <p className="font-bold">Your plan could not be loaded</p>
            <p className="mt-1 text-sm">{error}</p>
          </div>
        )}

        {!loading && !error && !activeDay && (
          <div className="rounded-3xl border border-emerald-100 bg-white p-10 text-center shadow-lg dark:border-gray-800 dark:bg-gray-900">
            <FaUtensils className="mx-auto mb-4 text-4xl text-emerald-500" aria-hidden="true" />
            <h2 className="text-xl font-black text-gray-900 dark:text-white">No weekly plan is available yet</h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400">Update your profile and health details, then return here to generate your plan.</p>
          </div>
        )}

        {!loading && !error && activeDay && (
          <section aria-labelledby="daily-plan-heading">
            <nav className="mb-6 rounded-2xl border border-emerald-100 bg-white p-2 shadow-md dark:border-gray-800 dark:bg-gray-900" aria-label="Choose a day">
              <div className="flex gap-2 overflow-x-auto pb-1 sm:grid sm:grid-cols-7 sm:overflow-visible sm:pb-0">
                {days.map((day, index) => (
                  <button
                    key={day._id || day.dayNumber}
                    type="button"
                    onClick={() => setActiveDayIndex(index)}
                    className={`min-w-24 rounded-xl px-4 py-3 text-left transition sm:min-w-0 sm:text-center ${
                      activeDayIndex === index
                        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200 dark:shadow-none'
                        : 'text-gray-600 hover:bg-emerald-50 dark:text-gray-300 dark:hover:bg-gray-800'
                    }`}
                    aria-current={activeDayIndex === index ? 'page' : undefined}
                  >
                    <span className="block text-xs font-semibold uppercase tracking-wide opacity-80">Day</span>
                    <span className="text-lg font-black">{day.dayNumber || index + 1}</span>
                  </button>
                ))}
              </div>
            </nav>

            <div className="mb-6 rounded-3xl border border-emerald-100 bg-white p-5 shadow-lg dark:border-gray-800 dark:bg-gray-900 sm:p-7">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center justify-between gap-4">
                  <button type="button" onClick={selectPreviousDay} disabled={activeDayIndex === 0} className="rounded-full border border-gray-200 p-3 text-gray-600 transition hover:border-emerald-300 hover:text-emerald-600 disabled:cursor-not-allowed disabled:opacity-30 dark:border-gray-700 dark:text-gray-300" aria-label="Previous day">
                    <FaChevronLeft aria-hidden="true" />
                  </button>
                  <div className="text-center lg:text-left">
                    <p className="text-sm font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Today&apos;s menu</p>
                    <h2 id="daily-plan-heading" className="text-2xl font-black text-gray-900 dark:text-white">{activeDay.label || `Day ${activeDayIndex + 1}`}</h2>
                  </div>
                  <button type="button" onClick={selectNextDay} disabled={activeDayIndex === days.length - 1} className="rounded-full border border-gray-200 p-3 text-gray-600 transition hover:border-emerald-300 hover:text-emerald-600 disabled:cursor-not-allowed disabled:opacity-30 dark:border-gray-700 dark:text-gray-300 lg:hidden" aria-label="Next day">
                    <FaChevronRight aria-hidden="true" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  <div className="rounded-xl bg-orange-50 px-4 py-3 dark:bg-orange-950/30">
                    <span className="flex items-center gap-1 text-xs font-bold text-orange-600 dark:text-orange-300"><FaFireAlt /> Calories</span>
                    <strong className="text-lg text-gray-900 dark:text-white">{activeDay.totalCalories}</strong>
                  </div>
                  <div className="rounded-xl bg-blue-50 px-4 py-3 dark:bg-blue-950/30"><span className="text-xs font-bold text-blue-600 dark:text-blue-300">Protein</span><strong className="block text-lg text-gray-900 dark:text-white">{macros.protein}g</strong></div>
                  <div className="rounded-xl bg-amber-50 px-4 py-3 dark:bg-amber-950/30"><span className="text-xs font-bold text-amber-600 dark:text-amber-300">Carbs</span><strong className="block text-lg text-gray-900 dark:text-white">{macros.carbs}g</strong></div>
                  <div className="rounded-xl bg-rose-50 px-4 py-3 dark:bg-rose-950/30"><span className="text-xs font-bold text-rose-600 dark:text-rose-300">Fat</span><strong className="block text-lg text-gray-900 dark:text-white">{macros.fat}g</strong></div>
                </div>

                <button type="button" onClick={selectNextDay} disabled={activeDayIndex === days.length - 1} className="hidden rounded-full border border-gray-200 p-3 text-gray-600 transition hover:border-emerald-300 hover:text-emerald-600 disabled:cursor-not-allowed disabled:opacity-30 dark:border-gray-700 dark:text-gray-300 lg:block" aria-label="Next day">
                  <FaChevronRight aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {activeDay.meals.map((meal) => (
                <article key={meal._id || `${activeDay.dayNumber}-${meal.mealType}`} className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-md transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900 dark:hover:border-emerald-800">
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div>
                      <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">
                        <FaUtensils aria-hidden="true" /> {meal.mealType}
                      </span>
                      <h3 className="mt-3 text-xl font-black text-gray-900 dark:text-white">{meal.name}</h3>
                    </div>
                    <span className="shrink-0 rounded-xl bg-orange-50 px-3 py-2 text-sm font-bold text-orange-600 dark:bg-orange-950/30 dark:text-orange-300">{meal.calories} kcal</span>
                  </div>

                  <p className="mb-4 flex items-start gap-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
                    <FaBalanceScale className="mt-1 shrink-0 text-emerald-500" aria-hidden="true" />
                    <span>{meal.quantity || 'Quantity not specified'}</span>
                  </p>

                  <div className="grid grid-cols-3 gap-2 border-t border-gray-100 pt-4 text-center dark:border-gray-800">
                    <div><span className="block text-xs text-gray-500">Protein</span><strong className="text-sm text-blue-600 dark:text-blue-300">{meal.macros?.protein || 0}g</strong></div>
                    <div><span className="block text-xs text-gray-500">Carbs</span><strong className="text-sm text-amber-600 dark:text-amber-300">{meal.macros?.carbs || 0}g</strong></div>
                    <div><span className="block text-xs text-gray-500">Fat</span><strong className="text-sm text-rose-600 dark:text-rose-300">{meal.macros?.fat || 0}g</strong></div>
                  </div>

                  {typeof meal.estimatedCost === 'number' && (
                    <div className="mt-4 flex items-center justify-between rounded-xl bg-gray-50 px-3 py-2 text-sm dark:bg-gray-800">
                      <span className="flex items-center gap-2 text-gray-500 dark:text-gray-400"><FaMoneyBillWave className="text-emerald-500" /> Estimated cost</span>
                      <strong className="text-gray-900 dark:text-white">{currencySymbol}{meal.estimatedCost}</strong>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}
      </div>

      {dietPlan && healthInfo && (
        <button type="button" className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-4 font-bold text-white shadow-xl transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-200 dark:focus:ring-emerald-900" onClick={() => setChatOpen(true)} aria-label="Open diet assistant">
          <FaRobot className="text-xl" aria-hidden="true" />
          <span className="hidden sm:inline">Ask AI</span>
        </button>
      )}

      {chatOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 backdrop-blur-sm sm:items-center sm:p-4" role="dialog" aria-modal="true" aria-label="AI diet assistant">
          <div className="relative w-full max-w-2xl rounded-t-3xl bg-white p-4 shadow-2xl dark:bg-gray-900 sm:rounded-3xl sm:p-6">
            <button type="button" className="absolute right-3 top-3 z-10 rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white" onClick={() => setChatOpen(false)} aria-label="Close diet assistant">
              <FaTimes className="text-xl" aria-hidden="true" />
            </button>
            <ChatWithAI userData={userData} dietPlane={dietPlan} healthInfo={healthInfo} onPlanUpdate={handlePlanUpdate} />
          </div>
        </div>
      )}
    </main>
  );
};

export default Diet;
