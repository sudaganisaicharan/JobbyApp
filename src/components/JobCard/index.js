import {AiFillStar} from 'react-icons/ai'
import {Link} from 'react-router-dom'
import {HiLocationMarker} from 'react-icons/hi'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  const {
    title,
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    packagePerAnnum,
  } = jobDetails

  return (
    <Link to={`/jobs/${id}`} className="link-item">
      <l1 className="job-list-items">
        <div className="company-container">
          <div>
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="company-logo"
            />
          </div>
          <div className="title-rating-container">
            <h1 className="company-title">{title}</h1>
            <div className="star-container">
              <AiFillStar className="star-icon" />
              <p className="company-rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-type-package-container">
          <div className="location-type-container">
            <div className="container">
              <HiLocationMarker className="icon" />
              <p className="description">{location}</p>
            </div>
            <div className="container">
              <BsBriefcaseFill className="icon" />
              <p className="description">{employmentType}</p>
            </div>
          </div>
          <div className="container">
            <p className="description">{packagePerAnnum}</p>
          </div>
        </div>
        <hr className="horizontal-line" />
        <h1 className="description-heading">Description</h1>
        <p className="job-description">{jobDescription}</p>
      </l1>
    </Link>
  )
}

export default JobCard
