import React, { Component } from "react";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import NewsItem from "./NewsItem";

export class News extends Component {
  static defaultProps = {
    lr : 'en-IN',
    category : 'latest'
  }

  static propTypes = {
    lr : PropTypes.string,
    category : PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResult: 0,
    };
    document.title = `NewsMonkey- ${this.capitalize(this.props.category)}`
  }

  capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  async getNews(){
    this.setState({loading:true})
    const url = `https://google-news13.p.rapidapi.com/${this.props.category}?lr=${this.props.lr}`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '64250e8832msh5d97a163542037cp104922jsn831bfec4759e',
        'x-rapidapi-host': 'google-news13.p.rapidapi.com'
      }
    };
    let data = await fetch(url,options);
    let parsedDate = await data.json();
    this.setState({
      articles: parsedDate.items,
      loading : false
    });
  }

  componentDidMount() {
    this.getNews();
  }

  handlePrevClick = () => {
    this.setState({page : this.state.page - 1})
    this.getNews();
  };

  handleNextClick = () => {
    this.setState({page : this.state.page + 1})
    this.getNews();
  };

  render() {
    return (
      <div className="container my-2">
        <h1 className="text-center">
          News Monkey - Top {this.capitalize(this.props.category)} Headlines
        </h1>
        {this.state.loading && <Spinner />}
        {!this.state.loading && <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.newsUrl}>
                {<NewsItem
                  title={element.title}
                  description={
                    element.snippet ? element.snippet.slice(0, 80) : ""
                  }
                  imageUrl={
                    element.images ? element.images.thumbnail : ""
                  }
                  newsUrl={element.newsUrl}
                  date={element.timestamp}
                  author={element.publisher}
                  source = {element.publisher}
                /> }

              </div>
            );
          })}
        </div>}
        {/* <div className="container d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-dark"
            disabled={this.state.page <= 1}
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            className="btn btn-dark"
            disabled={Math.ceil(this.state.totalResult / this.props.pageSize) < this.state.page + 1}
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div> */}
      </div>
    );
  }
}

export default News;
