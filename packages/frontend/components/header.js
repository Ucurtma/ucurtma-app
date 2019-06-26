import Link from 'next/link';
import Logo from '../icons/logo';
import SearchIcon from '../icons/search';
import Button from './ui/button';

function Header() {
  const navbarElements = [
    { href: '/login', content: <SearchIcon /> },
    { href: '/login', content: 'Log in' },
    { href: '/login', content: <Button>Sign up</Button> },
  ];
  return (
    <header className="flex p-4 sm:p-0 justify-between items-center">
      <div className="w-40 cursor-pointer">
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <ul className="list-none flex items-center m-0 hidden sm:flex">
        {navbarElements.map((element, i) => (
          <li className="mr-6" key={i.toString()}>
            <Link href={element.href}>
              <a className="text-navbar-link font-bold no-underline">
                {element.content}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
}

export default Header;
