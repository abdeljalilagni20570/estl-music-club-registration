import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tibsyifxepxkdvfpniot.supabase.co'
const supabaseAnonKey = 'sb_publishable_a4prjO5tSVGwZldGVGFtYA_QdTnT26O'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)