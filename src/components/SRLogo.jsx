function SRLogo({ size = 48, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer square with arrow corners */}
      <path
        d="M50 5 L95 50 L50 95 L5 50 Z"
        stroke="#ffc107"
        strokeWidth="2.5"
        fill="none"
      />
      {/* Inner S */}
      <path
        d="M35 30 H65 Q75 30 75 40 V48 Q75 55 65 55 H45 Q35 55 35 62 V70"
        stroke="#ffc107"
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Inner R */}
      <path
        d="M55 55 V70"
        stroke="#ffc107"
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M55 55 Q70 55 70 62 Q70 70 55 70"
        stroke="#ffc107"
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default SRLogo
