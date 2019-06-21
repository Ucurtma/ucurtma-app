import Link from 'next/link';
import Logo from '../icons/logo';
import SearchIcon from '../icons/search';

function Header() {
  const navbarElements = [
    { href: '/login', content: <SearchIcon /> },
    { href: '/login', content: 'Login' },
    { href: '/login', content: 'Signup' },
  ];
  return (
    <header className="container main-header">
      <style jsx>{`
        .main-header {
          justify-content: space-between;
          align-items: center;
          margin-top: 50px;
        }
        .logo {
          width: 155px;
          cursor: pointer;
        }
        .navbar {
          list-style: none;
          display: flex;
          align-items: center;
          margin: 0;
        }
        .navbar li {
          margin-left: 1.5rem;
        }
        .navbar li a {
          text-decoration: none;
        }
      `}</style>
      <div className="logo">
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <ul className="navbar">
        {navbarElements.map(element => (
          <li>
            <Link href={element.href}>
              <a>{element.content}</a>
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
}

export default Header;
