import React, { Component } from 'react'

export class NewsItem extends Component {
  
  render() {
    let {title, description,imageUrl,newsUrl} = this.props;
    return (
      <div className="my-3">
        <div className="card" style={{width: "18rem"}}>
          <img src={!imageUrl?"https://techcrunch.com/wp-content/uploads/2024/05/wildfire_drone_web.jpg?w=900":imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">{title}...</h5>
              <p className="card-text">{description}...</p>
              <a href={newsUrl} target="_blank" rel="noopener noreferrer"className="btn btn-sm btn-primary">Read More</a>
            </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
