/** Google API scopes features check with requireGoogleScope (see ADR-0003). */
export const GoogleScope = {
  Calendar: 'https://www.googleapis.com/auth/calendar.readonly',
  ClassroomCourses: 'https://www.googleapis.com/auth/classroom.courses.readonly',
  ClassroomCourseWork: 'https://www.googleapis.com/auth/classroom.course-work.readonly',
  ClassroomSubmissions: 'https://www.googleapis.com/auth/classroom.student-submissions.me.readonly',
  ClassroomAnnouncements: 'https://www.googleapis.com/auth/classroom.announcements.readonly',
  ClassroomMaterials: 'https://www.googleapis.com/auth/classroom.courseworkmaterials.readonly',
} as const

export type GoogleScope = (typeof GoogleScope)[keyof typeof GoogleScope]

/** Requested at consent: the identity scopes plus every API scope above (see ADR-0003). */
export const SIGN_IN_SCOPES = ['openid', 'email', 'profile', ...Object.values(GoogleScope)]
