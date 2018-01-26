import React, { Component } from 'react';
import { csv } from 'd3-request';
import { ParentSize } from '@vx/responsive';
import MuiTable from 'mui-table';

import Loading from './Loading';

const CSV_URL = 'https://s3-eu-west-1.amazonaws.com/kuijjer-public/sample_data.csv'

class App extends Component {
  state = {
    loading: true,
    data: null,
    query: ''
  }

  componentDidMount() {
    csv(CSV_URL, (error, data) => {
      this.setState({
        data,
        loading: false
      })
    });
  }

  onQueryChanged = (event) => {
    this.setState({query:event.target.value})
  }
  render() {
    if (this.state.loading) {
      return <Loading />;
    };

    const {data, query} = this.state;
    const columns = this.state.data.columns.map(column => ({ name: column }));
    let filteredData = data;
    const startTime = +new Date();
    if(query && query.length > 0) {
      filteredData = data.filter( row => { 
        const first = row.first || '';
        const last = row.last || '';
        const lowerCaseQuery = query.toLowerCase();
        return first.toLowerCase().includes(query.toLowerCase())
          || last.toLowerCase().includes(query.toLowerCase());
      });
    }
    const filterTime = (+new Date()) - startTime;

    return (
      <div style={{ height: '100vh' }}>
        <div style={{padding: 20}}>
         <span style={{fontSize: 10, marginRight: 16}}>Name (first or last)</span>
         <span><input type="text" value={this.state.query} onChange={this.onQueryChanged} /></span>
        </div>
        <div style={{padding: 20}}>
         <span style={{fontSize: 10, marginRight: 16}}>{`showing ${filteredData.length} records (filter took ${filterTime} ms)`}</span>
        </div>
        <ParentSize>
          {({ width, height }) => (
            <MuiTable
              data={filteredData}
              columns={columns}
              width={width}
              height={height}
              includeHeaders={true}
              style={{ backgroundColor: 'white' }}
            />
          )}
        </ParentSize>
      </div>
    )
  }
}

export default App;
