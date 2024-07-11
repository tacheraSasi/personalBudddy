
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient(
    'https://vsdatefhlaxwcjynbcyw.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzZGF0ZWZobGF4d2NqeW5iY3l3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA4NjExMTUsImV4cCI6MjAyNjQzNzExNX0.KvzZwoENhpBIV9wEcIrfOiUQnXOF_ZEkNEqBrYzXgU8'
    )