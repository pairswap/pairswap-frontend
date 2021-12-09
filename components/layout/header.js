import Link from 'next/link';
import Logo from '../icons/logo';
import DotsIcon from '../icons/dots';
import FlagIcon from '../icons/flag';
import CogIcon from '../icons/cog';
import WalletModal from '../modal/walletModal';

function NavItem({ children, href }) {
  return (
    <Link href={href}>
      <a className="font-bold text-gray-600 hover:text-black mx-4">{children}</a>
    </Link>
  );
}

function Header() {
  return (
    <nav className="flex items-center justify-between border-b border-gray-300 shadow-sm px-8 py-4 bg-white">
      <div className="flex items-center">
        <Logo className="inline" />
        <NavItem href="">
          <span className="text-black">Swap</span>
        </NavItem>
        <NavItem href="">Buy</NavItem>
        <NavItem href="">Pool</NavItem>
        <NavItem href="">Farm</NavItem>
        <NavItem href="">Stake</NavItem>
        <NavItem href="">
          Bond<sup className="text-xs">↗</sup>
        </NavItem>
        <NavItem href="">
          Chart<sup className="w-1 h-1 text-xs">↗</sup>
        </NavItem>
      </div>
      <div className="flex items-center">
        <WalletModal>
          {({ onClose }) => (
            <button
              onClick={onClose}
              className="font-bold rounded-2xl px-6 py-2 mx-2 border text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Connect to a wallet
            </button>
          )}
        </WalletModal>
        <button className="rounded-xl border p-2 mx-2">
          <CogIcon />
        </button>
        <button className="rounded-xl border p-2 mx-2">
          <FlagIcon />
        </button>
        <button className="rounded-xl border p-2 mx-2">
          <DotsIcon />
        </button>
      </div>
    </nav>
  );
}

export default Header;
