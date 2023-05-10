import React from 'react';
import './News.css'; // import CSS file

class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = { articles: [] };
  }

  async componentDidMount() {
    const response = await fetch('http://localhost:5000/news');
    const json = await response.json();
    this.setState({ articles: json.articles.slice(0, 4) });
  }

  render() {
    return (
      <div className="news-wrapper">
        <h1 style={{marginLeft: "3rem"}}>News</h1>
      <div className="news-container">
        {this.state.articles.map((article) => (
          <div className="news-article" key={article.url}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              <img src={article.img} alt={article.title} />
            </a>
            <h2>{article.title}</h2>
            <p>{article.author || "MLB.com"} - {article.date}</p>
          </div>
        ))}
      </div>
      </div>
    );
  }
}

export default News;
