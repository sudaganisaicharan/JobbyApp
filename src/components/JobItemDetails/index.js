import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {HiLocationMarker} from 'react-icons/hi'
import {BsBriefcaseFill} from 'react-icons/bs'
import {BiLinkExternal} from 'react-icons/bi'
import Loader from 'react-loader-spinner'

import SimilarJobItem from '../SimilarJobItem'
import SkillsCard from '../SkillsCard'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobItemList: {},
    similarJobItemList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getFormattedJobsData = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    location: data.location,
    title: data.title,
    rating: data.rating,
  })

  getFormattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    lifeAtCompany: {
      description: data.life_at_company.description,
      imageUrl: data.life_at_company.image_url,
    },
    location: data.location,
    rating: data.rating,
    title: data.title,
    packagePerAnnum: data.package_per_annum,
    skills: data.skills.map(eachSkill => ({
      imageUrl: eachSkill.image_url,
      name: eachSkill.name,
    })),
  })

  getJobItemDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = this.getFormattedData(data.job_details)
      const updatedSimilarJobsData = data.similar_jobs.map(eachSimilarJob =>
        this.getFormattedJobsData(eachSimilarJob),
      )
      this.setState({
        jobItemList: updatedData,
        similarJobItemList: updatedSimilarJobsData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderJobItemDetails = () => {
    const {jobItemList, similarJobItemList} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      title,
      rating,
      packagePerAnnum,
      lifeAtCompany,
      skills,
    } = jobItemList
    const {description, imageUrl} = lifeAtCompany

    return (
      <div className="job-item-details-container">
        <div className="job-items-container">
          <div className="company-container">
            <div>
              <img
                src={companyLogoUrl}
                alt="company logo"
                className="job-details-company-logo"
              />
            </div>
            <div className="title-rating-container">
              <h1 className="job-details-company-title">{title}</h1>
              <div className="star-container">
                <AiFillStar className="job-details-star-icon" />
                <p className="job-details-company-rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-type-package-container">
            <div className="location-type-container">
              <div className="container">
                <HiLocationMarker className="job-details-icon" />
                <p className="job-details-description">{location}</p>
              </div>
              <div className="container">
                <BsBriefcaseFill className="job-details-icon" />
                <p className="job-details-description">{employmentType}</p>
              </div>
            </div>
            <div className="container">
              <p className="job-details-description">{packagePerAnnum}</p>
            </div>
          </div>
          <hr className="horizontal-line" />
          <div className="description-container">
            <h1 className="job-details-description-heading">Description</h1>
            <a className="visit-link" href={companyWebsiteUrl}>
              Visit
              <BiLinkExternal className="bi-link" />
            </a>
          </div>
          <p className="job-details-job-description">{jobDescription}</p>
          <h1 className="skill-heading">Skills</h1>
          <ul className="skills-container">
            {skills.map(eachSkill => (
              <SkillsCard key={eachSkill.id} skillDetails={eachSkill} />
            ))}
          </ul>
          <h1 className="life-at-company-heading">Life At Company</h1>
          <div className="life-at-company-container">
            <p className="life-at-company-description">{description}</p>
            <img
              src={imageUrl}
              alt="life at company"
              className="life-at-company-image"
            />
          </div>
        </div>
        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <ul className="similar-jobs-list">
          {similarJobItemList.map(eachSimilarJob => (
            <SimilarJobItem
              key={eachSimilarJob.id}
              jobDetails={eachSimilarJob}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        we cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        testid="button"
        className="jobs-failure-button"
        onClick={this.getJobItemDetails}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobDetailsView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobItemDetails()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="get-job-details-container">
          {this.renderJobDetailsView()}
        </div>
      </>
    )
  }
}

export default JobItemDetails
