/* jshint esversion: 6 */
'use strict';

import React from 'react';
import GistList from './GistList.jsx';
import styles from './Gists.scss';
import auth from '../../shared/auth';
import * as $ from'jquery';

const Gists = React.createClass({
  getInitialState() {
    const user = JSON.parse(auth.getToken());
    return {
      loggedIn: auth.loggedIn(),
      id: user.id,
      username: user.username,
      token: user.token,
      gists: []
    }
  },

  getAllGists: function() {
    $.ajax({
      url: "https://api.github.com/users/" + this.state.username + "/gists",
      dataType: 'json',
      headers: {
        'Authorization': 'token ' + this.state.token
      },
      cache: false,
      success: function(data) {
        this.setState({ gists: data });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props, status, err.toString());
      }.bind(this)
    });
  },

  componentDidMount: function() {
    this.getAllGists();
  },

  render: function() {
    return (
      <div className={styles.gistList}>
        <div className='u-full-width'>
          <h1>Gist Manager Dashboard</h1>
        </div>
        <div className='row'>
          <GistList gistData={this.state.gists} />
        </div>
      </div>
    )
  }
});

export default Gists;