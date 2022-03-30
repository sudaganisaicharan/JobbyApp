import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import JobCard from '../JobCard'
import JobsFilterGroup from '../JobsFilterGroup'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobProfileSection extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobsList: [],
    searchInput: '',
    employmentType: [],
    salaryRange: 0,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const {employmentType, salaryRange, searchInput} = this.state
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType.join()}&minimum_package=${salaryRange}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    console.log(response.status)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        jobDescription: eachJob.job_description,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        title: eachJob.title,
        rating: eachJob.rating,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
      }))
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  changeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onKeyDown = event => {
    if (event.key === 'Enter') {
      this.getJobDetails()
    }
  }

  changeSalaryRange = salary => {
    this.setState({salaryRange: salary}, this.getJobDetails)
  }

  changeEmploymentType = employment => {
    const {employmentType} = this.state
    const inputNotInList = employmentType.filter(
      eachItem => eachItem === employment,
    )
    if (inputNotInList.length === 0) {
      this.setState(
        prevState => ({
          employmentType: [...prevState.employmentType, employment],
        }),
        this.getJobDetails,
      )
    } else {
      const filteredData = employmentType.filter(
        eachItem => eachItem !== employment,
      )
      this.setState({employmentType: filteredData}, this.getJobDetails)
    }
  }

  renderJobDetails = () => {
    const {jobsList} = this.state
    const jobsDisplay = jobsList.length > 0

    return jobsDisplay ? (
      <div className="job-details-container">
        <ul className="job-details-item-container">
          {jobsList.map(eachJob => (
            <JobCard key={eachJob.id} jobDetails={eachJob} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="no-job-details-container">
        <div className="no-jobs-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
            className="no-jobs-img"
          />
          <h1 className="no-jobs-heading">No Jobs Found</h1>
          <p className="no-jobs-description">
            We could not find any jobs. Try other filters.
          </p>
        </div>
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
        onClick={this.getJobDetails}
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

  renderJobProfileDetailsList = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetails()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state

    return (
      <div className="jobs-container">
        <div className="search-input-container-mobile">
          <input
            type="search"
            className="search-input"
            placeholder="Search"
            value={searchInput}
            onChange={this.changeSearchInput}
            onKeyDown={this.onKeyDown}
          />
          <button
            type="button"
            className="search-button"
            testid="button"
            onClick={this.getJobDetails}
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        <div className="jobs-filter-container">
          <JobsFilterGroup
            employmentTypesList={employmentTypesList}
            salaryRangesList={salaryRangesList}
            changeEmploymentType={this.changeEmploymentType}
            changeSalaryRange={this.changeSalaryRange}
            searchInput={searchInput}
            changeSearchInput={this.changeSearchInput}
            getJobDetails={this.getJobDetails}
          />
        </div>
        <div className="responsive-container">
          <div className="search-input-container">
            <input
              type="search"
              className="search-input"
              placeholder="Search"
              value={searchInput}
              onChange={this.changeSearchInput}
              onKeyDown={this.onKeyDown}
            />
            <button
              type="button"
              className="search-button"
              testid="button"
              onClick={this.getJobDetails}
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
          {this.renderJobProfileDetailsList()}
        </div>
      </div>
    )
  }
}

export default JobProfileSection
