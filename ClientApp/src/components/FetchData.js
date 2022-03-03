import React, { Component } from 'react';

export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor(props) {
    super(props);
    this.state = { forecasts: [], loading: true };
  }

  componentDidMount() {
    this.populateWeatherData();
  }

  static renderForecastsTable(forecasts) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Name</th>
            <th>Color</th>
            <th>Class name</th>
          </tr>
        </thead>
        <tbody>
          {forecasts.map(forecast =>
            <tr>
                <td>{forecast.material_id}</td>
                <td>{forecast.material_label_color}</td>
                <td>{forecast.material_class_name}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : FetchData.renderForecastsTable(this.state.forecasts);

    return (
      <div>
        <h1 id="tabelLabel" >DWS available materials</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
        <button className="btn btn-primary" onClick={async () => { await this.populateWeatherData(); }}>Refresh</button>
      </div>
    );
  }

    resetState()
    {
        this.setState({ forecasts: [], loading: true });
    }

  async populateWeatherData() {
    const response = await fetch('https://dws-api.azurewebsites.net/api/GetDwsMaterials?');
    const data = await response.json();
    this.setState({ forecasts: data, loading: false });
  }
}
