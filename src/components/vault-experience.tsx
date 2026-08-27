"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  ArrowDown,
  ArrowUpRight,
  AudioWaveform,
  BookOpen,
  CandlestickChart,
  Check,
  CircleDot,
  Clock3,
  ExternalLink,
  KeyRound,
  LoaderCircle,
  Radio,
  Satellite,
  Search,
  Shield,
  ShieldCheck,
  TicketCheck,
  WalletCards,
  Waves,
} from "lucide-react";
import { appSpec } from "@/lib/domain-spec";
import { contractAddress, contractExplorerUrl } from "@/lib/deployment";
import { ContractField, useDomainRuntime } from "@/lib/domain-runtime";

export function PromptCoverVault() {
  const desk = useDomainRuntime();
  return (
    <main
      className="vault-site"
      id="top"
      data-landing="physical-security-mutual-runway"
      data-palette="20-promptcover-colorhunt-combination"
      data-design-reference={appSpec.reference}
    >
      <header className="vault-nav">
        <a className="vault-brand" href="../">
          <ShieldCheck size={20} />
          <b>{appSpec.brand}</b>
          <span>AI RISK MUTUAL</span>
        </a>
        <div className="vault-wallet">
          <ConnectButton showBalance={false} />
        </div>
      </header>
      <section className="vault-hero">
        <div className="vault-media">
          <video src={appSpec.media} autoPlay muted loop playsInline />
          <span className="vault-media-grid" />
        </div>
        <div className="vault-hero-copy">
          <p className="vault-kicker">
            <CircleDot size={14} /> {appSpec.kicker}
          </p>
          <h1>{appSpec.brand}</h1>
          <h2>{appSpec.headline}</h2>
          <p className="vault-lede">{appSpec.description}</p>
          <div className="vault-hero-actions">
            <a href="./">
              {appSpec.primary} <ArrowDown size={16} />
            </a>
            <a href={contractExplorerUrl} target="_blank" rel="noreferrer">
              Verified contract <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
        <aside className="vault-signal">
          <span>
            <Radio size={14} /> Studionet live
          </span>
          <b>
            {contractAddress.slice(0, 8)}...{contractAddress.slice(-6)}
          </b>
          <small>Source-verified deployment</small>
        </aside>
        <div className="vault-keys">
          <span>CAPITAL</span>
          <i />
          <span>POLICY</span>
          <i />
          <span>CLAIM</span>
        </div>
      </section>
      <section className="vault-studio" id="studio">
        <header className="vault-studio-head">
          <div>
            <span>Secured operations</span>
            <h2>{appSpec.workspace}</h2>
          </div>
          <p>{appSpec.workspaceCopy}</p>
          <a href={contractExplorerUrl}>
            Vault serial <ExternalLink size={14} />
          </a>
        </header>
        <div
          className="vault-workarea"
          data-contract-surface="vault-physical-security-runway"
        >
          <nav className="vault-operations">
            <span>Access sequence</span>
            {desk.writes.map((action, index) => (
              <button
                key={action.name}
                className={action.name === desk.activeWrite ? "active" : ""}
                onClick={() => desk.chooseWrite(action.name)}
              >
                <Shield size={15} />
                <b>{action.label}</b>
                <i>{index + 1}</i>
              </button>
            ))}
          </nav>
          <form className="vault-composer" onSubmit={desk.submitWrite}>
            <div className="vault-rings">
              <i />
              <i />
              <i />
              <span>
                {String(
                  desk.writes.findIndex(
                    (item) => item.name === desk.activeWrite,
                  ) + 1,
                ).padStart(2, "0")}
              </span>
            </div>
            <header>
              <h3>{desk.writeAction.label}</h3>
              <p>{desk.writeAction.description}</p>
            </header>
            <div className="vault-fields">
              {desk.writeAction.fields.map((field) => (
                <ContractField
                  key={field.name}
                  prefix="vault"
                  field={field}
                  value={desk.writeValues[field.name] ?? ""}
                  onChange={(value) => desk.setWriteField(field.name, value)}
                />
              ))}
            </div>
            <button
              className="vault-sign"
              type="submit"
              disabled={!desk.connected || desk.status.stage === "finalizing"}
            >
              {desk.status.stage === "finalizing" ? (
                <LoaderCircle className="spin" size={17} />
              ) : desk.status.stage === "finalized" ? (
                <Check size={17} />
              ) : (
                <WalletCards size={17} />
              )}{" "}
              {desk.status.stage === "finalizing"
                ? "Awaiting consensus"
                : desk.connected
                  ? "Sign on Studionet"
                  : "Connect wallet to sign"}
            </button>
            {desk.status.error ? (
              <p className="vault-error" role="alert">
                {desk.status.error}
              </p>
            ) : null}
            {desk.status.hash ? (
              <a
                className="vault-tx"
                href={
                  "https://explorer-studio.genlayer.com/transactions/" +
                  desk.status.hash
                }
                target="_blank"
                rel="noreferrer"
              >
                Transaction {desk.status.hash.slice(0, 12)}...{" "}
                <ArrowUpRight size={14} />
              </a>
            ) : null}
            <dl className="vault-exposure">
              <div>
                <dt>Capital</dt>
                <dd>Locked</dd>
              </div>
              <div>
                <dt>Policy</dt>
                <dd>Unbound</dd>
              </div>
              <div>
                <dt>Claims</dt>
                <dd>0 open</dd>
              </div>
            </dl>
          </form>
          <aside className="vault-inspector">
            <header>
              <Shield size={18} />
              <span>Verified accounts</span>
            </header>
            <ul className="vault-read-tabs">
              {desk.reads.map((action) => (
                <li key={action.name}>
                  <button
                    className={action.name === desk.activeRead ? "active" : ""}
                    onClick={() => desk.chooseRead(action.name)}
                  >
                    {action.label}
                  </button>
                </li>
              ))}
            </ul>
            <form onSubmit={desk.inspect}>
              {desk.readAction.fields.map((field) => (
                <ContractField
                  key={field.name}
                  prefix="vault"
                  field={field}
                  value={desk.readValues[field.name] ?? ""}
                  onChange={(value) => desk.setReadField(field.name, value)}
                />
              ))}
              <button className="vault-inspect">Unlock live record</button>
            </form>
            <div className="vault-result" aria-live="polite">
              {desk.readState.error ? (
                <p className="vault-error">{desk.readState.error}</p>
              ) : desk.readState.data !== undefined ? (
                <pre>{JSON.stringify(desk.readState.data, null, 2)}</pre>
              ) : (
                <p>
                  Select a lens, provide its identifier, and inspect verified
                  on-chain state.
                </p>
              )}
            </div>
          </aside>
        </div>
      </section>
      <section className="vault-workflow" id="workflow">
        <header>
          <span>Protection path / 03</span>
          <h2>How PromptCover works</h2>
        </header>
        <div className="vault-steps">
          {appSpec.steps.map(([number, title, copy]) => (
            <article key={number}>
              <Shield size={20} />
              <b>{number}</b>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
        <footer>
          {appSpec.stats.map(([value, label]) => (
            <span key={label}>
              <b>{value}</b>
              {label}
            </span>
          ))}
        </footer>
      </section>
      <footer className="vault-footer">
        <div>
          <b>{appSpec.brand}</b>
          <span>Built on GenLayer Studionet</span>
        </div>
        <p>Design direction: {appSpec.reference}</p>
        <a href="../">
          Landing page <ArrowUpRight size={14} />
        </a>
      </footer>
    </main>
  );
}
