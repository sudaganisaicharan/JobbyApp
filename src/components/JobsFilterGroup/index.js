import ProfileDetails from '../ProfileDetails'

import './index.css'

const JobsFilterGroup = props => {
  const getEmploymentTypeList = () => {
    const {employmentTypesList} = props

    return employmentTypesList.map(eachItem => {
      const {changeEmploymentType} = props
      const onChangeEmploymentType = () => {
        changeEmploymentType(eachItem.employmentTypeId)
      }

      return (
        <li
          className="checkbox-list-items"
          key={eachItem.employmentTypeId}
          onChange={onChangeEmploymentType}
        >
          <input
            type="checkbox"
            id={eachItem.employmentTypeId}
            className="check-radio"
            value={eachItem.employmentTypeId}
          />
          <label className="check-label" htmlFor={eachItem.employmentTypeId}>
            {eachItem.label}
          </label>
        </li>
      )
    })
  }

  const renderEmploymentType = () => (
    <div className="filter-container">
      <h1 className="filter-heading">Type of Employment</h1>
      <ul className="filter-range-container">{getEmploymentTypeList()}</ul>
    </div>
  )

  const getSalaryRangeList = () => {
    const {salaryRangesList} = props

    return salaryRangesList.map(eachItem => {
      const {changeSalaryRange} = props
      const onChangeSalaryRange = () => {
        changeSalaryRange(eachItem.salaryRangeId)
      }

      return (
        <li
          className="checkbox-list-items"
          key={eachItem.salaryRangeId}
          onChange={onChangeSalaryRange}
        >
          <input
            type="radio"
            id={eachItem.salaryRangeId}
            className="check-radio"
            value={eachItem.salaryRangeId}
            name="option"
          />
          <label className="check-label" htmlFor={eachItem.salaryRangeId}>
            {eachItem.label}
          </label>
        </li>
      )
    })
  }

  const renderSalaryRange = () => (
    <div className="filter-container">
      <h1 className="filter-heading">Salary Range</h1>
      <ul className="filter-range-container">{getSalaryRangeList()}</ul>
    </div>
  )

  return (
    <div className="job-filter-group">
      <ProfileDetails />
      <hr className="horizontal-line" />
      {renderEmploymentType()}
      <hr className="horizontal-line" />
      {renderSalaryRange()}
    </div>
  )
}

export default JobsFilterGroup
