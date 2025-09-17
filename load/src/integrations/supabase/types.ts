export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      customers: {
        Row: {
          aadhar_number: string | null
          address: string | null
          annual_income: number | null
          city: string | null
          created_at: string | null
          created_by: string | null
          date_of_birth: string | null
          email: string | null
          full_name: string
          id: string
          occupation: string | null
          pan_number: string | null
          phone: string
          pincode: string | null
          state: string | null
          updated_at: string | null
        }
        Insert: {
          aadhar_number?: string | null
          address?: string | null
          annual_income?: number | null
          city?: string | null
          created_at?: string | null
          created_by?: string | null
          date_of_birth?: string | null
          email?: string | null
          full_name: string
          id?: string
          occupation?: string | null
          pan_number?: string | null
          phone: string
          pincode?: string | null
          state?: string | null
          updated_at?: string | null
        }
        Update: {
          aadhar_number?: string | null
          address?: string | null
          annual_income?: number | null
          city?: string | null
          created_at?: string | null
          created_by?: string | null
          date_of_birth?: string | null
          email?: string | null
          full_name?: string
          id?: string
          occupation?: string | null
          pan_number?: string | null
          phone?: string
          pincode?: string | null
          state?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      documents: {
        Row: {
          created_at: string | null
          document_type: string
          entity_id: string
          entity_type: string
          file_name: string
          file_path: string
          file_size: number | null
          id: string
          mime_type: string | null
          uploaded_by: string | null
        }
        Insert: {
          created_at?: string | null
          document_type: string
          entity_id: string
          entity_type: string
          file_name: string
          file_path: string
          file_size?: number | null
          id?: string
          mime_type?: string | null
          uploaded_by?: string | null
        }
        Update: {
          created_at?: string | null
          document_type?: string
          entity_id?: string
          entity_type?: string
          file_name?: string
          file_path?: string
          file_size?: number | null
          id?: string
          mime_type?: string | null
          uploaded_by?: string | null
        }
        Relationships: []
      }
      leads: {
        Row: {
          assigned_to: string | null
          converted_to_customer: string | null
          created_at: string | null
          email: string | null
          follow_up_date: string | null
          full_name: string
          id: string
          interested_amount: number | null
          loan_type: Database["public"]["Enums"]["loan_type"] | null
          notes: string | null
          phone: string
          source: Database["public"]["Enums"]["lead_source"]
          status: Database["public"]["Enums"]["lead_status"] | null
          updated_at: string | null
        }
        Insert: {
          assigned_to?: string | null
          converted_to_customer?: string | null
          created_at?: string | null
          email?: string | null
          follow_up_date?: string | null
          full_name: string
          id?: string
          interested_amount?: number | null
          loan_type?: Database["public"]["Enums"]["loan_type"] | null
          notes?: string | null
          phone: string
          source: Database["public"]["Enums"]["lead_source"]
          status?: Database["public"]["Enums"]["lead_status"] | null
          updated_at?: string | null
        }
        Update: {
          assigned_to?: string | null
          converted_to_customer?: string | null
          created_at?: string | null
          email?: string | null
          follow_up_date?: string | null
          full_name?: string
          id?: string
          interested_amount?: number | null
          loan_type?: Database["public"]["Enums"]["loan_type"] | null
          notes?: string | null
          phone?: string
          source?: Database["public"]["Enums"]["lead_source"]
          status?: Database["public"]["Enums"]["lead_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leads_converted_to_customer_fkey"
            columns: ["converted_to_customer"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      loan_applications: {
        Row: {
          approved_amount: number | null
          approved_by: string | null
          collateral_details: string | null
          created_at: string | null
          customer_id: string
          disbursed_date: string | null
          documents_submitted: string[] | null
          existing_loans: string | null
          id: string
          interest_rate: number | null
          loan_type: Database["public"]["Enums"]["loan_type"]
          monthly_income: number | null
          processed_by: string | null
          purpose: string | null
          remarks: string | null
          requested_amount: number
          status: Database["public"]["Enums"]["loan_status"] | null
          tenure_months: number | null
          updated_at: string | null
        }
        Insert: {
          approved_amount?: number | null
          approved_by?: string | null
          collateral_details?: string | null
          created_at?: string | null
          customer_id: string
          disbursed_date?: string | null
          documents_submitted?: string[] | null
          existing_loans?: string | null
          id?: string
          interest_rate?: number | null
          loan_type: Database["public"]["Enums"]["loan_type"]
          monthly_income?: number | null
          processed_by?: string | null
          purpose?: string | null
          remarks?: string | null
          requested_amount: number
          status?: Database["public"]["Enums"]["loan_status"] | null
          tenure_months?: number | null
          updated_at?: string | null
        }
        Update: {
          approved_amount?: number | null
          approved_by?: string | null
          collateral_details?: string | null
          created_at?: string | null
          customer_id?: string
          disbursed_date?: string | null
          documents_submitted?: string[] | null
          existing_loans?: string | null
          id?: string
          interest_rate?: number | null
          loan_type?: Database["public"]["Enums"]["loan_type"]
          monthly_income?: number | null
          processed_by?: string | null
          purpose?: string | null
          remarks?: string | null
          requested_amount?: number
          status?: Database["public"]["Enums"]["loan_status"] | null
          tenure_months?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "loan_applications_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string | null
          customer_id: string
          id: string
          interest_amount: number | null
          loan_application_id: string
          notes: string | null
          payment_date: string
          payment_mode: Database["public"]["Enums"]["payment_mode"]
          penalty_amount: number | null
          principal_amount: number | null
          receipt_number: string | null
          recorded_by: string | null
          transaction_reference: string | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          customer_id: string
          id?: string
          interest_amount?: number | null
          loan_application_id: string
          notes?: string | null
          payment_date?: string
          payment_mode: Database["public"]["Enums"]["payment_mode"]
          penalty_amount?: number | null
          principal_amount?: number | null
          receipt_number?: string | null
          recorded_by?: string | null
          transaction_reference?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          customer_id?: string
          id?: string
          interest_amount?: number | null
          loan_application_id?: string
          notes?: string | null
          payment_date?: string
          payment_mode?: Database["public"]["Enums"]["payment_mode"]
          penalty_amount?: number | null
          principal_amount?: number | null
          receipt_number?: string | null
          recorded_by?: string | null
          transaction_reference?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_loan_application_id_fkey"
            columns: ["loan_application_id"]
            isOneToOne: false
            referencedRelation: "loan_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          full_name: string | null
          id: string
          is_active: boolean | null
          phone: string | null
          role: Database["public"]["Enums"]["app_role"] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          full_name?: string | null
          id?: string
          is_active?: boolean | null
          phone?: string | null
          role?: Database["public"]["Enums"]["app_role"] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          full_name?: string | null
          id?: string
          is_active?: boolean | null
          phone?: string | null
          role?: Database["public"]["Enums"]["app_role"] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      scion_db: {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_receipt_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      app_role: "admin" | "manager" | "employee"
      lead_source:
        | "website"
        | "referral"
        | "social_media"
        | "advertisement"
        | "walk_in"
        | "phone"
      lead_status:
        | "new"
        | "contacted"
        | "qualified"
        | "proposal"
        | "negotiation"
        | "converted"
        | "lost"
      loan_status: "pending" | "approved" | "rejected" | "disbursed" | "closed"
      loan_type:
        | "personal"
        | "home"
        | "auto"
        | "business"
        | "education"
        | "project_funding"
      payment_mode: "upi" | "bank_transfer" | "cash" | "cheque"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "manager", "employee"],
      lead_source: [
        "website",
        "referral",
        "social_media",
        "advertisement",
        "walk_in",
        "phone",
      ],
      lead_status: [
        "new",
        "contacted",
        "qualified",
        "proposal",
        "negotiation",
        "converted",
        "lost",
      ],
      loan_status: ["pending", "approved", "rejected", "disbursed", "closed"],
      loan_type: [
        "personal",
        "home",
        "auto",
        "business",
        "education",
        "project_funding",
      ],
      payment_mode: ["upi", "bank_transfer", "cash", "cheque"],
    },
  },
} as const
