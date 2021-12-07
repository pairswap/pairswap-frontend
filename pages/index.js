import Head from 'next/head';
import Image from 'next/image';
import Logo from '../components/icons/logo';
import SettingIcon from '../components/icons/setting';
import FlagIcon from '../components/icons/flag';
import OptionsIcon from '../components/icons/options';
import ArrowDownIcon from '../components/icons/arrow';

export default function Home() {
  return (
    <>
      <Head>
        <title>Sisu Network</title>
        <meta name="description" content="Sisu - unifies fragmented blockchain world" />
      </Head>

      <div className="flex flex-col w-screen h-screen">
        <nav className="flex items-center justify-between border-b border-gray-200 p-4">
          <div className="flex items-center">
            <Logo className="inline" />
            <span className="mx-2">Swap</span>
            <span className="mx-2">Buy</span>
            <span className="mx-2">Pool</span>
            <span className="mx-2">Farm</span>
            <span className="mx-2">Stake</span>
            <span className="mx-2">Bond</span>
            <span className="mx-2">Chart</span>
          </div>
          <div className="flex items-center">
            <button className="rounded-lg border px-4 py-2 mx-1">Avalanche</button>
            <button className="rounded-lg border px-4 py-2 mx-1">PNG</button>
            <button className="rounded-lg border px-4 py-2 mx-1">Connect to a wallet</button>
            <button className="rounded-lg border px-2 py-1 mx-1">
              <SettingIcon />
            </button>
            <button className="rounded-lg border px-2 py-1 mx-1">
              <FlagIcon />
            </button>
            <button className="rounded-lg border px-2 py-1 mx-1">
              <OptionsIcon />
            </button>
          </div>
        </nav>

        <main className="flex-1">
          <div className="w-96 m-auto mt-24">
            <p className="text-center">Set a limit order on Velox</p>
            <div className="border border-gray-200 p-8 rounded-3xl mt-2">
              <div className="border border-gray-200 rounded-lg p-4 mb-4">
                <label>From</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    className="text-xl mt-2 text-gray-400 outline-none"
                    type="number"
                    defaultValue="0.0"
                    min="0"
                    max="10"
                    step="0.5"
                  />
                  <button className="rounded-lg border px-2 py-2 mt-4">Select a token</button>
                </div>
              </div>
              <div className="flex justify-center my-4">
                <ArrowDownIcon />
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <label>To</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    className="text-xl mt-2 text-gray-400 outline-none"
                    type="number"
                    defaultValue="0.0"
                    min="0"
                    max="10"
                    step="0.5"
                  />
                  <button className="rounded-lg border px-2 py-2 mt-4">Select a token</button>
                </div>
              </div>
              <button className="w-full rounded-lg border px-2 py-4 mt-4">
                Connect to a wallet
              </button>
            </div>
            <p className="text-center mt-4">Trade with leverage on MarginSwap or WOWswap</p>
          </div>
        </main>
      </div>
    </>
  );
}
