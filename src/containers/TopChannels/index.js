import React, { Component } from 'react';
// import { connect } from 'react-redux';

export class TopChannels extends Component {
  render() {
    return (
      <section>
        <div className="col-md-6 col-md-6">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Top Channel 1</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Chart data</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-md-6 col-md-6">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Top Channel 2</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Chart data</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-md-6 col-md-6">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Top Channel 3</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Chart data</td>
              </tr>
            </tbody>
          </table>
        </div> 
        <div className="col-md-6 col-md-6">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Top Channel 4</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Chart data</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    );
  }
}

// function mapStateToProps(state) {
//   return {};
// }

// export default connect(mapStateToProps)(TopChannels);