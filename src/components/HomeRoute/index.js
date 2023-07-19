import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import './index.css'
import NavBar from '../NavBar'

const storyAPIConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProcess: 'IN_PROCESS',
}

class HomeRoute extends Component {
  state = {
    storiesData: [],
    storyAPIStatus: storyAPIConstants.initial,
  }

  componentDidMount() {
    this.getTheStoriesData()
  }

  getTheStoriesData = async () => {
    this.setState({storyAPIStatus: storyAPIConstants.inProcess})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(
      'https://apis.ccbp.in/insta-share/stories',
      options,
    )
    const data = await response.json()
    const userStories = data.users_stories
    const updatedUserStories = userStories.map(eachStory => ({
      userId: eachStory.user_id,
      userName: eachStory.user_name,
      storyUrl: eachStory.story_url,
    }))
    this.setState({
      storiesData: updatedUserStories,
      storyAPIStatus: storyAPIConstants.success,
    })
  }

  renderSlider = () => {
    const {storiesData} = this.state
    const settings = {
      infinite: false,
      speed: 500,
      slidesToShow: 7,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 7,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
      ],
    }
    return (
      <div className="slick-container">
        <Slider {...settings}>
          {storiesData.map(eachStoryDetails => {
            const {userId, userName, storyUrl} = eachStoryDetails
            return (
              <div className="slick-item" key={userId}>
                <img src={storyUrl} alt="story" className="store-image" />
                <p className="story-username">{userName}</p>
              </div>
            )
          })}
        </Slider>
      </div>
    )
  }

  renderStoryLoadingView = () => (
    <div className="story-spinner-container">
      <Loader type="TailSpin" color="#0b69ff" height="48" width="48" />
    </div>
  )

  renderTheALlSliderViews = () => {
    const {storyAPIStatus} = this.state
    switch (storyAPIStatus) {
      case storyAPIConstants.success:
        return this.renderSlider()
      case storyAPIConstants.inProcess:
        return this.renderStoryLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <NavBar />
        <div className="stories-container">
          {this.renderTheALlSliderViews()}
        </div>
      </>
    )
  }
}

export default HomeRoute
