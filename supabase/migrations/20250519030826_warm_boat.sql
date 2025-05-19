/*
  # Initial Schema Setup for Workly

  1. New Tables
    - `profiles`
      - Stores user profile information for both clients and freelancers
      - Links to Supabase auth users
    - `projects`
      - Stores project listings created by clients
    - `bids`
      - Stores freelancer bids on projects
    - `categories`
      - Stores project categories
    - `skills`
      - Stores available skills
    - `project_skills`
      - Junction table for project-skill relationships

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated access
*/

-- Create enum types
CREATE TYPE user_type AS ENUM ('client', 'freelancer');
CREATE TYPE project_status AS ENUM ('open', 'in_progress', 'completed', 'cancelled');
CREATE TYPE bid_status AS ENUM ('pending', 'accepted', 'rejected');

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  full_name text NOT NULL,
  user_type user_type NOT NULL,
  headline text,
  description text,
  avatar_url text,
  company_name text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now()
);

-- Create skills table
CREATE TABLE IF NOT EXISTS skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  category_id uuid REFERENCES categories(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  client_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  budget numeric NOT NULL CHECK (budget > 0),
  due_date date NOT NULL,
  category_id uuid REFERENCES categories(id),
  status project_status DEFAULT 'open',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create project_skills junction table
CREATE TABLE IF NOT EXISTS project_skills (
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  skill_id uuid REFERENCES skills(id) ON DELETE CASCADE,
  PRIMARY KEY (project_id, skill_id)
);

-- Create bids table
CREATE TABLE IF NOT EXISTS bids (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  freelancer_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  amount numeric NOT NULL CHECK (amount > 0),
  delivery_time integer NOT NULL CHECK (delivery_time > 0),
  proposal text NOT NULL,
  status bid_status DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE bids ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_skills ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Projects policies
CREATE POLICY "Projects are viewable by everyone"
  ON projects FOR SELECT
  USING (true);

CREATE POLICY "Clients can insert own projects"
  ON projects FOR INSERT
  WITH CHECK (auth.uid() = client_id);

CREATE POLICY "Clients can update own projects"
  ON projects FOR UPDATE
  USING (auth.uid() = client_id);

-- Bids policies
CREATE POLICY "Bids are viewable by project owner and bid creator"
  ON bids FOR SELECT
  USING (
    auth.uid() IN (
      SELECT client_id FROM projects WHERE id = project_id
      UNION
      SELECT freelancer_id WHERE freelancer_id = auth.uid()
    )
  );

CREATE POLICY "Freelancers can insert bids"
  ON bids FOR INSERT
  WITH CHECK (
    auth.uid() = freelancer_id AND
    EXISTS (
      SELECT 1 FROM projects 
      WHERE id = project_id 
      AND status = 'open'
    )
  );

CREATE POLICY "Project owners can update bid status"
  ON bids FOR UPDATE
  USING (
    auth.uid() IN (
      SELECT client_id FROM projects WHERE id = project_id
    )
  );

-- Categories and skills are viewable by everyone
CREATE POLICY "Categories are viewable by everyone"
  ON categories FOR SELECT
  USING (true);

CREATE POLICY "Skills are viewable by everyone"
  ON skills FOR SELECT
  USING (true);

-- Project skills policies
CREATE POLICY "Project skills are viewable by everyone"
  ON project_skills FOR SELECT
  USING (true);

CREATE POLICY "Project owners can manage project skills"
  ON project_skills FOR ALL
  USING (
    auth.uid() IN (
      SELECT client_id FROM projects WHERE id = project_id
    )
  );

-- Insert initial categories
INSERT INTO categories (name) VALUES
  ('Web Development'),
  ('Mobile Development'),
  ('UI/UX Design'),
  ('Content Writing'),
  ('Digital Marketing'),
  ('Video & Animation')
ON CONFLICT (name) DO NOTHING;

-- Insert initial skills
INSERT INTO skills (name, category_id) VALUES
  ('React', (SELECT id FROM categories WHERE name = 'Web Development')),
  ('Node.js', (SELECT id FROM categories WHERE name = 'Web Development')),
  ('Python', (SELECT id FROM categories WHERE name = 'Web Development')),
  ('React Native', (SELECT id FROM categories WHERE name = 'Mobile Development')),
  ('Flutter', (SELECT id FROM categories WHERE name = 'Mobile Development')),
  ('UI Design', (SELECT id FROM categories WHERE name = 'UI/UX Design')),
  ('UX Research', (SELECT id FROM categories WHERE name = 'UI/UX Design')),
  ('Content Writing', (SELECT id FROM categories WHERE name = 'Content Writing')),
  ('SEO', (SELECT id FROM categories WHERE name = 'Digital Marketing')),
  ('Video Editing', (SELECT id FROM categories WHERE name = 'Video & Animation'))
ON CONFLICT (name) DO NOTHING;