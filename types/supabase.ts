export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string
          user_type: 'client' | 'freelancer'
          headline: string | null
          description: string | null
          avatar_url: string | null
          company_name: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name: string
          user_type: 'client' | 'freelancer'
          headline?: string | null
          description?: string | null
          avatar_url?: string | null
          company_name?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          user_type?: 'client' | 'freelancer'
          headline?: string | null
          description?: string | null
          avatar_url?: string | null
          company_name?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          title: string
          description: string
          client_id: string
          budget: number
          due_date: string
          category_id: string
          status: 'open' | 'in_progress' | 'completed' | 'cancelled'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          client_id: string
          budget: number
          due_date: string
          category_id: string
          status?: 'open' | 'in_progress' | 'completed' | 'cancelled'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          client_id?: string
          budget?: number
          due_date?: string
          category_id?: string
          status?: 'open' | 'in_progress' | 'completed' | 'cancelled'
          created_at?: string
          updated_at?: string
        }
      }
      bids: {
        Row: {
          id: string
          project_id: string
          freelancer_id: string
          amount: number
          delivery_time: number
          proposal: string
          status: 'pending' | 'accepted' | 'rejected'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          project_id: string
          freelancer_id: string
          amount: number
          delivery_time: number
          proposal: string
          status?: 'pending' | 'accepted' | 'rejected'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          freelancer_id?: string
          amount?: number
          delivery_time?: number
          proposal?: string
          status?: 'pending' | 'accepted' | 'rejected'
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}