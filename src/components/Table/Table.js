import React from 'react';

export default props => {

    return (
        <table className="table">
        <thead>
            <tr>
                <th onClick={props.onSort.bind(null, 'id')}>ID {props.sortField === 'id' ? props.sortTriangle : null}</th>                              
                <th onClick={props.onSort.bind(null, 'firstName')}>First Name {props.sortField === 'firstName' ? props.sortTriangle : null}</th>
                <th onClick={props.onSort.bind(null, 'lastName')}>Last Name {props.sortField === 'lastName' ? props.sortTriangle : null}</th>
                <th onClick={props.onSort.bind(null, 'email')}>E-mail {props.sortField === 'email' ? props.sortTriangle : null}</th>
                <th onClick={props.onSort.bind(null, 'phone')}>Phone {props.sortField === 'phone' ? props.sortTriangle : null}</th>
            </tr>
        </thead>
        <tbody>
            {props.data ? (
                props.data.map(item =>(
                    <tr key={item.email} onClick={props.onRowSelect.bind(null, item)}>
                        <td>{item.id}</td>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                    </tr>
                )))
                : null
            }
        </tbody>
    </table>
    )
}