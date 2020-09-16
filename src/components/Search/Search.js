import React, {useState} from 'react';

export default props => {

    const [value, setValue] = useState('');

    const valueChangeHandler = event => {
        setValue(event.target.value)
    }

    return (
        <div className="input-group mt-3">
            <input type="text" className="form-control" onChange={valueChangeHandler} value={value} />
            <div className="input-group-append">
                <button className="btn btn-outline-secondary btn-light" id="button-addon1" onClick={() => props.onSearch(value)}>Search</button>
            </div>
        </div>    
    )
}