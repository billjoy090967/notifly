import React from 'react'
import { Link } from 'react-router-dom'
import {
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText
} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'

import EllipsisIcon from 'material-ui-icons/MoreVert'
import Divider from 'material-ui/Divider'
import Icon from 'material-ui/Icon'

const CouponItem = props => {
  return (
    <div key={props._id}>
      <Link
        to={`/coupons/${props._id}`}
        style={{ textDecoration: 'none' }}
        className="link"
      >
        <ListItem button>
          <ListItemAvatar>
            <Avatar>
              <Icon>{props.icon ? props.icon : 'add_circle'}</Icon>
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={props.name} secondary={props.description} />

          <ListItemSecondaryAction>
            <IconButton aria-label="More">
              <EllipsisIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </Link>
      <Divider />
    </div>
  )
}

export default CouponItem