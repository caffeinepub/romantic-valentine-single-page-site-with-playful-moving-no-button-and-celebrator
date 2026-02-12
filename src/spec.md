# Specification

## Summary
**Goal:** Create a single-page, mobile-first romantic Valentine site with playful interactions (evasive “No” button, growing centered “Yes” button), floating hearts background, a success modal with heart confetti, and optional user-initiated background music.

**Planned changes:**
- Build a responsive single-page layout with a soft romantic (pink/red/pastel) theme, consistent typography/spacing, and smooth animations.
- Add centered prompt text exactly: “Will you be my Valentine? ❤️” with two buttons: “Yes 💖” (always centered/anchored) and an evasive button starting as “No 🙃”.
- Implement evasive button behavior on hover and click: animate to edges/corners/random X/Y positions while staying fully within the viewport bounds.
- Implement evasive button label progression per move trigger: “No 🙃” → “Are you sure? 😏” → “One last chance 😢” → “Yes ❤️” (continues moving after reaching “Yes ❤️”).
- Scale up the centered “Yes 💖” button slightly after each evasive move trigger, with smooth scaling; add subtle hover/press micro-interactions (bounce/scale) to both buttons.
- Add a floating hearts background effect behind content that stays readable and performs smoothly.
- On “Yes 💖” click, show a full-screen modal/section with fade/zoom transition and the exact message (including line breaks):
  “Congratulations ❤️🎉
  I knew you’d say yes!
  You just made my day.
  I love you so much 😘
  Happy Valentine’s Day 💕”
- Trigger a heart confetti effect on the success screen that doesn’t obscure the message for long.
- Add optional background music with a visible play/pause control; only start audio after a user gesture.
- Include and reference required static image assets under `frontend/public/assets/generated` for the hearts/confetti visuals; ensure the app builds cleanly and is deploy-ready.

**User-visible outcome:** Visitors see a cute Valentine prompt with a centered “Yes 💖” button and a “No” button that playfully dodges them; selecting “Yes 💖” reveals a full-screen celebratory message with heart confetti, and they can optionally play/pause romantic background music.
