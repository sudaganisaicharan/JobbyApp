import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProfileDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    profileList: [],
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.profile_details
      const profileData = {
        name: updatedData.name,
        profileImageUrl: updatedData.profile_image_url,
        shortBio: updatedData.short_bio,
      }
      this.setState({
        apiStatus: apiStatusConstants.success,
        profileList: profileData,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderProfileDetails = () => {
    const {profileList} = this.state
    const {profileImageUrl, name, shortBio} = profileList

    return (
      <div className="profile-container">
        <img src={profileImageUrl} alt="profile" className="profile-image" />
        <h1 className="name">{name}</h1>
        <p className="bio">{shortBio}</p>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <button
        type="button"
        onClick={this.getProfileDetails()}
        testid="button"
        className="failure-button"
      >
        Retry
      </button>
    </div>
  )

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProfileDetails()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }
}

export default ProfileDetails
