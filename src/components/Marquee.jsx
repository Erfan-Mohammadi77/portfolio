export default function Marquee({ items = [] }) {
  return (
    <div className="marquee">
      <div className="marquee-track">
        <div className="marquee-group">
          {items.map((item, i) => (
            <span key={i}>
              {item}
              <span className="marquee-dot">✦</span>
            </span>
          ))}
        </div>
        <div className="marquee-group" aria-hidden="true">
          {items.map((item, i) => (
            <span key={i}>
              {item}
              <span className="marquee-dot">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}