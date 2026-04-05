-- Users table (managed by Supabase Auth usually, but defining profile here)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  updated_at TIMESTAMP WITH TIME ZONE,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  
  -- Academic Stats
  gpa DECIMAL(3, 2), -- e.g., 3.85
  sat_score INTEGER, -- e.g., 1450
  act_score INTEGER, -- e.g., 32
  class_rank INTEGER,
  class_size INTEGER,
  
  -- Preferences
  intended_major TEXT,
  preferred_location TEXT, -- e.g., "Northeast, West Coast"
  max_tuition INTEGER,
  
  -- Essay Content
  personal_statement TEXT
);

-- Universities table (cache of Scorecard data)
CREATE TABLE universities (
  id INTEGER PRIMARY KEY, -- IPEDS ID
  name TEXT NOT NULL,
  city TEXT,
  state TEXT,
  admission_rate DECIMAL(4, 3),
  in_state_tuition INTEGER,
  out_of_state_tuition INTEGER,
  median_earnings INTEGER,
  student_size INTEGER,
  data_json JSONB -- Store full raw data here
);

-- Saved Schools (User's list)
CREATE TABLE saved_schools (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  university_id INTEGER REFERENCES universities(id) NOT NULL,
  category TEXT CHECK (category IN ('Safety', 'Match', 'Reach')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, university_id)
);
