import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export class News extends Component {
        constructor(){
            super();
            this.state={
                articles: [],
                loading: true,
                page:1,
                totalResult:0
            }
        }
        async componentDidMount(){
            let url=`https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=3e44f77dcefe43408a3e1231bd4f0bdb&page=${this.state.page}&pageSize=${this.props.pageSize}`
            this.setState({loading: true})
            let data= await fetch(url);
            let parsedData= await data.json();
            this.setState({articles: parsedData.articles,totalResult:parsedData.totalResults,loading: false})
        }

        handleNextClick= async ()=>{
            let url=`https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=3e44f77dcefe43408a3e1231bd4f0bdb&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
            this.setState({loading: true})
            let data= await fetch(url);
            let parsedData= await data.json();
            this.setState({articles: parsedData.articles,page: this.state.page+1, loading: false})
        }
        
        handlePrevClick= async ()=>{
            let url=`https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=3e44f77dcefe43408a3e1231bd4f0bdb&page=${this.state.page-1}&pageSize=${this.props.pageSize}`
            this.setState({loading: true})
            let data= await fetch(url);
            let parsedData= await data.json();
            this.setState({articles: parsedData.articles,page: this.state.page-1,loading: false})
        }

  render() {
    return (
      <div>
        <div className="container my-5">
            <h2>NewsMonkey-Top Headlines</h2>
            {this.state.loading&&<Spinner/>}
            <div className="row">
                {!this.state.loading&&this.state.articles.map((e)=>{
                    return  <div className="col-md-4" key={e.url}>
                    <NewsItem title={e.title} description={e.description} imageurl={e.urlToImage?e.urlToImage:"https://grassworksmanufacturing.com/wp-content/themes/i3-digital/images/no-image-available.png"} newsurl={e.url}/>
                </div>
                })}
            </div>
        </div>
        <div className="container d-flex justify-content-between my-2">
        <button disabled={this.state.page<=1}  type="button" className="btn btn-outline-primary" onClick={this.handlePrevClick}>&larr;Prev</button>
        <button disabled={this.state.page===Math.ceil(this.state.totalResult/this.props.pageSize)}type="button" className="btn btn-outline-primary" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
