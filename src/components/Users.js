import LogoutButton from './LogoutButton'
import React from 'react'
import { connect } from 'react-redux'
const _ = require('lodash-core')

const Users = ({ blogs, user }) => {
  const groupedByAuthor = _.groupBy(blogs, 'user.name')
  const users = []
  Object.entries(groupedByAuthor).forEach(([name, userBlogs]) => {
      users.push({
        name: name,
        blogs: userBlogs.length,
      })
  })
  const sortBlogs = (users) => users.sort((a, b) => (a.blogs > b.blogs) ? -1 : 1)
  const name = user ? user.name : ''
  return (
    <div>
      <p>{name} logged in {<LogoutButton />}</p>
      <h2>Users</h2>
      <table><tbody><tr key="head_row"><td key="head_row_col1"></td><td key="head_row_col2"><strong>blogs created</strong></td></tr>
      {sortBlogs(users).map((user, index) =>
        <tr key={"row"+index}><td key={"col1_"+index}>{user.name}</td><td key={"col2_"+index}>{user.blogs}</td></tr>
      )}
      </tbody></table>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
      blogs: state.blogs,
      user: state.user,
  }
}

export default connect(mapStateToProps)(Users)
