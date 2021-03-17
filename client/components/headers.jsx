import Link from 'next/link';
import { Fragment } from 'react';

const Header = ({ currentUser }) => {
    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className="container-fluid">
                <Link href="/">
                    <a className="navbar-brand mb-0 h1">
                        Ticketing
                </a>
                </Link>
                <div className="d-flex justify-content-end align-items-center">
                    <span className="text-light">
                        {currentUser ?
                            currentUser.email :
                            'Please sign in or sign up!'
                        }
                    </span>
                    <ul className="nav d-flex">
                        {
                            currentUser ?
                                <ul>
                                    <Link href="/auth/signout">
                                        <a className="btn btn-light">Sign out</a>
                                    </Link>
                                </ul>
                                :
                                <Fragment>
                                    <ul>
                                        <Link href="/auth/signup">
                                            <a className="btn btn-light">Sign up</a>
                                        </Link>
                                    </ul>
                                    <ul>
                                        <Link href="/auth/signin">
                                            <a className="btn btn-light">Sign in</a>
                                        </Link>
                                    </ul>
                                </Fragment>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header;