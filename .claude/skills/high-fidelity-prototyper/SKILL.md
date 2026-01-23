---
name: high-fidelity-prototyper
description: Create pixel-perfect, native app-quality high-fidelity mobile prototypes with strict design system adherence. Use when building mobile interfaces that require: (1) Production-grade UI components with atomic design principles, (2) Strict color palette and typography compliance, (3) Real-world data realism (no placeholder text), (4) Micro-interactions and animations, (5) Skeleton screens and loading states, (6) Toast notifications and modal confirmations, (7) 8px grid spacing system, (8) Mobile-first responsive layouts with safe area support.
---

# High-Fidelity Prototyper

Create pixel-perfect mobile prototypes that feel like native apps, not simple web pages.

## Design System (Strict Compliance)

### Color Palette (Ride-hailing Industry Style)

- **Primary**: `#1677FF` (Brand blue, for primary buttons, key states)
- **Success**: `#52C41A` (Revenue increase, order completion)
- **Warning**: `#FAAD14` (Waiting for orders, medium ratings)
- **Danger**: `#FF4D4F` (Cancel orders, deductions)
- **Neutral**:
  - Title: `#1F1F1F` (Main titles, font-weight 600)
  - Body: `#595959` (Body content, font-weight 400)
  - Disable: `#BFBFBF` (Disabled states)
  - Background: `#F5F5F5` (App background, never pure white)
  - Card Bg: `#FFFFFF` (Card background, pure white)

### Typography

- **Header 1**: 20px, FontWeight 600 (Page titles)
- **Header 2**: 17px, FontWeight 500 (Card titles)
- **Body**: 14px, LineHeight 1.5 (Standard text)
- **Caption**: 12px, Color #999 (Auxiliary text)
- **Numbers**: Use `font-variant-numeric: tabular-nums` for monetary amounts

### Spacing & Layout (8px Grid)

- Page horizontal padding: `16px` (mobile standard)
- Module spacing: `12px` (compact) or `24px` (spacious)
- Card padding: `16px`
- Bottom safe area: `padding-bottom: constant(safe-area-inset-bottom)`

### Components

- **Card**: `border-radius: 12px`, no border, shadow: `box-shadow: 0 4px 12px rgba(0,0,0,0.04)`
- **Button**: 
  - Primary: height `44px`, `border-radius: 22px` (full) or `8px` (small), active scale effect
  - Ghost: transparent background, primary color border

## Interaction & Animation

### Micro-Interactions

- All clickable elements: `active:scale-95` or opacity change
- Page transitions: Slide-in (right) animation
- Loading states: Show **Skeleton Screen** first, not loading spinner

### Feedback

- Success/failure: Toast notification (center or bottom)
- Dangerous actions: Modal confirmation required

## Data Realism (Ride-hailing Context)

**Never use**: "Item 1", "User A", "Lorem Ipsum"

**Always use real context**:
- Addresses: "杭州市余杭区阿里巴巴西溪园区", "北京市朝阳区国贸三期"
- Time: "今日 08:30", "预计 15 分钟后到达"
- Users: "李师傅 (4.9分)", "尾号8899的乘客"
- Amounts: "¥ 35.50", "含高速费 ¥10"

## Tech Implementation

- Use **Tailwind CSS** for design system implementation
- Use `<script setup>` syntax
- Layout: **Flexbox** or **Grid**
- Lists: `<div class="overflow-y-auto">` with hidden scrollbar

## Workflow

When generating pages:

1. Define page structure (Header, Content, Footer)
2. Apply Color and Spacing rules
3. Fill with real Mock data
4. Add interaction classes (hover/active)
5. Output code
