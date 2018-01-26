import React, { Component } from 'react';
import { csv } from 'd3-request';
import { ParentSize } from '@vx/responsive';
import MuiTable from 'mui-table';

import Loading from './Loading';

const CSV_URL = 'https://s3-eu-west-1.amazonaws.com/kuijjer-public/sample_data.csv'

class App extends Component {
  state = {
    loading: true,
    data: null
  }

  componentDidMount() {
    csv(CSV_URL, (error, data) => {
      this.setState({
        data,
        loading: false
      })
    });
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    };

    const data = this.state.data
    const columns = this.state.data.columns.map(column => ({ name: column }));

    return (
      <div style={{ height: '100vh' }}>
        <ParentSize>
          {({ width, height }) => (
            <MuiTable
              data={data}
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
