/** Student accounts use the student number as the local part, e.g. `s12345@st.kic.ac.jp`. */
const STUDENT_NUMBER_PATTERN = /^(s\d+)@/i

/** Returns the student number from a student email, or `null` when the local part is not one. */
export function toStudentNumber(email: string): string | null {
  return STUDENT_NUMBER_PATTERN.exec(email)?.[1] ?? null
}
