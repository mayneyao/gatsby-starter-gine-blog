import React from 'react'
import 'gatsby-theme-gine-blog/src/index.css'
import { withStyles } from '@material-ui/core/styles'
import PlayingMusic from './music'
import PlayingGame from './game'
import throttle from 'lodash/throttle'
import Axios from "axios"

class Layout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {
                music: {},
                game: {}
            }
        }
        this.fetchData = throttle(this._fetchData, 10000)
    }

    _fetchData = () => {
        Axios.get('https://api.gine.me/currently_playing').then(res => {
            this.setState({
                data: res.data
            })
        })
    }

    componentDidMount() {
        this.fetchData()
    }


    render() {
        const { data: { music, game } } = this.state
        return (
            <div>
                <PlayingMusic data={music} />
                <PlayingGame data={game} />
            </div>
        )
    }
}

export default withStyles()(Layout)