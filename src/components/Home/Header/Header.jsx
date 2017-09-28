import React from 'react'
import "./Header.css"
import userStore from '../../../stores/UserStore'
import {Link} from 'react-router-dom'

export default () => (
    <div className="header">
        <h2>Who to follow</h2>
        <button className="refresh" onClick={() => userStore.refresh()}>Refresh</button>
        <Link to="/help">Help</Link>
    </div>
)