import React, {Component} from 'react';
import './App.css';
import Spinner from './components/Spinner';
import Table from './components/Table';
import _ from 'lodash';
import RowInDetail from './components/RowInDetail';
import ModeSelector from './components/ModeSelector';
import ReactPaginate from 'react-paginate';
import Search from './components/Search';
import AddPersonForm from './components/AddPersonForm';


class App extends Component {

  state ={
    isLoading: false,
    isModeSelected: false,
    data: [],
    sort: 'asc',
    sortField: 'id',
    sortTriangle: '▲',
    row: null,
    currentPage: 0,
    search: '',
    error: false
  }

  async fetchData(url) {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Could not feth ${url}, status ${response.status}`);
  }

    const data = await response.json();

    this.setState({
      isLoading: false,
      data: _.orderBy(data, this.state.sortField, this.state.sort),
    })
  }

  onSort = sortField => {
    const cloneData = this.state.data.concat();
    const sort = this.state.sort === 'asc' ? 'desc' : 'asc';
    const sortTriangle = this.state.sort === 'asc' ? '▼' : '▲';

    const data = _.orderBy(cloneData, sortField, sort);

    this.setState({
      data,
      sort,
      sortField,
      sortTriangle
    })     
  }

  onRowSelect = row => {
    this.setState({
      row
    })
  }

  onSelect = url => {
    this.setState({
      isModeSelected: true,
      isLoading: true,
    })

    this.fetchData(url);
  }

  handlePageClick = ({selected}) => {
    this.setState({
      currentPage: selected
    })
  }

  searchHandler = search => {
    this.setState({
      search,
      currentPage: 0,
    })
  }

  getFilteredData = () => {
    const {data, search} = this.state;

    if (!search) {
      return data
    }

    return data.filter(item => {
      return item['firstName'].toLowerCase().includes(search.toLowerCase())
      || item['lastName'].toLowerCase().includes(search.toLowerCase())
      || item['email'].toLowerCase().includes(search.toLowerCase())
      || item['phone'].toLowerCase().includes(search.toLowerCase())
    })
  }

  addPerson = (id, firstName, lastName, email, phone) => {
    this.setState(prevState => ({
      data: [{ id, firstName, lastName, email, phone }, ...prevState.data]
    }));
  }

  

  
  render() {
    const pageSize = 50;
    const filteredData = this.getFilteredData();
    const pageCount = Math.ceil(filteredData.length / pageSize);
    const displayData = _.chunk(filteredData, pageSize)[this.state.currentPage];
    
    if (!this.state.isModeSelected){
      return (
        <div>
          <ModeSelector onSelect={this.onSelect}/>
        </div>
      )
    }

    return (
      <div className="container">
         {this.state.isLoading 
         ? <Spinner/> 
         : <>
              <Search onSearch={this.searchHandler}/>
              <AddPersonForm addPerson={this.addPerson}/>
              <Table 
                data={displayData} 
                onSort={this.onSort} 
                sort={this.state.sort} 
                sortField={this.state.sortField}
                sortTriangle={this.state.sortTriangle}
                onRowSelect={this.onRowSelect}
              />              
            </>
          }

          {this.state.data.length > pageSize
            ? <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousClassName={'page-item'}
            nextClassName={'page-item'}
            previousLinkClassName={'page-link'}
            nextLinkClassName={'page-link'}
            forcePage={this.state.currentPage}
            /> 
            : null
          }

          {this.state.row ? <RowInDetail person={this.state.row}/> : null }
      </div>
    );
  }
}

export default App;
