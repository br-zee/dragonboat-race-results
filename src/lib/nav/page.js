import './nav_styles.css';
import Image from 'next/image';

export default function Navbar() {
    return (
        <>
        <div className='nav'>
            <a className="logo" href="https://www.cdba.org" target="_blank">
                <Image
                    src="/static/cdba_logo.png"
                    alt="cdba-logo"
                    width="500"
                    height="500"
                />
            </a>
            <div className="links">
                <a href='../../pages/home'>Race History</a>
                <a href='/'>Current Race</a>
            </div>
        </div>
        </>
    )
}