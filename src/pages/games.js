import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import withRoot from 'gatsby-theme-gine-blog/src/withRoot'
import Layout from '../gatsby-theme-gine-blog/components/layout/index'
import GameItemCard from '../components/game/card'
import { graphql } from 'gatsby'

const styles = theme => ({
    root: {
        textAlign: 'center',
        paddingTop: theme.spacing.unit * 20,
    },
    index: {
        margin: '0 auto',
    },
})

class Index extends React.Component {
    render() {
        const { classes, data: { allGames } } = this.props
        return (
            <Layout title="游戏">
                <div style={{ display: 'flex', flexWrap: 'wrap', maxWidth: '1760px', margin: '0 auto' }}>
                    {
                        allGames.edges.map(item => {
                            return <GameItemCard data={item} />
                        })
                    }
                </div>

            </Layout>
        )
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withRoot(withStyles(styles)(Index))

export const query = graphql`
   query {
    allGames {
      edges {
        node {
          slug
          background_image
          status
          stars
          comment
          name
          tags
        }
      }
    }
  }
`