import React, { Component } from 'react';
import {Carousel, Container} from 'react-bootstrap';


class News extends Component {

  constructor(props) {
    super(props);
    this.state = {
      news: [],
    };
   this.getData = this.getData.bind(this);
  }

  async getData(countryCode) {
    
    const url = 'https://api.smartable.ai/coronavirus/news/' +countryCode;
    const headers = new Headers({
      'Subscription-Key': 'dded7abbf55c4cf3828fb49c3e7a6026'
    });
    const res = await fetch(url, {
      headers
    });
    const data = await res.json();

    if (data && data.news ){
      this.setState({news: data.news});
    }
  }

  componentDidMount() {
    return this.getData(this.props.iso2)
  }

  render() {
    const newsItems = this.state.news;

    return (
      <Container>
      {newsItems.length > 0 && 
        <Carousel  className="newsslide" interval='4000'>
        {
          newsItems.map((item, i) => {
            return (
              <Carousel.Item className="newsslideItem" >
                <Carousel.Caption>
                  <h3>{item.title}</h3>
                  <p>{item.excerpt.substr(0, 200)} <a href={item.webUrl} rel="noopener noreferrer" target="_blank">[more]</a></p>
                </Carousel.Caption>
            </Carousel.Item>
            );
          })
        }
        
      </Carousel>}
      </Container>

    );
  }
}

export default News;
