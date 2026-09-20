---
name: Academic Clarity V2
colors:
  surface: '#faf8ff'
  surface-dim: '#d9d9e5'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3fe'
  surface-container: '#ededf9'
  surface-container-high: '#e7e7f3'
  surface-container-highest: '#e1e2ed'
  on-surface: '#191b23'
  on-surface-variant: '#434655'
  inverse-surface: '#2e3039'
  inverse-on-surface: '#f0f0fb'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#505f76'
  on-secondary: '#ffffff'
  secondary-container: '#d0e1fb'
  on-secondary-container: '#54647a'
  tertiary: '#943700'
  on-tertiary: '#ffffff'
  tertiary-container: '#bc4800'
  on-tertiary-container: '#ffede6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#d3e4fe'
  secondary-fixed-dim: '#b7c8e1'
  on-secondary-fixed: '#0b1c30'
  on-secondary-fixed-variant: '#38485d'
  tertiary-fixed: '#ffdbcd'
  tertiary-fixed-dim: '#ffb596'
  on-tertiary-fixed: '#360f00'
  on-tertiary-fixed-variant: '#7d2d00'
  background: '#faf8ff'
  on-background: '#191b23'
  surface-variant: '#e1e2ed'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Noto Sans JP
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Noto Sans JP
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Noto Sans JP
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  data-tabular:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
  badge-label:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 12px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 48px
  container-max: 1280px
  gutter: 20px
---

## Brand & Style

The design system evolves into "V2" by maintaining its core identity of institutional trust and modern transparency. It serves an academic environment where clarity of information is paramount, particularly for complex schedules and resource management.

The style is a hybrid of **Minimalism** and **Glassmorphism**. It utilizes heavy whitespace to reduce cognitive load during data-heavy tasks, while employing subtle translucent layers to maintain context during navigation. The emotional response should be one of "effortless organization"—feeling lightweight, breathable, and systematically precise.

## Colors

The palette is anchored by the #2563eb Blue accent, representing academic authority. V2 introduces a semantic status layer to handle the urgency of academic deadlines and attendance.

- **Primary:** #2563eb is used for primary actions, active navigation states, and key focus indicators.
- **Surface:** The background uses a soft #f8fafc to reduce eye strain.
- **Semantic Palette:**
  - **Success (#10b981):** Attendance "Present", Classroom "Open", Task "Completed".
  - **Warning (#f59e0b):** "Today" status, "Starting Soon", or "Low Attendance".
  - **Error (#ef4444):** "Cancelled", "Deadline Expired", "Overdue".
  - **Info (#0ea5e9):** "Online" modality, "Resources Available", "General Notice".
- **Glass Effects:** Use semi-transparent white overlays (80-90% opacity) with a 1px `glass_stroke` to create a layered, "glass-like" depth without heavy shadows.

## Typography

This design system utilizes a dual-font stack. **Inter** is used for the UI "chrome," navigation, and data labels to ensure technical precision. **Noto Sans JP** is used for all body text and resource content, ensuring maximum readability for long-form academic text in both English and Japanese.

For V2's "Course Details" and "Resources" pages:

- Use `data-tabular` for numerical values and table content.
- Use `label-caps` for section headers within sidebars.
- Use `badge-label` for status indicators to maintain high legibility at small scales.
- On mobile devices, `display-lg` should scale down to 32px to ensure it remains within the viewport margins.

## Layout & Spacing

The layout follows a 12-column **fixed grid** for desktop, centering at 1280px. For data-dense views like "Course Resources," the system uses a sidebar-content split (4 columns for navigation/meta, 8 columns for primary content).

- **Vertical Rhythm:** Built on a 4px baseline. Components should use `md` (16px) or `lg` (24px) for internal padding to maintain the "airy" academic feel.
- **Mobile Adaptations:** At the 768px breakpoint, the layout transitions to a 1-column fluid stack with 16px side margins. Badges and tags should wrap horizontally rather than shrink.

## Elevation & Depth

Elevation is communicated through **Tonal Layers** and **Glassmorphism** rather than traditional shadows.

- **Level 0 (Background):** #f8fafc.
- **Level 1 (Cards/Content):** Pure white (#ffffff) with a 1px border (#e2e8f0).
- **Level 2 (Modals/Overlays):** White with 90% opacity, a 16px backdrop-blur, and a soft 10% opacity primary color tint in the shadow.
- **Depth Shading:** Use subtle inner glows on input fields to indicate focus, rather than heavy outer shadows.

## Shapes

The shape language is "Soft" (0.25rem base), providing a professional yet modern appearance.

- **Components:** Standard buttons and input fields use 4px (0.25rem).
- **Cards & Containers:** Large containers use `rounded-lg` (8px / 0.5rem) to define distinct content areas.
- **Badges:** Use a specialized `rounded-full` (pill shape) to differentiate meta-information from interactive buttons.

## Components

V2 focuses on refined data display and status tracking.

- **Refined Badges:**
  - **Online:** Info blue background (10% opacity), Info blue text.
  - **Classroom:** Neutral slate background (10%), slate text.
  - **Today:** Warning amber background (10%), amber text.
  - **Cancelled/Deadline:** Error red background (10%), red text.
  - _Styling:_ All badges use `badge-label` typography, 4px horizontal padding, and 2px vertical padding.
- **Glass Cards:** Used for "Resource" tiles. Background is `rgba(255, 255, 255, 0.7)` with `backdrop-filter: blur(10px)`.
- **Buttons:**
  - _Primary:_ Solid #2563eb with white text.
  - _Secondary:_ Transparent with 1px #cbd5e1 border.
- **Input Fields:** Use #f1f5f9 background with a bottom-only 2px border that animates to #2563eb on focus.
- **Lists:** Resource lists should use 16px padding between items with a `1px solid #f1f5f9` separator.
