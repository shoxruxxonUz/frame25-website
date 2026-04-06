# Design System Document: Frame 25 Internal Specification

## 1. Overview & Creative North Star: "The Kinetic Gallery"
The North Star for this design system is **"The Kinetic Gallery."** Much like a high-end physical gallery, the interface should feel quiet, expansive, and expensive. We are not just building a website; we are building a stage for creative production. 

To achieve the "Apple/Nike" aesthetic, we move away from standard "webby" patterns. We embrace **intentional asymmetry**—offsetting large display type against vast open spaces—and **tonal depth**, where the interface feels like it’s composed of light and shadow rather than lines and boxes. The goal is a "Zero-UI" feel where the content (the "Frame") is the hero, and the interface is the sophisticated atmosphere surrounding it.

---

## 2. Colors & Tonal Architecture
The palette is rooted in absolute darkness, using our primary accent color not as a decoration, but as a "digital pulse" that guides the eye.

### Core Palette
*   **Surface:** `#131313` (The Foundation)
*   **Primary:** `#00f2ff` (The Electric Pulse)
*   **On-Surface:** `#e5e2e1` (Off-white for readability)
*   **Secondary:** `#95d1d6` (Muted cyan for supporting elements)

### The "No-Line" Rule
Standard 1px borders are strictly prohibited for sectioning. To create a premium feel, boundaries must be defined through:
1.  **Background Shifts:** Use `surface-container-low` for secondary sections and `surface-container-highest` for interactive elements.
2.  **Negative Space:** Use the spacing scale to create "islands" of content that don't require borders to be perceived as groups.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers.
*   **Layer 0 (Base):** `surface` (#131313)
*   **Layer 1 (Sectioning):** `surface-container-low` (#1c1b1b)
*   **Layer 2 (Floating/Interactive):** `surface-container-high` (#2a2a2a)
*   **Layer 3 (Modals/Popovers):** `surface-container-highest` (#353534)

### Signature Textures (Glass & Gradient)
To avoid a "flat" appearance, use **Glassmorphism** for floating headers and menus. Apply a `backdrop-blur(20px)` to a 40% opacity `surface-container`. Main CTAs should utilize a subtle linear gradient from `primary` (#00f2ff) to `primary-fixed-dim` (#00dbe7) at a 135-degree angle to provide "soul" and depth.

---

## 3. Typography: The Editorial Voice
We utilize **Inter** as our singular typeface. Its geometric precision reflects the technical side of production, while our specific styling provides the "editorial" luxury.

*   **Display (LG/MD):** Used for "Brand Moments." Features `-0.02em` letter spacing and high-contrast sizing.
*   **Headlines:** Must always have generous leading (`1.4` or `1.5`) to allow the eye to breathe.
*   **Labels:** Small, all-caps, with `0.1em` letter spacing. These are the "metadata" of the design and should be used sparingly for tags or micro-copy.

**Hierarchy Strategy:**
The "Frame 25" identity is built on contrast. Pair a `display-lg` headline with a `body-sm` description to create a sophisticated, unbalanced composition that feels intentionally designed rather than templated.

---

## 4. Elevation & Depth
Depth is not created with shadows; it is created with **Tonal Layering**.

*   **The Layering Principle:** Rather than "lifting" a card with a drop shadow, "drop" the background. Place a `surface-container-lowest` (#0e0e0e) card on a `surface-container-low` section. This creates a "recessed" or "carved" look that feels integrated into the architecture.
*   **Ambient Shadows:** If a floating state is required (e.g., a dropdown), use an extra-diffused shadow: `box-shadow: 0 20px 40px rgba(0, 242, 255, 0.04)`. The shadow color is a faint tint of the primary accent, making it feel like light reflecting off the "neon cyan."
*   **The Ghost Border:** For accessibility on interactive cards, use a 1px border of `outline-variant` (#3a494b) at **15% opacity**. It should be felt, not seen.

---

## 5. Components

### Buttons
*   **Primary:** Solid `primary-container` (#00f2ff) with `on-primary` text. State change: On hover, the button should "glow" using a subtle outer box-shadow of the same color.
*   **Tertiary (Minimalist):** Pure text in `on-surface` with a `primary` underline that is only 1px tall. On hover, the underline expands to cover the text background at 10% opacity.

### Cards & Lists
*   **Rule:** Forbid all divider lines.
*   **Implementation:** Use a vertical spacing of `2rem` (32px) between list items. Use a `surface-container-low` background on hover to indicate interactivity.
*   **Glass Cards:** Use for featured projects. Apply a `0.5rem` (8px) corner radius, a subtle `outline-variant` at 10% opacity, and `backdrop-blur`.

### Input Fields
*   **Styling:** Bottom-border only. When focused, the border transitions from `outline` to `primary` (#00f2ff) with a smooth 300ms ease.
*   **Labels:** Floating labels using `label-sm` typography to keep the interface minimalist and clean.

### Additional Component: "The Frame" (Media Container)
Since this is for a creative production agency, all video/image containers must use the `xl` (0.75rem) roundedness and a slight "inner glow" (inner box-shadow) to simulate the depth of a camera lens.

---

## 6. Do’s and Don’ts

### Do:
*   **Do** use asymmetrical layouts (e.g., text on the far left, image offset to the right with 20% whitespace).
*   **Do** use "Surface Tints." Mix 2% of the `primary` color into your dark grays to keep the dark theme from feeling "dead."
*   **Do** prioritize motion. Elements should fade and slide 10px upward when entering the viewport.

### Don’t:
*   **Don’t** use pure `#000000`. Use `surface-container-lowest` (#0e0e0e) to maintain the ability to show depth.
*   **Don’t** use standard 12-column grids rigidly. Let elements "break" the grid to create visual interest.
*   **Don’t** use high-opacity borders. They create "visual noise" that destroys the premium, minimalist aesthetic.
*   **Don’t** use more than one "Primary" action per screen. The electric blue is a powerful tool; don't dilute its impact.