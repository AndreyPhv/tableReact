import React from 'react';

export default props => {

    const smallUrl = `http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`;
    const bigUrl = `http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`;

    return (
        <div>
            <button onClick={() => props.onSelect(smallUrl)} className="btn btn-info btn-lg btn-block mt-3 p-3">Маленький набор</button>
            <button onClick={() => props.onSelect(bigUrl)} className="btn btn-secondary btn-lg btn-block mt-3 p-3">Большой набор</button>
        </div>
    )
}