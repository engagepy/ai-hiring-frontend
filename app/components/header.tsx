"use client"

import Link from "next/link"

const HeaderComponent: React.FC = () => {
    return (
        <header>
            <nav>
                <div className="logo">AI Interview</div>
                <ul className="nav-links">
                    <Link href={'/'}><li>Dashboard</li></Link>
                    <Link href={'/dashboard'}><li>Candidates</li></Link>
                    <Link href={'/jobs'}><li>Jobs</li></Link>
                    <Link href={'/settings'}><li>Settings</li></Link>
                </ul>
            </nav>
        </header>
    );
}

export default HeaderComponent;