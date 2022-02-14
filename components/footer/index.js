import { useWeb3 } from 'utils/useWeb3';
import { shortenAccount } from 'utils/transform';

function Footer() {
  const { active, account } = useWeb3();

  if (!active) {
    return null;
  }

  return (
    <div className="sticky bottom-0 flex items-center justify-between rounded-t-lg bg-white p-4 sm:hidden">
      <button className="mx-1 w-full rounded-2xl bg-indigo-600 px-4 py-2 font-bold text-white hover:bg-indigo-700 md:px-6">
        {shortenAccount(account)}
      </button>
    </div>
  );
}

export default Footer;
