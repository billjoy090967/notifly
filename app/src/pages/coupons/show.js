import React from 'react'

import red from 'material-ui/colors/red'

//import Chevron_left from " material-ui-icons/Chevron_left";

import withRoot from '../../components/withRoot'
import withDrawer from '../../components/withDrawer'
import MenuAppBar from '../../components/menuAppBar'
import { connect } from 'react-redux'
import { setCurrentCoupon, deleteCoupon } from '../../action-creators/coupons'
import { prop, path, split, compose, last } from 'ramda'
import CouponCard from '../../components/coupon-card'
import { getURLPathID } from '../../lib/url-path-helper'
import Button from 'material-ui/Button'
import EditIcon from 'material-ui-icons/ModeEdit'
import { Link } from 'react-router-dom'
import SecondaryMenu from '../../components/secondaryMenu'
import { CONFIRM_COUPON_DELETE } from '../../constants'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui/Dialog'

const styles = theme => ({
  card: {
    maxWidth: 400
  },
  media: {
    height: 194
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: red[500]
  },
  flexGrow: {
    flex: '1 1 auto'
  }
})

class ShowCoupon extends React.Component {
  state = { expanded: false }

  componentDidMount() {
    const pathID = prop('match')(this.props)
      ? path(['match', 'params', 'id'])(this.props)
      : compose(last, split('/'), path(['location', 'pathname']))(this.props)
    this.props.getCoupon(pathID)
  }

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded })
  }

  render() {
    const currentID = getURLPathID(this.props)
    //  const { coupon } = this.props

    const menuItemActions = [
      {
        name: 'Edit',
        link: `/coupons/${this.props.currentCoupon._id}/edit`,
        fn: null
      },
      {
        name: 'Delete',
        link: null,
        fn: this.props.toggleConfirmDelete
      }
    ]

    if (path(['currentCoupon', '_id'], this.props) === currentID) {
      return (
        <div>
          <MenuAppBar
            title="Coupon"
            search={true}
            goBack={'/coupons'}
            secondaryMenu={
              <SecondaryMenu actions={menuItemActions} {...this.props} />
            }
            {...this.props}
          />
          <CouponCard {...this.props} />
          <Link to={`/coupons/${this.props.currentCoupons._id}/edit`}>
            <Button
              fab
              color="secondary"
              aria-label="edit"
              className="fab-button"
            >
              <EditIcon />
            </Button>
          </Link>
          <Dialog
            open={this.props.currentCoupon.confirmDelete}
            onRequestClose={this.props.toggleConfirmDelete}
          >
            <DialogTitle>{'Delete'}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                {'Are you sure you want to delete this coupon?'}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.props.toggleConfirmDelete} color="primary">
                Cancel
              </Button>
              <Button
                onClick={() =>
                  this.props.deleteCoupon(this.props.currentCoupon._id)}
                color="primary"
                autoFocus
              >
                Confirm Delete
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )
    } else {
      return (
        <div>
          <p>Loading...</p>
        </div>
      )
    }
  }
}
const mapStateToProps = state => {
  return { currentCoupon: state.currentCoupon }
}
const mapActionToProps = (dispatch, getState) => {
  return {
    getCoupon: id => dispatch(setCurrentCoupon(id)),
    toggleConfirmDelete: () => dispatch({ type: CONFIRM_COUPON_DELETE }),
    deleteCoupon: (id, history) => dispatch(deleteCoupon(id, history))
  }
}

const connector = connect(mapStateToProps, mapActionToProps)
export default withRoot(withDrawer(connector(ShowCoupon)))