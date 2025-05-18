const FormRowSelect = ({name, labelText, list=[] , defaultValue='',onChange }) => {
    return (
        <div className='form-row'>
            <label htmlFor={ name } className='form-label'>
                {labelText || name}
            </label>
            <select name={ name } id={ name } className='form-select' defaultValue={defaultValue} onChange={onChange}>
                {list.map((itemValue)=> {
                return <option key={itemValue} value={itemValue}>
                    {itemValue}
                </option>
                })}
            </select>
        </div>
    );
}

export default FormRowSelect

{/* <lebel htmlFor='JobType' className='form-label'>
              job Type
            </lebel>
            <select name='jobType' id='jobType' className='form-select' defaultValue={JOB_Type.FULL_TIME}>
              {Object.values(JOB_TYPE).map((itemValue)=> {
                return <option key={itemValue} value={itemValue}>
                  {itemValue}
                </option>
              })}
            </select> */}