---
name: Aether Glass
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3d'
  surface-container-highest: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#c2c6d6'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#8c909f'
  outline-variant: '#424754'
  surface-tint: '#adc6ff'
  primary: '#adc6ff'
  on-primary: '#002e6a'
  primary-container: '#4d8eff'
  on-primary-container: '#00285d'
  inverse-primary: '#005ac2'
  secondary: '#4cd7f6'
  on-secondary: '#003640'
  secondary-container: '#03b5d3'
  on-secondary-container: '#00424e'
  tertiary: '#d0bcff'
  on-tertiary: '#3c0091'
  tertiary-container: '#a078ff'
  on-tertiary-container: '#340080'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a42'
  on-primary-fixed-variant: '#004395'
  secondary-fixed: '#acedff'
  secondary-fixed-dim: '#4cd7f6'
  on-secondary-fixed: '#001f26'
  on-secondary-fixed-variant: '#004e5c'
  tertiary-fixed: '#e9ddff'
  tertiary-fixed-dim: '#d0bcff'
  on-tertiary-fixed: '#23005c'
  on-tertiary-fixed-variant: '#5516be'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
typography:
  display-lg:
    fontFamily: Geist
    fontSize: 72px
    fontWeight: '800'
    lineHeight: 80px
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Geist
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: 0em
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1440px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  stack-xs: 4px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
  stack-xl: 80px
---

## Brand & Style

This design system is engineered for high-end enterprise SaaS platforms that prioritize technical precision with a futuristic, premium aesthetic. The brand personality is authoritative yet visionary, evoking a sense of "ambient intelligence." 

The visual style is **Glassmorphism**, characterized by deep spatial depth created through high-refraction background blurs and luminous edge treatments. The interface should feel like a series of translucent physical panels floating over a dynamic, light-filled void. Every element must maintain high legibility despite the transparency, ensuring the "glass" feels heavy and expensive rather than thin or fragile.

## Colors

The palette is anchored by a deep navy base (`#0F172A`), providing a high-contrast canvas for vibrant, light-emitting accents. 

- **Primary & Secondary:** Electric Blue and Cyan are used for primary actions, progress indicators, and active states.
- **Glass Fills:** Use white at 5% to 15% opacity for surface areas, and up to 25% for hovered states.
- **Luminous Borders:** Use a 1px solid border. Top and left edges should use a white-to-transparent linear gradient at 20% opacity to simulate a light source from the top-left.
- **Aurora Backgrounds:** Beneath the glass layers, implement large, blurred SVG blobs using the Tertiary (Purple) and Accent colors (Teal, Emerald, Pink). These should have a blur radius of at least 120px and move subtly to provide a sense of life.

## Typography

The design system utilizes **Geist** for its clinical, modernist precision and exceptional readability in dark environments. For technical data and labels, **JetBrains Mono** is introduced to reinforce the "developer-centric" and enterprise-grade utility of the platform.

**Hierarchy Rules:**
- Use **Display-LG** for hero sections with a subtle text-shadow to ensure separation from busy aurora backgrounds.
- All caps should be reserved for **Label** styles only.
- Body text should maintain a 60% opacity (rgba white) to reduce eye strain against the dark background, while headlines remain 100% white.

## Layout & Spacing

The layout philosophy follows a **Fluid Grid** model with generous white space to allow the glass effects room to breathe. 

- **Grid:** Use a 12-column grid for desktop.
- **Rhythm:** An 8px linear scale governs all padding and margins.
- **Safe Areas:** On mobile, margins reduce to 20px, and complex glass stacks should be simplified to a single background layer to maintain performance and legibility.
- **Grouping:** Use large `stack-xl` gaps between major sections to emphasize the "floating" nature of the component panels.

## Elevation & Depth

Depth is not communicated through shadows alone, but through a combination of **Blur Strength** and **Z-index layering**.

- **Level 1 (Base):** The dark navy background with aurora gradients.
- **Level 2 (Panels):** Surface fills (White 10% opacity) with a `backdrop-filter: blur(24px)`. 1px border at 15% opacity.
- **Level 3 (Modals/Popovers):** Surface fills (White 20% opacity) with a `backdrop-filter: blur(40px)`. These should have a subtle drop shadow: `0 20px 50px rgba(0,0,0,0.5)` to separate them clearly from the panels below.
- **Interactive States:** On hover, glass surfaces should increase in opacity by 5% and the border brightness should double.

## Shapes

The design system uses a pronounced **Rounded** language. 

- **Primary Containers:** 24px (`rounded-xl`) corner radius.
- **Buttons & Inputs:** 12px (`rounded-lg`) corner radius.
- **Inner Elements (Chips/Small Cards):** 8px (`rounded-md`) corner radius.

This consistency in curvature softens the "tech-heavy" nature of the dark theme and makes the glass panels feel like polished physical objects.

## Components

### Buttons
- **Primary:** Solid gradient fill (Electric Blue to Cyan). No blur. White text. High-contrast.
- **Secondary (Glass):** 15% white fill, 32px backdrop-blur, 1px white border (20% opacity).
- **Ghost:** No fill, white text, 100% border opacity only on hover.

### Input Fields
- **Background:** 5% white fill.
- **Border:** 1px white (10% opacity). On focus, the border color transitions to Electric Blue and a subtle outer glow appears.
- **Placeholder:** 40% white opacity.

### Cards & Containers
- Cards should never be completely opaque. Use the standard Level 2 glass treatment. 
- For content-heavy cards, use a slightly darker fill (rgba(15, 23, 42, 0.6)) inside the glass to improve text contrast while maintaining the blur effect.

### Chips & Tags
- Small, 8px rounded elements with a 20% opacity fill of their respective functional color (e.g., Emerald for "Success").
- Text should use the **Label-SM** typography style.

### Lists
- Separate list items with a 1px border-bottom (10% white opacity). Hovering over a list item should apply a 10% white background highlight with no blur to maintain performance during scrolling.