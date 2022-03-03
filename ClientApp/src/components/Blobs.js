import React, { Component } from 'react';

export class Blobs extends Component {
  static displayName = Blobs.name;

  constructor(props) {
    super(props);
    this.state = { blobs: [], loading: true };
  }

  componentDidMount() {
    this.populateBlobsData();
  }

  static renderBlobsTable(blobs) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {blobs.map(blob =>
            <tr>
                <td>{blob.name}</td>
                  <td>
                      <img src={blob.data} alt="" width="300" height="auto" />
                </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

    render()
    {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Blobs.renderBlobsTable(this.state.blobs);

        return (
            <div>
                <h1 id="tabelLabel" >DWS available files</h1>
                <p>This component demonstrates fetching files from blobs container.</p>
                {contents}
                <button className="btn btn-primary" onClick={async () => { await this.populateBlobsData() }}>Refresh</button>
            </div>
        );
    }

    async populateBlobsData() {
        const response = await fetch('https://dws-api.azurewebsites.net/api/GetDwsBlobs?name=private');
        const data = await response.json();
        this.setState({ blobs: data, loading: false });
    }
}
