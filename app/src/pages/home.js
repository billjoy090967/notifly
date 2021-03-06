import React from 'react'
import withRoot from '../components/withRoot'
import withDrawer from '../components/withDrawer'
import MenuAppBar from '../components/menuAppBar'
import { connect } from 'react-redux'
import addACoupon from '../media/images/add-a-coupon.jpg'
import coupy from '../media/images/coupy.png'
import { Link } from 'react-router-dom'

class Home extends React.Component {
  componentDidMount() {
    // this.props.toggleDrawer()
  }
  render() {
    return (
      <div>
        <MenuAppBar title="Home" />
        <br />
        <br />
        <img
          src={coupy}
          alt="loading"
          class="animated zoomInRight"
          style={{
            display: 'block',
            margin: '0 auto',
            textAlign: 'center',
            width: '25%',
            maxWidth: '200px'
          }}
        />
        <Link to="/coupons/new" style={{ textDecoration: 'none' }}>
          <img
            src={addACoupon}
            alt="loading"
            style={{
              padding: '50px',
              display: 'block',
              margin: '0 auto',
              textAlign: 'center',
              width: '30%',
              maxWidth: '400px'
            }}
          />
        </Link>
      </div>
    )
  }
}

const connector = connect(
  state => state,
  dispatch => {
    return {
      toggleDrawer: () => dispatch({ type: 'TOGGLE_DRAWER' })
    }
  }
)
export default withRoot(withDrawer(connector(Home)))
