import React from 'react'
import {observer} from 'mobx-react'
import './Item.css'
import userStore from '../../../stores/UserStore'

export default observer(({user}) => (
    <li className="item">
        <img src={user.avatar_url}/>
        <a href={user.html_url} target="_blank" className="username">{user.login}</a>
        <button className="close" onClick={() => {
            userStore.remove(user)
        }}>
            x
        </button>
    </li>
))