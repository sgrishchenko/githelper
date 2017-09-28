import React from 'react'
import {observer} from 'mobx-react'
import Item from '../Item/Item'
import './List.css'
import userStore from '../../../stores/UserStore'

export default observer(() => (
    <ul className="suggestions">
        {userStore.actual.map((user) => <Item key={user.id} user={user}/>)}
    </ul>
))