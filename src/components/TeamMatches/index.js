import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import './index.css'

class TeamMatches extends Component {
  state = {
    teamMatchesList: [],
    isLoading: true,
    bannerUrl: '',
    latestMatchDetail: [],
  }

  componentDidMount() {
    this.getTeamMatchesDetails()
  }

  getTeamMatchesDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()
    const teamBannerUrl = data.team_banner_url
    const latestMatchDetails = data.latest_match_details
    const recentMatches = data.recent_matches
    const modifiedRecentMatches = recentMatches.map(eachItem => ({
      competingTeam: eachItem.competing_team,
      competingTeamLogo: eachItem.competing_team_logo,
      date: eachItem.date,
      firstInnings: eachItem.first_innings,
      id: eachItem.id,
      manOfTheMatch: eachItem.man_of_the_match,
      matchStatus: eachItem.match_status,
      result: eachItem.result,
      secondInnings: eachItem.second_innings,
      umpires: eachItem.umpires,
      venue: eachItem.venue,
    }))
    const modifiedLatestMatches = {
      competingTeam: latestMatchDetails.competing_team,
      competingTeamLogo: latestMatchDetails.competing_team_logo,
      date: latestMatchDetails.date,
      firstInnings: latestMatchDetails.first_innings,
      id: latestMatchDetails.id,
      manOfTheMatch: latestMatchDetails.man_of_the_match,
      matchStatus: latestMatchDetails.match_status,
      result: latestMatchDetails.result,
      secondInnings: latestMatchDetails.second_innings,
      umpires: latestMatchDetails.umpires,
      venue: latestMatchDetails.venue,
    }
    this.setState({
      teamMatchesList: modifiedRecentMatches,
      isLoading: false,
      bannerUrl: teamBannerUrl,
      latestMatchDetail: modifiedLatestMatches,
      Id: id,
    })
  }

  render() {
    const {
      teamMatchesList,
      bannerUrl,
      latestMatchDetail,
      isLoading,
      Id,
    } = this.state
    const teamMatchesContent = (
      <>
        <img src={bannerUrl} alt="team banner" className="teamBanner" />
        <LatestMatch
          key={latestMatchDetail.id}
          latestMatch={latestMatchDetail}
        />
        <ul className="matchCards-container">
          {teamMatchesList.map(eachMatch => (
            <MatchCard key={eachMatch.id} matchDetails={eachMatch} />
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
      <div className={`teamMatches-container ${Id}`}>
        {isLoading ? pageLoading : teamMatchesContent}
      </div>
    )
  }
}

export default TeamMatches
