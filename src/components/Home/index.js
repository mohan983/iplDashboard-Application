import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import TeamCard from '../TeamCard'
import './index.css'

class Home extends Component {
  state = {teamsList: [], isLoading: true}

  componentDidMount() {
    this.getIplTeams()
  }

  getIplTeams = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    const teams = await data.teams
    const modifiedData = teams.map(eachItem => ({
      id: eachItem.id,
      name: eachItem.name,
      teamImageUrl: eachItem.team_image_url,
    }))
    this.setState({teamsList: modifiedData, isLoading: false})
  }

  render() {
    const {teamsList, isLoading} = this.state
    const homeContent = (
      <>
        <div className="logo-heading">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            className="ipl-logo"
            alt="ipl logo"
          />
          <h1 className="ipl-heading">IPL Dashboard</h1>
        </div>
        <ul className="iplTeams-container">
          {teamsList.map(eachTeam => (
            <Link key={eachTeam.id} to={`/team-matches/${eachTeam.id}`}>
              <TeamCard iplTeam={eachTeam} />
            </Link>
          ))}
        </ul>
      </>
    )
    const pageLoading = (
      <div data-testid="loader">
        <Loader type="Oval" color="#ffffff" height={50} width={50} />
      </div>
    )

    return (
      <div className="Home-container">
        {isLoading ? pageLoading : homeContent}
      </div>
    )
  }
}

export default Home
