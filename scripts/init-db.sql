-- This is a conceptual SQL schema for PostgreSQL (e.g., for Supabase or Neon)
-- You would run this script in your database client to set up the tables.

CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY, -- This will store the Auth.js user ID (e.g., Discord ID, Google ID)
    email TEXT UNIQUE,
    name TEXT,
    image TEXT,
    role TEXT DEFAULT 'guest', -- 'guest', 'player', 'admin'
    application_status TEXT DEFAULT 'not_submitted', -- 'not_submitted', 'pending', 'approved', 'rejected'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS applications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
    nickname TEXT NOT NULL,
    age INTEGER NOT NULL,
    experience TEXT NOT NULL,
    why_join TEXT NOT NULL,
    status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Optional: Add a trigger to update `updated_at` automatically
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_users_timestamp ON users;
CREATE TRIGGER update_users_timestamp
BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

DROP TRIGGER IF EXISTS update_applications_timestamp ON applications;
CREATE TRIGGER update_applications_timestamp
BEFORE UPDATE ON applications
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

-- Example: Insert an admin user (replace with your actual ID from Auth.js)
-- INSERT INTO users (id, email, name, role, application_status)
-- VALUES ('your_auth_user_id_here', 'admin@example.com', 'Admin User', 'admin', 'approved')
-- ON CONFLICT (id) DO NOTHING;
