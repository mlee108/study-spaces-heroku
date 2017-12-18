import React, { Component } from 'react';
import { Header, Search, Grid, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

import styles from './ListView.scss';

const numbers = [1, 2, 3, 4];

class ListView extends Component {
  render() {
    var list = numbers.map((number) => {
        return (
          <Grid.Row container columns={4}>
            <Grid.Column>
              <Image src='.../../assets/knifefork.png' />
            </Grid.Column>
            <Grid.Column>
              <Image src='.../../assets/knifefork.png' />
            </Grid.Column>
            <Grid.Column>
              <Image src='.../../assets/knifefork.png' />
            </Grid.Column>
            <Grid.Column>
              <Image src='.../../assets/knifefork.png' />
            </Grid.Column>
          </Grid.Row>
        )
      });
    return (
      <div>
        <h1>ListView Component</h1>
          <Search
            placeholder='i.e. Cafes near me'
            open={false}
          />
        <Header size='medium' color='teal' >Results</Header>
        <Grid>
          {list}
        </Grid>
      </div>
    )
  }
}

export default ListView
