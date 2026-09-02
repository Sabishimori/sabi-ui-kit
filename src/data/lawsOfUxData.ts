export interface LawOfUX {
  id: string;
  num: string;
  name: string;
  category: 'Heuristic' | 'Gestalt' | 'Cognitive & Performance';
  origin: string;
  year?: string;
  summary: string;
  keyTakeaway: string;
  formula: string;
  guidelines: string[];
  exampleUse: string;
}

export const ALL_21_LAWS: LawOfUX[] = [
  {
    id: 'aesthetic-usability',
    num: '01',
    name: 'Aesthetic-Usability Effect',
    category: 'Heuristic',
    origin: 'Masaaki Kurosu & Kaori Kashimura (Hitachi Design Center)',
    year: '1995',
    summary: 'Users often perceive aesthetically pleasing design as design that is more usable.',
    keyTakeaway: 'An aesthetically pleasing design creates a positive response in user’s brains and leads them to believe the design actually works better and makes users more tolerant of minor usability issues.',
    formula: 'Perceived Usability ∝ Visual Aesthetic Craft',
    guidelines: [
      'Invest in visual hierarchy, typography, and polished micro-interactions.',
      'Aesthetic design masks minor operational friction during first-time onboarding.',
      'Do not use aesthetics as an excuse to avoid fixing critical accessibility defects.'
    ],
    exampleUse: 'Apple macOS & iOS interface refinements, Nothing OS dot-matrix typography.'
  },
  {
    id: 'doherty',
    num: '02',
    name: 'Doherty Threshold',
    category: 'Cognitive & Performance',
    origin: 'Walter J. Doherty & Ahrcolis Thadhani (IBM)',
    year: '1982',
    summary: 'Productivity soars when a computer and its users interact at a pace (<400ms) that ensures neither has to wait on the other.',
    keyTakeaway: 'Provide immediate visual system feedback within 100ms and complete operations under 400ms to keep users in a state of cognitive flow.',
    formula: 'System Response Time (SRT) < 400ms',
    guidelines: [
      'Provide visual response within 100ms (instant button press states, optimistic UI).',
      'Use skeleton screens and progressive image loading to reduce perceived latency.',
      'Keep server payload execution under 400ms for continuous user productivity.'
    ],
    exampleUse: 'Linear optimistic state updates, Superhuman <100ms keyboard triage.'
  },
  {
    id: 'fitts',
    num: '03',
    name: "Fitts's Law",
    category: 'Heuristic',
    origin: 'Paul Fitts',
    year: '1954',
    summary: 'The time to acquire a target is a function of the distance to and width of the target.',
    keyTakeaway: 'Make primary touch targets large (minimum 44x44px or 48x48px) and position them close to the user’s thumb or resting cursor position.',
    formula: 'MT = a + b · log₂(2D / W)',
    guidelines: [
      'Touch targets should be at least 48x48px on mobile with at least 8px spacing between targets.',
      'Pin critical actions (e.g., checkout buttons, bottom navigation) to viewport screen edges.',
      'Make the entire click area active, not just the small text or icon.'
    ],
    exampleUse: 'Mobile bottom navigation bars, full-width checkout action sheets.'
  },
  {
    id: 'goal-gradient',
    num: '04',
    name: 'Goal-Gradient Effect',
    category: 'Heuristic',
    origin: 'Clark Hull',
    year: '1932',
    summary: 'The tendency to approach a goal increases with proximity to the goal.',
    keyTakeaway: 'The closer users are to completing a task, the faster and more motivated they work toward reaching it.',
    formula: 'Motivation ∝ 1 / Distance to Goal',
    guidelines: [
      'Provide visual progress indicators with pre-filled initial progress (e.g. 20% complete on signup).',
      'Break multi-step onboarding into achievable milestones.',
      'Show clear remaining steps to accelerate conversion near completion.'
    ],
    exampleUse: 'LinkedIn profile strength meter, Duolingo lesson streak milestones.'
  },
  {
    id: 'hicks',
    num: '05',
    name: "Hick's Law",
    category: 'Heuristic',
    origin: 'William Edmund Hick & Ray Hyman',
    year: '1952',
    summary: 'The time it takes to make a decision increases logarithmically with the number and complexity of choices.',
    keyTakeaway: 'Minimize choices when response times are critical to decrease cognitive load. Use progressive disclosure to reveal complex options gradually.',
    formula: 'RT = a + b · log₂(n)',
    guidelines: [
      'Limit primary navigation items to 5–7 core categories.',
      'Break complex forms into progressive multi-step wizards.',
      'Highlight recommended or default options to reduce decision paralysis.'
    ],
    exampleUse: 'Google Search minimalist homepage, Stripe Checkout default payment method.'
  },
  {
    id: 'jakobs',
    num: '06',
    name: "Jakob's Law",
    category: 'Heuristic',
    origin: 'Jakob Nielsen (Nielsen Norman Group)',
    year: '2000',
    summary: 'Users spend most of their time on other sites. They prefer your site to work the same way as all the other sites they already know.',
    keyTakeaway: 'By leveraging existing mental models, you allow users to focus on their tasks rather than learning a new interaction paradigm.',
    formula: 'User Expectation = Collective Web Experience',
    guidelines: [
      'Use standard conventions: search top-right/center, shopping cart top-right, profile bottom-right.',
      'Do not reinvent standard controls (e.g. checkboxes, dropdowns) without clear functional benefit.',
      'Support familiar keyboard shortcuts (⌘K for command palette, ⌘Z for undo, Esc to close).'
    ],
    exampleUse: 'E-commerce cart checkout flow, standard Figma/Slack keyboard shortcuts.'
  },
  {
    id: 'common-region',
    num: '07',
    name: 'Law of Common Region',
    category: 'Gestalt',
    origin: 'Stephen Palmer',
    year: '1992',
    summary: 'Elements tend to be perceived into groups if they share an area with a clearly defined boundary.',
    keyTakeaway: 'Add a background card, border, or distinct container to group related controls and information together.',
    formula: 'Shared Boundary = Unified Functional Group',
    guidelines: [
      'Use cards with subtle border strokes or distinct background fills to group related information.',
      'Define clear visual boundaries between distinct functional units on a dashboard.',
      'Combine common region with internal white space for maximum content clarity.'
    ],
    exampleUse: 'Bento grid dashboard cards, pricing plan comparison cards.'
  },
  {
    id: 'proximity',
    num: '08',
    name: 'Law of Proximity',
    category: 'Gestalt',
    origin: 'Max Wertheimer',
    year: '1923',
    summary: 'Objects that are near, or proximate to each other, tend to be grouped together.',
    keyTakeaway: 'Proximity helps establish a visual relationship between associated items. Elements in close proximity are perceived to share functionality or meaning.',
    formula: 'Spatial Closeness ∝ Perceived Relationship',
    guidelines: [
      'Place form input labels closer to their corresponding input field than to the preceding field.',
      'Group related buttons and tags together with tight 8px or 12px margins.',
      'Use larger margins (24px–48px) between distinct thematic sections.'
    ],
    exampleUse: 'Form field label-to-input alignment, floating action button toolbars.'
  },
  {
    id: 'pragnanz',
    num: '09',
    name: 'Law of Prägnanz',
    category: 'Gestalt',
    origin: 'Max Wertheimer',
    year: '1910',
    summary: 'People will perceive and interpret ambiguous or complex images as the simplest form possible, because it is the interpretation that requires the least cognitive effort.',
    keyTakeaway: 'The human eye likes to find simplicity and order in complex shapes because it prevents us from being overwhelmed by information.',
    formula: 'Visual Perception = Simplest Geometric Order',
    guidelines: [
      'Use clean geometric shapes (rectangles, circles, pills) for UI elements.',
      'Avoid visually confusing multi-layer overlapping shadows and irregular angles.',
      'Present charts and data visualizations in clean, recognizable layouts.'
    ],
    exampleUse: 'Clean geometric icon sets, minimalist dashboard KPI meters.'
  },
  {
    id: 'similarity',
    num: '10',
    name: 'Law of Similarity',
    category: 'Gestalt',
    origin: 'Max Wertheimer',
    year: '1923',
    summary: 'The human eye tends to perceive similar elements in a design as a complete picture, shape, or group, even if those elements are separated.',
    keyTakeaway: 'Ensure that elements with the same function (e.g. primary actions, links) share consistent visual styling such as color, size, and shape.',
    formula: 'Shared Visual Attribute = Shared Functionality',
    guidelines: [
      'Style all primary call-to-action buttons identically across the entire application.',
      'Use consistent link colors and underline rules throughout all body copy.',
      'Ensure status indicators (success, warning, error) follow consistent palette conventions.'
    ],
    exampleUse: 'Consistent primary button styling, universal blue hyperlinks.'
  },
  {
    id: 'uniform-connectedness',
    num: '11',
    name: 'Law of Uniform Connectedness',
    category: 'Gestalt',
    origin: 'Stephen Palmer & Irvin Rock',
    year: '1990',
    summary: 'Elements that are visually connected are perceived as more related than elements with no connection.',
    keyTakeaway: 'Connect elements of the same nature using visual bridges like lines, arrows, badges, or continuous background bands.',
    formula: 'Physical Line / Bridge > Proximity or Similarity',
    guidelines: [
      'Use connecting lines between steps in a stepper or roadmap component.',
      'Use tab underlines and connected pills to represent active view state.',
      'Visual lines override proximity and color similarity in human perception.'
    ],
    exampleUse: 'Multi-step checkout breadcrumb connectors, flowchart tree lines.'
  },
  {
    id: 'millers',
    num: '12',
    name: "Miller's Law",
    category: 'Cognitive & Performance',
    origin: 'George A. Miller',
    year: '1956',
    summary: 'The average person can only keep 7 (plus or minus 2) items in their active working memory.',
    keyTakeaway: 'Organize complex content into manageable chunks of 5 to 7 items to help users process, understand, and memorize information easily.',
    formula: 'Working Memory Capacity = 7 ± 2 Chunks',
    guidelines: [
      'Format phone numbers as (555) 123-4567 rather than 5551234567.',
      'Chunk credit card inputs into 4 blocks of 4 digits (4444 4444 4444 4444).',
      'Keep dashboard card key metrics to 5–7 high-priority data points.'
    ],
    exampleUse: 'Formatted credit card number inputs, chunked phone number formatters.'
  },
  {
    id: 'occams-razor',
    num: '13',
    name: "Occam's Razor",
    category: 'Cognitive & Performance',
    origin: 'William of Ockham',
    year: '14th Century',
    summary: 'Among competing hypotheses, the one with the fewest assumptions should be selected. In design, the simplest solution is almost always the best.',
    keyTakeaway: 'Analyze each component and remove any non-essential elements without compromising the core utility of the product.',
    formula: 'Product Value ∝ Utility / Visual Complexity',
    guidelines: [
      'Eliminate visual clutter, unnecessary borders, and decorative elements that don’t aid comprehension.',
      'Do not add settings or configurations unless genuine customer data demands them.',
      'Default to the simplest user flow that accomplishes the goal with zero ambiguity.'
    ],
    exampleUse: '1-Click Apple Pay checkout, Google Search single search bar.'
  },
  {
    id: 'pareto',
    num: '14',
    name: 'Pareto Principle (80/20 Rule)',
    category: 'Cognitive & Performance',
    origin: 'Vilfredo Pareto',
    year: '1906',
    summary: 'For many outcomes, roughly 80% of consequences come from 20% of the causes.',
    keyTakeaway: 'Focus the majority of your design refinement and testing on the 20% of features and user flows that account for 80% of total user volume.',
    formula: '80% User Value = 20% Core Feature Set',
    guidelines: [
      'Identify the critical 20% of flows (e.g. login, search, checkout) and make them flawless.',
      'Do not bury primary features behind secondary settings menus.',
      'Optimize the top 20% of high-traffic screens for sub-second performance.'
    ],
    exampleUse: 'Spotify main player & search bar, Slack message composer.'
  },
  {
    id: 'parkinsons',
    num: '15',
    name: "Parkinson's Law",
    category: 'Heuristic',
    origin: 'Cyril Northcote Parkinson',
    year: '1955',
    summary: 'Any task will inflate until all of the available time is spent.',
    keyTakeaway: 'Limit the time required to complete a task by providing autofill, smart defaults, inline validation, and concise workflows.',
    formula: 'Task Duration ∝ Allocated Time Allowed',
    guidelines: [
      'Use browser autofill for addresses, payment methods, and contact details.',
      'Provide smart defaults so users do not have to configure every field manually.',
      'Set clear expectations on how long a task will take (e.g. "Takes 2 minutes").'
    ],
    exampleUse: '1Password 1-click password autofill, TurboTax automated W-2 document scan.'
  },
  {
    id: 'peak-end',
    num: '16',
    name: 'Peak-End Rule',
    category: 'Heuristic',
    origin: 'Daniel Kahneman & Amos Tversky',
    year: '1993',
    summary: 'People judge an experience largely based on how they felt at its peak (its most intense point) and at its end, rather than the average of every moment.',
    keyTakeaway: 'Pay special attention to the most intense moment of a journey (the peak) and the final step (the end), leaving users with an empowering impression.',
    formula: 'Memory of Experience = (Peak Emotion + Final Emotion) / 2',
    guidelines: [
      'Celebrate milestones with rewarding animations (e.g. confetti, celebratory audio chime).',
      'Make error recovery smooth and helpful so pain points don’t become the memorable peak.',
      'Deliver an exceptional confirmation screen at the conclusion of key flows.'
    ],
    exampleUse: 'Mailchimp high-five sending animation, Airbnb booking confirmation celebration.'
  },
  {
    id: 'postels',
    num: '17',
    name: "Postel's Law (Robustness Principle)",
    category: 'Heuristic',
    origin: 'Jon Postel',
    year: '1981',
    summary: 'Be liberal in what you accept, and conservative in what you send.',
    keyTakeaway: 'Accept variable user input formats gracefully, translating them behind the scenes while outputting clean, standardized formats.',
    formula: 'Input Flexibility: HIGH | Output Standardization: STRICT',
    guidelines: [
      'Accept dates as MM/DD/YYYY, DD/MM/YYYY, or YYYY-MM-DD and parse automatically.',
      'Strip spaces and dashes from credit card, phone number, and postal code inputs automatically.',
      'Provide clear, actionable feedback when an error cannot be auto-corrected.'
    ],
    exampleUse: 'Google Maps natural query parsing, Stripe automated card format sanitizer.'
  },
  {
    id: 'serial-position',
    num: '18',
    name: 'Serial Position Effect',
    category: 'Cognitive & Performance',
    origin: 'Hermann Ebbinghaus',
    year: '1913',
    summary: 'Users have a propensity to best remember the first (Primacy) and last (Recency) items in a series.',
    keyTakeaway: 'Place the most important items on the far left and far right (or top and bottom) in navigation bars, pricing tables, and menus.',
    formula: 'Recall Probability = Primacy (Start) + Recency (End) > Middle',
    guidelines: [
      'Place primary navigation and logo on the far left, and critical CTA / profile on far right.',
      'In a mobile bottom bar, place Home on far left and Menu/Settings on far right.',
      'Place key value propositions at the beginning and conclusion of landing pages.'
    ],
    exampleUse: 'iOS Tab Bar layout (Home left, Settings right), Pricing tiers best-value placement.'
  },
  {
    id: 'teslers',
    num: '19',
    name: "Tesler's Law (Law of Conservation of Complexity)",
    category: 'Heuristic',
    origin: 'Larry Tesler (Xerox PARC / Apple)',
    year: '1984',
    summary: 'For any system there is a certain amount of complexity which cannot be reduced; it can only be moved from the user to the software.',
    keyTakeaway: 'Take on the burden of complexity in your software code and background automation so your users enjoy an effortless, simplified experience.',
    formula: 'Total System Complexity = Software Complexity + User Complexity',
    guidelines: [
      'Automate background calculations (e.g. taxes, shipping estimates, timezone conversions).',
      'Do not offload algorithmic complexity onto the user through redundant manual fields.',
      'Keep UI simple while letting backend systems do heavy lifting.'
    ],
    exampleUse: 'Uber 1-tap ride dispatching (GPS, routing, surge pricing handled in background).'
  },
  {
    id: 'von-restorff',
    num: '20',
    name: 'Von Restorff Effect (Isolation Effect)',
    category: 'Cognitive & Performance',
    origin: 'Hedwig von Restorff',
    year: '1933',
    summary: 'When multiple similar objects are present, the one that differs from the rest is most likely to be remembered.',
    keyTakeaway: 'Make important information or key call-to-action buttons visually distinctive through contrast, color, scale, or elevation.',
    formula: 'Visual Distinction ∝ Recall Probability',
    guidelines: [
      'Use high-contrast accent colors for primary CTA buttons to separate them from secondary actions.',
      'Highlight the "Most Popular" or "Recommended" card in pricing tables.',
      'Use visual isolation sparingly to avoid cognitive fatigue and banner blindness.'
    ],
    exampleUse: 'Highlighted "Recommended" SaaS pricing tier card, high-contrast primary CTA button.'
  },
  {
    id: 'zeigarnik',
    num: '21',
    name: 'Zeigarnik Effect',
    category: 'Heuristic',
    origin: 'Bluma Zeigarnik',
    year: '1927',
    summary: 'People remember uncompleted or interrupted tasks better than completed tasks.',
    keyTakeaway: 'Provide clear visual indicators of unfinished progress (e.g. progress bars, onboarding checklists) to motivate users to complete tasks.',
    formula: 'Cognitive Tension ∝ Uncompleted Task State',
    guidelines: [
      'Use onboarding checklists with 1 or 2 pre-checked steps to ignite completion drive.',
      'Show clear remaining steps on multi-step forms and account setups.',
      'Provide easy resume points when users leave an incomplete task.'
    ],
    exampleUse: 'Notion onboarding checklist, LinkedIn profile completion widget.'
  },
  {
    id: 'steering-law',
    num: '22',
    name: 'Steering Law (Minimize Target Distance)',
    category: 'Cognitive & Performance',
    origin: 'Johnny Accot & Shumin Zhai (Xerox PARC / IBM)',
    year: '1997',
    summary: 'The time required to navigate or steer a pointer through a 2D tunnel or trajectory path is directly proportional to the distance of the path and inversely proportional to the tunnel width.',
    keyTakeaway: 'Minimize physical pointer travel distance, eliminate diagonal cursor traps in nested sub-menus, and bring contextual tools directly to the active cursor point.',
    formula: 'T = a + b · ∫ (ds / W(s))  [Steering Time ∝ Distance / Tunnel Width]',
    guidelines: [
      'Keep nested dropdown sub-menus immediately adjacent to parent hover targets.',
      'Implement direction-aware cursor trajectory buffers (angle-of-approach safety triangles) so users do not lose hover state when moving diagonally.',
      'Position contextual floating toolbars and action palettes right at the active mouse selection or cursor point.',
      'Avoid long, narrow multi-level cascading menus that require extreme motor precision.'
    ],
    exampleUse: 'macOS menu bar hover trajectory triangle buffer, Figma contextual canvas floating toolbars, Slack message hover quick-action bar.'
  }
];

export const ALL_LAWS_OF_UX = ALL_21_LAWS;
