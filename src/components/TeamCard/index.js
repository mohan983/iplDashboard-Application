import './index.css'

const TeamCard = props => {
  const {iplTeam} = props
  const {teamImageUrl, name} = iplTeam
  return (
    <li className="teamCard">
      <img src={teamImageUrl} alt={name} className="team-logo" />
      <p className="team-name">{name}</p>
    </li>
  )
}

export default TeamCard
