import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export default class News extends Component {
  static defaultProps = {
    country: 'us',
    pageSize: 10,
    category: 'general'
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }
  constructor() {
    super();
    this.state = {
      articles: [], // Initialize with an empty array
      loading: false,
      page: 1
    };
  }

  async componentDidMount() {
    this.fetchNews();
  }

  fetchNews = async () => {
    const { page } = this.state;
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=44b1b00e479e490b87956b7f7c1e2bb3&page=${page}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json(); // Correct the JSON parsing
    this.setState({ articles: parsedData.articles, totalResults : parsedData.totalResults, loading: false });
  }

  handlePreviousClick = async () => {
    this.setState({loading: true})

    this.setState(
      (prevState) => ({ page: prevState.page - 1 }),
      this.fetchNews,
      this.setState({loading: false})
    );
  }

  handleNextClick = async () => {
    if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
      this.setState({loading: true})
      
    this.setState(
      (prevState) => ({ page: prevState.page + 1 }),
      this.fetchNews,
      this.setState({loading: false})
    );
  }
  }

  render() {
    return (
      <div className='container my-3'>
        <h1 className="text-center" style={{margin: '35px 0px'}}>NewPro - Top headlines</h1>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading && this.state.articles.map((e) => {
            return (
              <div className="col-md-4" key={e.url}>
                <NewsItem title={e.title?e.title:""} description={e.description?e.description:""} imageUrl={e.urlToImage} newsUrl={e.url} />
              </div>
            );
          })}
        </div>
        <div className="container my-3 d-flex justify-content-between">
          <button type="button" className="btn btn-dark mx-2" onClick={this.handlePreviousClick} disabled={this.state.page <= 1}>&larr; Previous</button>
          <button type="button" className="btn btn-dark mx-2" onClick={this.handleNextClick} disabled={this.state.page + 1> Math.ceil(this.state.totalResults/this.props.pageSize)}>Next &rarr;</button>
        </div>
      </div>
    );
  }
}

