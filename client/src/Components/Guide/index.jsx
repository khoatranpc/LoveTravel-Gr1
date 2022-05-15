import clsx from 'clsx'

import Header from './Header'
import SelectedTours from './SelectedTours'
import Account from './Account'
import styles from './Guide.module.scss';

export default function Guide(){
    return (
        <div className="">
            <Header />
            <SelectedTours />
        </div>
    )
}