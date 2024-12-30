export function HexagonPattern() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
      <svg width="100%" height="100%">
        <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse">
          <path d="M25 0l25 14.4v28.8L25 57.8 0 43.4V14.4z" fill="currentColor"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#hexagons)"/>
      </svg>
    </div>
  )
}

export function CirclePattern() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
      <svg width="100%" height="100%">
        <pattern id="circles" width="50" height="50" patternUnits="userSpaceOnUse">
          <circle cx="25" cy="25" r="20" fill="currentColor"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#circles)"/>
      </svg>
    </div>
  )
}

export function SquarePattern() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
      <svg width="100%" height="100%">
        <pattern id="squares" width="50" height="50" patternUnits="userSpaceOnUse">
          <rect width="40" height="40" x="5" y="5" fill="currentColor"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#squares)"/>
      </svg>
    </div>
  )
}

