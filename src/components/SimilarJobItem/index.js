import {AiFillStar} from 'react-icons/ai'
import {HiLocationMarker} from 'react-icons/hi'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const SimilarJobItem = props => {
  const {jobDetails} = props
  const {
    title,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
  } = jobDetails

  return (
    <l1 className="similar-job-list-items">
      <div className="similar-jobs-list-container">
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
        <h1 className="description-heading">Description</h1>
        <p className="job-description">{jobDescription}</p>
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
      </div>
    </l1>
  )
}

export default SimilarJobItem
