import React from 'react'
import withRoot from 'gatsby-theme-gine-blog/src/withRoot'
import DynamicPage from 'gatsby-theme-gine-blog/src/components/dynamicPage'
import dayjs from 'dayjs'
import { parseImageUrl } from 'notabase'

function ImageGridListItem(props) {
    const { data } = props
    return (
        <div>
            <h3>{data.date}</h3>
            <img src={parseImageUrl(data.image[0], 400)} alt={data.name} loading="lazy" />
            <div>{data.comment}</div>
        </div>
    );
}

function Draw(props) {
    const style = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        width: 400,
        margin: '0 auto'
    }
    let url = `https://www.notion.so/306f676a9b93470f8f99baefbdbeea1c?v=927360ae68e9423ab42ff6cd6da17048`
    return (
        <DynamicPage
            style={style}
            url={url}
            itemComponent={ImageGridListItem}
            sortFunc={(a, b) => dayjs(b.date) - dayjs(a.date)}
            title="绘画之路"
        />
    )
}

export default withRoot(Draw)