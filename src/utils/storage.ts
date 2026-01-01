export interface DailyEntry {
  date: string;
  gratitude: string;
  habits: {
    meditated: boolean;
    sleptWell: boolean;
    ateWell: boolean;
    learned: boolean;
    exercised: boolean;
    socialized: boolean;
  };
}

export interface UserProfile {
  username: string;
  joinedDate: string;
}

const STORAGE_KEYS = {
  ENTRIES: 'being_daily_entries',
  USER: 'being_user_profile',
  LAST_ENTRY_DATE: 'being_last_entry_date',
};

// Get today's date in YYYY-MM-DD format
export const getTodayDate = (): string => {
  return new Date().toISOString().split('T')[0];
};

// Check if user has completed today's entry
export const hasCompletedToday = (): boolean => {
  const lastEntryDate = localStorage.getItem(STORAGE_KEYS.LAST_ENTRY_DATE);
  return lastEntryDate === getTodayDate();
};

// Save daily entry
export const saveDailyEntry = (entry: DailyEntry): void => {
  const entries = getAllEntries();
  entries.push(entry);
  localStorage.setItem(STORAGE_KEYS.ENTRIES, JSON.stringify(entries));
  localStorage.setItem(STORAGE_KEYS.LAST_ENTRY_DATE, entry.date);
};

// Get all entries
export const getAllEntries = (): DailyEntry[] => {
  const data = localStorage.getItem(STORAGE_KEYS.ENTRIES);
  return data ? JSON.parse(data) : [];
};

// Get user profile
export const getUserProfile = (): UserProfile | null => {
  const data = localStorage.getItem(STORAGE_KEYS.USER);
  return data ? JSON.parse(data) : null;
};

// Save user profile
export const saveUserProfile = (profile: UserProfile): void => {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(profile));
};

// Calculate habit statistics
export const getHabitStats = () => {
  const entries = getAllEntries();
  const total = entries.length;

  if (total === 0) {
    return {
      meditated: 0,
      sleptWell: 0,
      ateWell: 0,
      learned: 0,
      exercised: 0,
      socialized: 0,
    };
  }

  const stats = entries.reduce(
    (acc, entry) => {
      if (entry.habits.meditated) acc.meditated++;
      if (entry.habits.sleptWell) acc.sleptWell++;
      if (entry.habits.ateWell) acc.ateWell++;
      if (entry.habits.learned) acc.learned++;
      if (entry.habits.exercised) acc.exercised++;
      if (entry.habits.socialized) acc.socialized++;
      return acc;
    },
    { meditated: 0, sleptWell: 0, ateWell: 0, learned: 0, exercised: 0, socialized: 0 }
  );

  return {
    meditated: Math.round((stats.meditated / total) * 100),
    sleptWell: Math.round((stats.sleptWell / total) * 100),
    ateWell: Math.round((stats.ateWell / total) * 100),
    learned: Math.round((stats.learned / total) * 100),
    exercised: Math.round((stats.exercised / total) * 100),
    socialized: Math.round((stats.socialized / total) * 100),
  };
};
