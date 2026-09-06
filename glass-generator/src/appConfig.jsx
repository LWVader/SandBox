// ======================================================================
// CONSTANTS & CONFIGURATIONS
// ======================================================================

// [TYPOGRAPHY CONFIGURATION]
export const GOOGLE_FONTS = [
  'Inter',
  'Poppins',
  'Roboto Mono',
  'Outfit',
  'Space Grotesk',
  'Playfair Display',
  'Fira Code',
];

export const DEFAULT_GRADIENT_COLORS = [
  { color: '#4f46e5', pos: 0 },
  { color: '#7c3aed', pos: 50 },
  { color: '#ec4899', pos: 100 }
];

export const GRADIENT_TYPES = [
  { id: 'linear', label: 'Linear' },
  { id: 'radial', label: 'Radial' },
  { id: 'conic', label: 'Conic' }
];

export const GRADIENT_POSITIONS = [
  'center', 'top', 'bottom', 'left', 'right', 
  'top left', 'top right', 'bottom left', 'bottom right'
];


export const EMOJI_LIBRARY = {
  faces: [
    // Smiling & Affection
    { emoji: '😀', hexcode: '1F600', shortname: ':grinning:', name: 'Grinning Face' },
    { emoji: '😃', hexcode: '1F603', shortname: ':smiley:', name: 'Grinning Face with Big Eyes' },
    { emoji: '😄', hexcode: '1F604', shortname: ':smile:', name: 'Grinning Face with Smiling Eyes' },
    { emoji: '😁', hexcode: '1F601', shortname: ':grin:', name: 'Beaming Face with Smiling Eyes' },
    { emoji: '😅', hexcode: '1F605', shortname: ':sweat_smile:', name: 'Grinning Face with Sweat' },
    { emoji: '😂', hexcode: '1F602', shortname: ':joy:', name: 'Face with Tears of Joy' },
    { emoji: '🤣', hexcode: '1F923', shortname: ':rofl:', name: 'Rolling on the Floor Laughing' },
    { emoji: '🙂', hexcode: '1F642', shortname: ':slightly_smiling_face:', name: 'Slightly Smiling Face' },
    { emoji: '🙃', hexcode: '1F643', shortname: ':upside_down_face:', name: 'Upside-Down Face' },
    { emoji: '🫠', hexcode: '1FAE0', shortname: ':melting_face:', name: 'Melting Face' },
    { emoji: '😉', hexcode: '1F609', shortname: ':wink:', name: 'Winking Face' },
    { emoji: '😊', hexcode: '1F60A', shortname: ':blush:', name: 'Smiling Face with Smiling Eyes' },
    { emoji: '😇', hexcode: '1F607', shortname: ':innocent:', name: 'Smiling Face with Halo' },
    { emoji: '🥰', hexcode: '1F970', shortname: ':smiling_face_with_three_hearts:', name: 'Smiling Face with Hearts' },
    { emoji: '😍', hexcode: '1F60D', shortname: ':heart_eyes:', name: 'Smiling Face with Heart-Eyes' },
    { emoji: '🤩', hexcode: '1F929', shortname: ':star_struck:', name: 'Star-Struck' },
    { emoji: '😘', hexcode: '1F618', shortname: ':kissing_heart:', name: 'Face Blowing a Kiss' },

    // Playful & Skeptical
    { emoji: '😋', hexcode: '1F60B', shortname: ':yum:', name: 'Face Savoring Food' },
    { emoji: '😜', hexcode: '1F61C', shortname: ':stuck_out_tongue_winking_eye:', name: 'Winking Face with Tongue' },
    { emoji: '🤪', hexcode: '1F92A', shortname: ':zany_face:', name: 'Zany Face' },
    { emoji: '🤑', hexcode: '1F911', shortname: ':money_mouth_face:', name: 'Money-Mouth Face' },
    { emoji: '🤗', hexcode: '1F917', shortname: ':hugs:', name: 'Smiling Face with Open Hands' },
    { emoji: '🫣', hexcode: '1FAE3', shortname: ':face_with_peeking_eye:', name: 'Face with Peeking Eye' },
    { emoji: '🤫', hexcode: '1F92B', shortname: ':shushing_face:', name: 'Shushing Face' },
    { emoji: '🤔', hexcode: '1F914', shortname: ':thinking:', name: 'Thinking Face' },
    { emoji: '🫡', hexcode: '1FAE1', shortname: ':saluting_face:', name: 'Saluting Face' },
    { emoji: '🤐', hexcode: '1F910', shortname: ':zipper_mouth_face:', name: 'Zipper-Mouth Face' },
    { emoji: '🤨', hexcode: '1F928', shortname: ':raised_eyebrow:', name: 'Face with Raised Eyebrow' },
    { emoji: '😐', hexcode: '1F610', shortname: ':neutral_face:', name: 'Neutral Face' },
    { emoji: '😏', hexcode: '1F60F', shortname: ':smirk:', name: 'Smirking Face' },
    { emoji: '😒', hexcode: '1F612', shortname: ':unamused:', name: 'Unamused Face' },
    { emoji: '🙄', hexcode: '1F644', shortname: ':roll_eyes:', name: 'Face with Rolling Eyes' },
    { emoji: '😬', hexcode: '1F62C', shortname: ':grimacing:', name: 'Grimacing Face' },

    // Shocked, Concerned & Unwell
    { emoji: '🤥', hexcode: '1F925', shortname: ':lying_face:', name: 'Lying Face' },
    { emoji: '😌', hexcode: '1F60C', shortname: ':relieved:', name: 'Relieved Face' },
    { emoji: '🤤', hexcode: '1F924', shortname: ':drooling_face:', name: 'Drooling Face' },
    { emoji: '😴', hexcode: '1F634', shortname: ':sleeping:', name: 'Sleeping Face' },
    { emoji: '😷', hexcode: '1F637', shortname: ':mask:', name: 'Face with Medical Mask' },
    { emoji: '🤒', hexcode: '1F912', shortname: ':face_with_thermometer:', name: 'Face with Thermometer' },
    { emoji: '🤕', hexcode: '1F915', shortname: ':face_with_head_bandage:', name: 'Face with Head-Bandage' },
    { emoji: '🤢', hexcode: '1F922', shortname: ':nauseated_face:', name: 'Nauseated Face' },
    { emoji: '🤮', hexcode: '1F92E', shortname: ':vomiting_face:', name: 'Face Vomiting' },
    { emoji: '🥵', hexcode: '1F975', shortname: ':hot_face:', name: 'Hot Face' },
    { emoji: '🥶', hexcode: '1F976', shortname: ':cold_face:', name: 'Cold Face' },
    { emoji: '🥴', hexcode: '1F974', shortname: ':woozy_face:', name: 'Woozy Face' },
    { emoji: '😵', hexcode: '1F635', shortname: ':dizzy_face:', name: 'Face with Crossed-Out Eyes' },
    { emoji: '🤯', hexcode: '1F92F', shortname: ':exploding_head:', name: 'Exploding Head' },
    { emoji: '🤠', hexcode: '1F920', shortname: ':cowboy_hat_face:', name: 'Cowboy Hat Face' },
    { emoji: '🥳', hexcode: '1F973', shortname: ':partying_face:', name: 'Partying Face' },
    { emoji: '😎', hexcode: '1F60E', shortname: ':sunglasses:', name: 'Smiling Face with Sunglasses' },
    { emoji: '🤓', hexcode: '1F913', shortname: ':nerd_face:', name: 'Nerd Face' },
    { emoji: '🧐', hexcode: '1F9D0', shortname: ':monocle_face:', name: 'Face with Monocle' },
    { emoji: '😟', hexcode: '1F61F', shortname: ':worried:', name: 'Worried Face' },
    { emoji: '😲', hexcode: '1F632', shortname: ':astonished:', name: 'Astonished Face' },
    { emoji: '😳', hexcode: '1F633', shortname: ':flushed:', name: 'Flushed Face' },
    { emoji: '🥺', hexcode: '1F97A', shortname: ':pleading_face:', name: 'Pleading Face' },
    { emoji: '😱', hexcode: '1F631', shortname: ':scream:', name: 'Face Screaming in Fear' },
    { emoji: '😭', hexcode: '1F62D', shortname: ':sob:', name: 'Loudly Crying Face' },
    { emoji: '😤', hexcode: '1F624', shortname: ':triumph:', name: 'Face with Steam From Nose' },
    { emoji: '😡', hexcode: '1F621', shortname: ':rage:', name: 'Enraged Face' },
    { emoji: '🤬', hexcode: '1F92C', shortname: ':cursing_face:', name: 'Face with Symbols on Mouth' }
  ],

  places: [
    // Buildings & Structures
    { emoji: '🏠', hexcode: '1F3E0', shortname: ':house:', name: 'House' },
    { emoji: '🏡', hexcode: '1F3E1', shortname: ':house_with_garden:', name: 'House with Garden' },
    { emoji: '🏢', hexcode: '1F3E2', shortname: ':office:', name: 'Office Building' },
    { emoji: '🏣', hexcode: '1F3E3', shortname: ':post_office:', name: 'Japanese Post Office' },
    { emoji: '🏥', hexcode: '1F3E5', shortname: ':hospital:', name: 'Hospital' },
    { emoji: '🏦', hexcode: '1F3E6', shortname: ':bank:', name: 'Bank' },
    { emoji: '🏨', hexcode: '1F3E8', shortname: ':hotel:', name: 'Hotel' },
    { emoji: '🏪', hexcode: '1F3EA', shortname: ':convenience_store:', name: 'Convenience Store' },
    { emoji: '🏫', hexcode: '1F3EB', shortname: ':school:', name: 'School' },
    { emoji: '🏬', hexcode: '1F3EC', shortname: ':department_store:', name: 'Department Store' },
    { emoji: '🏭', hexcode: '1F3ED', shortname: ':factory:', name: 'Factory' },
    { emoji: '🏰', hexcode: '1F3F0', shortname: ':castle:', name: 'Castle' },
    { emoji: '🏯', hexcode: '1F3EF', shortname: ':japanese_castle:', name: 'Japanese Castle' },
    { emoji: '💒', hexcode: '1F492', shortname: ':wedding:', name: 'Wedding Chapel' },
    { emoji: '🗼', hexcode: '1F5FC', shortname: ':tokyo_tower:', name: 'Tokyo Tower' },
    { emoji: '🗽', hexcode: '1F5FD', shortname: ':statue_of_liberty:', name: 'Statue of Liberty' },
    { emoji: '⛪', hexcode: '26EA', shortname: ':church:', name: 'Church' },
    { emoji: '🕌', hexcode: '1F54C', shortname: ':mosque:', name: 'Mosque' },
    { emoji: '🛕', hexcode: '1F6D5', shortname: ':hindu_temple:', name: 'Hindu Temple' },
    { emoji: '🕍', hexcode: '1F54D', shortname: ':synagogue:', name: 'Synagogue' },
    { emoji: '⛩️', hexcode: '26E9', shortname: ':shinto_shrine:', name: 'Shinto Shrine' },
    { emoji: '🕋', hexcode: '1F54B', shortname: ':kaaba:', name: 'Kaaba' },

    // Landscapes, Outdoor & Travel Destinations
    { emoji: '⛲', hexcode: '26F2', shortname: ':fountain:', name: 'Fountain' },
    { emoji: '⛺', hexcode: '26FA', shortname: ':tent:', name: 'Tent' },
    { emoji: '🌁', hexcode: '1F301', shortname: ':foggy:', name: 'Foggy' },
    { emoji: '🌃', hexcode: '1F303', shortname: ':night_with_stars:', name: 'Night with Stars' },
    { emoji: '🏙️', hexcode: '1F3D9', shortname: ':cityscape:', name: 'Cityscape' },
    { emoji: '🌄', hexcode: '1F304', shortname: ':sunrise_over_mountains:', name: 'Sunrise Over Mountains' },
    { emoji: '🌅', hexcode: '1F305', shortname: ':sunrise:', name: 'Sunrise' },
    { emoji: '🌆', hexcode: '1F306', shortname: ':city_sunset:', name: 'Cityscape at Dusk' },
    { emoji: '🌇', hexcode: '1F307', shortname: ':sunset:', name: 'Sunset' },
    { emoji: '🌉', hexcode: '1F309', shortname: ':bridge_at_night:', name: 'Bridge at Night' },
    { emoji: '♨️', hexcode: '2668', shortname: ':hotsprings:', name: 'Hot Springs' },
    { emoji: '🎠', hexcode: '1F3A0', shortname: ':carousel_horse:', name: 'Carousel Horse' },
    { emoji: '🎡', hexcode: '1F3A1', shortname: ':ferris_wheel:', name: 'Ferris Wheel' },
    { emoji: '🎢', hexcode: '1F3A2', shortname: ':roller_coaster:', name: 'Roller Coaster' },
    { emoji: '💈', hexcode: '1F488', shortname: ':barber:', name: 'Barber Pole' },
    { emoji: '🎪', hexcode: '1F3AA', shortname: ':circus_tent:', name: 'Circus Tent' },
    { emoji: '🚂', hexcode: '1F682', shortname: ':steam_locomotive:', name: 'Locomotive' },
    { emoji: '🚃', hexcode: '1F683', shortname: ':railway_car:', name: 'Railway Car' },
    { emoji: '🚄', hexcode: '1F684', shortname: ':bullettrain_side:', name: 'High-Speed Train' },
    { emoji: '🚅', hexcode: '1F685', shortname: ':bullettrain_front:', name: 'Bullet Train' },
    { emoji: '🚆', hexcode: '1F688', shortname: ':train:', name: 'Train' },
    { emoji: '🚇', hexcode: '1F687', shortname: ':metro:', name: 'Metro' },
    { emoji: '🚈', hexcode: '1F688', shortname: ':light_rail:', name: 'Light Rail' },
    { emoji: '🚉', hexcode: '1F689', shortname: ':station:', name: 'Station' },
    { emoji: '🚊', hexcode: '1F6AA', shortname: ':tram:', name: 'Tram' },
    { emoji: '🚏', hexcode: '1F68F', shortname: ':busstop:', name: 'Bus Stop' },
    { emoji: '🚌', hexcode: '1F68C', shortname: ':bus:', name: 'Bus' },
    { emoji: '🚑', hexcode: '1F691', shortname: ':ambulance:', name: 'Ambulance' },
    { emoji: '🚒', hexcode: '1F692', shortname: ':fire_engine:', name: 'Fire Engine' },
    { emoji: '🚓', hexcode: '1F693', shortname: ':police_car:', name: 'Police Car' },
    { emoji: '🚕', hexcode: '1F695', shortname: ':taxi:', name: 'Taxi' },
    { emoji: '🚗', hexcode: '1F697', shortname: ':car:', name: 'Automobile' },
    { emoji: '🚚', hexcode: '1F69A', shortname: ':truck:', name: 'Delivery Truck' },
    { emoji: '🚜', hexcode: '1F69C', shortname: ':tractor:', name: 'Tractor' },
    { emoji: '🏎️', hexcode: '1F3CE', shortname: ':racing_car:', name: 'Racing Car' },
    { emoji: '🏍️', hexcode: '1F3CD', shortname: ':motorcycle:', name: 'Motorcycle' },
    { emoji: '🛵', hexcode: '1F6F5', shortname: ':motor_scooter:', name: 'Motor Scooter' },
    { emoji: '🚲', hexcode: '1F6B2', shortname: ':bike:', name: 'Bicycle' },
    { emoji: '⚓', hexcode: '2693', shortname: ':anchor:', name: 'Anchor' },
    { emoji: '⛵', hexcode: '26F5', shortname: ':boat:', name: 'Sailboat' },
    { emoji: '🛶', hexcode: '1F6F6', shortname: ':canoe:', name: 'Canoe' },
    { emoji: '🚤', hexcode: '1F6A4', shortname: ':speedboat:', name: 'Speedboat' },
    { emoji: '🛳️', hexcode: '1F6A2', shortname: ':passenger_ship:', name: 'Passenger Ship' },
    { emoji: '✈️', hexcode: '2708', shortname: ':airplane:', name: 'Airplane' },
    { emoji: '🛫', hexcode: '1F6EB', shortname: ':flight_departure:', name: 'Airplane Departure' },
    { emoji: '🛬', hexcode: '1F6EC', shortname: ':flight_arrival:', name: 'Airplane Arrival' },
    { emoji: '🪂', hexcode: '1FA82', shortname: ':parachute:', name: 'Parachute' },
    { emoji: '🩲', hexcode: '1FA72', shortname: ':briefs:', name: 'Briefs' },
    { emoji: '🛸', hexcode: '1F6F8', shortname: ':flying_saucer:', name: 'Flying Saucer' },
    { emoji: '🚀', hexcode: '1F680', shortname: ':rocket:', name: 'Rocket' },
    { emoji: '🛰️', hexcode: '1F6F0', shortname: ':satellite:', name: 'Satellite' },
    { emoji: '💺', hexcode: '1F4BA', shortname: ':seat:', name: 'Seat' }
  ]
};

// Keep the picker data-driven so it stays in sync with the emoji library.
export const EMOJI_OPTIONS = [...EMOJI_LIBRARY.faces, ...EMOJI_LIBRARY.places].map(
  ({ emoji }) => emoji
);

// Map original defaults alongside transformed entries from EMOJI_LIBRARY
export const MASCOT_CHARACTERS = [
  // Original Defaults
  { id: 'bot', name: 'Cyber Bot', avatar: '🤖', category: 'default' },
  { id: 'cat', name: 'Glass Kitty', avatar: '🐱', category: 'default' },
  { id: 'alien', name: 'Cosmo', avatar: '👾', category: 'default' },
  { id: 'wizard', name: 'Pixel Mage', avatar: '🧙‍♂️', category: 'default' },
  { id: 'ninja', name: 'Code Ninja', avatar: '🥷', category: 'default' },

  // Dynamically transformed Face Emojis
  ...EMOJI_LIBRARY.faces.map((item) => ({
    id: `face_${item.hexcode.toLowerCase()}`,
    name: item.name,
    avatar: item.emoji,
    shortname: item.shortname,
    hexcode: item.hexcode,
    category: 'faces'
  })),

  // Dynamically transformed Place Emojis
  ...EMOJI_LIBRARY.places.map((item) => ({
    id: `place_${item.hexcode.toLowerCase()}`,
    name: item.name,
    avatar: item.emoji,
    shortname: item.shortname,
    hexcode: item.hexcode,
    category: 'places'
  }))
];

// [SHAPES & GEOMETRY CONFIGURATION]
export const SHAPE_PRESETS = [
  { id: 'none', label: 'Standard Box' },
  {
    id: 'gear',
    label: 'Cyber Gear Polygon',
    value: 'polygon(10% 0%, 90% 0%, 100% 25%, 100% 75%, 90% 100%, 10% 100%, 0% 75%, 0% 25%)'
  },
  {
    id: 'synthwave',
    label: 'Synthwave Cut',
    value: 'polygon(0 0, 88% 0, 100% 12%, 100% 100%, 12% 100%, 0 88%)'
  },
  {
    id: 'hud',
    label: 'Octagon HUD',
    value: 'polygon(15px 0, calc(100% - 15px) 0, 100% 15px, 100% calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 0 calc(100% - 15px), 0 15px)'
  },
  {
    id: 'hexagon',
    label: 'Tactical Hexagon',
    value: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)'
  },
  {
    id: 'diamond',
    label: 'Diamond Shield',
    value: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
  }
];

// [ANIMATIONS CONFIGURATION]
export const ANIMATION_CLASSES = {
  none: '',
  pulse: 'animate-pulse',
  bounce: 'animate-bounce',
  float: 'hover:-translate-y-2 transition-all duration-300',
  glow: 'hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all duration-300',
  shimmer:
    'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent'
};

// [PRESETS & DEFAULT CONFIGURATIONS]
export const PRESETS = {
  frostedCard: {
    name: 'Frosted Glass Card',
    target: 'card',
    titleText: 'Interactive Glass Card',
    bodyText: 'Customized with dynamic fonts, motion animations, and mascot avatars.',
    emoji: '✨',
    character: 'bot',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '400',
    animation: 'float',
    shape: 'none',
    width: 380,
    height: 250,
    borderRadius: 20,
    blur: 16,
    opacity: 0.2,
    saturation: 120,
    brightness: 100,
    tintColor: '#ffffff',
    borderColor: '#ffffff',
    borderOpacity: 0.3,
    borderWidth: 1,
    shadowX: 0,
    shadowY: 8,
    shadowBlur: 32,
    shadowOpacity: 0.25,
    perspective: 1000,
    rotateX: 12,
    rotateY: -8,
    translateZ: 30,
    showReflection: true,
    colorStops: [...DEFAULT_GRADIENT_COLORS]
  },

  cyberButton: {
    name: 'Cyberpunk Gear Button',
    target: 'button',
    titleText: 'SYSTEM INITIALIZE',
    bodyText: '',
    emoji: '⚙️',
    character: 'ninja',
    fontFamily: 'Space Grotesk',
    fontSize: 13,
    fontWeight: '700',
    animation: 'glow',
    shape: 'gear',
    width: 260,
    height: 56,
    borderRadius: 0,
    blur: 12,
    opacity: 0.35,
    saturation: 180,
    brightness: 120,
    tintColor: '#00f0ff',
    borderColor: '#39ff14',
    borderOpacity: 0.8,
    borderWidth: 2,
    shadowX: 0,
    shadowY: 0,
    shadowBlur: 25,
    shadowOpacity: 0.6,
    perspective: 800,
    rotateX: 15,
    rotateY: -15,
    translateZ: 40,
    showReflection: true,
    colorStops: [...DEFAULT_GRADIENT_COLORS]
  },

  synthwaveBadge: {
    name: 'Synthwave Diamond Card',
    target: 'card',
    titleText: 'RETRO SYNTH',
    bodyText: '80s inspired neon aesthetic with clipped angular geometry.',
    emoji: '🔥',
    character: 'wizard',
    fontFamily: 'Fira Code',
    fontSize: 13,
    fontWeight: '600',
    animation: 'shimmer',
    shape: 'synthwave',
    width: 360,
    height: 230,
    borderRadius: 0,
    blur: 14,
    opacity: 0.25,
    saturation: 160,
    brightness: 105,
    tintColor: '#bd00ff',
    borderColor: '#00f0ff',
    borderOpacity: 0.6,
    borderWidth: 2,
    shadowX: 0,
    shadowY: 10,
    shadowBlur: 35,
    shadowOpacity: 0.45,
    perspective: 1200,
    rotateX: -10,
    rotateY: 10,
    translateZ: 25,
    showReflection: true,
    colorStops: [...DEFAULT_GRADIENT_COLORS]
  },

  emeraldHUD: {
    name: 'Matrix HUD Panel',
    target: 'card',
    titleText: 'SECURITY NODE',
    bodyText: 'Encrypted status protocol active. All systems operating nominally.',
    emoji: '💎',
    character: 'bot',
    fontFamily: 'Roboto Mono',
    fontSize: 13,
    fontWeight: '500',
    animation: 'none',
    shape: 'hud',
    width: 370,
    height: 240,
    borderRadius: 0,
    blur: 18,
    opacity: 0.2,
    saturation: 140,
    brightness: 115,
    tintColor: '#00ff88',
    borderColor: '#00ff88',
    borderOpacity: 0.5,
    borderWidth: 1.5,
    shadowX: 0,
    shadowY: 0,
    shadowBlur: 20,
    shadowOpacity: 0.35,
    perspective: 1000,
    rotateX: 5,
    rotateY: -5,
    translateZ: 20,
    showReflection: true,
    colorStops: [...DEFAULT_GRADIENT_COLORS]
  },

  minimalInput: {
    name: 'Glass Input Field',
    target: 'input',
    titleText: 'Search elements...',
    bodyText: '',
    emoji: '⚡',
    character: 'cat',
    fontFamily: 'Outfit',
    fontSize: 14,
    fontWeight: '400',
    animation: 'none',
    shape: 'none',
    width: 320,
    height: 48,
    borderRadius: 12,
    blur: 10,
    opacity: 0.15,
    saturation: 100,
    brightness: 100,
    tintColor: '#ffffff',
    borderColor: '#ffffff',
    borderOpacity: 0.25,
    borderWidth: 1,
    shadowX: 0,
    shadowY: 4,
    shadowBlur: 16,
    shadowOpacity: 0.15,
    perspective: 0,
    rotateX: 0,
    rotateY: 0,
    translateZ: 0,
    showReflection: false,
    colorStops: [...DEFAULT_GRADIENT_COLORS]
  }
};

// ======================================================================
// HELPER FUNCTIONS & CODE GENERATORS
// ======================================================================

export function hexToRgba(hex, alpha) {
  let c = hex.replace('#', '');

  if (c.length === 3) {
    c = c
      .split('')
      .map((char) => char + char)
      .join('');
  }

  const num = parseInt(c, 16);

  return `rgba(${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}, ${alpha})`;
}

export function getCanvasBackground(type, img = null, config = {}) {
  // ---------------------------------------------------------------
  // Image background
  // ---------------------------------------------------------------
  if (type === 'image' && typeof img === 'string' && img.trim()) {
    return {
      backgroundImage: `url("${img.trim()}")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    };
  }

  // ---------------------------------------------------------------
  // Grid background
  // ---------------------------------------------------------------
  if (type === 'grid') {
    const safeGridSize = Math.max(1, Number(config.gridSize) || 20);
    return {
      backgroundColor: config.gridBackground || '#020617',
      backgroundImage: `radial-gradient(${config.gridColor || '#1e293b'} 1px, transparent 1px)`,
      backgroundSize: `${safeGridSize}px ${safeGridSize}px`
    };
  }

  // ---------------------------------------------------------------
  // Gradient background
  // ---------------------------------------------------------------
  const gradientType = config.gradientType || 'linear';
  const gradientAngle = Number.isFinite(Number(config.gradientAngle)) ? Number(config.gradientAngle) : 135;
  const gradientPosition = config.gradientPosition || 'center';
  const colorStops = Array.isArray(config.colorStops) ? config.colorStops : DEFAULT_GRADIENT_COLORS;

  const normalizedStops = colorStops
    .map((stop) => {
      if (!stop || typeof stop.color !== 'string') return null;
      const color = stop.color.trim();
      if (!color) return null;

      const rawStopValue = stop.pos !== undefined ? stop.pos : stop.stop;
      const numericStop = Number(rawStopValue);

      if (!Number.isFinite(numericStop)) return null;

      return {
        color,
        stop: Math.min(100, Math.max(0, numericStop))
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.stop - b.stop);

  const safeStops = normalizedStops.length >= 2 ? normalizedStops : DEFAULT_GRADIENT_COLORS;
  const gradientConfigStr = safeStops.map(({ color, stop }) => `${color} ${stop}%`).join(', ');

  let backgroundImage;
  switch (gradientType) {
    case 'linear':
      backgroundImage = `linear-gradient(${gradientAngle}deg, ${gradientConfigStr})`;
      break;
    case 'conic':
      backgroundImage = `conic-gradient(from ${gradientAngle}deg at ${gradientPosition}, ${gradientConfigStr})`;
      break;
    case 'radial':
    default:
      backgroundImage = `radial-gradient(circle at ${gradientPosition}, ${gradientConfigStr})`;
      break;
  }

  return {
    backgroundImage,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  };
}

export function getClipPathValue(shapeId) {
  const match = SHAPE_PRESETS.find((s) => s.id === shapeId);

  return match && match.value ? match.value : 'none';
}