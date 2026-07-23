import { profile } from '../data/profile'

export default function Avatar({ size = 128 }) {
  return (
    <div className="avatar" style={{ '--avatar-size': `${size}px` }}>
      {profile.photo ? (
        <img src={profile.photo} alt="" />
      ) : (
        <span>{profile.initials}</span>
      )}
    </div>
  )
}
